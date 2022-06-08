import React from "react";
import "../styles/index.css";

export function InputEnter(props: {
  onEncryptIn(e: React.ChangeEvent<HTMLInputElement>): void;
}): JSX.Element {
  return (
    <React.Fragment>
      <div className="content input">
        <p>Enter text you want to encrypt:</p>
      </div>
      <input type="text" onChange={props.onEncryptIn} />
    </React.Fragment>
  );
}

export function Encryptedmsg(props: { coded: string }): JSX.Element {
  return (
    <h2 className="content coded">
      <p>Encrypted message:</p>
      <p>{props.coded}</p>
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
    <h2 className="content decoded">
      <p>{props.decoded}</p>
    </h2>
  );
}
