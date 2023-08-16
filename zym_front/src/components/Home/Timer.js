import {useState , useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { baseUrl } from '../../styles/common';

function Timer({isRunning , second , setSecond,id,todayExerciseTime}) {

  //const [second, setSecond] = useState(0);
  // const [time , setTime] = useState({
  //   h : 0,
  //   m : 0,
  //   s : 0,
  // })
 


  useEffect(() => {
    let intervalId;
    if (isRunning) {
      axios.get(baseUrl+'/api/startBtn?id=6',{
         withCredentials : true,      
      });
      intervalId = setInterval(() => {
        setSecond((second) => {
          
          return second + 1
        });
      }, 1000);
    }
    else {
      //setTime({h,m,s});
      pauseApi();
      //console.log({h,m,s});
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

   let h = Math.floor(second / 3600);
   let m = Math.floor((second % 3600) / 60);
   let s = second % 60;

  const pauseApi = async () => {
    let hh,mm,ss;
    h < 10 ? hh = '0' + h : hh = h;
    m < 10 ? mm = '0' + m : mm = m;
    s < 10 ? ss = '0' + s : ss = s;
    console.log(`${hh}:${mm}:${ss}`);
    await axios.post(baseUrl+`/api/pauseBtn`,
    {
      "setting" : `${hh}:${mm}:${ss}`,
      "id" : 6,
    },
    {
      withCredentials : true,
      headers : {
        "Content-Type" : "application/json"
      }
    });

  }

  return (
    <TimeWrapper>
      <span>{h}:</span>
      <span>{m < 10 ? '0' + m : m}:</span>
      <span>{s < 10 ? '0' + s : s}</span>
    </TimeWrapper>
  );
}

export default Timer;

const TimeWrapper = styled.div`

& > span {
  color: #000;
  font-size: 55px;
  font-weight: 600;
}

`;
