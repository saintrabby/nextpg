import axios from 'axios'
// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { realDB } from '../public/fbconfig';
import { child, get, getDatabase, off, onValue, ref, remove, set } from 'firebase/database';
import styled from 'styled-components'
import Fbstorage from '../public/components/fbstorage';
import Fb from '../public/fbfunc';
// import styles from '../styles/Home.module.css'

const MainPage = () => {

  //name
  const [nick, setNick] = useState('')
  const [hasNick, setHasNick] = useState(false)
  //admin
  const [mono, setMono] = useState(false)

  //nick-input-ing-norerender
  let nicks = ''
  //chat-input-ing-norerender
  let chats = ''
  
  const [chatList, setChatList] = useState([])
  const [chatNum, setChatNum] = useState(0)
  const [chatOn, setChatOn] = useState(false)
  const [people, setPeople] = useState(0)

  const [story, setStory] = useState(null)

  const [bgm, setBgm] = useState({ m: null, ad: null })
  const [bgmpaused, setBgmpaused] = useState(true)



  const chatref = useRef()
  const chatScrollRef = useRef(null)


  //canvas_state
  const [canvas, setCanvas] = useState(null)
  // const [canvasSize, setCanvasSize] = useState(null)
  const [ctx, setCtx] = useState(null)
  const [canvObjs, setCanvObjs] = useState(null)


  //server load
  const stopdbload = false
  //
  const monomod = false

  const router = useRouter()



  //------------------------------PageStart Setting------------------------------
  const listup = (data) => {

    if (stopdbload)
      return

    //first
    if (data === 1) {
      chatConnect()
      loadStory()
      audioPlay()

      if (monomod)
        console.log('visit - mono')
      else {
        let dbref = ref(realDB)

        get(child(dbref, `fbch/visit`))
          .then(r => set(ref(realDB, `fbch/visit`), r.val() + 1))
      }

      return console.log('start')
    }

    let chatlist = [...chatList]
    chatlist.push(data)

    setChatList(chatlist)
  }



  //------------------------------Main Board------------------------------
  const loadStory = () => {
    let dbref = ref(realDB)

    get(child(dbref, `fbch/story`))
      .then((res) => setStory(res.val().first))
  }



  //------------------------------Chatting------------------------------
  const chatIn = (e) => {
    chats = e
  }

  const ChatSend = (e) => {
    if (chats === '')
      return

    if (stopdbload)
      return

    if (e.key === 'Enter') {
      let upchat = {}
      upchat.username = nick
      upchat.message = chats
      upchat.msgnum = chatNum + 1

      let dbref = ref(realDB)

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

    scrolldown(1000)

    onValue(dbref,
      (s) => {
        get(child(dbref, `fbch/chat`))
          .then((r) => {
            if (r.val() === null)
              return console.log('no data')

            get(child(dbref, `fbch/who`))
              .then((r) => setPeople(r.val()))

            let slist = listsort(r.val())

            const listSize = 20
            const maxSize = listSize * 2

            if (r.size > maxSize) {

              let upList = slist.slice(listSize)

              setChatList(slist.slice(-listSize))

              set(ref(realDB, 'fbch/chat/'), upList)
            }
            else {
              setChatList(slist.slice(-listSize))
            }
          })
      })

  }

  const listsort = (list) => {
    list.sort((a, b) => a.msgnum - b.msgnum)
    setChatNum(list[list.length - 1].msgnum)
    return list
  }

  const NickIn = (e) => {
    nicks = e
  }

  const NickEnter = (e) => {
    if (e.key === 'Enter') {
      if (monomod) {
        console.log('mono id')

        setNick(nicks)
        setHasNick(true)
      }
      else {
        if (nicks === '모노쿠마') {
          setNick('')
          setMono(true)
          console.log('모노쿠마는 관리자용 닉네임입니다')
        }
        else {
          setNick(nicks)
          setHasNick(true)
          setMono(false)

          let dbref = ref(realDB)
          let ids = []

          get(child(dbref, `fbch/ids`))
            .then((r) => {
              ids = r.val() ? r.val() : []
              ids.push(nicks)

              let rprops = router.components['/MainPage'].props.pageProps
              let icprops = { ...rprops, id: nicks, count: people + 1 }
              router.components['/MainPage'].props.pageProps = icprops

              set(ref(realDB, 'fbch/ids/'), ids)
              set(ref(realDB, 'fbch/who/'), people + 1)
            })

          get(child(dbref, `fbch/chattoday`))
            .then(r => set(ref(realDB, `fbch/chattoday`), r.val() + 1))
        }
      }
    }
  }

  const ChatChange = () => {
    setChatOn(!chatOn)
  }

  const scrolldown = (t = 100) => {
    setTimeout(() => chatScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), t)
  }
  



  //------------------------------Audio------------------------------
  const audioPlay = () => {
    // let myaudio = new Audio()

    if (bgm.m) {
      if (bgm.ad) {
        if (bgm.ad?.paused) {
          bgm.ad?.play()
        }
        else {
          bgm.ad?.pause()
        }

        setBgmpaused(bgm.ad?.paused)
      }
    }
    else {
      Fb('getDownloadURL', '0077.mp3')
        .then((r) => {
          setBgm({ m: r, ad: bgm.ad })
        })
    }
  }

  const audioStop = () => {
    bgm.ad?.load()
    setBgmpaused(true)
    // bgm.ad?.pause()
  }
  //------------------------------Audio------------------------------



  const pageOut = () => {
    let dbref = ref(realDB)

    router.components['/MainPage'].props.pageProps.ad?.load()
    let myid = (router.components['/MainPage'].props.pageProps.id)
    let idcount = router.components['/MainPage'].props.pageProps.count

    if (myid) {
      get(child(dbref, `fbch/ids`))
        .then((r) => {
          let idnumber = (r.val().findIndex((v, i) => v === myid))

          remove(ref(realDB, 'fbch/ids/' + idnumber))
          set(ref(realDB, 'fbch/who/'), idcount - 1)
        })

      off(dbref)
    }

    window.removeEventListener('beforeunload', () => { })
  }



  useEffect(() => {
    listup(1)

    scrolldown()

    window.addEventListener('beforeunload', (e) => {
      pageOut()
    })

    return () => pageOut()
  }, [])

  useEffect(() => {
    onmousedown = () => {

      if (bgm.ad) {
        if (bgm.ad?.ended)
          bgm.ad?.load()
        setBgmpaused(true)
        // else
        //   console.log('playing')
      }
      else {
        bgm.ad = new Audio(bgm.m)

        let rprops = router.components['/MainPage'].props.pageProps
        let adprops = { ...rprops, ad: bgm.ad }
        router.components['/MainPage'].props.pageProps = adprops

        bgm.ad.volume = 0.5
        bgm.ad.play()

        setBgmpaused(false)
      }
    }
  }, [bgm.m])

  useEffect(() => {
    window.hi = () => {
      console.log('hello')
    }
  }, [])

  // const [inkey, setInkey] = useState(null)
  // useEffect(() => {
  //   document.onkeydown = (e) => {
  //     //키 차단
  //     if (e.key === 'F5') {
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





  //------------------------------Canvas------------------------------
  useEffect(() => {
    let can = document.querySelector('canvas')
    setCanvas(can)
    setCtx(can.getContext('2d'))
    can.width = can.clientWidth
    can.height = can.clientHeight
  }, [])

  useEffect(() => {
    if (canvas === null)
      return

    //오브젝트(반응형)
    if (window.innerWidth > 1000) { ObjCreate(40) }
    else if (window.innerWidth > 501) { ObjCreate(30) }
    else { ObjCreate(20) }

    onresize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  }, [canvas])

  useEffect(() => {
    if (ctx === null)
      return

    ObjsAni()

  }, [canvObjs])

  const CanvasClear = () => {
    canvas.width = canvas.width
  }

  const ObjCreate = (n) => {
    let objs = []

    for (let i = 0; i < n; i++) {
      let ranCx = Math.random() * 180
      let ranX = Math.random() * canvas.width
      let ranY = Math.random() * canvas.height
      let ranSize = Math.random() * 40 + 5
      let ranXw = Math.random() * 0.05 + 0.001
      let ranSp = Math.random() * 1.5 + 0.5
      let oneObj = {
        cx: ranCx,
        size: ranSize,
        x: ranX,
        y: -ranY,
        xw: ranXw,
        sp: ranSp,
      }

      objs.push(oneObj)
    }

    setCanvObjs(objs)
  }

  const ObjsAni = () => {
    if (canvObjs === null)
      return

    if (canvObjs.length > 0) {
      CanvasClear()

      for (let i = 0; i < canvObjs.length; i++) {
        ctx.beginPath()
        if (canvObjs[i].y > canvas.height + canvObjs[i].size) {
          canvObjs[i].y = -canvObjs[i].size
          canvObjs[i].cx = Math.random() * 180
          canvObjs[i].size = Math.random() * 40 + 5
          // sobjs[i].xw = Math.random() * 0.05 + 0.001
          canvObjs[i].sp = Math.random() * 1.5 + 0.5
          // continue
        }

        canvObjs[i].y += canvObjs[i].sp
        canvObjs[i].x += Math.cos((canvObjs[i].cx++) * canvObjs[i].xw)

        let radgrad = ctx.createRadialGradient(canvObjs[i].x, canvObjs[i].y, 0, canvObjs[i].x, canvObjs[i].y, canvObjs[i].size)
        radgrad.addColorStop(0, '#fff')
        radgrad.addColorStop(0.2, '#aaa')
        radgrad.addColorStop(1, 'rgba(250, 250, 250, 0)')

        ctx.fillStyle = radgrad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

    }

    // ctx.fill()

    setTimeout(() => {
      ObjsAni()
    }, 10);
  }
  //------------------------------Canvas------------------------------



  return (
    <MainWrap>

      <canvas style={{ position: 'absolute', width: '100%', height: '100%', marginLeft: '-50%' }} />

      <MpthreePlay onClick={() => audioPlay()}>
        {bgmpaused ? <div>▶</div> : <div style={{ fontSize: '24px' }}>∥</div>}
        {/* <iframe src={bgm.m} allow='autoplay'></iframe> */}
        {/* <audio src={bgm.m} type='audio/mp3' autoPlay controls loop style={{ width: '200px', height: '60px' }}></audio> */}
      </MpthreePlay>
      <MpthreeStop onClick={() => audioStop()}>■</MpthreeStop>

      <NickWrap><span>닉네임 :</span>
        {hasNick ? <ShowNick>{nick}</ShowNick>
          : <Nickinput
            style={{ position: 'sticky', opacity: '0.6' }}
            placeholder='nickname'
            maxLength={10}
            onChange={(e) => NickIn(e.target.value)}
            onKeyDown={(e) => NickEnter(e)} />}
      </NickWrap>

      {mono ? <CantMono>사용할 수 없는 닉네임입니다</CantMono> : <div style={{ lineHeight: '20px' }}></div>}

      <ChangeIcon onClick={() => ChatChange()}>↪</ChangeIcon>

      <CenterWrap className='shadow-drop-2-center' chat={chatOn}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CenterBtn onClick={() => router.push('/')}>처음으로</CenterBtn>
          <CenterBtn onClick={() => router.push('/addpages/bblock')}>공사중</CenterBtn>
        </div>

        <CenterContent>
          <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
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
        <PeopleLight count={people}>🟢</PeopleLight>
        <PeopleCount chat={chatOn}>{`접속자 수 : ` + people}</PeopleCount>

        <ChatDiv chat={chatOn}>
          {chatList.length === 0 ? console.log('loading') : chatList.map((v, i) => {
            return <Chats key={i} ref={chatScrollRef}>
              <div style={{ wordBreak: 'break-all' }}>{v.msgnum} - {v.username} : {v.message}</div>
            </Chats>
          })}
        </ChatDiv>

        {hasNick ?
          <ChatStart
            ref={chatref}
            onKeyDown={(e) => ChatSend(e)}
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

const MpthreePlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
  margin: 16px 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #666;

  :hover {
    cursor: pointer;
  }

  @media screen and (width < 501px) {
    margin: 60px 80px;
  }
`

const MpthreeStop = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
  margin: 16px 64px;
  width: 40px;
  height: 40px;
  border-radius: 20%;
  background-color: #666;

  :hover {
    cursor: pointer;
  }

  @media screen and (width < 501px) {
    margin: 60px 124px;
  }
`

const MainCanvas = styled.canvas`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  /* z-index: 1; */
  /* background-color: #282c34; */
`

const NickWrap = styled.div`
  height: 60px;
  margin: auto;
`

const ShowNick = styled.div`
  position: sticky;
  border: 1px solid wheat;
  border-radius: 6px;
  width: 200px;
  height: 25px;
  display: inline-block;
  margin: 20px 0 0 8px;
`

const Nickinput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 6px;
  border: 0px;
  outline: none;
  text-align: center;
  margin: 16px 0 0 8px;
`

const CantMono = styled.div`
  line-height: 20px;

  @media screen and (width < 501px) {
    width: 120px;
    margin: 0 10px 0 auto;
  }
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

  @media screen and (width > 1000px) {
    display: none;
  }
  @media screen and (width < 501px) {
    font-size: 30px;
  }
`

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(130, 130, 130, 0.6);
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
  background-color: rgba(80, 80, 80, 0.6);
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

const PeopleLight = styled.div`
  position: absolute;
  top: 40px;
  right: 340px;

  :hover {
    cursor: default;
  }

  @media screen and (width < 1000px) {
    top: 80px;
    right: 160px;
  }

  visibility: ${(props) => props.count > 0 ? 'visibility' : 'hidden'};
`

const PeopleCount = styled.div`
  position: absolute;
  top: 40px;
  right: 240px;
  font-style: italic;

  :hover {
    cursor: default;
  }

  @media screen and (width < 1000px) {
    top: 80px;
    right: 60px;
    visibility: ${(props) => props.chat ? 'block' : 'hidden'};
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
  @media screen and (width < 501px) {
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