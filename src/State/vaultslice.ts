import { PassVault } from "../vault";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VaultState {
    vault: PassVault| null
}

const initialState: VaultState = {
    vault: null,
};

// const vaultslice = createSlice{

// }