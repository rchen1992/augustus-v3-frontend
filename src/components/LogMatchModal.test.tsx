import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { renderWithProvider } from 'tests/testUtils';
import LogMatchModal, {
    LADDER_SELECT_TEST_ID,
    OPPONENT_SELECT_TEST_ID,
} from 'components/LogMatchModal';
import { getMyLaddersQuerySuccessMock, mockLadders } from 'tests/mocks/getMyLaddersQuery';
import { getLadderUsersQuerySuccessMock, mockLadderUsers } from 'tests/mocks/getLadderUsersQuery';

describe('LogMatchModal', () => {
    test('should be able to open modal and submit a match', async () => {
        const mocks = [getMyLaddersQuerySuccessMock, getLadderUsersQuerySuccessMock];
        const { getByText, queryByText, getByTestId } = renderWithProvider(
            <LogMatchModal />,
            mocks
        );

        // Wait for my ladder query to resolve.
        await wait();

        // Test opening modal
        const triggerBtn = getByText('Log Match');
        fireEvent.click(triggerBtn);
        expect(queryByText('Log a match')).toBeTruthy();

        // Test selecting ladder
        const ladderSelect = getByTestId(LADDER_SELECT_TEST_ID);
        let selectedLadderContainer = ladderSelect.querySelector(
            '.ant-select-selection-selected-value'
        );
        expect(selectedLadderContainer).toBeFalsy();
        fireEvent.click(ladderSelect);
        const ladderName = mockLadders[0].ladderName;
        const ladderOption = getByText(ladderName);
        fireEvent.click(ladderOption);
        selectedLadderContainer = ladderSelect.querySelector(
            '.ant-select-selection-selected-value'
        );
        expect(selectedLadderContainer).toHaveTextContent(ladderName);

        // Wait for ladder user query to resolve.
        await wait();

        // Test selecting opponent
        // const opponentSelect = getByTestId(OPPONENT_SELECT_TEST_ID);
        // let selectedOpponentContainer = opponentSelect.querySelector(
        //     '.ant-select-selection-selected-value'
        // );
        // expect(selectedOpponentContainer).toBeFalsy();
        // fireEvent.click(opponentSelect);
        // const opponentName = mockLadderUsers[0].userName;
        // const opponentOption = getByText(opponentName);
        // fireEvent.click(opponentOption);
        // selectedOpponentContainer = opponentSelect.querySelector(
        //     '.ant-select-selection-selected-value'
        // );
        // expect(selectedOpponentContainer).toHaveTextContent(opponentName);
    });
});
