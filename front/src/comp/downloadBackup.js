import React from 'react'


const DownloadBackup = () => {

    const down = () =>{
        window.location.href = "http://localhost:5001/download/all";
    }

    return (
        <>
            <button type="button" style={{marginBottom: '5px'}} class="btn btn-success" onClick={() => down()}>
                Shkarko csv/exel
            </button>
        </>
    )
}

export default DownloadBackup;