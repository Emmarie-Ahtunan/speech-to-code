interface ElectronIpc {
    send: (channel: string, ...args: any) => void,
    on: (channel: string, cb: (...args: any) => void) => void
}

class FakeIpc implements ElectronIpc {
    editors = [{
        name: 'VSCODE',
        status: 'ON',
        current: true
    },{
        name: 'DEFAULT',
        status: 'ON',
        current: false
    }]

    changeEditorCallback: Function = () => {}

    send(channel: string, editor: string) {
        console.warn('IPC not defined (this is a electron application!)')
        if (channel === 'Config:changeEditor') {
            this.changeEditor(editor)
        }
    }

    changeEditor(editor: string) {
        editor = editor || 'VSCODE'
        this.editors = this.editors
            .map(item => ({...item, current: false}))
            .map(item => ({...item, current: item.name === editor}))

        this.changeEditorCallback(this.editors)
    }

    on(channel: string, cb: Function) {
        console.warn('IPC not defined (this is a electron application!)')
        if (channel === 'Config:onChangeEditorState') {
            this.changeEditorCallback = cb
        }
    }
}

// @ts-ignore
const _ipcRenderer: ElectronIpc = window?.ipcRenderer || new FakeIpc()

export default _ipcRenderer
export { _ipcRenderer as ipcRenderer }
