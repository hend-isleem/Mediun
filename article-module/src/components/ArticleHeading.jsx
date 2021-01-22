/* eslint-disable import/extensions */
import React from 'react';
import '../../public/style.css';

class ArticleHeading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      author: this.props.author
    };
    // this.updateContent = this.updateContent.bind(this);
  }

  formatDate() {
    var monthes = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var formatted = new Date(this.props.article.createdAt);
    var theDate =
      monthes[formatted.getMonth()] + ' ' + formatted.getDate() + ',';
    return theDate;
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <div>
        <div className='container'>
          <h1 id='articleTitle'>{this.props.article.title}</h1>
          <h2 id='articleSubTitle'>{this.props.article.subTitle} </h2>
          <div className='authorData'>
            <img src={this.props.author.pic} alt='' />
            <div className='info'>
              <span className='up'>
                <span id='autorName'>{this.props.author.name}</span>
                <span id='followBtn'>
                  <button>Follow</button>
                </span>
              </span>
              <span className='bottom'>
                <span id='createdDate'>{this.formatDate()} </span>
                <span id='readingTime'>
                  {this.props.article.readingTime} min read
                </span>
              </span>
            </div>
          </div>
          <div id='articleImg'>
            <img src={this.props.article.pic} alt='' width='750' height='450' />
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleHeading;
