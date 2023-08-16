import {useState,useEffect} from 'react'
import {BLUE , YELLOW,Wrapper,baseUrl} from '../../styles/common.js'
import Nav from '../Nav.js'
import Status from './Status.js'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'



function Group() {

  const [groupData, setGroupData] = useState();

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () =>{
    try {
      const response = await axios.get(baseUrl+'/api/GroupPageData'); // API 엔드포인트 설정
      setGroupData(response.data); // 데이터를 상태에 설정
      console.log(groupData);
    } catch (error) {
      console.error('마이페이지 데이터 패치 에러', error);
    }
  }

  const addFriend = () => {
    
  }

  return (
    <>
      <Wrapper>
        <Title>그룹</Title>
        <Box>
          <BtnPlus>친구 추가</BtnPlus>
          <FontAwesomeIcon icon={faUserPlus} size="lg" style={{color: "#000000",}} />
        </Box>
        <GroupBox>
          {
            // groupData.map((e,i)=>(
            //     <Status/> //props로 nickname , OnOff 넘기기
            //   )
            // )
          }
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>
          <Status/>

        </GroupBox>
        <Nav/>
      </Wrapper>
    </>

  )
}

export default Group

const Title = styled.h1`
margin-top:25px;
font-size: 36px;
font-weight: 700;
`;

const Box = styled.div`
  position :  absolute;
  right : 20px;
  top : 165px;
  width : 128px;
  height : 44px;
  border : 2px solid ${YELLOW};
  border-radius : 10px;
  display : flex;
  align-items : center;
  justify-content : center;

  cursor: pointer;
`;

const BtnPlus = styled.div`
  font-size: 17px;
  font-weight: 700;
  margin-right : 10px;
`;

const GroupBox = styled.div`
  width : 100%;
  margin-top: 100px;
  //background-color : #eee;

  display : flex;
  justify-content : center;
  flex-wrap : wrap;
  overflow-x : auto;
`;

