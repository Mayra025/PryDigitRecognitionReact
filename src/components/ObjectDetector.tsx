// Import dependencies
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Alert, Container, Button } from '@mui/material'
import { createWorker } from 'tesseract.js'

import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import styled from 'styled-components'; // Agrega esta importación
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // Importa el icono de silenciado

import { useEffect } from 'react';


const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  // align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  `;

const MainContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  /* Estilos para el contenedor izquierdo (para una imagen) */
  flex: 3;
  height: 100%;
  background-image: url('https://thumbs.dreamstime.com/b/textura-incons%C3%BAtil-de-la-tela-del-fondo-color-turquesa-119902970.jpg');
  background-size: cover;
  background-position: center;
`;

const RightContainer = styled.div`
  /* Estilos para el contenedor derecho (para la cámara) */
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 100%;
`;

const CameraOverlay = styled.div`
  position: absolute;
  top: 10%;
  right: 0;
  // bottom: 20px; // Ajusta la distancia desde la parte inferior
  // right: 20px; 
`;

const ButtonWrap = styled.div`
  background-image: url('https://thumbs.dreamstime.com/b/textura-incons%C3%BAtil-de-la-tela-del-fondo-color-turquesa-119902970.jpg');
  display: flex;
  justify-content: center; // Alinear horizontalmente en el centro
  align-items: center; // Alinear verticalmente en el centro
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: contain;
 
  margin-right: 5px;
  margin-left: 5px;
`;


export function ObjectDetector() {
  const actualChar = 'A'
  const array = Array(5).fill(1)
  const imageURL = 'https://cdn.pixabay.com/photo/2016/09/08/13/58/desert-1654439_1280.jpg'
  const webcamRef = useRef<Webcam>(null)
  const [matched, setMached] = useState(false)

  let interval: NodeJS.Timer

  const initDetection = async () => {
    setMached(false)
    let count = 0
    interval = setInterval(() => {
      console.log(count)
      if (count < 3) {
        count++
        detected()
      } else {
        clearInterval(interval)
        console.log('Not detecting anymore')
      }
    }, 3000)
  }

  // Main function
  const detected = async (): Promise<boolean> => {
    const webcam = webcamRef.current
    const imageSrc = webcam!.getScreenshot()

    const worker: Promise<Tesseract.Worker> = createWorker()
    await (await worker).load()
    await (await worker).loadLanguage('eng')
    await (await worker).initialize('eng')
    const {
      data: { text },
    } = await (await worker).recognize(imageSrc!)
    // console.log('Text', text)
    console.log('Detecting')
    await (await worker).terminate()
    if (text.indexOf(actualChar) !== -1) {
      console.log('Detected', actualChar)
      setMached(true)
      clearInterval(interval)
      return true
    }
    return false
  }

  // Sound
 
  const audioRef = useRef<HTMLAudioElement | null>(null); // Tipo explícito para audioRef
  const [playback, setPlayback] = useState(true);
 
  useEffect(() => {
    if (playback) {
      audioRef.current?.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    } else {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [playback]);


  useEffect(() => {
    // Reproducir automáticamente al cargar la página
    audioRef.current?.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  }, []);

  const handleButtonClick = () => {
   
    setPlayback((prevPlayback) => !prevPlayback); // Alternar el estado entre reproducción y silencio

  };


  return (
    <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TextContainer>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium pariatur ea et cum eius magnam impedit cumque modi repellat voluptatibus quisquam quasi, natus mollitia excepturi sit inventore voluptatum consectetur. Perferendis!</p>
    
        <audio ref={audioRef} src="/static/numeros.mp3" />
        <Button variant="contained" onClick={handleButtonClick}>
          {playback ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </Button>
      </TextContainer>

      <MainContainer style={{ flex: 1 }}>
        <LeftContainer />
        <RightContainer>
          <CameraOverlay>
            <Webcam
              ref={webcamRef}
              muted={true}
              height={300}
            // style={{
            //   zIndex: -1,
            // }}
            />
            {matched && <Alert severity='success'>Detected {actualChar} successfully</Alert>}
          </CameraOverlay>
        </RightContainer>

      </MainContainer>

      <ButtonContainer>
        <ButtonWrap><ReplayIcon fontSize='large'></ReplayIcon></ButtonWrap>
        <ButtonWrap onClick={() => initDetection()}><PlayArrowIcon fontSize='large'></PlayArrowIcon></ButtonWrap>
        <ButtonWrap onClick={() => clearInterval(interval)}><StopIcon fontSize='large'></StopIcon></ButtonWrap>
      </ButtonContainer>
    </Container>
  );

}
