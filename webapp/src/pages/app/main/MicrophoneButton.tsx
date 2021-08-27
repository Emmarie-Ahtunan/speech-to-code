import React, { MouseEvent, useEffect } from 'react'

export function MicrophoneButton(
    props: {
        recording: boolean
        connectedToVSCode: boolean
        toggleRecording: () => void
        language: string
        mode?: 'modalx' | 'widget'
        onOpen?: Function
    }
) {

    useEffect(() => {
        const canvas = document.getElementById('micCanvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        let audioContext: AudioContext | null = null
        let streamSource: MediaStreamAudioSourceNode | null = null
        let processor: ScriptProcessorNode | null = null

        if (ctx == null || props.mode === 'widget')
            return

        drawCircle(ctx, canvas)

        function draw(data: AudioProcessingEvent) {
            if (document.hidden) return

            window.requestAnimationFrame(() => {
                if (ctx == null)
                    return

                ctx!.clearRect(0, 0, canvas.width, canvas.height)

                drawCircle(ctx, canvas)
                drawWaveform(canvas.width, canvas.height, ctx, data.inputBuffer)
            })
        }

        navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: !false,
                noiseSuppression: false,
                autoGainControl: false
            },
            video: false
        }).then(rawStream => {
            audioContext = new AudioContext()
            // audioContext.suspend()
            streamSource = audioContext.createMediaStreamSource(rawStream)
            processor = audioContext.createScriptProcessor(2 ** 12, 1, 1)

            processor.connect(audioContext.destination)
            streamSource.connect(processor)

            processor.addEventListener('audioprocess', draw)

            return rawStream
        })

        return () => {
            if (!!audioContext) {
                processor?.removeEventListener('audioprocess', draw)
                streamSource?.disconnect(processor as ScriptProcessorNode)
                processor?.disconnect(audioContext.destination)
                audioContext.close()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // @ts-ignore Yeah I know, I know...
    window.recording = props.recording

    const disabled = !props.connectedToVSCode

    const size = props.mode === 'widget' ? 50 : 122

    const onClickMic = (e: MouseEvent) => {
        if (disabled) return null
        if (props.mode === 'widget') return props.onOpen?.()

        return props.toggleRecording()
    }

    return (
        <div
            className={`record ${props.recording ? 'on' : 'off'} ${disabled ? 'error' : ''}`}
            style={{'--size': size + 'px'} as any}
        >
            <div
                className={`btn ${disabled ? 'disabled' : ''}`}
                onClick={onClickMic}
                title={
                    disabled
                        ? `We could not connect to Visual Studio Code!`
                        : `Click on it to ${props.recording ? 'stop' : 'start'} recording!`
                }
            >
                <i className="fa fa-microphone" />
                <canvas id="micCanvas" width={size} height={size}></canvas>
            </div>
            <span className="info">
                {i18n(props.language)(props.recording ? 'rec' : 'not-rec')()}
            </span>
        </div>
    )
}

function drawCircle(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // @ts-ignore Yeah, I know...
    const rec = window.recording

    ctx.fillStyle = rec ? '#ef5350' : '#3da2de'
    ctx.strokeStyle = rec ? '#ef5350' : '#3da2de'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width / 2) - 2, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
}

function drawWaveform(width: number, height: number, context: CanvasRenderingContext2D, buffer: AudioBuffer) {
    width = width / 3
    const data = buffer.getChannelData(0)
    const step = Math.ceil(data.length / width)
    const amp = height * 0.5
    for (let i = 0; i < width; i++) {
        let min = 1.0
        let max = -1.0
        for (var j = 0; j < step; j++) {
            var datum = data[((i) * step) + j]
            if (datum < min)
                min = datum
            if (datum > max)
                max = datum
        }
        context.fillRect((i * 3), (1 + min) * amp, 2, Math.max(1, (max - min) * amp))
    }
}


const texts: Record<string, Record<string, any>> = {
    'en-US': {
        'not-rec': () => <>Click on the mic to <b>start</b> recording.</>,
        'rec': () => <>Click on the mic to <b>stop</b> recording.</>
    },
    'pt-BR': {
        'not-rec': () => <>Clique no microfone para <b>começar</b> a gravação.</>,
        'rec': () => <>Clique no microfone para <b>parar</b> a gravação.</>
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId]