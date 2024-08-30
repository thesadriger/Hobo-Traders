import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BarIcon } from './DataIMGHeader'
import { styled } from 'styled-components'

const SettingsImg = styled.img`
 flex: 0 0 auto;
    width: 15%;
    aspect-ratio: 1 / 1;
    background-color: #646464;
    border-radius: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
`;

const Settings = () => {
  return (
        <SettingsImg src={BarIcon.settings.image} alt="" />
  );
};

export default Settings;
