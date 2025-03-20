/**
 * Returns SHA hash from supplied message
 * (https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest)
 *
 * @param   {String} algorithm.
 * @param   {String} message.
 * @returns {String} hash as hex string.
 *
 * @example
 *   digestMessage("SHA-256", "message").then(digestHex => console.log(digestHex));
 *   const digestHex = await digestMessage("SHA-256", "message");
 */
async function digestMessage(algorithm, message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest(algorithm, msgUint8);    // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

function sha256(message) {
    return digestMessage("SHA-256", message);
}

function sha512(message) {
    return digestMessage("SHA-512", message);
}
