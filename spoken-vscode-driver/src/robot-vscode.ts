import * as vscode from 'vscode'
import { Robot } from './index'
import Log from './logger'

// @TODO: Replace everything 'robot' for editor
class RobotVscode implements Robot {

    /**
	 * Writes something in the current text input
	 * @param text The text to be written
	 */
    async write(text: string): Promise<void | Error> {
        return new Promise((res, rej) => {
            Log('[vscode-driver.robot-vscode.write]: Executing write(' + text + ')')

            const editor = vscode.window.activeTextEditor

            if (editor == null) return rej(new Error('No active text editor'))

            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, text)
            }).then(ok => {
                if (!ok) return rej(new Error('Something went wrong!'))
                res()
            })
        })
    }

    removeSelection(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    /**
     * Creates a new line above the current line.
     * 
     * @returns undefined if evrything went well, error otherwise
     */
    newLine(pos: 0 | 1): Promise<void | Error> {
        return new Promise(async (res, rej) => {
            Log('[vscode-driver.robot-vscode.newLine]: Executing newLine')

            const editor = vscode.window.activeTextEditor

            if (editor == null) return rej(new Error('No active text editor'))

            if (pos === 0) {
                await this.goToLine(String(editor.selection.active.line), 'END')
            }

            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, '\n')
            }).then(ok => {
                if (!ok) return rej(new Error('Something went wrong!'))
                res()
            })
        })
    }

    removeLine(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    selectLines(from: number | undefined, to: number | undefined): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    /**
     * Moves the cursor to a different line
     * @param number Line number
     */
    goToLine(number: string, cursorPosition: 'END' | 'BEGIN' = 'BEGIN'): Promise<string | Error> {
        return new Promise(async (res, rej) => {
            try {
                const editor = vscode.window.activeTextEditor
                const destLine = parseInt(number)

                if (editor == null) return rej(new Error('No active text editor'))

                const line = editor.selection.active.line + 1
                const to = destLine > line ? 'down' : 'up'
                const value = to === 'down' ? destLine - line : line - destLine

                vscode.commands.executeCommand('cursorMove', { to, value, by: 'line' }).then(() => {
                    vscode.commands.executeCommand('revealLine', { lineNumber: destLine, at: 'center' }).then(() => {
                        const t = `wrappedLine${cursorPosition === 'BEGIN' ? 'First' : 'Last'}NonWhitespaceCharacter`
                        vscode.commands.executeCommand('cursorMove', { to: t }).then(() => {
                            res(editor.document.lineAt(destLine - 1).text)
                        })
                    })
                })

                // const { range, text } = editor.document.lineAt(parseInt(number) - 1)
                // editor.selection = new vscode.Selection(range.start, range.end)

                // editor.revealRange(range)
            } catch(err) {
                rej(err)
            }
        })
    }

    /**
     * Finds the position of a given token in the current line
     * 
     * @param to string What should be searched for
     * @param leapSize number How many matches should be skiped
     */
    moveCursorTo(
        to: 'END_LINE' | 'BEGIN_LINE' | 'SYMBOL' | null,
        symbol: string | undefined,
        leapSize: number | undefined,
        goto: boolean = true
    ): Promise<number | Error> {
        return new Promise(async (res, rej) => {
            const editor = vscode.window.activeTextEditor

            if (editor == null) return rej(new Error('No active text editor'))

            const currentLine = editor.document.lineAt(editor.selection.active.line)

            if (to === 'BEGIN_LINE' || to === 'END_LINE') {
                const column = to === 'BEGIN_LINE'
                    ? currentLine?.firstNonWhitespaceCharacterIndex
                    : currentLine?.range?.end?.character

                const pos = 'wrappedLine' + (to === 'BEGIN_LINE' ? 'First' : 'Last') + 'NonWhitespaceCharacter'

                if (!goto) return res(column)

                return vscode.commands.executeCommand('cursorMove', { to: pos }).then(() => {
                    res(column)
                })

            } else {
                if (to === null) {
                    const value = editor.selection.active.character + (leapSize as number)

                    if (!goto) return res(value)

                    return vscode.commands
                        .executeCommand('cursorMove', { to: 'right', value: leapSize, by: 'character' })
                        .then(() => {
                            res(value)
                        })
                }

                if (to === 'SYMBOL') {
                    const text = currentLine.text.substr(editor.selection.active.character + 1)

                    // @ts-ignore
                    const indices = Array.from(text.matchAll(new RegExp(symbol, 'gi'))).map(a => a.index)

                    if (indices.length === 0) return rej('Match not found for symbol: ' + symbol)

                    if(leapSize === -1) leapSize = indices.length
                    else if(leapSize == undefined) leapSize = 1

                    if (!indices[leapSize - 1]) return rej('Match not found for symbol: ' + symbol)

                    const value = indices[leapSize - 1] + 1

                    if (!goto) return res(value)

                    return vscode.commands
                        .executeCommand('cursorMove', { to: 'right', value: value, by: 'character' })
                        .then(() => {
                            res(value)
                        })
                }

            }

            return rej(new Error('Unknown operation!'))
        })
    }

    hotKey(...keys: string[]): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }

    /**
     * Retrieves the content of the provided line
     * 
     * @param number | undefined line number
     */
    getLine(number?: string | number): Promise<{ lineNumber: number, text: string } | Error> {
        return new Promise((res, rej) => {
            try {
                const editor = vscode.window.activeTextEditor

                if (editor == null) return rej(new Error('No active text editor'))

                number = number != null ? number : editor.selection.active.line + 1

                res({
                    lineNumber: number as number,
                    text: editor.document.lineAt(number as number).text
                })
            } catch(err) {
                rej(err)
            }
        })
    }

    /**
     * Indents the provided selection or the active one.
     *
     * @param p1 Start string[] (line, cursor)
     * @param p2 Finish string[] (line, cursor)
     */
    indentSelection(p1: [string, string], p2: [string, string]): Promise<void | Error> {
        return new Promise((res, rej) => {
            try {
                const editor = vscode.window.activeTextEditor

                if (editor == null) return rej(new Error('No active text editor'))

                p1[0] = p1[0] ?? editor.selection.active.line
                p2[0] = p2[0] ?? editor.selection.active.line

                const sp1 = p1.map(a => parseInt(a, 10))
                const sp2 = p2.map(a => parseInt(a, 10))

                editor.selection = new vscode.Selection(sp1[0], sp1[1], sp2[0], sp2[1])

                vscode.commands.executeCommand('editor.action.reindentselectedlines', {}).then(a => {
                    editor.selection = new vscode.Selection(editor.selection.end, editor.selection.end)
                    res()
                })
            } catch(err) {
                rej(err)
            }
        })
    }

}

export function createInstance() {
    return new RobotVscode()
}
