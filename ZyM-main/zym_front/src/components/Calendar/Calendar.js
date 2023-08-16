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
              else{
                  return (<Days>{e}</Days>)
              }
              }
              )}
          </Box>
        </DayBox>

        
      </CalendarBox>
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
  margin-top : 54px;

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

  ${props => props.today &&
    `
      background-color : ${YELLOW};
      color : ${BLUE};
    `
  }
`;