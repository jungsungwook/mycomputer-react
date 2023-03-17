import { useRouter } from 'next/router';
import React from 'react';

const Card = ({
    card_type,
    item_id,
    title,
    content,
    img_url,
    created_at,
    updated_at,
    user_id,
}:any) => {
    const rotuer = useRouter();
    return (
        <div className="card-wrapper" onClick={() => {
            rotuer.push(`/${card_type}/${item_id}`)
        }}>
            {
                img_url != null && img_url != "" && img_url != "null" && img_url != "undefined" && img_url != undefined ?
                <div className="card-body-img">
                    <img src={img_url}/>
                </div> : <></>
            }
            <div className="card-body-text">
                <div className="card-body-text-title">{title}</div>
                <div className="card-body-text-content">{content}</div>
            </div>

            <div className="card-footer">
            <div className="username">{user_id}</div>
            <div className="date">{created_at}</div>
        </div>
    </div>
    );
};

export default Card;