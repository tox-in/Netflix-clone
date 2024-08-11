import { useEffect } from 'react';
import { useAuthStore } from "../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
    const { user, authCheck, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        authCheck();
    }, [authCheck]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
