import Spoken from '../index'
import * as graphlib from '../graphlib'
import { AutomataPaths } from '../automata'

beforeAll(async () => {
    await Spoken.init()
})

test('it can load the grammar', async () => {
    expect(Spoken.modules).not.toBeNull()
})

test('it can generate the power set off all commands', async () => {
    const graph: graphlib.Graph = getGraph('write') as graphlib.Graph

    expect(AutomataPaths.allPathsToFinalStates(graph).length).not.toBe(0)
})

test('it can search for a command given a id', async () => {
    const graph = Spoken.findById('declare_variable', 'pt-BR')
    expect(graph).not.toBe(null)
    expect((graph || {}).id).toBe('declare_variable')
})

test('it can search for a command given a phrase', async () => {
    let command = Spoken.recognizePhrase('declarar constante chamada bola', 'pt-BR')
    expect(command).toMatchObject([{
        id: 'declare_variable',
        args: {
            memType: 0,
            name: 'bola'
        }
    }])

    command = Spoken.recognizePhrase('THE', 'pt-BR')
    expect(command).toBeNull()

    command = Spoken.recognizePhrase('write hello how are you ?', 'en-US')
    expect(command![0]).toMatchObject({
        id: 'write',
        path: [
            'write',
            null,
            { text: 'hello' },
            { text: 'how' },
            { text: 'are' },
            { text: 'you' },
            { text: '?' }
        ]
    })

    command = Spoken.recognizePhrase('write it hello friend', 'en-US')
    expect(command![0]).toMatchObject({
        id: 'write',
        path: ['write', 'it', null, { text: 'hello' }, { text: 'friend' }]
    })
    
    command = Spoken.recognizePhrase('write down hello friend', 'en-US')
    expect(command![0]).toMatchObject({
        id: 'write',
        path: ['write', 'down', { text: 'hello' }, { text: 'friend' }]
    })
})

function getGraph(id: string) {
    let graph: graphlib.Graph | null = null

    for (const mod of Spoken.modules) {
        for (let item of mod.grammar['pt-BR']) {
            graph = graphlib.json.read(item) as graphlib.Graph

            if (graph.graph().id === id) break
        }
    }

    return graph
}
