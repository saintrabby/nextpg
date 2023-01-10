import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// import MainPage from './MainPage';

export default function Home() {

  const router = useRouter()

  const [myInfo, setMyInfo] = useState(false)
  const [linkInfo, setLinkInfo] = useState(false)
  const [btn3, setBtn3] = useState(false)

  const Darkmode = { bgc: '#282c34', c1: '#888', c2: 'rgba(20, 20, 20, 0.8)', fc: '#eee' }
  const Normode = { bgc: '#eee', c1: '#444', c2: 'rgba(220, 220, 220, 0.8)', fc: '#282c34' }

  const [currMode, setCurrMode] = useState(Darkmode)

  const ver = '- v0.5 -'

  const myInfoClick = () => {
    return <div>
      <Xbtn onClick={() => setMyInfo(false)}>❌</Xbtn>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <div>안녕하세요 !</div>
        <div>신입 프론트엔드 개발자 지망생입니다</div>
        <div>React + NextJS로 만든 페이지 입니다</div>
        <div>UX에 신경을 쓰는 편이고, 항상 최선을 다합니다</div>
        <div>이쁘게 봐주세요...^^💦</div>
      </div>
    </div>
  }

  const linkInfoClick = () => {
    return <div>
      <Xbtn onClick={() => setLinkInfo(false)}>❌</Xbtn>
      <div>💮마지막 프로젝트 깃허브💮</div>
      <a href='https://github.com/Final-A68-Seesaw/FE_SEESO'>
        https://github.com/Final-A68-Seesaw/FE_SEESO
      </a>
      <div style={{ marginTop: '60px' }}>💭마지막 프로젝트 기능 - 노션정리💭</div>
      <a href='https://innate-cosmonaut-e53.notion.site/Seeso-8998da48c8234410a37192de0d948f26'>
        https://innate-cosmonaut-e53.notion.site/Seeso-8998da48c8234410a37192de0d948f26
      </a>
      <div style={{ marginTop: '60px' }}>🔅개인 스터디 중🔅</div>
      <a href='https://fbch-c69b8.firebaseapp.com/'>
        https://fbch-c69b8.firebaseapp.com/
      </a>
    </div>
  }

  const ChangeMode = () => {
    if (localStorage.getItem('Theme') === 'Dark') {
      setCurrMode(Normode)
      localStorage.setItem('Theme', 'Normal')
    }
    else {
      setCurrMode(Darkmode)
      localStorage.setItem('Theme', 'Dark')
    }
  }



  useEffect(() => {
    console.log(ver)

    if (localStorage.getItem('Theme') === null) {
      localStorage.setItem('Theme', 'Dark')
    }

    onkeydown = (e) => {
      if (e.key === 'Escape') {
        setMyInfo(false)
        setLinkInfo(false)
      }
    }
  }, [])

  useEffect(() => {
    if (btn3) {
      setTimeout(() => {
        setBtn3(false)
      }, 2000);
    }
  }, [btn3])

  return (
    <MainWrap mode={currMode}>
      {/* <MainPage /> */}
      <ModeBtn onClick={() => ChangeMode()}>✴</ModeBtn>
      <Center>
        {/* <button onClick={() => router.push('/MainPage')}>H</button> */}
        <CircleDiv>
          <InfoCircle mode={currMode} onClick={() => setMyInfo(!myInfo)} btnstate={myInfo}>🙋‍♂️</InfoCircle>
          <LinkCircle mode={currMode} onClick={() => setLinkInfo(!linkInfo)} btnstate={linkInfo}>💬</LinkCircle>
          <Circle3 mode={currMode} onClick={() => setBtn3(!btn3)}>🚫</Circle3>
          <MainLink mode={currMode} onClick={() => router.push('/MainPage')}>🆓</MainLink>
        </CircleDiv>

        {myInfo ?
          <ModalWrap>
            <div onClick={() => setMyInfo(!myInfo)} style={{ width: '100%', height: '100%' }}></div>
            <DescModal mode={currMode}>
              {(myInfoClick())}
            </DescModal>
          </ModalWrap>
          : ''}

        {linkInfo ?
          <ModalWrap>
            <div onClick={() => setLinkInfo(!linkInfo)} style={{ width: '100%', height: '100%' }}></div>
            <DescModal mode={currMode}>
              {(linkInfoClick())}
            </DescModal>
          </ModalWrap>
          : ''}

        <DescDiv>
          <Desc btnstate={btn3}>아직 기능이 없습니다^^</Desc>
        </DescDiv>
      </Center>
    </MainWrap>
  )
}

const MainWrap = styled.div`
  text-align: center;
  background-color: ${(props) => props.mode.bgc};
  height: 100%;
  min-height: 100vh;
  color: ${(props) => props.mode.fc};
  overflow-x: hidden;
  overflow-y: hidden;
`

const ModeBtn = styled.div`
  position: fixed;
  top: 16px;
  right: 24px;
  font-size: 40px;
  z-index: 3;

  :hover {
    cursor: pointer;
  }
`

const Center = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

  @keyframes bounce-in-top{0%{transform:translateY(-500px);animation-timing-function:ease-in;opacity:0}38%{transform:translateY(0);animation-timing-function:ease-out;opacity:1}55%{transform:translateY(-65px);animation-timing-function:ease-in}72%{transform:translateY(0);animation-timing-function:ease-out}81%{transform:translateY(-28px);animation-timing-function:ease-in}90%{transform:translateY(0);animation-timing-function:ease-out}95%{transform:translateY(-8px);animation-timing-function:ease-in}100%{transform:translateY(0);animation-timing-function:ease-out}}
`

const CircleDiv = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 220px;
  height: 220px;
  justify-content: center;
  align-content: center;

  @keyframes shadow-drop_1{0%{box-shadow:0 0 0 transparent}100%{box-shadow:8px 8px 16px rgba(200,200,200,0.8)}}
  @keyframes shadow-drop_2{0%{box-shadow:0 0 0 transparent}100%{box-shadow:-8px 8px 16px rgba(200,200,200,0.8)}}
  @keyframes shadow-drop_3{0%{box-shadow:0 0 0 transparent}100%{box-shadow:8px -8px 16px rgba(200,200,200,0.8)}}
  @keyframes shadow-drop_4{0%{box-shadow:0 0 0 transparent}100%{box-shadow:-8px -8px 16px rgba(200,200,200,0.8)}}
`

const InfoCircle = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: ${(props) => props.mode.c1};
  border-top-left-radius: 20%;
  transition: all ease .3s;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.btnstate ? `
    margin-top: -10px;
    margin-left: -10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20%;

    animation:shadow-drop_1 .2s both;
  ` : ''}

  :hover {
    cursor: pointer;
    margin-top: -10px;
    margin-left: -10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20%;

    animation:shadow-drop_1 .2s both;
  }
`

const LinkCircle = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: ${(props) => props.mode.c1};
  border-top-right-radius: 20%;
  transition: all ease .3s;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.btnstate ? `
    margin-top: -10px;
    margin-left: 10px;
    margin-right: -10px;
    margin-bottom: 10px;
    border-radius: 20%;

    animation:shadow-drop_2 .2s both;
  ` : ''}

  :hover {
    cursor: pointer;
    margin-top: -10px;
    margin-left: 10px;
    margin-right: -10px;
    margin-bottom: 10px;
    border-radius: 20%;

    animation:shadow-drop_2 .2s both;
  }
`

const Circle3 = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: ${(props) => props.mode.c1};
  border-bottom-left-radius: 20%;
  transition: all ease .3s;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    margin-top: 10px;
    margin-left: -10px;
    margin-right: 10px;
    margin-bottom: -10px;
    border-radius: 20%;

    animation:shadow-drop_3 .2s both
  }
`

const MainLink = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: ${(props) => props.mode.c1};
  border-bottom-right-radius: 20%;
  transition: all ease .3s;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: -10px;
    margin-bottom: -10px;
    border-radius: 20%;

    animation:shadow-drop_4 .2s both
  }
`

const DescDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 32px auto;
  width: 100%;
  height: 100%;
`

const Desc = styled.div`
  transition: all ease .3s;
  font-size: 40px;
  margin-top: ${(props) => props.btnstate ? `60px` : `-200px`};
`

const ModalWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 5;
`

const DescModal = styled.div`
  z-index: 10;
  position: absolute;
  width: 90%;
  height: 90%;
  border: 1px solid burlywood;
  border-radius: 30px;
  background-color: ${props => props.mode.c2};
  text-align: left;
  font-size: 40px;
  padding: 16px;

  animation:bounce-in-top 0.4s both;

  @media screen and (width < 1000px) {
    font-size: 30px;
  }
  @media screen and (width < 501px) {
    font-size: 15px;
  }
`

const Xbtn = styled.div`
  text-align: right;

  :hover {
    cursor: pointer;
  }
`