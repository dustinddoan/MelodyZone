import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux"
import Loader from "utils.js/loader"
import { useNavigate } from "react-router-dom";


// export default function authGuard(){
//     const AuthenticationCheck = (props) => {
//         const [isAuth, setIsAuth] = useState(false)
//         const users = useSelector(state => state.users)
//         const navigate = useNavigate();

//         useEffect(() => {
//             // const goToDashBoard = () => navigate('/')
//             if (!users.auth) {
//                 navigate('/');
//             } else {
//                 setIsAuth(true);
//             }
//         }, [navigate, users])

//         if (!isAuth) {
//             return (
//                 <Loader full={true}/>
//             )
//         } else {
//             return (
//                 <>{children}</>
//             )
//         }
//     }
//     return AuthenticationCheck;
// }

const AuthGuard = ({requiredToken, children}) => {
    const [isAuth, setIsAuth] = useState(false)
    const users = useSelector(state => state.users)
    const navigate = useNavigate();

    const hasAcess = requiredToken && users.auth

    useEffect(() => {
        if (!hasAcess) {
            navigate('/');
        } else {
            setIsAuth(true);
        }
    }, [navigate, hasAcess])

    return (
        <>
            {hasAcess ?
            children
            :
            <Loader full={true}/>
            }
        </>
    )
}

export default AuthGuard;