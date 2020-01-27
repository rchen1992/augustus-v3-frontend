import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import styled from 'styled-components';

const Stuff = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
`;

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Button type="primary">Button</Button>
                <Stuff />
            </header>
        </div>
    );
};

export default App;
