import { Editor } from '../default'
import * as ipc from 'node-ipc'

ipc.config.id = 'speechtocodechannel-client'
ipc.config.retry = 1500
ipc.config.silent = true
ipc.config.maxRetries = 2

class VSCodeEditor extends Editor {
    map = new Map<number, [Function, Function]>()
    callback: null | ((editor: Editor) => void) = null

    constructor() {
        super('VSCode')
    }

    onStatusChange(cb: (editor: Editor) => void) { this.callback = cb }
    turnOff() { ipc.disconnect('speechtocodechannel') }
    turnOn() { this.init() }

    private init() {
        ipc.connectTo('speechtocodechannel', () => {
            let wasConnectedAtLeastOnce = false

            ipc.of.speechtocodechannel.on('error', (err: unknown) => {
                console.log('[client.VSCodeRobot.error]: Error: ' + err)
            })

            ipc.of.speechtocodechannel.on('destroy', () => {
                console.log('[client.VSCodeRobot.destroy]: Socket destroyed!')

                this.status = 'OFF'
                if (!wasConnectedAtLeastOnce) console.log('Unable to open connection!')
                this.callback?.(this)
            })

            ipc.of.speechtocodechannel.on('socket.disconnected', () => {
                console.log('[client.VSCodeRobot.socket.disconnected]: Socket disconnected!')

                this.status = 'OFF'
                this.callback?.(this)
            })

            ipc.of.speechtocodechannel.on('connect', () => {
                console.log('[client.VSCodeRobot.connect]: Connected!')

                this.status = 'ON'
                wasConnectedAtLeastOnce = true
                this.callback?.(this)
            })

            ipc.of.speechtocodechannel.on('runCommand/response', this.onResponse)
        })
    }

    private onResponse = (data: { id: number, err: unknown, response: unknown }) => {
        console.log('[client.VSCodeRobot.runCommand/response]: Received response of ' + JSON.stringify(data))

        if (this.map.has(data.id)) {
            const [res, rej] = this.map.get(data.id) as Function[]
            this.map.delete(data.id)

            if (data.err) return rej(data.err)
            return res(data.response)
        } else {
            console.error(new Error('[client.VSCodeRobot.runCommand/response]: This response is not in the queue!'))
        }
    }

    write(text: string): Promise<void | Error> {
        return new Promise((res, rej) => {
            const id = +new Date()

            console.log('[client.VSCodeRobot.write]: Sending request to execute write(' + text + ')')

            ipc.of.speechtocodechannel.emit('runCommand', {
                id,
                type: 'write',
                context: {},
                extra: { args: [text] }
            })

            this.map.set(id, [res, rej])
        })
    }

    removeSelection(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    newLine(): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    removeLine(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    selectLines(from: number | undefined, to: number | undefined): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    goToLine(number: string): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    hotKey(...keys: string[]): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    
}

export default new VSCodeEditor()