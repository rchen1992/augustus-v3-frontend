import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const FullscreenSpin: React.FC = () => {
    return (
        <SpinContainer>
            <Spin size="large" />
        </SpinContainer>
    );
};

export default FullscreenSpin;

const SpinContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
