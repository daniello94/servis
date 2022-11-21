import { useState } from "react";
import axios from "axios";

/* style */
import styles from "../style/Home.module.scss";

/* routers */
import Menu from "../components/Menu";
import AboutUs from "./AboutUs";
import Login from "./Login";
import OursServices from "../routers/OursServices";

/* components */
import Button from "../components/Button";
import Hr from "../components/Hr";
import H2 from "../components/H2";
import Error from "../components/Error";

/* media */
import videoHeder from "../media/video/budowa.mp4";
import { ImHome } from "react-icons/im";
import { BsXLg } from "react-icons/bs"

export default function Home(props) {
    const [isClose, setClose] = useState('close');
    const [closeLogin, setCloseLogin] = useState('close');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault()
        if (!firstName) {
            return setError("Wpisz Imie")
        } else if (!phoneNumber) {
            return setError('Podaj numer telefonu')
        } else if (phoneNumber.length < 9) {
            return setError("Podany numer jest za któtki")
        } else if (phoneNumber.length > 9) {
            return setError("Podany numer jest za długi")
        } else if (!email) {
            return setError("Wpisz adres Email")
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return setError("To nie jest adres Email")
        } else if (!message) {
            return setError("Wpisz treść swojej wiadomości")
        } else {
            axios.post('http://127.0.0.1:8080/message/add', {
                firstName: firstName,
                phoneNumber: phoneNumber,
                email: email,
                message: message
            })
                .then(() => {
                    setError(<Error isAlternative={true}>Wiadmość została wysłana</Error>)
                    setPhoneNumber('');
                    setEmail('')
                    setFirstName('');
                    setMessage('')
                })
        }
    }

    const onOpen = () => {
        setClose('contact')
    };
    const onClose = () => {
        setClose('close')
        setError('')
    };

    const openLoginWindow = () => {
        setCloseLogin('login')
    };

    const closeLoginWindow = () => {
        setCloseLogin('close')
    };

    return (
        <>
            <div className={styles.heder}>
                <video src={videoHeder} autoPlay loop muted />

                <div className={styles.hederTextContent}>
                    <Menu
                        open={() => openLoginWindow()}
                        userData={props.userData}
                        setUser={props.setUser} />

                    <ImHome className={styles.iconStyle} />
                    <h1>
                        Zbudujemy dla ciebie lepszą przyszłość
                    </h1>
                    <Hr isAlternative={true} />
                    <p>
                        Rzetelne i niezawodne usługi od 2015 roku
                    </p>

                    <div className={styles.hederButtonContent}>
                        <Button isAlternative={true}>
                            Nasze Realizacje
                        </Button>
                        <Button>
                            Kontakt z nami
                        </Button>
                        <Button isBtn3={true} onClick={() => onOpen()}>Napisz teraz </Button>
                    </div>
                </div>
            </div>
            <AboutUs />
            <OursServices />


            <div className={styles[isClose]}>
                <div className={styles.formContact}>
                    <span className={styles.closeContact} onClick={() => onClose()}>x</span>
                    <H2>Napisz do nas</H2>
                    <Error>{error}</Error>
                    <form className={styles.formContactSend} onSubmit={sendMessage}>
                        <input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="imię" />
                        <input
                            type='text'
                            name='phoneNumber'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="telefon" />
                        <input
                            type='text'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email" />
                        <textarea
                            type='text'
                            name='textarea'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Napisz tutaj swoją widomość" />
                        <Button type='submit'>Wyślij</Button>
                    </form>
                </div>
            </div>



            {!props.userData && (
                <div className={styles[closeLogin]}>
                    <div className={styles.closeLogin}>
                        <BsXLg onClick={() => closeLoginWindow()} />
                    </div>
                    <Login
                        userData={props.userData}
                        setUser={props.setUser}
                    />
                </div>
            )}
        </>
    )
};