import {useState,useEffect} from 'react'
import {BLUE , YELLOW,Wrapper} from '../../styles/common.js'
import Nav from '../Nav.js'
import { styled } from 'styled-components'
import axios from 'axios';
import { baseUrl } from '../../styles/common.js';

import Timer from './Timer.js'

function Home() {

  const [second, setSecond] = useState(0);
  const [isRunning , setIsRunning] = useState(false);

  const [homeData , setHomeData] = useState({
    continuousNumOfExerciseDays:0,
    level : 0,
    todayExerciseTime: null,
    currentlyExercise: isRunning
  })

  useEffect(()=>{
    axios.get(baseUrl+'/api/HomePageData',   
    { 
      headers : {
      'Content-Type' : 'application/json',
      'ngrok-skip-browser-warning': '69420',
      }
    }
    ).then(res => {
      console.log(res.data);
      //setter data
      //setHomeData
    }).catch(err => console.log(err,'홈데이터 에러'));
  }
  ,[])


  const handleTimer = (e) => {

    if(e.target.name === 'start'){
      setIsRunning(true)
    }
    else {
      setIsRunning(false);
      //setTimeout(()=>{pauseApi()}, 1000);
      //console.log(time);
    }
  }

  // /api/pauseBtn?time=00:00:00
  // const pauseApi = async () => {
  //   let hh,mm,ss;
  //   time.h < 10 ? hh = '0' + time.h : hh = time.h;
  //   time.m < 10 ? mm = '0' + time.m : mm = time.m;
  //   time.s < 10 ? ss = '0' + time.s : ss = time.s;
  //   console.log(`/api/pauseBtn?time=${hh}:${mm}:${ss}`);
  //   const response = await axios.post(`/api/pauseBtn?time=${hh}:${mm}:${ss}`)
  //     .then(res => (console.log(res)))
  //     .catch(err => console.log(err));
  // }

  
  return (
    <>
      <Wrapper>
        <Box1>
          <Item>{homeData.continuousNumOfExerciseDays}일째 운동 중</Item>
          <Item2>Lv. {homeData.level}</Item2>
        </Box1>
        <Box2></Box2>
        <Box3>  
          <TimeBox>
            <Timer 
            isRunning={isRunning}
             second={second} 
             setSecond={setSecond}
             />
          </TimeBox>
          <BtnGroup>
            <Btn2 onClick={handleTimer} name='stop'>멈춰!</Btn2>
            운동
            <Btn onClick={handleTimer} name='start'>시작!</Btn>
          </BtnGroup>

        </Box3>
        <Nav/>
      </Wrapper>
    </>

  )
}

export default Home

const Box1 = styled.div`
  width : 100%;
  height : 65px;
  background-color : #eee;
  margin-top : 25px;

  display: flex;
  align-items : center;
  justify-content : space-around;
`;

const Box2 = styled.div`
  width : 100%;
  height : 331px;
  border : 3px solid ${BLUE};
  margin-top : 25px;
  border-radius : 10px;

  background-color : #eee;
`;

const Box3 = styled.div`
  width : 100%;
  height : 164px;
  border : 2px solid ${BLUE};
  margin-top : 25px;
  border-radius : 10px;

  background-color : #eee;
  

  display :flex;
  flex-direction : column;
  //align-items : center;
  justify-content : center;
`;

const Item = styled.div`
  width : 160px;
  height : 55px;
  border-radius : 10px;
  background-color : ${BLUE};

  display : flex;
  justify-content : center;
  align-items:center;

  font-size : 18px;
  font-weight : 600;
  color : #fff;
`;

const Item2 = styled(Item)`
  width : 110px;
  background-color : ${YELLOW};
  color : #000;
`;

const TimeBox = styled.div`
  width : 277px;
  height : 76px;
  //border : 1px solid ${BLUE};
  margin : 0 auto;
  display :flex;
  align-items: center;
  justify-content :center;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content :space-around;
  align-items : center;
  font-size : 32px;
  font-weight: 600;
`;

const Btn = styled.button`
  width : 55px;
  height :55px;
  border-radius : 50%;
  border : 4px solid ${BLUE};
  font-size : 16px;
  font-weight : 600;
`;

const Btn2 = styled(Btn)`
  border : 4px solid ${YELLOW};
`;