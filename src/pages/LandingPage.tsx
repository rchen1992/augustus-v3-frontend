import React from 'react';
import { useAuth0 } from 'providers/Auth0Provider';
import styled from 'styled-components';
import AugustusLogo from 'components/AugustusLogo';
import { Button } from 'antd';

function LandingPage() {
    const { loginWithRedirect } = useAuth0();

    return (
        <Container>
            <Hero>
                <MaxWidthContainer>
                    <Header>
                        <AugustusLogo color="black" />
                        <div>
                            <LoginButton type="link" onClick={loginWithRedirect}>
                                Login
                            </LoginButton>
                        </div>
                    </Header>
                    <TitleContainer>
                        <Title>Ladder Ranking System</Title>
                        <TagLine>Find out who's the best among you and your friends.</TagLine>
                        <Button type="primary" onClick={loginWithRedirect}>
                            Get started now
                        </Button>
                    </TitleContainer>
                </MaxWidthContainer>
            </Hero>
            <Section>
                <MaxWidthContainer>
                    <LadderRankingsContainer>
                        <img src="/ladderRankings.png" />
                        <LadderRankingsDescription>
                            <h2>View ladder rankings</h2>
                            <p>
                                We use the ELO rating system to rank players in each ladder. See
                                where you stack up against your friends!
                            </p>
                        </LadderRankingsDescription>
                    </LadderRankingsContainer>
                </MaxWidthContainer>
            </Section>
        </Container>
    );
}

export default LandingPage;

const Container = styled.div``;

const MaxWidthContainer = styled.div`
    max-width: 1200px;
    margin: auto;
`;

const Hero = styled.div`
    padding: ${({ theme }) => theme.spacing(3, 4, 10, 4)};
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const LoginButton = styled(Button)`
    color: black;

    span {
        font-size: 16px;
    }
`;

const TitleContainer = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 0;
`;

const TagLine = styled.p`
    font-size: 20px;
`;

const Section = styled.section`
    background-color: hsl(200, 20%, 25%);
`;

const LadderRankingsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -160px;

    img {
        width: 80%;
    }
`;

const LadderRankingsDescription = styled.div`
    color: white;
    position: relative;
    top: 80px;
    text-align: center;

    h2 {
        font-size: 30px;
        font-weight: bold;
        color: white;
    }

    p {
        font-size: 18px;
        line-height: 28px;
        max-width: 600px;
    }
`;
