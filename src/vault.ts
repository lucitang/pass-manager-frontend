export interface Login {
    name: string|null,
    url: string|null,
    username: string|null,
    password: string|null,
}

export  class PassVault {
    vault: Login[];

    constructor(json_str?: string) {
        this.vault = [];
        if (json_str){
            this.vault.push(JSON.parse(json_str));
        }
    }

    add_login(login:Login){
        this.vault.push(login);
    }

    to_json_str():string{
        return JSON.stringify(this.vault);
    }

    async encrypt_vault(vaultKey:any){
        const json_str = JSON.stringify(this.vault);
        const vault_bytes = new TextEncoder().encode(json_str);
        const fixediv = new Uint8Array(12);
        fixediv.fill(0);

        const key = await window.crypto.subtle.importKey(
            'raw',
            vaultKey,
            {name: 'AES-GCM'},
            false,
            ['encrypt']

        );

        const ciphertext = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: fixediv,
            },
            key,
            vault_bytes
        );
    
        // Return the ciphertext and the IV (you'll need both to decrypt later)
        return { ciphertext: new Uint8Array(ciphertext), iv: fixediv };
    }

    async decrypt_vault(vaultKey:any, encryptedvault: any, iv: any) {
        const key = await window.crypto.subtle.importKey(
            'raw',
            vaultKey,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv:iv,
            },
            key, 
            encryptedvault,
        );
        const decryptedvault = new TextDecoder().decode(decryptedData);
        return decryptedvault;
    }


}
