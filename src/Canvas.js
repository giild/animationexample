import React, { useRef, useEffect } from 'react'

const Canvas = props => {
    const canvasRef = useRef(null)

    const draw = (ctx, frameCount) => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        // context.arc(x, y, radius, startAngle, endAngle, counterClockwide)
        ctx.arc(50, 100, 45 * Math.sin(frameCount*0.01)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        // canvas is what it sounds like, it's a canvas you can draw on
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
    
        return() => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])
    return <canvas ref={canvasRef} {...props} />
}

export default Canvas