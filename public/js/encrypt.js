let iv = null;
let useIV = true;
let Hmac = null;
function encrypt(clearTextData, hashedPwd, useIV){
    if (useIV){
      let randomBytes = CryptoJS.lib.WordArray.random(128/8).toString();
      //to generate random initialization vector value 
      iv = CryptoJS.enc.Hex.parse(randomBytes);
//       console.log(`iv : ${iv}`);
      // old method (wrong) which used first 16 bytes of key (hashed pwd)
      // CryptoJS.enc.Hex.parse(key);
      //encryption of message using aes256
    message = CryptoJS.AES.encrypt(clearTextData, CryptoJS.enc.Hex.parse(hashedPwd),{iv: iv});
//     console.log(`message.iv : ${message.iv}`);
//     console.log(`message: ${message}`);
//     console.log(`message.ciphertext ${message.ciphertext}`);
//     console.log(`message.salt ${message.salt}`);
    }
  else{
    message = CryptoJS.AES.encrypt(clearTextData, hashedPwd);
  }
  
    return message.toString();
}

function decrypt(encryptedData, hashedPwd, useIV){
  let code;  
  if (useIV){
//     console.log(`hashedPwd: ${hashedPwd}`);
    // we use original created iv
    // we now use the original _random_ iv which
    // is the correct way.  IV will be passed
    // in the clear to decrypting side
    // let iv = CryptoJS.enc.Hex.parse(key);
//     console.log(`iv ${iv}`);
    code = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(hashedPwd),{iv:iv});
//     console.log(`code ${code}`);
    //alert (typeof(code));
//     console.log(code);
    }
  else{
//     console.log("decrypting with no IV");
    code = CryptoJS.AES.decrypt(encryptedData, hashedPwd);
//     console.log(code);
    
  }
  let decryptedMessage = "";
  if (code.sigBytes < 0){
    decryptedMessage = `Couldn't decrypt! It is probable that an incorrect password was used.`;
    return decryptedMessage;
  }
  decryptedMessage = code.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}

/*
function generateHmac(){
  let cleartext_pwd = document.querySelector("#password").value;
  let encryptedData = document.querySelector("#cipher_output")
  let macKey = sha256(cleartext_pwd);
  console.log(`key: ${macKey}`);
  let hash = sha256.hmac(`${iv}:${encryptedData}`, macKey.toString());
  Hmac = hash;
  console.log(`mac : ${Hmac}`);
  document.querySelector("#hmac").innerHTML = Hmac;
}

function validate(){
    let output = "The MAC is valid.";
    if (!validateMac()){
      output = "The MAC is NOT valid!";
    }
    document.querySelector("#validated").innerHTML = output;
  }

function validateMac(){
    // returns boolean (true if mac matches, otherwise false)
    let cleartext_pwd = document.querySelector("#password").value;
    let encryptedData = document.querySelector("#cipher_output")
    let key = sha256(cleartext_pwd);
    let mac = sha256.hmac(`${iv}:${encryptedData}`, key.toString());
    console.log(`mac : ${mac}`);
    return (mac == Hmac);
}
*/
