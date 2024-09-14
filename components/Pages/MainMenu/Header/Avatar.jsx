import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import animationData from '/src/assets/User.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from './DataIMGHeader'
import { styled } from 'styled-components'


const AvatarContainer = styled.section`
 flex: 0 0 auto;
  width: 15%; /* Ширина в процентах от ширины контейнера */
  aspect-ratio: 1/1; /* Сохраняет пропорции квадрата */
  background-color: #646464;
  border-radius: 25%; /* Округление на основе процента от ширины/высоты */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem; /* Размер шрифта относительно корневого элемента */
`;
const AvatarVideo = styled.video`
 flex: 0 0 auto;
  width: 100%;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = () => {
  const lottieRef = useRef(null);

  useEffect(()=>{

  }, []);

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true); // Устанавливаем начальную позицию анимации
      lottieRef.current.play();
    }
  };
  return (
    <AvatarContainer onClick={startAnimation}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        style={{ width: '80%', height: '80%' }}
        loop={false}
      />
    </AvatarContainer>
  );
};

export default Avatar;



// Импорт не Lootie, а MP4

// const Avatar = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const videoElement = videoRef.current;

//     if (videoElement) {
//       const restartVideo = () => {
//         setTimeout(() => {
//           videoElement.currentTime = 0;
//           videoElement.play();
//         }, 5000);
//       };

//       videoElement.addEventListener('ended', restartVideo);

      
//       return () => {
//         videoElement.removeEventListener('ended', restartVideo);
//       };
//     }
//   }, []);
//   return (
//       <AvatarContainer>
//         <AvatarVideo ref={videoRef} src={BarIcon.user.image} alt="" autoPlay muted/>
//       </AvatarContainer>
//   );
// };