import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { useAuth0 } from 'providers/Auth0Provider';
import AccountModal from 'components/AccountModal';
import authConfig from 'config/auth_config';

const AccountMenu: React.FC = ({ children }) => {
    const { logout } = useAuth0();
    const [accountModalVisible, setAccountModalVisible] = useState(false);

    const menu = (
        <Menu>
            <Menu.Item>
                <span onClick={() => setAccountModalVisible(true)}>My Account</span>
            </Menu.Item>
            <Menu.Item
                onClick={() =>
                    logout({
                        returnTo: process.env.REACT_APP_FRONTEND_DOMAIN,
                        client_id: authConfig.clientId,
                    })
                }
            >
                Log out
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} trigger={['click']}>
                {children}
            </Dropdown>
            <AccountModal
                visible={accountModalVisible}
                onClose={() => setAccountModalVisible(false)}
            />
        </>
    );
};

export default AccountMenu;
