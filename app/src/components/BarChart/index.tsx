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
                data={{ 
                    datasets: [
                        {
                            label: "size",
                            data: packageHistory.map((el:any)=> {return el?.size}),
                            backgroundColor: "#e8f2ee"
                        },
                        {
                            label: "gzip",
                            data: packageHistory.map((el:any)=> {return el?.gzip}),
                        }
                    ],
                    labels: packageHistory.map((el:any) => {return el?.version})
                }} 
                options={{ maintainAspectRatio: false }}
            />
        </ChartContainer>
    )
}