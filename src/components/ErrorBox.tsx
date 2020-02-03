import React from 'react';
import styled from 'styled-components';
import { GraphQLError } from 'graphql';

interface ErrorBoxProps {
    errors: Readonly<GraphQLError[]>;
}

/**
 * Displays GraphQL errors in red error box.
 */
const ErrorBox: React.FC<ErrorBoxProps> = ({ errors }) => {
    return (
        <Container>
            {errors.map((error: GraphQLError, i) => (
                <span key={i}>{error.message}</span>
            ))}
        </Container>
    );
};

export default ErrorBox;

const Container = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.errorLight};
    background-color: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.error};
    padding: ${({ theme }) => theme.spacing(1, 2)};
    margin-top: ${({ theme }) => theme.spacing(1)};
    border-radius: 4px;
`;
