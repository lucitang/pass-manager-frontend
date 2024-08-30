
export async function generatevaultkey(email:string, password:string){
    const combined = `${email}:${password}`;
    const enc = new TextEncoder();
    const combinedBuffer = enc.encode(combined);  
    const combinedKey = await window.crypto.subtle.importKey(
      'raw', 
      combinedBuffer, 
      { name: 'PBKDF2' }, 
      false, 
      ['deriveKey']
    );
    
    const combinedHash = await window.crypto.subtle.digest('SHA-256', combinedBuffer);
    const salt = new Uint8Array (combinedHash).slice(0, 16);

    const iterations = 60200;
    const hashAlgorithm = 'SHA-256';

    const derivedKey = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: iterations,
          hash: hashAlgorithm
        },
        combinedKey,
        { name: 'AES-GCM', length: 256 }, // Derive a 256-bit key for AES-GCM encryption
        true,
        ['encrypt', 'decrypt']
      );

      const rawDerivedKey = await window.crypto.subtle.exportKey('raw', derivedKey);
      const derivedVaultKeyUint8 = Array.from(new Uint8Array(rawDerivedKey));
      return derivedVaultKeyUint8;
      
}
export function to_hex(derivedkey: number[] | null): string{
  if (derivedkey != null){
    const HexKey = Array.from(derivedkey).map(b => b.toString(16).padStart(2, '0')).join(''); 
    return HexKey;
  } 
  else {
    return "cannot derive";
  }
}

export async function generateauthkey(vaultKey:string, password:string){
    const derivedAuthKeyUint8 = generatevaultkey(vaultKey, password);
    return derivedAuthKeyUint8;
      
}