import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Fullscreen from 'components/Fullscreen';

const NotFoundRoute = () => {
    return (
        <Fullscreen>
            <Container>
                <h1>Oops! Page not found.</h1>

                <Link to="/">
                    <Button type="primary">Back to home</Button>
                </Link>
            </Container>
        </Fullscreen>
    );
};

export default NotFoundRoute;

const Container = styled.div`
    text-align: center;
`;
