import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {

    return (
        <div style={{margin: '15%', textAlign: 'center'}}>
            <CircularProgress color="secondary" />
        </div>
    );
}