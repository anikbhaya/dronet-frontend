import { useEffect, useState } from "react"
import initializeAuth from "../Firebase/firebase.init"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, getIdToken, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useHistory } from "react-router";
import axios from "axios";

initializeAuth()


const useFirebase = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [adminChecking, setAdminChecking] = useState(true)
    
    const [isAdmin, setIsAdmin] = useState(false)

    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth()
    const history = useHistory()
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)

    }

    const customSignUp = (email, password) => {
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const customSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setUser({})

            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, user => {
            if (user) {
                getIdToken(user)
                .then(idToken => {sessionStorage.setItem('idToken', `Bearar ${idToken}`)})
                
                setUser(user)

            }
            setIsLoading(false)
        })
    }, [])


    useEffect( () => {
        axios.get(`https://hidden-anchorage-77198.herokuapp.com/isAdmin?userEmail=${user.email}`)
        .then(async res => {
            await setIsAdmin(res?.data?.isAdmin)
                setAdminChecking(false)
            
        })
        
    },[user.email])

    return {
        user,
        error,
        isAdmin,
        setIsAdmin,
        googleSignIn,
        customSignIn,
        customSignUp,
        logOut,
        setError,
        setIsLoading,
        isLoading
    }
}

export default useFirebase
