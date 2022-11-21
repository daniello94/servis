import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
/* components */
import Container from "../components/Container"
import H2 from "../components/H2";
import Button from "../components/Button";
import Error from "../components/Error";
/* style */
import styles from "../style/EditProject.module.scss"


export default function EditProject() {
    let { id } = useParams()

    const [oneProject, setOneProject] = useState({
        title: '',
        description: '',
        gallery: []

    });
    const [form, setForm] = useState({
        photo: ''
    });
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    function MyWork(id) {
        axios.get('http://127.0.0.1:8080/project/' + id)
            .then((res) => {
                setOneProject(res.data)
            })
    }

    const addGallery = () => {
        const { photo } = form
        const formData = new FormData();

        formData.append('photo', photo);
        axios.post('http://127.0.0.1:8080/photo/add', formData)
            .then(() => {
                MyWork(id)
            })
    }

    function addInputPhoto(id) {
        if (!form.photo.name) {
            return setError("wybierz plik");
        } else {
            const photo = form.photo.name
            axios.put('http://127.0.0.1:8080/project/photo/' + id, {
                photo
            })
                .then((res) => {
                    setOneProject(res.data)

                })
            addGallery()
            MyWork(id)
            setError('')

        }

    }

    function addDescription() {
        if (!description) {
            return setError('Musisz dodoać opis')
        } else {
            axios.put('http://127.0.0.1:8080/project/update/' + id, {
                description: description
            })
                .then(() => {
                    MyWork(id)
                })
            setDescription('')
            setError('')
        }

    }

    function editTitle() {
        if (!title) {
            return setError("Musisz podać tytuł")
        } else {
            axios.put('http://127.0.0.1:8080/project/update/' + id, {
                title: title
            })
                .then(() => {
                    MyWork(id)
                })
            setTitle('')
            setError('')
        }

    };

    function addHederPhoto(namePhoto) {

        axios.put('http://127.0.0.1:8080/project/update/' + id, {
            hederPhoto: namePhoto.name,
            quantity: namePhoto.idPhoto
        })
            .then(() => {
                MyWork(id)
            })
    }


    const handlePhoto = async (e) => {
        setForm({
            ...form,
            photo: e.target.files[0],

        })

    }

    useEffect(() => {
        MyWork(id)
    }, [id])

    return (
        <Container>
            <div className={styles.viveProject}>
                <H2>{oneProject.title}</H2>
                <div className={styles.photo}>
                    {oneProject.gallery?.map((photo) => {
                        const namePhoto = {
                            name: photo.photo,
                            idPhoto: photo._id
                        }
                        return (
                            <div key={photo._id} className={styles.vivePhoto} >
                                <img src={'http://localhost:8080/photo/' + photo.photo} alt="foto profil" />
                                {oneProject.quantity !== photo._id && (
                                    <Button onClick={(e) => {
                                        e.preventDefault()
                                        addHederPhoto(namePhoto)
                                    }}>Ustaw jako głowne</Button>
                                )}
                            </div>

                        )
                    })}
                </div>
                <H2>Opis</H2>
                <p>{oneProject.description}</p>
            </div>

            <div className={styles.fromEdit}>
                <Error>{error}</Error>
                <form encType="multipart/form-data">
                    <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} />
                    <Button isAlternative={true} onClick={(e) => {
                        e.preventDefault()
                        addInputPhoto(id)
                    }}>Dodaj zdjęcie</Button>
                </form>
                <form>
                    <input
                        type='text'
                        name="title"
                        value={title}
                        placeholder="Wpisz tytuł"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button isAlternative={true} type="submit" onClick={(e) => {
                        e.preventDefault()
                        editTitle()
                    }}>Zmień Tytuł</Button>
                </form>
                <form>

                    <textarea
                        type='text'
                        name="description"
                        value={description}
                        placeholder='wpisz opis'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button isAlternative={true} type="submit" onClick={(e) => {
                        e.preventDefault()
                        addDescription()
                    }}>Zmień Opis</Button>
                </form>
            </div>
            <Link className={styles.mainItem} to="/administrationPanel">Wróć</Link>
        </Container>


    )
}