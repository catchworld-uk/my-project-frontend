import { createContext, useContext, useState, useEffect} from "react";
import api from '../services/api.js'
import {useNavigate} from "react-router-dom";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get("/me");
                setUser({
                    userDetails: {
                        firstName: response.data.first_name,
                        lastName: response.data.last_name,
                        email: response.data.email,
                        fullName: response.data.first_name + " " + response.data.last_name,
                    },
                });
                if (location.pathname === "/login" || location.pathname === "/register") {
                    navigate("/homepage");
                }

                // // // If user logged in already redirect to homepage.
                // navigate("/homepage");
            } catch {
                setUser(null);
                // If user isn't logged in redirect to login page.
                // navigate('/login')
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [location.pathname]);



    async function login(email, password) {
        try {
            await api.post('login/', {email, password});

            const response = await api.get('/homepage');
            setUser({userDetails: {
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    fullName: response.data.first_name + " " + response.data.last_name,
                }})

            return true;
        } catch (error) {
            if (error.response?.data?.detail) {
                throw new Error(error.response.data.detail);
            }
            throw new Error('Login failed');
        }
    }

    async function register(email, password, confirmPassword, firstName, lastName) {
        try {
            await api.post('register/', {email:email, password:password, confirm_password: confirmPassword,
                first_name: firstName, last_name: lastName})
            return true;
        } catch (error) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw new Error('Account Creation Failed')
        }
    }


    async function logout() {
        try {
            await api.post('logout/')
        } catch (error) {

        }

        setUser(null);
        navigate('/login')
    }

    return (
        <AuthContext.Provider value = {{user, loading, login, logout, register}}>
            {/*{children}*/}
            {loading ? <div>Loading..</div> : children}
        </AuthContext.Provider>
    )
}

export function UseAuth() {
    return useContext(AuthContext);
}
