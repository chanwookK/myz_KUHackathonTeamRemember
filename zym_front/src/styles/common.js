import styled from 'styled-components';

import zmzmee_s from '../images/zmzmees/zmzmee_s.png';
import zmzmee_e from '../images/zmzmees/zmzmee_e.png';

import zmzmee_0 from '../images/zmzmees/zmzmee_0.png';
import zmzmee_1 from '../images/zmzmees/zmzmee_1.png';
import zmzmee_2 from '../images/zmzmees/zmzmee_2.png';
import zmzmee_3 from '../images/zmzmees/zmzmee_3.png';
import zmzmee_4 from '../images/zmzmees/zmzmee_4.png';
import zmzmee_5 from '../images/zmzmees/zmzmee_5.png';

import statusBar from '../images/StatusBar.png';

export const BLUE = "#3970FF";
export const YELLOW = "#FEDF34";

export let uid;

export const Wrapper = styled.div`
  background-image : url(${statusBar});
  background-position : top;
  background-repeat :no-repeat;
  height : 844px;
  width : 390px;
  padding : 0 22px;
  padding-top : 47px;

  margin : 0 auto;
  border : 1px solid ${BLUE};

  position : relative;
`;

export const baseUrl = "https://remember.run.goorm.site";


export const zmzmee_status = [zmzmee_s,zmzmee_e];
export const zmzmee = [zmzmee_0,zmzmee_1,zmzmee_2,zmzmee_3,zmzmee_4,zmzmee_5]