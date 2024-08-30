import { BrowserRouter , Routes, Route } from "react-router-dom";
import { Registerfunction } from "./Components/Register";
import { Login } from "./Components/Login";
import { HomePage } from "./Components/Home";
export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/login" Component={Login}/>
                <Route path="/register" Component={Registerfunction} />
                <Route path="/home" Component={HomePage}></Route>
            </Routes>
        </BrowserRouter>
    );
}