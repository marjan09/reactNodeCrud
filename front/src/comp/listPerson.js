import React, { useEffect, useState, Fragment } from 'react'
import DownloadBackup from './downloadBackup';
import { Link } from 'react-router-dom';
import Add from './add';
import EditPerson from './editPerson'
import { Table, Thead, Tbody, Tr, Th, Td } from  'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./style.css"
const ListPerson = () => {

    const ntf = "Nuk u gjet e dhene"
    const [persons, setPersons] = useState ([])

    const getPerson = async () => {
        try {

            const response = await fetch('/person')
            const dataInJson = await response.json()

            setPersons(dataInJson)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getPerson();
    }, [])


    const deletePerson = async (pid) => {

        try {
            const resp = await fetch(`/person/${pid}`, {
                method: "DELETE"
            })
            setPersons(persons.filter(person => person.person_id !== pid));
            console.log(resp)
        } catch (err) {
            console.error(err.message)
        }




    }


    return (
        <Fragment>
            <div style={{ height: 50 }}></div>
            
            {persons.length > 0 ?
                <>
                    <h1 className="text-center mt-15">Te gjithe personat</h1>
                    <DownloadBackup/>
                    <Link to="/shtoperson"><Add/></Link>
                    <Table className="styled-table Table mt-10 text-center">
                        <Thead>
                            <Tr>
                                <Th>Emri</Th>
                                <Th>Mbiemri</Th>
                                <Th>Email</Th>
                                <Th>Telefon</Th>
                                <Th>Ndrysho</Th>
                                <Th>Fshi</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {persons.map(person => (
                                <Tr key={person.person_id}>
                                    <Td>{person.name != null ? person.name : ntf}</Td>
                                    <Td>{person.lastname != null ? person.lastname : ntf}</Td>
                                    <Td>{person.email != null ? person.email : ntf}</Td>
                                    <Td>{person.phone != null ? person.phone : ntf}</Td>
                                    <Td> <EditPerson person={person} /> </Td>
                                    <Td> <button type="button" className="btn btn-danger" onClick={() => deletePerson(person.person_id)} >Fshi</button>
                                    </Td>

                                </Tr>
                            ))}

                        </Tbody>
                    </Table>


                </> : <h1 className="text-center">{ntf}</h1>}

        </ Fragment>
    )

}

export default ListPerson