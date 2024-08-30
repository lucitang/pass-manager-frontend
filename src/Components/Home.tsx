import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../State/Store';
import {PassVault, Login} from '../vault';
import { generatevaultkey, to_hex } from '../Crypto';


export const HomePage = () => {
    const value = useSelector((state:RootState) => state.auth);


    

    return (<div>
        <h1>
            Login:{value.result}
            email:{value.email}
            authKey:{to_hex(value.authKey)}
            vaultKey:{to_hex(value.vaultKey)}
        </h1>
    </div>
    );
}