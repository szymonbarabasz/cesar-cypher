import React from "react";
import "./index.css";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  //Aby dany komponent mógł być granicą błędu, musi korzystać z jednej albo z obu tych metod cyklu życia:
  static getDerivedStateFromError(error) {
    //zaktualizuj stan od którego zależy potem pojawienie się zastępczego UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      //i tutaj renderujemy interfejs zastępczy
      return <h1>Something went kurwa wrong motherfucker</h1>;
    }

    //i stosujemy te granice do wszystkich dzieci komponentu
    return this.props.children;
  }
}
