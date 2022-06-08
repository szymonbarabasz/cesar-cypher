import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import ErrorBoundary from "./errorCatch";
import App from "./components/appComponent";

class PresentationComponent extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(<PresentationComponent />, document.getElementById("root"));
