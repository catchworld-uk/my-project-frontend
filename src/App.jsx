import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import {AuthProvider} from "./components/Auth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateLayout from "./components/PrivateLayout.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Handover from "./pages/Handover.jsx";
import HandoverList from "./pages/HandoverList.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                    <Routes>
                        {/*None Auth Routes*/}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/*Auth Routes*/}
                        <Route element={<PrivateRoute />}>
                            {/*Ensure Auth any pages that need a navbar are wrapped inside privatelayout*/}
                            <Route element={<PrivateLayout />}>
                                <Route path="/homepage" element={<Homepage />} />
                                <Route path="/" element={<PublicRoute />} />
                                <Route path="/handover" element={<Handover />} />
                                <Route path="/handover-list" element={<HandoverList />} />

                            </Route>
                        </Route>
                    </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;
