import React from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import {GoMarkGithub} from 'react-icons/go'

interface Props {
    packageInfo?: any;
}

const OverviewContainer = styled.div`
    border-radius: 6px;
    background-color: #e8f2ee;
    padding: 25px;
`;

const Line = styled.div`
    display: flex;
    flex-warp: wrap;
    align-items: flex-end;
`;

// #048e69

export default function Overview({ packageInfo }: Props) {
  return (
      <OverviewContainer>
        <Line>
            <h1>{packageInfo?.name}</h1>
            <small style={{margin:'4px 8px'}}>{packageInfo?.version}</small>
        </Line>
        <br/>
        <p>{packageInfo?.description}</p>
        <br/>
        <Button variant="contained" color="primary" href={packageInfo?.repository} target="_blank"> <GoMarkGithub style={{marginRight: 10}} /> Repository </Button>
      </OverviewContainer>
  )
}
