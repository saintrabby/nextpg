import React from 'react'
import styled from 'styled-components'

const Bblock = () => {

  return (
    <Wrap>
      <Centerdiv>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '600px' }}>
          <div style={{ width: '60px', height: '60px', border: '1px solid pink' }} onClick={(e) => {
            console.dir(e.target.offsetParent.style)
            e.target.offsetParent.style.offset = '100px'
          }} />
          <div style={{ width: '60px', height: '60px', border: '1px solid pink' }} />
        </div>
      </Centerdiv>
    </Wrap>
  )
}

export default Bblock

const Wrap = styled.div`
  text-align: center;
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