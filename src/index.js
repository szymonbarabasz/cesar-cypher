import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ErrorBoundary } from "./errorCatch.js";

let src =
  "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUWVXYZŹŻaąbcćdeęfghijklłmnńoópqrsśtuwvxyzźż1234567890 ";
src = src.split("");
let tokenSrc = "-URFe74Nw8KduZd6fZmjyTDBa";
tokenSrc = tokenSrc.split("");
let coded = [];

function InputEnter(props) {
  return (
    <React.Fragment>
      <div className="content input">
        <p>Enter text you want to encrypt:</p>
      </div>
      <input type="text" onChange={props.onEncryptIn} />
    </React.Fragment>
  );
}

// function Codebtn(props) {
//   return (
//     <button className="codebtn" onClick={props.onEncryptIn}>
//       <p>Encrypt!</p>
//     </button>
//   );
// }

function Encryptedmsg(props) {
  return (
    <h2 className="content coded">
      <p>{props.coded}</p>
      <p>Token to decode:</p>
      <p>{props.token}</p>
    </h2>
  );
}

function Decodebtn(props) {
  return (
    <button className="decodeBtn" onClick={props.onDecrypt}>
      <p>Decrypt!</p>
    </button>
  );
}

function Decodedmsg(props) {
  return (
    <h2 className="content decoded">
      <p>{props.decoded}</p>
    </h2>
  );
}

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encrypted: "",
      token: [],
      rnd: 0,
      decrypted: "",
      history: [],
    };
    this.handleEncryptIn = this.handleEncryptIn.bind(this);
    this.handleDecrypt = this.handleDecrypt.bind(this);
  }

  handleEncryptIn(e) {
    // let coded = prompt("what do you want to encrypt?");
    let targetValue = e.target.value;
    let rnd = Math.floor(Math.random() * (24 - 2 + 1) + 1);
    console.log(rnd);

    //kod do poprawy w celu naprawy usuwania
    // let rndHistory = this.state.history
    // function backspace() {
    //   coded = coded.filter((sign, i, src) => {
    //     if (src.indexOf(sign) - rnd >= 0) {
    //       return (
    //         src[src.indexOf(sign) - rndHistory[i]] === targetValue[i]
    //       );
    //     } else {
    //       return (
    //         src[src.indexOf(sign) - rndHistory[i] + src.length] ===
    //         targetValue[i]
    //       );
    //     }
    //   });
    // }

    let el = targetValue[targetValue.length - 1];
    if (targetValue.length < coded.length) {
      return (
        coded.pop(),
        this.setState({
          encrypted: coded,
          token: this.state.token.filter(
            (tokenNumber) =>
              this.state.token.indexOf(tokenNumber) <= targetValue.length - 1
          ),
          history: this.state.history.filter(
            (randomNumber) =>
              this.state.history.indexOf(randomNumber) <= targetValue.length - 1
          ),
        }),
        console.log(this.state.history),
        console.log(coded)
      );
    } else if (src.indexOf(el) + rnd <= src.length - 1) {
      return (
        coded.splice(coded.length, 1, src[src.indexOf(el) + rnd]),
        this.setState({
          encrypted: coded,
          token: [...this.state.token, tokenSrc[rnd]],
          rnd: rnd,
          history: [...this.state.history, rnd],
        }),
        console.log(this.state.history),
        console.log(coded)
      );
    } else {
      return (
        coded.splice(coded.length, 1, src[src.indexOf(el) + rnd - src.length]),
        this.setState({
          encrypted: coded,
          token: [...this.state.token, tokenSrc[rnd]],
          rnd: rnd,
          history: [...this.state.history, rnd],
        }),
        console.log(this.state.history),
        console.log(coded)
      );
    }
  }

  handleDecrypt() {
    let decrypted = this.state.encrypted;
    let rnd = this.state.rnd;
    decrypted = decrypted.split("");
    decrypted.forEach((el, i, decrypted) => {
      if (src.indexOf(el) - rnd >= 0) {
        return decrypted.splice(i, 1, src[src.indexOf(el) - rnd]);
      } else {
        return decrypted.splice(i, 1, src[src.indexOf(el) - rnd + src.length]);
      }
    });
    decrypted = decrypted.join("");
    console.log(decrypted);
    this.setState({ decrypted: decrypted });
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="all">
          <h1 className="content title">
            <p>Ceasar Cypher</p>
          </h1>
          <InputEnter onEncryptIn={this.handleEncryptIn} />
          {/* <Codebtn onEncryptIn={this.handleEncryptIn} /> */}
          <Encryptedmsg coded={this.state.encrypted} token={this.state.token} />
          <Decodebtn
            onDecrypt={this.handleDecrypt}
            coded={this.state.encrypted}
            rnd={this.state.rnd}
          />
          <Decodedmsg decoded={this.state.decrypted} />
        </div>
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(<All />, document.getElementById("root"));
