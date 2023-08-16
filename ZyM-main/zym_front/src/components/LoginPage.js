import React from 'react'

import styled from 'styled-components';
import { Wrapper ,BLUE, baseUrl } from '../styles/common'

import google from '../images/googleIcon.png'
import facebook from '../images/facebookIcon.png'
import kakao from '../images/kakaoIcon.png'
import email from '../images/emailIcon.svg'
import logo from "../images/zym_logo.png";

import axios from 'axios';

function LoginPage() {


  const googleLogin = () => {
    window.open(baseUrl+"/oauth2/authorization/google","_self")
  }

  const emailLogin = async () => {
    const formdata = new FormData();
    formdata.append('username', 'kan0202@naver.com')
    formdata.append('password', '1234')

    const res = await axios.post(baseUrl+"/login", formdata)
    console.log(res);
  }

  return (
    <Wrapper2>
      <Container>
        <LogoBox/>
      </Container>
      <GoogleBtn onClick={googleLogin}>
        <div>
          google
        </div>
        <span>
          Google로 시작하기
        </span>
      </GoogleBtn>
      <KakaoBtn>
        <div>
          kakao
        </div>
        <span>
          카카오톡으로 시작하기
        </span>
      </KakaoBtn>
      <FacebookBtn>
        <div>
          facebook
        </div>
        <span>
          페이스북으로 시작하기
        </span>
      </FacebookBtn>
      <EmailBtn onClick={emailLogin}>
        <div>
          email
        </div>
        <span>
          이메일로 시작하기
        </span>
      </EmailBtn>


    </Wrapper2>
  )
}

export default LoginPage

const Wrapper2 = styled(Wrapper)`
  background-color : #3933ff; 
`;

const Container = styled.div`
  height : 55%;
  width : 100%;
  display : inline-flex;
  justify-content: center;
  align-items : center;
  //background-color : #3933ff; 
`;

const LogoBox = styled.div`
  height : 200px;
  width : 200px;
  background-image : url(${logo});
  background-size : contain;
`;

const LoginBtn = styled.div`
  width: 338px;
  height: 58px;
  border-radius: 10px;
  background-color: #E2ECEE;
  
  cursor : pointer;

  display : flex;
  align-items : center;
  justify-content : center;
  margin-bottom : 20px;
  position : relative;

  & > div{
    width : 40px;
    height : 40px;
    background-size : contain;
    background-repeat: no-repeat;
    margin-right: 20px;
    text-indent : -9999px;

    position : absolute;
    left : 20px;
  }
  
  & > span {
    color: #000;
    font-size: 15px;
    font-weight: 500;
  }
`;

const GoogleBtn = styled(LoginBtn)`
  & > div {
    background-image : url(${google});
  }
`;

const KakaoBtn = styled(LoginBtn)`
  background-color: #FFE812;
  & > div {
    background-image : url(${kakao});

  }
`;

const FacebookBtn = styled(LoginBtn)`
  background-color: #1B80E4;
  & > div {
    width : 40px;
    height : 40px;
    background-color : #fff;
    border-radius : 50%;
    background-image : url(${facebook});
    background-size : contain;
    background-position-y: 6px ;

  }
`;

const EmailBtn = styled(LoginBtn)`
  background-color: #FFF;
  border : 1px solid ${BLUE};

  & > div {
    background-image : url(${email});
    top :13px;
  }
`;