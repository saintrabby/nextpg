import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import MainPage from './MainPage';

export default function Home() {

  const router = useRouter()

  const [btn1, setBtn1] = useState(false)
  const [btn2, setBtn2] = useState(false)
  const [btn3, setBtn3] = useState(false)

  // console.log(('td'.match(/[td]/g)))

  const Btn1Click = () => {
    return <div>
      <Xbtn onClick={() => setBtn1(false)}>❌</Xbtn>
      <div>안녕하세요</div>
      <div style={{ marginTop: '60px' }}>신입 프론트엔드 개발자 지망생입니다</div>
      <div style={{ marginTop: '60px' }}>React로 만든 페이지 입니다</div>
      <div style={{ marginTop: '60px' }}>UX에 신경을 쓰는 편이고, 항상 최선을 다합니다</div>
      <div style={{ marginTop: '60px' }}>이쁘게 봐주세요...^^</div>
    </div>
  }

  const Btn2Click = () => {
    return <div>
      <Xbtn onClick={() => setBtn2(false)}>❌</Xbtn>
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

  useEffect(() => {
    console.log('effect')

    onkeydown = (e) => {
      if (e.key === 'Escape') {
        setBtn1(false)
        setBtn2(false)
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
    <MainWrap>
      {/* <MainPage /> */}
      <Center>
        {/* <button onClick={() => router.push('/MainPage')}>H</button> */}
        <CircleDiv>
          <CenterCircle1 onClick={() => setBtn1(!btn1)} btnstate={btn1}>🙋‍♂️</CenterCircle1>
          <CenterCircle2 onClick={() => setBtn2(!btn2)} btnstate={btn2}>💬</CenterCircle2>
          <CenterCircle3 onClick={() => setBtn3(!btn3)}>🚫</CenterCircle3>
          <CenterCircle4 onClick={() => router.push('/MainPage')}>🆓</CenterCircle4>
        </CircleDiv>

        {btn1 ?
          <DescModal>
            {(Btn1Click())}
          </DescModal>
          : ''}

        {btn2 ?
          <DescModal>
            {(Btn2Click())}
          </DescModal>
          : ''}

        <DescDiv>
          <Desc btnstate={btn3}>기능이 없습니다^^</Desc>
        </DescDiv>
      </Center>
    </MainWrap>
  )
}

const MainWrap = styled.div`
  text-align: center;
  background-color: #282c34;
  height: 100%;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  overflow-y: hidden;
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

const CenterCircle1 = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: #888;
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

const CenterCircle2 = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: #888;
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

const CenterCircle3 = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: #888;
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

const CenterCircle4 = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 100px;
  /* border: 5px solid pink; */
  background-color: #888;
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

const DescModal = styled.div`
  z-index: 10;
  position: absolute;
  width: 90%;
  height: 90%;
  border: 1px solid burlywood;
  border-radius: 30px;
  background-color: rgba(20, 20, 20, 0.8);
  text-align: left;
  font-size: 40px;
  padding: 16px;

  animation:bounce-in-top 0.4s both;

  @media screen and (width < 1000px) {
    font-size: 30px;
  }
  @media screen and (width < 501px) {
    font-size: 20px;
  }
`

const Xbtn = styled.div`
  text-align: right;

  :hover {
    cursor: pointer;
  }
`