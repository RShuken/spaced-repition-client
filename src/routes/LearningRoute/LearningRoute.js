import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LearningRoute.css';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextWord: '',
      totalScore: 0,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      answer: '',
    };
  }

  componentDidMount() {
    this.fetchHead();
    this.fetchLanguage();
  }

  fetchLanguage() {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(`${API_ENDPOINT}/language`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        console.log('this is the server response from /language', data);
      })
      .catch((err) => console.log(err.message));
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
      .then((data) => {
        console.log('this is the server response from /head', data);
        this.setState({
          nextWord: data.nextWord,
          totalScore: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount,
        });
      })
      .catch((err) => console.log(err.message));
  }

  updateAnswer = (e) => {
    this.setState({ answer: e.target.value });
  };  

  checkGuess= () => {
    let userGuess = this.state.answer;
    const { API_ENDPOINT } = config;
    console.log('check guess is running and this is the user guess', userGuess);
    fetch(`${API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ guess: this.state.answer }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('this is the guess return data', data);
        //this.context.setNextWord(data);
      });
  }

  renderTranslate() {
    return (
      <div className='translateWordContainer'>
        <h1>Translate the word:</h1>
        <h1>{this.state.nextWord}</h1>
        <p>Your total score is: {this.state.totalScore}</p>
        
          <h2>What is the correct translation in English?</h2>
          <input
            type='text'
            id='answer'
            name='answer'
            onChange={this.updateAnswer}
            placeholder='Guess Here'
          ></input>
          <button onClick={this.checkGuess}>Submit</button>
        
        <h3>
          {' '}
          You have answered this word correctly {
            this.state.wordCorrectCount
          }{' '}
          times
        </h3>
        <h3>
          {' '}
          You have answered this word incorrectly{' '}
          {this.state.wordIncorrectCount} times
        </h3>
      </div>
    );
  }

  render() {
    return (
      <div className='translateWrapper'>
        <section>
          {this.renderTranslate()}
        </section>
      </div>
    );
  }
}

export default LearningRoute;
