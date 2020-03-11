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
            <DarkSection>
                <MaxWidthContainer>
                    <LadderRankingsContainer>
                        <img src="/ladderRankings.png" />
                        <LadderRankingsDescription>
                            <FeatureTitle>View ladder rankings</FeatureTitle>
                            <FeatureDescription>
                                We use the ELO rating system to rank players in each ladder. See
                                where you stack up against your friends!
                            </FeatureDescription>
                        </LadderRankingsDescription>
                    </LadderRankingsContainer>
                </MaxWidthContainer>
            </DarkSection>
            <FeatureSection>
                <MaxWidthContainer>
                    <FeatureContainer>
                        <div>
                            <FeatureTitle>Create or join ladders</FeatureTitle>
                            <FeatureDescription>
                                Create a new ladder or get invited to join an existing ladder by one
                                of your friends. Track your rank, rating, wins, and losses in each
                                of your ladders!
                            </FeatureDescription>
                        </div>
                        <ColImage src="/userLadder.png" />
                    </FeatureContainer>
                    <FeatureContainer>
                        <ColImage src="/userMatches.png" />
                        <div>
                            <FeatureTitle>Log your matches</FeatureTitle>
                            <FeatureDescription>
                                After you play a match, either you or your opponent can log the
                                result, and your ratings will be instantly updated. Keep track of
                                your full match history!
                            </FeatureDescription>
                        </div>
                    </FeatureContainer>
                </MaxWidthContainer>
            </FeatureSection>
            <DarkSection>
                <Footer>
                    <FeatureTitle>Ready to get started?</FeatureTitle>
                    <FeatureDescription>
                        Create an account for free and start tracking your matches and ranking.
                    </FeatureDescription>

                    <Button type="primary" onClick={loginWithRedirect}>
                        Sign up
                    </Button>
                </Footer>
            </DarkSection>
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

const DarkSection = styled.section`
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
        color: white;
    }
`;

const FeatureSection = styled.section`
    padding: ${({ theme }) => theme.spacing(5)};
`;

const FeatureTitle = styled.h2`
    font-size: 30px;
    font-weight: bold;
`;

const FeatureDescription = styled.p`
    font-size: 18px;
    line-height: 28px;
    max-width: 500px;
`;

const FeatureContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(6, 0)};
`;

const ColImage = styled.img`
    width: 40%;
`;

const Footer = styled.footer`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: ${({ theme }) => theme.spacing(5)};

    h2,
    p {
        color: white;
    }
`;
