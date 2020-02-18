import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { GetLadderPageQuery } from 'graphql/generated';
import AvatarAndUsername from 'components/AvatarAndUsername';
import formatDate from 'utils/formatDate';

type GetLadderPageQueryMatch = NonNullable<GetLadderPageQuery['ladder']>['matches'][0];
type GetLadderPageQueryMatchColumn = GetLadderPageQueryMatch & { key: string };

interface LadderMatchesProps {
    matches: GetLadderPageQueryMatch[];
}

const columns: ColumnProps<GetLadderPageQueryMatchColumn>[] = [
    {
        title: 'Date',
        key: 'date',
        render(_, { createdAt }) {
            if (!createdAt) {
                return '';
            }

            return formatDate(createdAt);
        },
    },
    {
        title: 'Player 1',
        key: 'player_1',
        render(_, { user1: { userName, avatarUrl } }) {
            return <AvatarAndUsername avatarUrl={avatarUrl} userName={userName} />;
        },
    },
    {
        title: 'Player 2',
        key: 'player_2',
        render(_, { user2: { userName, avatarUrl } }) {
            return <AvatarAndUsername avatarUrl={avatarUrl} userName={userName} />;
        },
    },
    {
        title: 'Result',
        key: 'result',
        render(_, { winner, tied }) {
            if (tied) {
                return 'Tie';
            }

            return `${winner?.userName} won`;
        },
    },
];

const LadderMatches: React.FC<LadderMatchesProps> = ({ matches }) => {
    const data = matches.map(match => ({ ...match, key: match.id }));

    return <Table columns={columns} dataSource={data} size="small" pagination={false} />;
};

export default LadderMatches;
