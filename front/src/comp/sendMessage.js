import React, { useState } from 'react'
import Navbar from "./NavBar/Navbar";
import QRCode from 'qrcode.react'
import TextareaAutosize from 'react-textarea-autosize';

const SendMessage = () => {

    const mszh = '{{name}}'
    const [mesazh, setMesazh] = useState('')
    
    const [qrd, setqrd] = useState('')

    const dergo = async () => {
        try {
            const body = { mesazh }
            const resp = await fetch('/sendmessage', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json()
            })
                .then(function (responseJson) {
                    return responseJson.authd
                })
            console.log(resp)
            resp.length > 0 ? setqrd(resp) : setqrd('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ height: 80 }}></div>
            <div>
                <p className="text-center">Vendosni {mszh} per te shtuar emrin e cdo personi ne mesazh</p>
                <TextareaAutosize style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} maxRows="12" minRows="4" cols="36"  type="text"  value={mesazh} placeholder="Shkruaj Mesazhin" onChange={(e) => setMesazh(e.target.value)}/>
                <button className="btn btn-success" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '5px'}} onClick={dergo}> Dergo Mesazhin</button>
                {qrd.length > 0 ? <QRCode style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '5px'}} value={qrd} />  : ""}
            </div>

        </>
    )

}

export default SendMessage
