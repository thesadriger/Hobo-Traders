import React, { useEffect, useRef } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
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
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const restartVideo = () => {
        setTimeout(() => {
          videoElement.currentTime = 0; // Сбросить видео на начало
          videoElement.play(); // Запустить видео снова
        }, 5000); // 5000 миллисекунд = 5 секунд
      };

      videoElement.addEventListener('ended', restartVideo);

      // Очистка при размонтировании
      return () => {
        videoElement.removeEventListener('ended', restartVideo);
      };
    }
  }, []);
  return (
      <AvatarContainer>
        <AvatarVideo ref={videoRef} src={BarIcon.user.image} alt="" autoPlay muted/>
      </AvatarContainer>
  );
};

export default Avatar;
