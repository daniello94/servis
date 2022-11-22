import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { BsImages,BsXLg} from "react-icons/bs";

/* components */
import Container from "../components/Container";
import H2 from "../components/H2";

/* style */
import styles from "../style/MyProject.module.scss";

export default function MyProject() {
    const [status, setStatus] = useState([]);
    const [classActive, setClassActive] = useState('close')
    const [oneProject, setOneProject] = useState({
        gallery: []
    });


    function listPhoto() {
        axios.post('http://127.0.0.1:8080/project/all')
            .then((res) => {
                setStatus(res.data)
            })
    };
    function MyWork(id) {
        axios.get('http://127.0.0.1:8080/project/' + id)
            .then((res) => {
                setOneProject(res.data)
                console.log(res.data);
            })
        setClassActive('viveGallery')
    };

    useEffect(() => {
        listPhoto()
    }, [])
    return (

        <>
            <Link className={styles.link} to={"/"}>Powrót</Link>
            <Container>
                {status.map((project) => {
                    return (
                        <div className={styles.conception} key={project._id}>
                            <div className={styles.textConception}>
                                <H2>{project.title}</H2>
                                <p>{project.description}</p>
                            </div>

                            <div className={styles.imgPhoto}>
                                <img src={'http://localhost:8080/photo/' + project.hederPhoto} alt="foto profil" />
                                <span onClick={() => MyWork(project._id)} className={styles.image}>
                                    <BsImages />
                                </span>
                            </div>
                        </div>
                    )
                })}

            </Container>
            <div className={styles[classActive]} >
                <div onClick={()=>setClassActive('close')} className={styles.iconClose}>
                  <BsXLg/>  
                </div>
                
                {oneProject.gallery.map((photo) => {
                    return (
                        <div key={photo._id} className={styles.position}>
                            <img src={'http://localhost:8080/photo/' + photo.photo} alt="foto profil" />
                        </div>
                    )
                })}
            </div>
        </>

    )
}