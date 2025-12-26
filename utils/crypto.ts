/**
 * Decryption utilities for encrypted API responses
 * Algorithm: AES-256-CBC with PKCS7 padding
 */

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'VibeSync2025SecureKey1234567890X';

interface EncryptedResponse {
  encrypted: boolean;
  algorithm: string;
  data: string;
  iv: string;
  encoding: string;
}

/**
 * Convert a base64 string to ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Import the encryption key for use with Web Crypto API
 */
async function importKey(): Promise<CryptoKey> {
  const keyData = new TextEncoder().encode(ENCRYPTION_KEY);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-CBC', length: 256 },
    false,
    ['decrypt']
  );
}

/**
 * Decrypt an encrypted API response
 * @param encryptedData - Base64-encoded encrypted data
 * @param ivBase64 - Base64-encoded initialization vector
 * @returns Decrypted data as a JavaScript object
 */
export async function decryptResponse(encryptedData: string, ivBase64: string): Promise<any> {
  try {
    // Convert base64 to ArrayBuffer
    const encryptedBytes = base64ToArrayBuffer(encryptedData);
    const ivBytes = base64ToArrayBuffer(ivBase64);

    // Import the key
    const key = await importKey();

    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      { 
        name: 'AES-CBC', 
        iv: ivBytes
      },
      key,
      encryptedBytes
    );

    // Convert decrypted buffer to string
    const decryptedText = new TextDecoder().decode(decryptedBuffer);

    // Parse JSON
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt API response');
  }
}

/**
 * Check if a response is encrypted and decrypt if necessary
 * @param response - API response (could be encrypted or plain)
 * @returns Decrypted data
 */
export async function handleEncryptedResponse(response: any): Promise<any> {
  // Check if response is encrypted
  if (response && typeof response === 'object' && response.encrypted === true) {
    const encryptedResp = response as EncryptedResponse;
    return await decryptResponse(encryptedResp.data, encryptedResp.iv);
  }
  
  // Return as-is if not encrypted
  return response;
}
