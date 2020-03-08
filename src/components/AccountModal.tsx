import React from 'react';
import { Modal, Spin } from 'antd';
import EditUsername from 'components/EditUsername';
import GenericError from 'components/GenericError';
import { useGetMeQuery } from 'graphql/generated';
import styled from 'styled-components';

interface AccountModalProps {
    visible?: boolean;
    onClose?: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ visible = false, onClose = () => {} }) => {
    const { loading, error, data } = useGetMeQuery();

    const modalContent = loading ? (
        <SpinContainer>
            <Spin />
        </SpinContainer>
    ) : error || !data?.me?.userName ? (
        <GenericError />
    ) : (
        <EditUsername key={Math.random()} userName={data?.me?.userName} />
    );

    return (
        <Modal title="My Account" visible={visible} onCancel={onClose} footer={null}>
            {modalContent}
        </Modal>
    );
};

export default AccountModal;

const SpinContainer = styled.div`
    text-align: center;
`;
