import React from 'react';

const BarsFilter = (props: React.HTMLAttributes<any>) => {
    return (
        <svg fill="#000000" width="50px" height="50px" viewBox="0 0 32 32" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <title>bars-filter</title>
            <path
                d="M30 7.249h-28c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h28c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM24 15.25h-16c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h16c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM19 23.25h-6.053c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h6.053c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path>
        </svg>
    )
}

export default BarsFilter