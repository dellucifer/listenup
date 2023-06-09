import React, { useRef, useEffect } from 'react'
import './Login.css'
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { auth, googleProvider, githubProvider, facebookProvider, twitterProvider } from '../../firebase';
import db from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../stores/userSlice'

function Login() {
    const user = useSelector(selectUser);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const defaultURL = process.env.REACT_APP_DEFAULT_PhotoURL;

    const store = (authUser) => {

        // pending checkblocks 

        // if user exists previously
        db
            .collection('users')
            .doc(authUser?.uid)
            .onSnapshot(snap => {
                if (snap.data()) {
                    return;
                } else {
                    // updating db
                    db
                        .collection('users')
                        .doc(authUser?.uid)
                        .set({
                            email: authUser?.email,
                            username: authUser?.displayName,
                            photoURL: authUser?.photoURL,
                            mstatus: 'NA',
                            uploads: '0',
                            vidUploads: '0',
                            audUploads: '0',
                            favourites: [],
                        })
                }
            })
    }

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
        }).catch((error) => {
            alert(error.message)
        })

    }

    const googleLogin = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                store(result.user)
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    const githubLogin = () => {
        auth.signInWithPopup(githubProvider)
            .then((result) => {
                store(result.user)
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    const facebookLogin = () => {
        auth.signInWithPopup(facebookProvider)
            .then((result) => {
                store(result.user)
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    const twitterLogin = () => {
        auth.signInWithPopup(twitterProvider)
            .then((result) => {
                store(result.user)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className='login__wrapper'>
            <div className='login__container'>
                <div className='login__form__wrapper'>
                    <img className='login__logo' src={'https://logowik.com/content/uploads/images/674_spotify1.jpg'}
                        alt='SSDC' />
                    <form className='login__form'>
                        <span>
                            <input ref={emailRef} type="text" placeholder='E-mail' autoComplete="on" />
                        </span>
                        <span>
                            <input ref={passwordRef} type="password" placeholder='Password' autoComplete="on" />
                        </span>
                    </form>
                    <button onClick={login} className='login__button'>Sign In</button>
                    <div className='login__actions'>
                        <Link to='/forgotpassword'>Forgot Password?</Link>
                        <Link to='/register'>Sign Up</Link>
                    </div>
                    <div className='auth__options'>
                        <p>or you can sign in with</p>
                        <div className='login__options'>
                            <AiFillGoogleCircle onClick={googleLogin} className='logo__google login__option__logos' size={'30'} />
                            <AiFillGithub onClick={githubLogin} className='logo__github login__option__logos' size={'30'} />
                            <BsLinkedin onClick={twitterLogin} className='logo__linkedin login__option__logos' size={'25'} style={{ borderRadius: '50%' }} />
                            <BsFacebook onClick={facebookLogin} className='logo__facebook login__option__logos' size={'25'} />
                        </div>
                    </div>
                    <div className='welcome__note'>
                        <h3>Welcome to Listenup</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login