import React from 'react'
import { useEffect } from 'react';
import { useState } from "react";
import { useZxing } from "react-zxing";
import { checkinQR } from '../../../services/apiService';
import { toast } from 'react-toastify';

const CheckQR = () => {
    const [result, setResult] = useState("");
    const { ref } = useZxing({
        onDecodeResult(result) {
            setResult(result.getText());
        },
    });
    const updateCheckinQR = async (id) => {
        let res = await checkinQR(id);
        if (res && res.statusCode === 200) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }
    useEffect(() => {
        updateCheckinQR(result);
    }, [result])

    return (
        <div className='check-qr-container'>
            <video ref={ref} />
        </div>
    );
}

export default CheckQR