import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Drawing = () => {

  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)

  const [con, setCon] = useState(0)

  let painting = false

  const [mousestate, setMousestate] = useState('ready')

  // ctx.rect(50, 50, 100, 100)
  // ctx.fillStyle = 'red'
  // ctx.fill()

  // ctx.beginPath()
  // ctx.rect(150, 150, 100, 100)
  // ctx.stroke()

  // ctx.arc(150, 150, 50, 0, 2 * Math.PI)
  // ctx.stroke()

  const MouseCtrl = () => {

    switch (mousestate) {
      case 'start': painting = true; break;
      case 'painting': break;
      case 'end': painting = false; break;
      default: break;
    }
  }

  const MouseMove = (e) => {
    if (painting) {
      let posX = e.nativeEvent.layerX
      let posY = e.nativeEvent.layerY

      ctx.lineWidth = 2

      if (posX < 300)
        posX -= 100 / posX
      if (posY < 300)
        posY -= 100 / posY
      if (posX > 300)
        posX += posX / 100
      if (posY > 300)
        posY += posY / 100

      ctx.lineTo(posX, posY)
      ctx.stroke()
      return
    }

    // ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    // ctx.stroke()
  }

  const MouseUp = (e) => {
    painting = false
  }

  const MouseDown = (e) => {
    painting = true
    ctx.beginPath()

    ctx.strokeStyle = 'white'
    ctx.moveTo(e.nativeEvent.layerX, e.nativeEvent.layerY)
    // ctx.lineTo(e.nativeEvent.layerX + 10, e.nativeEvent.layerY)
    ctx.stroke()
  }

  const MouseLeave = (e) => {
    // painting = false
  }

  useEffect(() => {
    setCanvas(document.querySelector('canvas'))
  }, [])

  useEffect(() => {
    if (canvas === null)
      return

    setCtx(canvas.getContext('2d'))

    canvas.width = 600
    canvas.height = 600
  }, [canvas])

  return (
    <DrawWrap>
      <DrawCanvas
        onMouseDown={(e) => MouseDown(e)}
        onMouseMove={(e) => MouseMove(e)}
        onMouseUp={(e) => MouseUp(e)}
        onMouseLeave={(e) => MouseLeave(e)}
      >
      </DrawCanvas>
      <CanvasIn />
      <input type='color' style={{ position: 'absolute', right: '20px' }} onChange={(e) => console.dir(e)} />
    </DrawWrap>
  )
}

export default Drawing

const DrawWrap = styled.div`
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  height: 100%;
  min-height: 100vh;
  color: white;
`

const DrawCanvas = styled.canvas`
  position: absolute;
  width: 600px;
  height: 600px;
  border: 5px solid white;
  background: none;
  z-index: 100;
`

const CanvasIn = styled.div`
  width: 590px;
  height: 590px;
  border: 10px solid white;
  position: absolute;
`