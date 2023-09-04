import React from 'react'
import QRCode from "qrcode.react";

const InforQR = ({ idUser }) => {
    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${idUser}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <div className='container-qr'>
            <div className='content-qr'>
                <div className='qr-image'>
                    <QRCode
                        id="qr-gen"
                        value={idUser}
                        size={300}
                        level={"H"}
                        includeMargin={true}
                    />
                </div>
                <div className='qr-infor'>
                    <p className='qr-head'>Hãy lưu mã QR này nhé !!</p>
                    <div className='btn-action'>
                        <div className='btn btn-primary' onClick={downloadQRCode}>Download QR Code</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InforQR