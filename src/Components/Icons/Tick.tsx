import React from 'react';

const Tick = (props: React.HTMLAttributes<any>) => {
    return (
        <svg width="50px" height="50px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default Tick;