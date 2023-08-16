import React from 'react'
import { styled } from 'styled-components'
import {BLUE , YELLOW,baseUrl,zmzmee_status} from '../../styles/common.js'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

function Status({personalData}) {

  const navigate = useNavigate();
  
  const visitFriend = async () => {
    console.log(personalData.id);
    await axios.get(baseUrl+`/api/GroupPageToFriendPageData?email=${personalData.id}`,
    {
      withCredentials : true,
    }
    ).then(res => {
      console.log(res.data.id);
      navigate(`/friend/${res.data.id}`)
    })
    .catch(err => console.log(err))
  }


  return (
    <Container onClick={visitFriend} onOff={personalData.currentlyExercise}>
      <CharBox onOff={personalData.currentlyExercise}></CharBox>
      <Info>
        <div>
          {personalData.nickName}
        </div>
        <div className='onOff'>
          {personalData.currentlyExercise ? "운동 중!" : "쉬는 중..."}
        </div>
      </Info>
    </Container>
  )
}

export default Status

const Container = styled.div`
  flex-basis: calc(25% - 10px);
  height : 128px;
  margin : 4px;
  border-radius : 10px;
  //background-color : ${BLUE};
  border : 1px solid ${ ({onOff}) => onOff? BLUE : "#eee" };

  
  &:hover { 
    background-color : ${YELLOW};
    .onOff {
      color : ${BLUE};
    }
  }

`;

const CharBox = styled.div`
  height : 70%;
  display : flex;
  justify-content : center;
  align-items : center;
  //${ ({onOff}) => onOff? BLUE : "#eee" };
  background-image : ${({ onOff }) => onOff ? `url(${zmzmee_status[1]})`:`url(${zmzmee_status[0]})`};
  background-size : cover;
  background-position : center;
  //border : 1px solid white;
`;

const Info = styled.div`
  & > div {
    font-size: 12px;
    font-weight : 500;
    text-align : center;
  }

  .onOff {
    color : ${YELLOW}
  }
`;
