"use client"; 

import { useEffect, useState } from 'react';
import axios from 'axios';

const MaintenancePage = () => {
    const [result, setResult] = useState<string>('');

    useEffect(() => {
        const performMaintenance = async () => {
            try {
                const response = await axios.get('/api/maintenance/route');
                setResult(response.data.message);
            } catch (error) {
                setResult('Error performing maintenance.');
            }
        };
        performMaintenance();
    }, []);

    return (
        <div>
            <h1>Maintenance Test Page</h1>
            <p>{result}</p>
        </div>
    );
};

export default MaintenancePage;
