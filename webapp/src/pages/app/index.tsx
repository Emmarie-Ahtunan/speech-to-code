import React, { useEffect, useState } from 'react'
import Header from './header'
import Main from './main'
import Modules from './spoken'
import About from './about'
import Help from './help'
import { ModalSection } from './Modal'
import GloablContext from '../../services/global-context'
import { VoiceRecognitionHook } from '../../services/use-voice-recognition'
import './index.scss'

export function factory(useVoiceRecognition?: VoiceRecognitionHook) {
    return function App(props: { initialLang?: string }) {
        return (
            <GloablContext lang={props.initialLang}>
                <div>
                    <Header />
                    <Router
                        pages={[
                            { hash: '', component: Main(useVoiceRecognition) },
                            { hash: 'spoken', component: Modules },
                            { hash: 'help', component: Help },
                            { hash: 'about', component: About }
                        ]}
                    />
                </div>
                <ModalSection />
            </GloablContext>
        )
    }
}

export default factory()

function Router(props: { pages: { hash: string, component: React.FC }[] }) {
    const [hash, setHash] = useState(window.location.hash)

    useEffect(() => {
        function hashchange() {
            setHash(window.location.hash)
        }

        window.addEventListener('hashchange', hashchange)

        return () => {
            window.removeEventListener('hashchange', hashchange)
        }

    }, [])

    const page = props.pages.find((page) => new RegExp('^(#|#/|)' + page.hash + '(/|)$').test(hash))

    return page ? <page.component /> : null
}