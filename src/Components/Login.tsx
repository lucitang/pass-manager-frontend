import axios from "axios";
import { generateauthkey, generatevaultkey,to_hex } from "../Crypto";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../State/authSlice";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const vaultKeyuint8 = await generatevaultkey(email, pass);
            const vaultKeyHex = to_hex(vaultKeyuint8);
            const authKeyuint8 = await generateauthkey(vaultKeyHex, pass);
            const authKeyHex = to_hex(authKeyuint8);

            const response = await axios.get('http://127.0.0.1:8080/api/auth', {
                headers: {
                    'x-auth-key': authKeyHex,               
                },
            }
            );
            console.log(authKeyHex)
        if (response.status === 200){
            const data = await response.data;
            console.log(data);
            dispatch(setUserData({data, email, vaultKeyuint8, authKeyuint8}));
            navigate("/home");
        }
        else {
            console.error('Failed to authenticate');
        }
        }catch(err){
            if (axios.isAxiosError(err) && err.response) {
                setError(JSON.stringify(err.response.data, null, 2));
              } else {
                setError('An unexpected error occurred');
              }
        }
    }
        return(
            <>
            <form onSubmit={handlesubmit}>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input 
                            type="text"
                            value = {pass}
                            onChange={(e) =>setPass(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
    
            {response && (
            <div>
              <h3>Response:</h3>
              <pre>{response}</pre>
            </div>
          )}
    
          {error && (
            <div>
              <h3>Error:</h3>
              <pre>{error}</pre>
            </div>
          )}
    
            </>
        );
}