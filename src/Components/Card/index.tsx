import React from 'react';

interface Props {
    className?: string;
}
const Card = (props: Props) => {
    return (
        <div className={`card ${props.className}`}>
            <p className="money">$ 567.8</p>
            <p className="label">Total money</p>
        </div>
    )
}

export default Card;