import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getPackageInfo, getPackageHistory} from '../services/api';
import { CircularProgress } from '@material-ui/core'
import {Overview, BarChart} from '../components'

interface BodyProsps {
    selectedPackage: string;
}


const BodyContainer = styled.div`
  padding: 10px 30px;
`;

const Charts = styled.div`
    display: flex;
`;

const Body:React.FC<BodyProsps> = ({selectedPackage}) => {
    const [packageInfo, setPackageInfo] = useState(null);
    const [packageHistory, setPackageHistory] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        let getPackageInfoPromise = getPackageInfo(selectedPackage);
        let getPackageHistoryPromise = getPackageHistory(selectedPackage);
        await Promise.all([getPackageInfoPromise,getPackageHistoryPromise]).then(
            ([PackageInfoData,PackageHistoryData]: any[]) => {
                setPackageInfo(PackageInfoData);
                setPackageHistory(PackageHistoryData);
                setLoading(false);
            }
        )
    }
    
    useEffect( ()=> {
        if(selectedPackage) loadData();
    },[selectedPackage])

    if((!packageInfo || !packageHistory) && !loading) return (
        <h1>No Package Selected</h1>
    );

    return (
        <BodyContainer>
            { loading ? <CircularProgress color="secondary" size={20} thickness={4} /> : (
                <div>
                    <Overview packageInfo={packageInfo} />
                    <Charts>
                        <BarChart packageHistory={packageHistory}/>
                    </Charts>
                </div>
            ) }
        </BodyContainer>
    );
}

export default Body;