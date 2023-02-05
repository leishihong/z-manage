import CryptoJS from "crypto-js";

const DES_KEY = "Fpbi5jb2";
const CryptoSecret = "__MANAGE_TASTE_CryptoJS_Secret__";

const keyHex = CryptoJS.enc.Utf8.parse(DES_KEY);

/**
 * 加密数据
 * @param data - 数据
 * @param secret - 密钥
 */
export function encrypto(data: any) {
  const newData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(newData, CryptoSecret).toString();
}

/**
 * 解密数据
 * @param ciphertext - 密文
 * @param secret - 密钥
 */
export function decrypto(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoSecret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (originalText) {
    return JSON.parse(originalText);
  }
  return null;
}

// 加密
// 采用 DES

//DES加密
// export function encryptByDES(message: string) {
//   const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.ZeroPadding
//   })
//   return encrypted.ciphertext.toString()
// }

//DES加密
// export function decryptByDES(ciphertext: string) {
//   const decrypted = CryptoJS.DES.decrypt(
//     {
//       ciphertext: CryptoJS.enc.Hex.parse(ciphertext),
//     },
//     keyHex,
//     {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.ZeroPadding,
//     },
//   );
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
