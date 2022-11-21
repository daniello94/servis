import React, { useEffect, useState } from "react";
import axios from 'axios';

/* components */
import Container from "../components/Container";

export default function MyProject(props) {
    const [status, setStatus] = useState([])

    function listPhoto() {
        axios.post('http://127.0.0.1:8080/project/all')
            .then((res) => {
                setStatus(res.data)
            })
    };

    useEffect(() => {
        listPhoto()
    }, [])
    return (
        <Container>
          
            {status.map((project) => {
                return (
                    <div key={project._id}>
                        <p>{project.title}</p>
                        <p>{project.description}</p>
                        <img src={'http://localhost:8080/photo/' + project.hederPhoto} alt="foto profil" />
                    </div>
                )
            })}

        </Container>
    )
}