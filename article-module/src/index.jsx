/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import ArticleHeading from './components/ArticleHeading.jsx';
import ArticleContent from './components/ArticleContent.jsx';
import ArticleWriter from './components/ArticleWriter.jsx';
import '../public/style.css';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      author: null
    };
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.updateContent();
  }

  updateContent() {
    const that = this;
    this.eventSource = new EventSource(
      'https://evening-stream-39951.herokuapp.com/stream'
      // `http://localhost:3002/stream`
    );
    this.eventSource.onopen = () => {
      console.log('es open');
    };
    this.eventSource.onerror = () => {
      console.log('no response');
    };
    this.eventSource.onmessage = (result) => {
      const parsedResult = JSON.parse(result.data);
      that.setState({
        article: parsedResult.article[0],
        author: parsedResult.user
      });
    };
  }

  render() {
    return (
      <div>
        {this.state.article ? (
          <>
            <ArticleHeading
              article={this.state.article}
              author={this.state.author}
            />
            <ArticleContent article={this.state.article} />
            <ArticleWriter
              article={this.state.article}
              author={this.state.author}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <img src='https://www.tmogroup.asia/wp-content/uploads/2018/05/001gif.gif?x96783' />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Article />, document.getElementById('article'));
