import React from "react";
import "../styles/index.css";
import {
  InputEnter,
  Encryptedmsg,
  Decodebtn,
  Decodedmsg,
} from "./individualComponents";

const src =
  "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUWVXYZŹŻaąbcćdeęfghijklłmnńoópqrsśtuwvxyzźż1234567890 ".split(
    ""
  );

interface AppConstructor {
  encrypted: string;
  decrypted: string;
  history: number[];
}

export default class App extends React.Component {
  state: AppConstructor;
  constructor(props: AppConstructor) {
    super(props);
    this.state = {
      encrypted: "",
      decrypted: "",
      history: [],
    };
    this.handleEncryptIn = this.handleEncryptIn.bind(this);
    this.handleDecrypt = this.handleDecrypt.bind(this);
  }

  handleEncryptIn(e: React.ChangeEvent<HTMLInputElement>): void {
    const targetValue = e.target.value.split("");
    const historyArr: number[] = [];

    const coded: string[] = targetValue.map((el, i) => {
      const rnd = Math.floor(Math.random() * (24 - 2 + 1) + 1);
      historyArr.push(rnd);
      return src.indexOf(el) + rnd <= src.length - 1
        ? (el = src[src.indexOf(el) + rnd])
        : (el = src[src.indexOf(el) + rnd - src.length]);
    });

    this.setState({
      encrypted: coded.join(""),
      history: historyArr,
      decrypted: targetValue.length ? this.state.decrypted : "",
    });
  }

  handleDecrypt(): void {
    let decryptedMsg = this.state.encrypted.split("");
    const historyArr = this.state.history;
    decryptedMsg = decryptedMsg.map((el, i) => {
      return src.indexOf(el) - historyArr[i] < 0
        ? (el = src[src.indexOf(el) - historyArr[i] + src.length])
        : (el = src[src.indexOf(el) - historyArr[i]]);
    });
    this.setState({ decrypted: decryptedMsg.join("") });
  }

  handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void | null => {
    if (e.key === "Enter") {
      return this.handleDecrypt();
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="app" onKeyDown={this.handleEnter}>
        <h1 className="content title">
          <p>Ceasar Cypher</p>
        </h1>
        <InputEnter onEncryptIn={this.handleEncryptIn} />
        <Encryptedmsg coded={this.state.encrypted} />
        <Decodebtn onDecrypt={this.handleDecrypt} />
        <Decodedmsg decoded={this.state.decrypted} />
      </div>
    );
  }
}