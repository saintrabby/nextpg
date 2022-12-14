import axios from 'axios'
// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { realDB } from '../public/fbconfig';
import { child, get, getDatabase, onValue, ref, remove, set } from 'firebase/database';
import styled from 'styled-components'
import Fbstorage from '../public/components/fbstorage';
// import styles from '../styles/Home.module.css'

const MainPage = () => {

  const [nick, setNick] = useState('')
  const [mynick, setMynick] = useState(false)
  const [mono, setMono] = useState(false)
  // const [cont, setCont] = useState('')
  // const [getfbd, setGetfbd] = useState(null)
  const [clist, setClist] = useState([])
  const [cnum, setCnum] = useState(0)
  const [story, setStory] = useState(null)
  const [chatOn, setChatOn] = useState(false)

  let nicks = ''
  let chats = ''
  const chatref = useRef()
  const scrollref = useRef(null)

  const stopdbload = false
  const router = useRouter()

  const ver = 'v0.1'

  const listup = (data) => {

    if (stopdbload)
      return

    if (data === 1) {
      // let dbref = ref(realDB)
      // get(child(dbref, `fbch/chat`))
      //   .then((r) => {
      //     if (r.val() === null)
      //       return console.log('no data')

      //     setClist(r.val())
      //   })
      chatConnect()
      loadStory()
      return console.log('start')
    }

    let chatlist = [...clist]
    chatlist.push(data)

    // data.docs.map((v, i) => {
    //   chatlist.push(v.data())
    // })
    // setCnum(cnum + 1)
    setClist(chatlist)
  }

  const chatIn = (e) => {
    chats = e
  }

  const onEnter = (e) => {
    if (chats === '')
      return

    if (stopdbload)
      return

    if (e.key === 'Enter') {
      let upchat = {}
      upchat.username = nick
      upchat.message = chats
      upchat.msgnum = cnum + 1

      let dbref = ref(realDB)

      // if (nick === '모노쿠마') {
      //   get(child(dbref, `mono`))
      //     .then((r) => {
      //       let loNcheck = (parseInt(localStorage.getItem('lognum')) === r.val().lognum)

      //       if (loNcheck && r.val().adcheck) {
      //         get(child(dbref, `fbch/chat`))
      //           .then((r) => {
      //             let dbnum = r.size

      //             set(ref(realDB, 'fbch/chat/' + dbnum), upchat)
      //             chatref.current.value = ''

      //             listup(upchat)

      //             return
      //           })
      //       }
      //       else {
      //         let checking = (chats << 2) === r.val().cuma

      //         if (checking) {
      //           let lognum = parseInt((Math.floor(Math.random() * 9 + 1) + Math.random()) * 100000)
      //           localStorage.setItem('lognum', lognum)

      //           set(ref(realDB, 'mono/waiting'), true)
      //           set(ref(realDB, 'mono/lognum'), lognum)
      //           chatref.current.value = ''

      //           return console.log('관리자 허가 대기중')
      //         }
      //         else {
      //           console.log('해당 닉네임은 관리자만 사용가능')
      //           chatref.current.value = '해당 닉네임은 관리자용입니다'
      //           return router.reload()
      //         }
      //       }
      //     })
      // }

      // else
      get(child(dbref, `fbch/chat`))
        .then((r) => {
          let dbnum = r.size
          // let tmsg = { username: 'direct', message: cont, msgnum: dbnum }
          set(ref(realDB, 'fbch/chat/' + dbnum), upchat)
          chatref.current.value = ''

          listup(upchat)
        })
    }
  }

  const chatConnect = () => {

    let dbref = ref(realDB)
    // const dref = get(child(dbref, `fbch/chat`))
    // const q = query(dbref)

    // console.log('connect')
    // remove(dbref)

    console.log(ver)

    scrolldown(1000)

    onValue(dbref,
      (s) => {
        // console.log(s.val().fbch.chat)
        get(child(dbref, `fbch/chat`))
          .then((r) => {
            if (r.val() === null)
              return console.log('no data')

            let slist = listsort(r.val())

            const listSize = 20
            const maxSize = listSize * 2

            if (r.size > maxSize) {

              let upList = slist.slice(listSize)

              setClist(slist.slice(-listSize))

              set(ref(realDB, 'fbch/chat/'), upList)
            }
            else {
              setClist(slist.slice(-listSize))
            }
          })
      })

    // get(child(dbref, `fbch/chat`))
    //   .then((r) => {
    //     if (r.val() === null)
    //       return console.log('no data')

    //     setClist(r.val())
    //   })
  }

  const listsort = (list) => {
    list.sort((a, b) => a.msgnum - b.msgnum)
    setCnum(list[list.length - 1].msgnum)
    return list
  }

  const loadStory = () => {
    let dbref = ref(realDB)

    get(child(dbref, `fbch/story`))
      .then((res) => setStory(res.val().first))
  }

  const NickIn = (e) => {
    nicks = e
  }

  const NickOk = (e) => {
    if (e.key === 'Enter') {
      if (nicks === '모노쿠마') {
        setNick('')
        setMono(true)
        console.log('모노쿠마는 관리자용 닉네임입니다')
      }
      else {
        setNick(nicks)
        setMynick(true)
        setMono(false)
      }

      // setNick(nicks)
      // setMynick(true)
    }
  }

  const ChatChange = () => {
    setChatOn(!chatOn)
  }

  const scrolldown = (t = 100) => {
    setTimeout(() => scrollref.current?.scrollIntoView({ block: 'center' }), t)
  }

  const pageover = () => {
    localStorage.removeItem('lognum')
    // set(ref(realDB, 'mono/adcheck'), false)
    // set(ref(realDB, 'mono/lognum'), null)
    set(ref(realDB, 'mono/waiting'), null)
  }

  useEffect(() => {
    listup(1)

    scrolldown()
  }, [])

  // useEffect(() => {
  //   document.onkeydown = (e) => {
  //     //키 차단
  //     if (e.key === 'F12') {
  //       e.preventDefault()
  //       // e.returnValue = false;
  //     }

  //     setInkey(e.key)
  //   }
  // }, [inkey])

  // console.log(scrollref.current.scrollIntoView(alignToBottom))

  // useEffect(() => {
  //   axios({ method: 'get', url: 'http://localhost:3000/api/hello' })
  //     .then((res) => console.log(res))
  // }, [])

  return (
    <MainWrap>
      <div style={{ height: '60px', padding: '20px', margin: 'auto' }}>닉네임 :
        {mynick ? <ShowNick>{nick}</ShowNick>
          : <Nickinput
            placeholder='nickname'
            maxLength={10}
            onChange={(e) => NickIn(e.target.value)}
            onKeyDown={(e) => NickOk(e)} />}
      </div>
      {mono ? <div style={{ lineHeight: '20px' }}>사용할 수 없는 닉네임입니다</div> : <div style={{ lineHeight: '20px' }}></div>}

      <ChangeIcon onClick={() => ChatChange()}>↪</ChangeIcon>

      <CenterWrap className='shadow-drop-2-center' chat={chatOn}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CenterBtn onClick={() => router.push('/')}>여기</CenterBtn>
          <CenterBtn onClick={() => router.push('/addpages/testing')}>공사중</CenterBtn>
        </div>

        <CenterContent>
          <div style={{ width: '50%' }}>
            <Fbstorage />
          </div>

          <div style={{ flex: 1, margin: '20px auto' }}>
            {story ? <div style={{ margin: '10px' }}>{story.title}</div> :
              <div style={{ margin: '10px' }}>Loading...</div>}
            {story ? <div style={{ margin: '10px' }}>{story.story}</div> :
              <div style={{ margin: '10px' }}>Loading...</div>}
          </div>
        </CenterContent>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CenterBtn onClick={() => router.push({ pathname: '/write', query: { title: story.title, story: story.story } })}>메인 글 써보기</CenterBtn>
        </div>
      </CenterWrap>

      <div style={{ maxHeight: '75vh' }}>
        <ChatDiv chat={chatOn}>
          {clist.length === 0 ? console.log('loading') : clist.map((v, i) => {
            return <Chats key={i} ref={scrollref}>
              <div style={{ wordBreak: 'break-all' }}>{v.msgnum} - {v.username} : {v.message}</div>
            </Chats>
          })}
        </ChatDiv>

        {mynick ?
          <ChatStart
            ref={chatref}
            onKeyDown={(e) => onEnter(e)}
            onChange={e => chatIn(e.target.value)}
            placeholder='bla~ bla~'
            chat={chatOn}
          ></ChatStart>
          : <ChatBla chat={chatOn}>닉네임 입력 후 엔터</ChatBla>}
      </div>
    </MainWrap>
  )
}

export default MainPage

const MainWrap = styled.div`
  text-align: center;
  background-color: #282c34;
  height: 100%;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  overflow-y: hidden;
`

const ShowNick = styled.div`
  border: 1px solid wheat;
  min-width: 200px;
  height: 25px;
  display: inline-block;
  margin: 8px;
`

const Nickinput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 6px;
  border: 0px;
  outline: none;
  text-align: center;
  margin: 8px;
`

const ChangeIcon = styled.div`
  width: 30px;
  height: 30px;
  font-size: 50px;
  position: fixed;
  left: 20px;
  top: 60px;

  :hover {
    cursor: pointer;
  }

  @media screen and (width > 999px) {
    display: none;
  }
`

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: grey;
  /* border: 2px solid white; */
  border-radius: 20px;
  position: fixed;
  /* margin: 0 400px 0 20px; */
  /* height: 10rem; */
  /* width: 10rem; */
  max-height: 75vh;
  min-height: 480px;
  /* min-width: 460px; */
  top: 120px;
  left: 20px;
  right: 400px;
  bottom: 10px;

  @keyframes shadow-drop-2-center{0%{transform:translateZ(0);box-shadow:0 0 0 0 transparent}100%{transform:translateZ(50px);box-shadow:0 0 20px 0 rgba(0,0,0,.35)}}

  @media screen and (width < 1000px) {
    display: ${(props) => props.chat ? 'none' : 'flex'};
    width: 93%;
  }
`

const CenterBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 60px;
  border-radius: 20px;
  border: 0;
  background-color: #555;
  color: white;
  font-size: 20px;

  :hover {
    cursor: pointer;
    animation:shadow-drop-2-center .4s cubic-bezier(.175,.885,.32,1.275) both
  }
`

const CenterContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px auto;
  height: 66.6%;
  width: 90%;

  @media screen and (width < 501px) {
    flex-direction: column;
  }
`

const ChatDiv = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  width: 340px;
  min-height: 10rem;
  max-height: 75vh;
  justify-content: flex-end;
  /* margin-left: auto; */
  margin: 0px 16px 0 auto;
  overflow-y: scroll;
  position: fixed;
  right: 16px;
  top: 120px;
  bottom: 96px;

  @media screen and (width < 1000px) {
    width: 340px;
    margin: 0;
    visibility: ${(props) => props.chat ? 'block' : 'hidden'};
  }
  @media screen and (width < 500px) {
    width: 310px;
    margin: 0;
    visibility: ${(props) => props.chat ? 'block' : 'hidden'};
  }
`

const Chats = styled.div`
  text-align: left;
  margin: 8px;
`

const ChatBla = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  width: 280px;
  height: 26px;
  margin: 8px 64px 16px auto;
  position: fixed;
  bottom: 1%;
  right: 12px;

  @media screen and (width < 1000px) {
    visibility: ${(props) => props.chat ? 'block' : 'hidden'};
    margin: 0px 32px 24px auto;
  }
`

const ChatStart = styled.input`
  position: fixed;
  bottom: 5%;
  right: 48px;
  width: 300px;
  height: 40px;
  border: 0px;
  outline: none;
  border-radius: 12px;
  font-size: 20px;
  margin: 0px auto;
  padding: 12px;

  @media screen and (width < 1000px) {
    visibility: ${(props) => props.chat ? 'block' : 'hidden'};
    right: 24px;
  }
`