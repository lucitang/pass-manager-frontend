import axios from "axios";
import React, { useState } from "react";

import { generateauthkey, generatevaultkey , to_hex} from "../Crypto";
import { PassVault } from "../vault";


export const Registerfunction = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlesubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try{
                const vaultKeyuint8 = await generatevaultkey(email, pass);
                const vaultKeyHex = to_hex(vaultKeyuint8);
                const authKeyuint8 = await generateauthkey(vaultKeyHex, pass);
                const authKeyHex = to_hex(authKeyuint8);

                const new_vault = new PassVault(vaultKeyHex);
                

                const response = await axios.get('http://127.0.0.1:8080/api/register', {
                    headers: {
                        'x-email': email,
                        'x-auth-key': authKeyHex,               
                        'x-vault': vaultKeyHex,
                        'Content-Type':'text/plain'
                    },
                }
            );
            console.log(authKeyHex);
            setResponse(JSON.stringify(response.data, null, 2));
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
            <button type="submit">Register</button>
        </form>

        </>
    );
}