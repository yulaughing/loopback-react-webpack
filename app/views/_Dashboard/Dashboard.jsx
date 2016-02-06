import React from 'react';
import style from './Dashboard.scss';
import client from 'loopback-client';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isConnected: client.network.isConnected };
  }

  renderStatus() {
    let status;
    if (this.state.isConnected) {
      status = (
        <h1 className={style.connected}>
          Connected!
        </h1>
      );
    } else {
      status = (
        <h1 className={style.disconnected}>
          Not Connected
        </h1>
      );
    }
    return status;
  }

  render() {
    return (
      <div>
        {this.renderStatus()}
        <p>Loopback client successfully built with browserfiy
          and accessed within React SPA built with webpack.</p>
      </div>
    );
  }

}

module.exports = App;
