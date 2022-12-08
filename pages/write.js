import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ref, set } from 'firebase/database'
import { useRouter } from 'next/router'
import { realDB } from '../public/fbconfig'
import fbupimg from '../public/components/fbupimg'

const Write = (props) => {

  const router = useRouter()

  const [title, setTitle] = useState(router.query.title)
  const [story, setStory] = useState(router.query.story)
  const [imgfile, setImgfile] = useState(null)
  const [preimg, setPreimg] = useState(null)
  const [dragimg, setDragimg] = useState(false)

  const okBtn = () => {
    // let day = new Date(1969, 12, 1, 9).getTime()

    if (title === '')
      return console.log('title?')
    if (story === '')
      return console.log('story?')

    let day = new Date().getTime()

    let thistory = {
      title,
      story,
      day
    }

    if (imgfile) {
      fbupimg(imgfile)
    }

    set(ref(realDB, 'fbch/story/first'), thistory)
    router.push('/')
  }

  const TitleX = (e) => {
    setTitle('')
    e.target.parentNode.children[0].value = ''
  }

  const ContentX = (e) => {
    setStory('')
    e.target.parentNode.children[0].value = ''
  }

  const fileuploading = (e) => {
    let fimg = e.target.files[0]

    if (fimg === undefined)
      return

    setImgfile(fimg)

    let img_url = URL.createObjectURL(fimg)
    setPreimg(img_url)
  }

  const dragTrash = () => {
    setDragimg(false)
    setPreimg(null)
  }

  // console.log('write page'))

  useEffect(() => {
    setTitle(router.query.title)
    setStory(router.query.story)
  }, [router.query])

  return (
    <WriteWrap>
      <WriteFrame>
        <BackBtn onClick={() => router.push('/')}>◀</BackBtn>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <WriteArea className='shadow-drop-2-center'>
            <WriteInput placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Xbtn onClick={(e) => TitleX(e)} pos={{ r: 70, t: 132 }}>❌</Xbtn>
          </WriteArea>

          <WriteArea className='shadow-drop-2-center'>
            <WriteContent placeholder='Bla~' value={story} onChange={(e) => setStory(e.target.value)} />
            <Xbtn onClick={(e) => ContentX(e)} pos={{ r: 70, t: 200 }}>❌</Xbtn>
          </WriteArea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {preimg ? <ImgPrev src={preimg} onDragStart={() => setDragimg(true)} /> :
            <div style={{ marginRight: '180px' }}>
              <FileSel type='file' title='이미지 업로드' onChange={(e) => fileuploading(e)} />
              <ImgUpdiv><Filelabel>이미지 업로드</Filelabel></ImgUpdiv>
            </div>}
          <Trash onDragLeave={() => dragimg ? dragTrash() : ''} onClick={() => setPreimg(null)}>🗑</Trash>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>
          <WriteBtn onClick={() => router.push('/')}>취소</WriteBtn>
          <WriteBtn onClick={() => okBtn()}>올리기</WriteBtn>
        </div>
      </WriteFrame>
    </WriteWrap>
  )
}

export default Write


const WriteWrap = styled.div`
  text-align: center;
  background-color: #282c34;
  height: 100%;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  overflow-y: hidden;  
`

const WriteFrame = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 60px;
`

const BackBtn = styled.div`
  width: 60px;
  height: 60px;
  font-size: 30px;
  border: 3px solid whitesmoke;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 20px 0;
  padding: 0 4px 4px 0;

  :hover {
    cursor: pointer;
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
`

const WriteArea = styled.div`
  display: flex;
  flex-direction: row;

  @keyframes shadow-drop-2-center{0%{transform:translateZ(0);box-shadow:0 0 0 0 transparent}100%{transform:translateZ(50px);box-shadow:0 0 20px 0 rgba(220,220,220,.35)}}
`

const WriteInput = styled.input`
  font-size: 24px;
  padding: 10px;
  background-color: grey;
  color: white;
  border: 0px;
  outline: none;
  width: 100%;

  ::placeholder {
    color: #ddd;
  }
  :hover {
    cursor: default;
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
  :focus {
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
`

const WriteContent = styled.textarea`
  font-size: 24px;
  padding: 10px;
  margin: 20px 0;
  background-color: grey;
  color: white;
  resize: none;
  outline: none;
  width: 100%;
  height: 12rem;

  ::placeholder {
    color: #ddd;
  }
  :hover {
    cursor: default;
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
  :focus {
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
`

const FileSel = styled.input`
  position: absolute;
  width: 200px;
  height: 200px;
  font-size: 0;
  background: none;
  z-index: 1;
  margin-left: -100px;

  ::-webkit-file-upload-button {
    display: none;
  }

  :hover {
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
`

const Filelabel = styled.div`
  position: absolute;
  font-size: 20px;

  :hover {
    cursor: default;
  }
`

const ImgPrev = styled.img`
  max-width: 200px;
  height: 200px;
  margin-right: 180px;
`

const ImgUpdiv = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid pink;
`

const Trash = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid grey;
  border-radius: 20px;
  font-size: 70px;
  margin-left: 240px;

  :hover {
    cursor: pointer;
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
`

const WriteBtn = styled.div`
  width: 100px;
  height: 40px;
  border: 2px solid whitesmoke;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    animation:shadow-drop-2-center .1s cubic-bezier(.25,.46,.45,.94) both
  }
`

const Xbtn = styled.div`
  display: flex;
  align-items: center;
  background-color: grey;
  position: absolute;
  right: ${(props) => `${props.pos.r}px`};
  top: ${(props) => `${props.pos.t}px`};

  :hover {
    cursor: default;
  }
`
