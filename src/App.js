import React from 'react';
import kanyeIcon from './kanye2-512.png';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kanyeQuote: '',
      bgcol: 1,
      buttonLabel: ''
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    this.getNewQuote();
  }

  getNewQuote() {
    this.setState({
      buttonLabel: 'fetching…'
    });
    let promise = fetch(`https://api.kanye.rest`);
    promise.then(res => res.json()).then(result => {
        // console.log(result);
        const newQuote = result.quote;
        this.setState({
          kanyeQuote: newQuote,
          bgcol: Math.floor(Math.random() * 5),
          buttonLabel: 'Keep \'em coming Kanye!'
        });
      }).catch(error => {alert(error)});
  }

  render () {
    return (
      <div id="quote-box" className={`container-fluid bgcolor-${this.state.bgcol}`}>
        <img src={kanyeIcon} className="kanye-icon" alt="logo" />
        <div className="row-fluid w-100 container-quote-and-buttons">
          <div className="col-12 col-lg-7">
            <div className="quote-box">
              <div id="text" className="quote-paragraph">
                "{this.state.kanyeQuote}"
              </div>
              <span id="author" className="author-span">Kanye West</span>
            </div>
            <div className="button-row">
              <div className="social-links">
                <a 
                  id="tweet-quote" 
                  className="btn btn-social" 
                  href={`http://twitter.com/intent/tweet?text="${this.state.kanyeQuote}" – Kanye West`} 
                  rel="noopener noreferrer" 
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <button
                className="btn"
                id="new-quote"
                onClick={this.getNewQuote}
              >
                {this.state.buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
