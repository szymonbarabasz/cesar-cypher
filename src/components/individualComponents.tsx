import React from "react";
import "../styles/index.css";

export function InputEnter(props: {
  onEncryptIn(e: React.ChangeEvent<HTMLInputElement>): void;
}): JSX.Element {
  return (
    <React.Fragment>
      <div className="content inputLabel">
        <p>Enter text you want to encrypt:</p>
      </div>
      <input
        className="inputElement"
        type="text"
        onChange={props.onEncryptIn}
      />
    </React.Fragment>
  );
}

export function Encryptedmsg(props: { coded: string }): JSX.Element {
  return (
    <h2 className="coded">
      <p className="codedLabel">Encrypted message:</p>
      <p className="codedMessage">{props.coded}</p>
    </h2>
  );
}

export function Decodebtn(props: { onDecrypt(): void }): JSX.Element {
  return (
    <button className="decodeBtn" onClick={props.onDecrypt}>
      <p>Decrypt!</p>
    </button>
  );
}

export function Decodedmsg(props: { decoded: string }): JSX.Element {
  return (
    <h2 className={props.decoded ? "content decoded" : "content empty"}>
      <p>{props.decoded}</p>
    </h2>
  );
}
