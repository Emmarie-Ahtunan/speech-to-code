/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { parseRoute } from '../utils'
import './style.scss'

export default function Header(props: any) {
    const { root, lang, route } = parseRoute()
    const makeUrl = (path: string) => `${process.env.PUBLIC_URL}/${root}${ !root ? '' : '/' }${path}`
    const stt = localStorage.getItem('STT') || 'azure'

    const changeStt = (val: string, evt: React.MouseEvent) => {
        evt.preventDefault()

        localStorage.setItem('STT', val)

        return window.location.reload()
    }

    return (
        <nav id="top-nav">
            <figure>
                <img src={`${process.env.PUBLIC_URL}/logo-purple.png`} alt="logo" height="40" title="Brand logo"/>
            </figure>
            <a href={makeUrl('')} className={route === 'index' ? 'selected' : ''}>Home</a>
            <a href={makeUrl('webapp/')} className={route === 'webapp' ? 'selected' : ''}>Demo</a>
            <a rel="noreferrer" href={ARTICLE_LINK} target="_blank">Article</a>
            <a href={makeUrl('about/')} className={route === 'about' ? 'selected' : ''}>About</a>
            <div className="language">
                <a href={process.env.PUBLIC_URL + "/en/webapp/"} className={lang === 'en-US' ? `selected` : ''}>en-US</a>&nbsp;/&nbsp;
                <a href={process.env.PUBLIC_URL + "/pt/webapp/"} className={lang === 'pt-BR' ? `selected` : ''}>pt-BR</a>
            </div>
            <div className="config">
                <a
                    href="#"
                    className={stt === 'azure' ? `selected` : ''}
                    onClick={(evt) => changeStt('azure', evt)}
                >
                    Azure
                </a>
                &nbsp;/&nbsp;
                <a
                    href="#"
                    className={stt === 'chrome' ? `selected` : ''}
                    onClick={(evt) => changeStt('chrome', evt)}
                >
                    Chrome
                </a>
                <span className="help" data-tip={i18n[lang]['help']} data-for="header">
                    <i className="fa fa-question-circle" />
                </span>
            </div>
            <ReactTooltip multiline effect="solid" className="custom-tooltip tooltip-header" id="header" />
        </nav>
    )
}

const i18n: Record<string, any> = {
    'en-US': {
        'help': `Which Speech to Text provider should be used ?<br/>
        Azure is the default option, but since it is a paid service it may not be available all the time.<br/>
        Chrome is the native Speech to Text provider of the Google Chrome browser, it's a free service and only works on Chrome.`
    },
    'pt-BR': {
        'help': `Qual o provedor de Speech to Text deve ser usado ?<br/>
        Azure é a opção padrão, por se tratar de um serviço pago, pode não estar disponível a todo momento.<br/>
        Chrome é o serviço nativo de conversão de fala em texto do navegador Google Chrome, é um serviço grátis e só funciona no Chrome.`
    }
}

const ARTICLE_LINK = "https://pedrooaugusto.github.io/Programming With Voice - Assistive Technology Tool For Programming In JavaScript Using Voice - Pedro Silva.pdf"
