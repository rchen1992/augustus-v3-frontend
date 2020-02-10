import { GetMyMatchesQuery } from 'graphql/generated';

export type GetMyMatchesQueryMatch = NonNullable<GetMyMatchesQuery['me']>['matches'][0];
