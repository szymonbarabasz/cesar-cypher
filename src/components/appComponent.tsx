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
const coded: string[] = [];

interface AppConstructor {
  encrypted: string;
  rnd: number;
  decrypted: string;
  history: number[];
}

export default class App extends React.Component {
  state: AppConstructor;
  constructor(props: AppConstructor) {
    super(props);
    this.state = {
      encrypted: "",
      rnd: 0,
      decrypted: "",
      history: [],
    };
    this.handleEncryptIn = this.handleEncryptIn.bind(this);
    this.handleDecrypt = this.handleDecrypt.bind(this);
  }

  typingSetState(rnd: number) {
    this.setState({
      encrypted: coded.join(""),
      rnd: rnd,
      history: [...this.state.history, rnd],
    });
  }

  removingText(targetValue: string) {
    coded.splice(targetValue.length, coded.length - targetValue.length);
    this.setState({
      encrypted: coded.join(""),
      history: this.state.history.filter(
        (randomNumber) =>
          this.state.history.indexOf(randomNumber) <= targetValue.length - 1
      ),
    });
  }

  handleEncryptIn(e: React.ChangeEvent<HTMLInputElement>): void {
    // let coded = prompt("what do you want to encrypt?");
    const targetValue = e.target.value;
    const lastEl = targetValue[targetValue.length - 1];
    const rnd = Math.floor(Math.random() * (24 - 2 + 1) + 1);
    console.log(rnd);

    if (targetValue.length < coded.length) {
      return this.removingText(targetValue);
    } else if (src.indexOf(lastEl) + rnd <= src.length - 1) {
      return (
        coded.splice(coded.length, 1, src[src.indexOf(lastEl) + rnd]),
        this.typingSetState(rnd)
      );
    } else {
      return (
        coded.splice(
          coded.length,
          1,
          src[src.indexOf(lastEl) + rnd - src.length]
        ),
        this.typingSetState(rnd)
      );
    }
  }

  handleDecrypt(): void {
    let decryptedMsg = this.state.encrypted.split("");
    const historyArr = this.state.history;
    decryptedMsg = decryptedMsg.map((el, i) => {
      return src.indexOf(el) - historyArr[i] < 0
        ? (el = src[src.indexOf(el) - historyArr[i] + src.length])
        : (el = src[src.indexOf(el) - historyArr[i]]);
    });
    console.log(decryptedMsg);
    this.setState({ decrypted: decryptedMsg.join("") });
  }

  render() {
    return (
      <div className="app">
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
