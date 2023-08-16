import {useState , useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { baseUrl } from '../../styles/common';

function Timer({isRunning , second , setSecond}) {

  //const [second, setSecond] = useState(0);
  const [time , setTime] = useState({
    h : 0,
    m : 0,
    s : 0,
  })

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      //axios.get(baseUrl+'api/startBtn');
      intervalId = setInterval(() => {
        setSecond((second) => second + 1);
      }, 1000);
    }
    else {
      setTime({h,m,s});
      //pauseApi();
      //console.log({h,m,s});
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const h = Math.floor(second / 3600);
  const m = Math.floor((second % 3600) / 60);
  const s = second % 60;

  const pauseApi = async () => {
    let hh,mm,ss;
    h < 10 ? hh = '0' + h : hh = h;
    m < 10 ? mm = '0' + m : mm = m;
    s < 10 ? ss = '0' + s : ss = s;
    console.log(`/api/pauseBtn?time=${hh}:${mm}:${ss}`);
    const response = await axios.post(baseUrl+`/api/pauseBtn?time=${hh}:${mm}:${ss}`)
      .then(res => (console.log(res)))
      .catch(err => console.log(err));
  }

  return (
    <TimeWrapper>
      <span>{h < 10 ? '0' + h : h}:</span>
      <span>{m < 10 ? '0' + m : m}:</span>
      <span>{s < 10 ? '0' + s : s}</span>
    </TimeWrapper>
  );
}

export default Timer;

const TimeWrapper = styled.div`

& > span {
  color: #000;
  font-size: 64px;
  font-weight: 600;
}

`;
