import {useState} from 'react'
import {BLUE , YELLOW,Wrapper, baseUrl} from '../../styles/common.js'
import Nav from '../Nav.js'

import styled from 'styled-components';

import axios from 'axios';

function Setting() {

  const [nickName , setNickName] = useState('');
  const [introduce , setIntroduce] = useState('');

  const handleNicknameChange = event => {
    setNickName(event.target.value);
  };

  const handleNickNameSubmit = async e =>{
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl+`/api/nickname-setting`,
      {
        "setting" : nickName,
        "id" : 6,
      },
      {
        withCredentials : true,
        headers : {
          "Content-Type" : "application/json"
        }
      });
      setNickName('');
      //console.log('Nickname change successful:', response.data);
    } catch (error) {
      console.error('Error changing nickname:', error);
    }
  }

  const handleIntroChange = event => {
    setIntroduce(event.target.value);
  };

  const handleIntroSubmit = async e =>{
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl+`/api/introduction-setting`,
      {
        "setting" : introduce,
        "id" : 6,
      },
      { 
        withCredentials : true,
        headers : {
          "Content-Type" : "application/json"
        }
      }
      );
      setIntroduce('');
      //console.log('소개 SUCCESS', response.ok);
    } catch (error) {
      console.error('소개 ERROR', error);
    }
  }

  return (
    <>
    <Wrapper>
      <Title>설정</Title>
      <Title2>내 정보 수정</Title2>
      <Box1>
        <div>닉네임 변경</div>

          <Input1 type='text' value={nickName} onChange={handleNicknameChange}></Input1>
          <BtnBlue onClick={handleNickNameSubmit}>변경</BtnBlue>

      </Box1>
      <Box2>
        <div>한줄소개 변경</div>
  
          <Input2 type='text' value={introduce} onChange={handleIntroChange}></Input2>
          <BtnBlue onClick={handleIntroSubmit}>변경</BtnBlue>

      </Box2>
      <Footer>
          <span>로그아웃&nbsp;&nbsp;&nbsp;|</span><span>&nbsp;&nbsp;회원탈퇴</span>
      </Footer>
      <Nav/>
    </Wrapper>
    </>
  )
}

export default Setting

const Title = styled.h1`
margin-top:25px;
font-size: 36px;
font-weight: 700;
`;

const Title2 = styled(Title)`
  font-size: 24px;
  font-weight: 600;
`;

const Box1 = styled.div`
  height : 160px;
  //background-color : #F4F7FF;
  border-radius : 5px;
  margin-top : 10px;

  display :flex;
  flex-direction : column;

  & > div {
    padding:3px;
    font-size :15px;
    font-weight :600;
    width : 100px;
    text-align:center;
    //border-bottom : 2px solid ${BLUE};
    border: 3px solid ${BLUE};
    border-radius: 10px;
  }
`;

const Box2 = styled(Box1)`
  margin-top : 20px;
  height: 185px;
`;

const Input1 = styled.input`
  width: 342px;
  height: 49px;

  border-radius: 10px;
  border: 5px solid #3970FF;
  background: #FFF;

  margin-top : 20px;

  outline : none;
`;

const Input2 = styled.textarea`
  height: 103px;
  width: 342px;

  border-radius: 10px;
  border: 5px solid #3970FF;
  background: #FFF;

  margin-top : 20px;
  resize: none;
  outline : none;

  font-family : Pretendard;
`;

const BtnBlue = styled.button`
  width : 81px; 
  height : 38px;
  display: inline-flex;
  padding: 7px 23px;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: ${BLUE};

  color: #FFF;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;

  margin-top : 15px;
  margin-left: auto;
`;

const Footer = styled.div`
    position : absolute;
    bottom : 120px;
    left: 51%;
    transform: translate(-50%, -50%);

    & > span {
      cursor :pointer;
      color: #928F8F;
      font-size: 14px;
      font-weight: 600;
      line-height: normal;
    }
`;