import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const NotFoundRoute = () => {
    return (
        <FullPage>
            <Container>
                <h1>Oops! Page not found.</h1>

                <Link to="/">
                    <Button type="primary">Back to home</Button>
                </Link>
            </Container>
        </FullPage>
    );
};

export default NotFoundRoute;

const FullPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Container = styled.div`
    text-align: center;
`;
