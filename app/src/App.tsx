import React, {useState} from 'react';
import {SearchInput} from './components'
import styled from 'styled-components';
import {Body} from './layouts'

const Container = styled.div`
  display: block;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 30px;
  border-bottom: 1px solid #dddddd;
`;

const Logo = styled.div`
  margin-right: 50px;
  align-self: center;
  justify-content: center;
`;

function App() {
  const [selectedPackage, setSelectedPackage] = useState("react");
  
  const onSelect = async (value: string) => {
    if (value) setSelectedPackage(value);
  }
  
  return (
    <div className="App">
      <Container>
        <Header>
          <Logo>
            <strong>MY BUNDLEPHOBIA</strong>
          </Logo>
          <SearchInput onSelect={onSelect} />
        </Header>
        <Body selectedPackage={selectedPackage}/>
      </Container>
    </div>
  );
}

export default App;
