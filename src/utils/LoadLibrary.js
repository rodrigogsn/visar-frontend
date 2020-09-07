import React from "react";

export default class LoadLibrary extends React.Component {
  /**
   * constructor
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
    };
  }

  /**
   * onLoad
   */
  onLoad() {
    this.setState({ loaded: true });
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const { loaded } = this.state;

    if (
      loaded ||
      document.querySelector(
        `script[src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js"]`
      )
    ) {
      this.setState({ loaded: true });
      return;
    }

    const tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src =
      "https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";
    tag.onload = this.onLoad.bind(this);

    document.body.appendChild(tag);
  }

  /**
   * render
   */
  render() {
    return this.state.loaded ? this.props.children : <div></div>;
  }
}
