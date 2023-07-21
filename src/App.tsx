import * as React from 'react'

import { ObjectDetector } from './components/ObjectDetector'
import styled from 'styled-components'; // Agrega esta importación
const boardImage = 'https://as1.ftcdn.net/v2/jpg/02/07/18/42/1000_F_207184271_KGYtC1btjugpk0O6CVJSKnDI7BZ8PXkZ.jpg'

const BoardContainer = styled.div`
  // position: relative;
  // width: 100%;
  // height: 100%;
  // background-image: url(${boardImage});
  // background-repeat: no-repeat;
  // background-size: contain;
  // background-position: center center;
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
  flex-direction: column;
  background-image: url(${boardImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  align-items: center;

  // @media (max-height: 500px) {
  //   flex-direction: row;
  // }
`;

export default function App() {
  return (
    <React.Fragment>
      <BoardContainer className='App'>
        <ObjectDetector />
      </BoardContainer>


    </React.Fragment>
  )
}
