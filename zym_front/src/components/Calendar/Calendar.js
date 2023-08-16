import React from 'react'
import styled from 'styled-components';
import {Wrapper , YELLOW , BLUE} from '../../styles/common'
import Nav from '../Nav'

const DAYS = ['일','월','화','수','목','금','토']
const DDAYS = [30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];


function Calendar() {

  const date = new Date();
  

  return (
    <Wrapper>
      <Title>달력</Title>
      <CalendarBox>
        <Month>{date.getFullYear()}년{date.getMonth()+1}월</Month>
        <DayBox>
          <Box>
            {DAYS.map(e=>(<Days>{e}</Days>))}
          </Box>
          <Box>
            {DDAYS.map((e,i)=>{
              if(e === date.getDate()){
                  return (<Days today={true}>{e}</Days>); 
              }
              else if([1,4,9,13].includes(e)){
                  return (<Days work={true}>{e}</Days>);
              }
              else{
                  return (<Days>{e}</Days>)
              }
              }
              )}
          </Box>
        </DayBox>
      </CalendarBox>
      <Box1>
        <Box2><p>총 운동시간</p><div>2:05:29</div></Box2>
        <Box2><p>오늘 운동시간</p><div>0:30:29</div></Box2>
        <Box2><p>연속</p><div>0일차</div></Box2>
        <Box2><p>운동일수</p><div>5일째</div></Box2>
      </Box1>
      <Nav/>
    </Wrapper>
  )
}

export default Calendar

const Title = styled.h1`
margin-top:25px;
font-size: 36px;
font-weight: 700;
`;


const CalendarBox = styled.div`
  width: 346px;
  height: 412px;
  margin-top : 40px;

  border-radius: 10px;
  background: var(--d-9-d-9-d-9, #3970FF);
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Month = styled.div`
  color: #FFF;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;

  padding-top : 13px;
  margin-left :25px;
`;

const DayBox = styled.div`
  margin-top : 10px;
`;

const Box = styled.div`
  width : 346px;
  display : flex;
  //justify-content : center;
  flex-wrap : wrap;
`;

const Days = styled.div`
  display : inline-flex;
  justify-content :center;
  //align-items : center;
  padding : 5px;
  width : 49px;
  height : 63px;

  color: #FFF;
  font-size: 13px;
  font-weight: 700;
  line-height: normal;

  border-radius: 10px;
  background-color : transparent;

  position : relative;

  ${props => props.today &&
    `
      background-color : ${YELLOW};
      color : ${BLUE};
    `
  }

${props => props.work &&
    `
      color: ${YELLOW};
      &::before {
        content : "";
        display : block;
        width : 13px;
        height : 13px;
        border-radius : 50%;
        background-color : ${YELLOW};

        position : absolute;
        top : 25px;
      }
    `
  }
`;

const Box1 = styled.div`
  display : flex;
  flex-wrap : wrap;
  width : 330px;
  margin : 0 auto;

  margin-top: 14px;
`;

const Box2 = styled.div`
  width : 165px;
  height : 76px;

  & > p {
    font-size: 13px;
    font-weight : 700;
  }

  & > div{
    font-size: 20px;
    font-weight : 700;
  }
`;