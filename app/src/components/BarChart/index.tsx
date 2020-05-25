import React, {useEffect, createRef} from 'react'
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';



interface Props {
    packageHistory?: any;
}

const ChartContainer = styled.div`
    padding: 25px 0px;
`;


export default function BarChart({ packageHistory }: Props) {
    // const chartRef = createRef();

    useEffect(() => {
        
    }, [packageHistory])
    
    return (
        <ChartContainer>
            <h2>Versions :</h2>
            <br/>
            <Bar  
                height={300}
                data={packageHistory.map( (el:any) => {return {"version": el.version, "size": el.size}})} 
            />
        </ChartContainer>
    )
}