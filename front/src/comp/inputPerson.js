import React, { useState } from 'react'
import Navbar from "./NavBar/Navbar";

const InpPerson = () => {

    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { name, lastname, email, phone }
            const resp = await fetch('/person', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            console.log(resp)
            window.location = '/'
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ height: 50 }}></div>
            <div className="container">
                <h1 className="text-center mt-10">Shto Nje Person</h1>
                <form className="d-flex m-10" onSubmit={submitForm}>
                    <input type="text" className="form-control" value={name} placeholder="Emri" onChange={e => setName(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Mbiemri" value={lastname} onChange={el => setLastName(el.target.value)} />
                    <input type="email" className="form-control" placeholder="e-Mail" value={email} onChange={en => setEmail(en.target.value)} />
                    <input type="text" className="form-control" placeholder="telefon" value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <button className="btn btn-success  ">Shto</button>
                </form>
            </div>

        </>
    )
}

export default InpPerson;