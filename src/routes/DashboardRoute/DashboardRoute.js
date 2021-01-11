import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

class DashboardRoute extends Component {
  componentDidMount() {
    this.fetchHead();
  }

  fetchHead() {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(`${API_ENDPOINT}/language/head`, fetchHeaders)
      .then((res) => res.json())
      .then((data) =>
      {
        console.log('this is the server response from /head', data)
      }
      )
      .catch((err) => console.log(err.message));
  }

  render() {
    return <section>implement and style me</section>;
  }
}

export default DashboardRoute;
