import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Bblock = () => {

  const [canvas, setCanvas] = useState(null)
  const [canvasSize, setCanvasSize] = useState(null)
  const [ctx, setCtx] = useState(null)

  const [bmoveX, setBmoveX] = useState(0)
  const [bmoveY, setBmoveY] = useState(0)
  const [bdirX, setBdirX] = useState(-1)
  const [bdirY, setBdirY] = useState(-1)

  const [blocks, setBlocks] = useState([
    {
      crash: false,
      posx: 100,
      posy: 100,
      width: 50,
      height: 50,
      color: 'red',
    },
    {
      crash: false,
      posx: 200,
      posy: 100,
      width: 50,
      height: 50,
      color: 'red',
    }
  ])

  const [pauseState, setPauseState] = useState(false)

  const BgColor = '#282c34'
  const BSize = 20
  const BSpeedX = 80
  const BSpeedY = 120

  //Init
  useEffect(() => {
    setCanvas(document.querySelector('canvas'))
    console.log('getCanvas')
  }, [])

  useEffect(() => {
    if (canvas === null)
      return

    setCtx(canvas.getContext('2d'))
    console.log('getCtx')

    // console.dir(canvas.clientHeight)

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    setCanvasSize({ x: canvas.width, y: canvas.height })
    setBmoveX(canvas.width / 2)
    setBmoveY(BSize)
  }, [canvas])

  //Start
  useEffect(() => {
    if (ctx === null)
      return

    BallMovingX()
    BallMovingY()
    BallShape()

    // ctx.rect(10, 10, 30, 30)
    // ctx.fillStyle = 'red'
    // ctx.fill()
    // ctx.stroke()

  }, [ctx])

  const [testone, setTestone] = useState(true)

  //Main
  useEffect(() => {
    if (ctx === null)
      return

    CanvasClear()
    BallShape()



    BlockSetting()
    IsCrash()

    if (pauseState)
      return

    setTimeout(() => {
      BallMovingX()
    }, 100 / BSpeedX);

    setTimeout(() => {
      BallMovingY()
    }, 100 / BSpeedY);
  }, [bmoveX, bmoveY])

  //Blocks
  const BlockSetting = () => {
    blocks.map((v, i) => {
      if (v.crash) {
        return
      }

      ctx.beginPath()
      ctx.rect(v.posx, v.posy, v.width, v.height)
      ctx.fillStyle = v.color
      ctx.fill()
    })
  }

  //Collision
  const IsCrash = () => {
    blocks.map((v, i) => {
      if (v.crash)
        return

      v.crash = ColCheck(v)
    })
  }

  //OneCollision
  const ColCheck = (colobj) => {
    if (bmoveX > colobj.posx && bmoveX < colobj.posx + colobj.width && bmoveY > colobj.posy) {
      if (bmoveY < colobj.posy + colobj.height + BSize) {
        setBdirY(-1)
        console.log('d')
        return true
      }
    }
    else if (bmoveX > colobj.posx && bmoveX < colobj.posx + colobj.width && bmoveY < colobj.posy + colobj.height) {
      if (bmoveY > colobj.posy - BSize) {
        setBdirY(1)
        console.log('u')
        return true
      }
    }
    else if (bmoveY > colobj.posy && bmoveY < colobj.posy + colobj.height && bmoveX > colobj.posx) {
      if (bmoveX < colobj.posx + colobj.width + BSize) {
        setBdirX(1)
        console.log('r')
        return true
      }
    }
    else if (bmoveY > colobj.posy && bmoveY < colobj.posy + colobj.height && bmoveX < colobj.posx + colobj.width) {
      if (bmoveX > colobj.posx - BSize) {
        setBdirX(-1)
        console.log('l')
        return true
      }
    }

    return false
  }

  //Pause
  useEffect(() => {
    if (canvas === null)
      return

    if (!pauseState) {
      BallMovingX()
      BallMovingY()
    }
  }, [pauseState])

  //PauseKey
  useEffect(() => {
    onkeydown = (e) => {
      if (e.key === 'p' || e.key === 'P')
        setPauseState(!pauseState)
    }
  }, [pauseState])



  const CanvasClear = () => {
    canvas.width = canvas.width
  }

  const BallShape = () => {
    ctx.beginPath()
    ctx.arc(bmoveX, bmoveY, BSize, 0, 2 * Math.PI)
    ctx.fillStyle = 'skyblue'
    ctx.fill()

    // console.log(bmoveX, bmoveY)
  }

  const BallMovingX = () => {
    let bposX = bmoveX

    if (bdirX > 0) {
      bposX += 2
      if (bmoveX > canvasSize.x - BSize)
        setBdirX(-1)
    }
    else {
      bposX -= 2
      if (bmoveX < BSize)
        setBdirX(1)
    }

    return setBmoveX(bposX)
  }

  const BallMovingY = () => {
    let bposY = bmoveY

    if (bdirY > 0) {
      bposY -= 2
      if (bmoveY < BSize)
        setBdirY(-1)
    }
    else {
      bposY += 2
      if (bmoveY > canvasSize.y - BSize)
        setBdirY(1)
    }

    return setBmoveY(bposY)
  }

  return (
    <Wrap>
      {/* <Centerdiv>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '600px' }}>
          <div style={{ width: '60px', height: '60px', border: '1px solid pink' }} onClick={(e) => {
            console.dir(e.target.offsetParent.style)
            e.target.offsetParent.style.offset = '100px'
          }} />
          <div style={{ width: '60px', height: '60px', border: '1px solid pink' }} />
        </div>
      </Centerdiv> */}
      <Fcanvas />
      {/* <Scanvas /> */}
    </Wrap>
  )
}

export default Bblock

const Wrap = styled.div`
  background-color: #282c34;
  height: 100%;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  overflow-y: hidden;
`

const Centerdiv = styled.div`
  position: absolute;
  width: 600px;
  height: 420px;
  margin: 20px auto;
  border: 1px solid white;
`

const Fcanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid pink;
  background-color: #282c34;
`

const Scanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid pink;
  background-color: #666;
`