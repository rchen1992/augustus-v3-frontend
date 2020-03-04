import React from 'react';
import { Spin } from 'antd';
import Fullscreen from 'components/Fullscreen';

const FullscreenSpin: React.FC = () => {
    return (
        <Fullscreen>
            <Spin size="large" />
        </Fullscreen>
    );
};

export default FullscreenSpin;
