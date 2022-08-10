import React, { Fragment, useState } from 'react';
import Message from './message';
import Progress from './progress';
import axios from 'axios';
// import NavBar from './navb
import Navbar from './NavBar/Navbar';



const UploadCSV = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Zgjidh File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            });

            // // Clear percentage
            // setTimeout(() => window.location('/'), 5000);

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File u upload-ua');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('Ka nje prob me serverin');
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0)
        }
    };

    return (
        <Fragment>
            <Navbar/>
            <div style={{ height: 100 }}></div>
            <div className="container">
                {message ? <Message msg={message} /> : null}
                <h1 className="text-center">Shtoni persona nga CSV. Ju lutem permbajuni struktures.</h1>
                <div style={{ height: 20 }}></div>
                <form onSubmit={onSubmit}>
                    <div className='custom-file mb-4'>
                        <input
                            type='file'
                            accept=".xlsx, .xls, .csv"
                            className='custom-file-input'
                            id='customFile'
                            onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            {filename}
                        </label>
                    </div>

                    <Progress percentage={uploadPercentage} />

                    <input
                        type='submit'
                        value='Posto filen'
                        className='btn btn-primary btn-block mt-4'
                    />
                </form>
                {uploadedFile ? (
                    <div className='row mt-5'>
                        <div className='col-md-6 m-auto'>
                            <h3 className='text-center'>{uploadedFile.fileName}</h3>
                            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                        </div>
                    </div>
                ) : null}
            </div>
        </Fragment>
    );
};

export default UploadCSV;