// import React from 'react'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Testing = () => {

  const [arrimg, setArrImg] = useState(null)

  const fileput = (e) => {
    let fs = e.target.files

    if (fs.length === 0)
      return console.log('취소')

    let farr = []

    for (let i = 0; i < fs.length; i++) {
      farr.push(fs[i].name.match(/\d+/g))
    }

    console.log(farr)

    // for (let i = 0; i < fs.length; i++) {
    //   farr.push(URL.createObjectURL(fs[i]))
    // }

    // setArrImg(farr)
  }

  useEffect(() => {

  }, [])

  return (
    <Wrap>
      <SelDiv>
        <FileSel type='file' title='선택' onChange={(e) => fileput(e)} multiple />
        <Filelabel>💬</Filelabel>
        <Trash onClick={() => setArrImg(null)}>🗑</Trash>

        <ShowWrap>
          {arrimg ? arrimg.map((v, i) => <ShowFile key={i} imgf={v} />) : ''}
        </ShowWrap>
      </SelDiv>
    </Wrap>
  )
}

export default Testing

const Wrap = styled.div`
  text-align: center;
  background-color: #282c34;
  height: 100%;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  overflow-y: hidden;  
`

const SelDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
`

const FileSel = styled.input`
  position: absolute;
  width: 100px;
  height: 100px;
  font-size: 0;
  background: none;
  border: 1px solid grey;
  z-index: 1;

  ::-webkit-file-upload-button {
    display: none;
  }
`

const Filelabel = styled.div`
  position: absolute;
  font-size: 20px;
  margin: 30px;

  :hover {
    cursor: default;
  }
`

const Trash = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid grey;
  border-radius: 20px;
  font-size: 70px;
  margin-left: 200px;

  :hover {
    cursor: pointer;
  }
`

const ShowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 200px;
`

const ShowFile = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid grey;
  background-image: url("${(props) => props.imgf}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const ImgPrev = styled.img`
  max-width: 200px;
  height: 200px;
  margin-right: 180px;
`