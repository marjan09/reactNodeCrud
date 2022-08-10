import React, { useState } from 'react'
import Navbar from "./NavBar/Navbar";
import { Table, Thead, Tbody, Tr, Th, Td } from  'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./style.css"
const SearchPerson = () => {

    const [name, setName] = useState('')
    const [persons, setPersons] = useState([])

    const ntf = "Nuk u gjet e dhene"


    const searchClick = async (e) => {
        e.preventDefault()
        try {

            const d = await fetch(`/persons/?name=${name}`)
            const dJson = await d.json()

            setPersons(dJson)

        } catch (err) {
            console.error(err.message) 
        }

    }

    return (
        <>
            <Navbar/>
            <div className="container">

            <div style= {{height: 80}}></div>

            <h2> Kerkoni persona</h2>
                <input type="text" className="form-control" value={name} placeholder="Emri" onChange={e => setName(e.target.value)} />
                <Table className="styled-table table mt-10 text-center">
                    <Thead>
                        <Tr>
                            <Th>Emri</Th>
                            <Th>Mbiemri</Th>
                            <Th>Email</Th>
                            <Th>Telefon</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {persons.map(person => (
                            <Tr className="active-row" key={person.person_id}>
                                <Td>{person.name != null ? person.name : ntf}</Td>
                                <Td>{person.lastname != null ? person.lastname : ntf}</Td>
                                <Td>{person.email != null ? person.email : ntf}</Td>
                                <Td>{person.phone != null ? person.phone : ntf}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>

                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={e => searchClick(e)}>Kerko</button>
            </div>

        </>
    )

}

export default SearchPerson