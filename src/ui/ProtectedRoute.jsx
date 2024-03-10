
// eslint-disable-next-line react/prop-types
import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

// eslint-disable-next-line react/prop-types
function ProtectedRoute({children}) {
    const navigate = useNavigate();

    // load the auth user
    const {isAuthenticated, isLoading} = useUser();

    // redirect to the login page for the not auth user
    useEffect(() => {
        if(!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate]);

    // show spinner
    if(isLoading)
        return(
            <FullPage>
                <Spinner/>
            </FullPage>
        );

    // if there is a user render the page
    if(isAuthenticated) return children
 }

 export default ProtectedRoute