import React from 'react'
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';



interface Props {
    packageHistory?: any;
}

const ChartContainer = styled.div`
    padding: 25px 0px;
`;


export default function BarChart({ packageHistory }: Props) {
    return (
        <ChartContainer>
            <h2>Versions :</h2>
            <br/>
            <Bar  
                height={300}
                data={{ datasets: packageHistory,
                        labels: packageHistory.map((el:any) => {return el?.version}) }} 
            />
        </ChartContainer>
    )
}