import React from 'react';
import { Menu, Dropdown } from 'antd';
import { useAuth0 } from 'providers/Auth0Provider';

const AccountMenu: React.FC = ({ children }) => {
    const { logout } = useAuth0();

    const menu = (
        <Menu>
            <Menu.Item onClick={() => logout()}>Log out</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            {children}
        </Dropdown>
    );
};

export default AccountMenu;
