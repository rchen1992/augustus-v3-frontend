import React, { useState } from 'react';
import { GraphQLError } from 'graphql';
import ErrorBox from 'components/ErrorBox';

export default () => {
    const [graphQLErrors, setGraphQLErrors] = useState([] as Readonly<GraphQLError[]>);
    const graphQLErrorBox = graphQLErrors.length > 0 && <ErrorBox errors={graphQLErrors} />;

    return {
        graphQLErrors,
        setGraphQLErrors,
        graphQLErrorBox,
    };
};
