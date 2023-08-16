import {useState,useEffect} from 'react'
import {BLUE , YELLOW,Wrapper} from '../../styles/common.js'
import Nav from '../Nav.js'
import { styled } from 'styled-components'
import axios from 'axios';
import { baseUrl ,zmzmee ,uid} from '../../styles/common.js';

import {useParams} from 'react-router-dom'

import Timer from './Timer.js'

//import zmzmee_1 from '../../images/zmzmee.png'

function Home() {

  //uid = useParams();
  //const { id } = useParams();
  const id = 6;
  const [second, setSecond] = useState(0);
  const [isRunning , setIsRunning] = useState(false);

  const [homeData , setHomeData] = useState({
    continuousNumOfExerciseDays:0,
    level : 5,
    todayExerciseTime: "00:00:00",
    currentlyExercise: isRunning
  })

  useEffect(()=>{
    console.log(id);
    axios.get(baseUrl+`/api/HomePageData?id=${id}`,   
    { withCredentials : true,
    }
    ).then(res => {
      console.log(res);
      //setter data
      setHomeData(res.data)
      let [h,m,s] = res.data.todayExerciseTime.split(":").map(Number)
      let sss = h*3600 + m*60 + s;
      setSecond(sss);
    }).catch(err => console.log(err,'홈데이터 에러'));
  }
  ,[])


  const handleTimer = (e) => {
    setIsRunning(!isRunning);
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
        <Box2 level = {homeData.level}>

        </Box2>
        <Box3>  
          <span>오늘의 운동</span>
          <TimeBox>
            <Timer 
             isRunning={isRunning}
             second={second} 
             setSecond={setSecond}
             todayExerciseTime={homeData.todayExerciseTime}
             id={id}
             />
            
             <Btn onClick={handleTimer}>
              {isRunning ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z" stroke={BLUE} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z" stroke={BLUE} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> 
              : 
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z" stroke={BLUE} stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              }
             </Btn>
             
          </TimeBox>
          {/* <BtnGroup>
            <Btn2 onClick={handleTimer} name='stop'>멈춰!</Btn2>
            <Btn onClick={handleTimer} name='start'>시작!</Btn>
          </BtnGroup> */}

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
  //background-color : #eee;
  margin-top : 25px;

  display: flex;
  align-items : center;
  justify-content : space-around;
`;

const Box2 = styled.div`
  width : 344px;
  height : 331px;
  background-image : ${({ level }) => `url(${zmzmee[level]})`};
  background-size : cover;
  background-repeat : no-repeat;
  background-position : center;
  
  //border : 3px solid ${BLUE};
  margin-top : 30px;
  border-radius : 10px;


  //background-color : #eee;
`;

const Box3 = styled.div`
  width : 100%;
  height : 164px;
  //border : 2px solid ${BLUE};
  margin-top : 25px;
  border-radius : 10px;

  //background-color : #eee;
  

  display :flex;
  flex-direction : column;
  //align-items : center;
  justify-content : center;

  & > span {
    font-size : 30px;
    font-weight : 700;
    text-align : center;
  }
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
  font-weight : 700;
`;

const TimeBox = styled.div`
  width : 100%;
  height : 76px;
  //border : 1px solid ${BLUE};
  //margin : 0 auto;
  display :flex;
  align-items: center;
  justify-content :center;

  position : relative;

`;

const BtnGroup = styled.div`
  display: flex;
  justify-content :space-around;
  align-items : center;
  font-size : 32px;
  font-weight: 600;
`;

const Btn = styled.div`
  width : 48px;
  height :48px;
  border-radius : 50%;
  border : 5px solid ${BLUE};
  
  margin-left : 15px;

  display : flex;
  justify-content : center;
  align-items :center;

  position : absolute;
  right : 8px;


`;

// const Btn2 = styled(Btn)`
//   border : 4px solid ${YELLOW};
// `;