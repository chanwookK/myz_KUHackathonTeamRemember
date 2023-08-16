import {useState,useEffect} from 'react'
import {BLUE , YELLOW,Wrapper,baseUrl} from '../../styles/common.js'
import Nav from '../Nav.js'
import Status from './Status.js'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'



function Group() {

  const [groupData, setGroupData] = useState([]);
  const [isModalOpen , setIsModalOpen] = useState();
  const [friendEmail, setfriendEmail] = useState('');

  const [fetchingData , setfetchingData] = useState();

  useEffect(()=>{
    fetchData();
  },[fetchingData])

  const fetchData = async () =>{
    try {
      const response = await axios.get(baseUrl+'/api/GroupPageData?id=6'); // API 엔드포인트 설정
      setGroupData(response.data); // 데이터를 상태에 설정
      console.log(response.data);
    } catch (error) {
      console.error('마이페이지 데이터 패치 에러', error);
    }
  }

  const handleModal = (e) => {
    let ok = e.target.getAttribute('name') === "open";
    setIsModalOpen(ok);
  }

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleAddFriend = () => {
    fetchAddfriend(friendEmail);
    //console.log(friendEmail);
    setfriendEmail('');
    setIsModalOpen(false);
  }

  //?email=${friendEmail}?id=6
  const fetchAddfriend = async (friendEmail) => {
      axios.post(baseUrl+`/api/GroupPageAddFriend`, 
        {
          "setting" : friendEmail,
          "id" : 6,
        },
        {
          headers :{
            "Contents-type" : "application/json"
          }
        }
       
      )
        .then(res => setfetchingData(true))
        .catch(err => console.log(err))
  }

  const handleEmail = (e) => {
    setfriendEmail(e.target.value);
  }

  return (
    <>
      <Wrapper>
        <Title>그룹</Title>
        <Box>
          <BtnPlus name="open" onClick={handleModal}>친구 추가</BtnPlus>
          <FontAwesomeIcon icon={faUserPlus} size="lg" style={{color: "#000000",}} />
        </Box>
        {isModalOpen&&(
          <ModalBack onClick={handleModal}>
            <AddBox onClick={handleModalContentClick}>
              <AddBox2>
                <p>추가할 친구의 이메일<br/> 주소를 입력해주세요.</p>
                <input value={friendEmail} onChange={handleEmail}/>
                <Btn1 onClick={handleModal}>취소</Btn1>
                <Btn onClick={handleAddFriend}>확인</Btn>
              </AddBox2>
            </AddBox>
          </ModalBack>
        )}
        <GroupBox>
          {
             groupData.map((element,i)=>(
                 <Status key={i} personalData={element}/> //props로 nickname , OnOff 넘기기
               )
             )
          }
          {
            /**
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
            <Status groupData={groupData}/>
             * 
             */
          }


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
  border : 2px solid ${BLUE};
  border-radius : 10px;
  display : flex;
  align-items : center;
  justify-content : center;

  cursor: pointer;
`;

const BtnPlus = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-right : 10px;

  cursor : pointer;
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

const ModalBack = styled.div`
  position :absolute;
  top : 0;
  left : 0;
  width : 400px;
  height: 100%;
  background-color : rgba(0,0,0,.5);
  z-index : 5;
`;

const AddBox = styled.div`
  width: 275px;
  height: 150px;

  border-radius: 10px;
  border-top: 5px solid ${BLUE};
  border-right: 5px solid ${BLUE};
  border-left: 5px solid ${BLUE};
  background-color : #fff;

  position : absolute;
  top : 290px;
  left : 60px;
  z-index : 6;
`;

const AddBox2 = styled.div`
  display :flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;

  position : relative;

  & > p {
    text-align : center;
    padding: 18px;

    color: #000;
    font-size: 15px;
    font-weight: 700;
    line-height: 129.336%; /* 19.4px */
    letter-spacing: 1.5px;
  }

  & > input {
    outline :none;
    width: 247.216px;
    height: 28.068px;
    border-radius: 10px;
    border: 2px solid #FEDF34;
    background: #FFF;
    padding: 3px;
  }

  /* & > button {
    width: 142.5px;
    height: 41.563px;

    position : absolute;
    bottom : -20px;

    border-radius: 0px 0px 10px 0px;
    border: 2px solid #FFF;
    background: #3970FF;
  } */
`;

const Btn =  styled.button`
    width: 134px;
    height: 41.563px;

    position : absolute;
    bottom : -55px;
    right: 0;

    color : #fff;
    font-size: 15px;
    border-radius: 0px 0px 10px 0px;
    border: 2px solid #FFF;
    background: #3970FF;
`;

const Btn1 = styled(Btn)`
  
  border-radius: 0px 0px 0px 10px;

  left : 0;
`;