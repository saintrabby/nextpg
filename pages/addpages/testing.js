// import React from 'react'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Testing = () => {

  const [arrimg, setArrImg] = useState(null)

  const [imgView, setImgView] = useState(false)
  const [selImg, setSelImg] = useState(null)

  const fileput = (e) => {
    let fs = e.target.files

    if (fs.length === 0)
      return console.log('취소')

    let farr = []

    // for (let i = 0; i < fs.length; i++) {
    //   farr.push(fs[i].name.match(/\d+/g))
    // }

    for (let i = 0; i < fs.length; i++) {
      farr.push(URL.createObjectURL(fs[i]))
    }

    setArrImg(farr)
  }

  const ImageClick = (i) => {
    setImgView(true)
    setSelImg(i)
    // console.log(i)
  }

  useEffect(() => {
    onkeydown = (e) => {
      if (e.key === 'Escape')
        setImgView(false)
      if (e.key === 'ArrowRight' && selImg < arrimg.length - 1)
        setSelImg(selImg + 1)
      if (e.key === 'ArrowLeft' && selImg > 0)
        setSelImg(selImg - 1)

    }
  }, [selImg])

  return (
    <Wrap>
      <SelDiv>
        <FileSel type='file' title='선택' onChange={(e) => fileput(e)} multiple />
        <Filelabel>💬</Filelabel>
        <Trash onClick={() => setArrImg(null)}>🗑</Trash>

        <ShowWrap>
          {arrimg ? arrimg.map((v, i) => <ShowFile key={i} imgf={v} onClick={() => ImageClick(i)} />) : ''}
        </ShowWrap>

        {imgView ? <ImageViewWrap>
          {selImg === 0 ? <FirstImg>처음</FirstImg> : ''}
          <ImageExit onClick={() => setImgView(false)}>❌</ImageExit>
          <ImageViewDiv img={arrimg[selImg]} />
          {selImg === arrimg.length - 1 ? <LastImg>끝</LastImg> : ''}
        </ImageViewWrap> : ''}
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
  margin: 16px 0 0 16px;

  ::-webkit-file-upload-button {
    display: none;
  }

  :hover {
    cursor: pointer;
  }
`

const Filelabel = styled.div`
  position: absolute;
  font-size: 20px;
  margin: 48px 0 0 48px;

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
  margin: 16px 0 0 248px;

  :hover {
    cursor: pointer;
  }
`

const ShowWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 200px;
  margin-left: 16px;
  margin-right: 16px;
`

const ShowFile = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid grey;
  background-image: url("${(props) => props.imgf}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  :hover {
    cursor: pointer;
  }
`

const ImageViewWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #222;
  z-index: 2;
`

const FirstImg = styled.div`
  position: fixed;
  left: 20px;
  top: 20px;
  font-size: 50px;
  font-style: italic;
`

const LastImg = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  font-size: 50px;
  font-style: italic;
`

const ImageExit = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  top: 20px;
  width: 60px;
  height: 60px;
  font-size: 60px;
  
  :hover {
    cursor: pointer;
  }
`

const ImageViewDiv = styled.div`
  position: fixed;
  width: 60%;
  height: 96%;
  background-color: #444;
  margin-left: 20%;
  margin-top: 1%;
  margin-bottom: 1%;
  border-radius: 20px;
  z-index: 3;

  background-image: url("${(props) => props.img}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const ImgPrev = styled.img`
  max-width: 200px;
  height: 200px;
  margin-right: 180px;
`