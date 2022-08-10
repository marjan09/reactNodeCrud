import React, { useState } from 'react'

const EditPerson = ({ person }) => {

    const [name, setName] = useState(person.name)
    const [lastname, setLastName] = useState(person.lastname)
    const [email, setEmail] = useState(person.email)
    const [phone, setPhone] = useState(person.phone)


    const updatePer = async (e) => {
        e.preventDefault();
        try {
            
            const body = { name , lastname, email, phone}
            const resp = await fetch(`/person/${person.person_id}`,{
                method:'PUT',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify(body)
            })

            console.log(resp)
            window.location = '/'

        } catch (err) {
            console.error(err.message)
            
        }
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${person.person_id}`}>
                Ndrysho
            </button>

            <div className="modal" id={`id${person.person_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Bej ndryshimet e te dhenave</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">

                            <input type="text" classNameName="form-control" value={name == null ? '' : name} placeholder="Emri" onChange={e => setName(e.target.value)} />
                            <input type="text" classNameName="form-control" placeholder="Mbiemri" value={lastname == null ? '' : lastname} onChange={el => setLastName(el.target.value)} />
                            <input type="email" classNameName="form-control" placeholder="e-Mail" value={email == null ? '' : email} onChange={en => setEmail(en.target.value)} />
                            <input type="text" classNameName="form-control" placeholder="telefon" value={phone == null ? '' : phone} onChange={ev => setPhone(ev.target.value)} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick= { e => updatePer(e)}>Mbyll dhe ruaj</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default EditPerson;