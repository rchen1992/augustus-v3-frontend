import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import Fullscreen from 'components/Fullscreen';
import styled from 'styled-components';

interface GenericErrorProps {
    message?: string;
    showBackToHome?: boolean;
    fullscreen?: boolean;
}

const GenericError: React.FC<GenericErrorProps> = ({
    message = 'Oops. Something went wrong.',
    showBackToHome = true,
    fullscreen = true,
}) => {
    const errorBody = (
        <StyledResult
            status="warning"
            title={message}
            extra={
                showBackToHome && (
                    <Link to="/">
                        <Button type="primary">Back to home</Button>
                    </Link>
                )
            }
        />
    );

    return fullscreen ? <Fullscreen>{errorBody}</Fullscreen> : errorBody;
};

export default GenericError;

const StyledResult = styled(Result)`
    svg {
        font-size: 72px;
    }
`;
