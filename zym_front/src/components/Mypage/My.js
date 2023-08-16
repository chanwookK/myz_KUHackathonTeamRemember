import {useState,useEffect} from 'react'
import {BLUE , YELLOW,Wrapper,baseUrl,zmzmee} from '../../styles/common.js'
import Nav from '../Nav.js'

import styled from 'styled-components';
import axios from 'axios';

import {useParams} from 'react-router-dom'


function My() {

  const [myPageData, setmyPageData] = useState(
    {
      nickName:"좌병덕",
      introduction:null,
      level:0,
      weight:0,
      muscleMass:0,
      fatMass:0,
      exerciseRecord:[]
      } 
  );
  const {id} = useParams();

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () =>{
    try {
      const response = await axios.get(baseUrl+`/api/MyPageData?id=6`,    
      { withCredentials : true,
      }); // API 엔드포인트 설정
      setmyPageData(response.data); // 데이터를 상태에 설정
      console.log(response.data);
    } catch (error) {
      console.error('마이페이지 데이터 패치 에러', error);
    }
  }


  return (
    <>
      <Wrapper>
        <Title>마이</Title>
        <Box>
          <Box3>
            <CharBox>
              <Char level={myPageData.level}></Char>
              <div>Lv. {myPageData.level}</div>
            </CharBox>
            <InfoBox>
              <div>{myPageData.nickName}</div>
              <div className='intro'>{myPageData.introduction}</div>
            </InfoBox>
          </Box3>
          <Stat>
            <Th>
              <span>체중</span>
              <span>골격근량</span>
              <span>체지방량</span>
            </Th>
            <div style={{position : "relative"}}>
              <R1>{myPageData.weight}</R1>
              <R2>{myPageData.muscleMass}</R2>
              <R3>{myPageData.fatMass}</R3>
            </div>
          </Stat>
        </Box>
        <Box2>
          <Box4 >
            <Title2>기록</Title2>
            <span>
              <SetTime>세트</SetTime> 
            </span>
          </Box4>

          <Box5>
            {
              myPageData.exerciseRecord.map((e,i)=>(
                i%2 === 0 ?
                (
                <ItemBox>
                  <Item1>{e.exerciseType}</Item1>
                  <Item2>{e.sett}</Item2>
                </ItemBox>
                ):
                (
                <ItemBox>
                  <Item1 odd={true}>{e.exerciseType}</Item1>
                  <Item2 odd={true}>{e.sett}</Item2>
                </ItemBox>
                )
              ))
            }

          </Box5>

        </Box2>
        <Nav/>
      </Wrapper>
    </>
  )
}

export default My

const Title = styled.h1`
margin-top:25px;
font-size: 36px;
font-weight: 700;
`;

const Title2 = styled(Title)`
  margin-top : 5px;
  font-size: 24px;
`;

const Box = styled.div`
  height : 230px;
  background-color : #F4F7FF;
  border-radius : 5px;
  margin-top : 8px;
`;

const Box2 = styled(Box)`
  height : 400px;
  padding : 10px;
`;

const Box3 = styled.div`
  height : 70%;
  display : flex;
`;

const Box4 = styled.div`
  display : flex;
  justify-content : space-between;
  align-items : center;
`;

const Box5 =  styled.div`

`;

const CharBox = styled.div`
  width : 90px;
  height : 100%;
  position : relative;
  
  //border : 1px solid black;
  & > div {
    position : absolute;
    bottom : 20px;
    left : 14px;

    width : 60px;
    background-color : ${YELLOW};
    border-radius : 10px;
    
    text-align : center;
    color : #fff;
    font-size: 14px;
    font-weight : 600;
  }
`;

const Char = styled.section`
    width : 90px;
    height : 90px;
    border-radius : 50%;
    border : 3px solid ${BLUE};

    margin-top : 18px;
    
    background-image : ${({ level }) => `url(${zmzmee[level]})`};
    background-size : cover;
`;

const InfoBox = styled.div`
  width : 255px;
  height : 100%;

  margin-top : 17px;
  //border : 1px solid black;

  & > div {
    height : 35px;
    margin : 0 6px;
    margin-top:4px;
    border: 2px solid ${BLUE};
    border-radius : 10px;
    padding : 4px;
    background-color: #fff;

    font-size : 12px;
    font-weight : 600;

    display :flex;
    align-items:center;
  }

  & > .intro {
    margin-top : 15px;
    height : 64px;
  }
`;

const Stat = styled.div`
  height : 60px;

  border : 2px solid #d1d1d1;
  border-radius : 10px;
  margin : 0 4px;

  position : relative;

`;

const Th = styled.div`
  height : 28px;
  border-radius: 10px;
  border: 2px solid ${BLUE};
  background: ${BLUE};

  display :flex;
  justify-content : space-around;

  font-size : 16px;
  color : #fff;
`;

const Row = styled.span`
  color: #000;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  line-height: normal;

  position : absolute;
  top : 5px;
`;

const R1 = styled(Row)`
  left : 35px;
`;

const R2 = styled(Row)`
  left : 145px;
`;

const R3 = styled(Row)`
  right : 54px;
`;

const SetTime = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  margin-right : 38px;

  &::before {
    content : "✔"
  }
`;

const ItemBox = styled.div`
  height : 55px;
  display : flex;

  margin-top : 5px;
`;

const Item1 = styled.div`
  display: flex;
  width: 241px;
  height: 57px;
  padding: 19px 14px;
  justify-content: center;
  align-items: center;

  font-size : 14px;
  font-weight : 700;

  border-radius: 10px;
  border: 2px solid #D2D2D2;
  background: #FFF;
`;

const Item2 = styled.div`
  display: flex;
  width: 110px;
  height: 57px;
  padding: 16px 22px;
  justify-content: center;
  align-items: center;

  font-size : 14px;
  font-weight : 700;

  border-radius: 10px;
  background: #3970FF;
`;