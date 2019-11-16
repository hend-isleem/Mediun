/* eslint-disable import/extensions */
import React from 'react';
import '../../public/style.css';

class ArticleWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.author
    };
  }

  render() {
    return (
      <div>
        <div className='container writer-container'>
          <div className='writer'>
            <img src={this.props.author.pic} alt='' id='writerImg' />
            <div className='flex-container'>
              <div className='info'>
                <span className='up1'>
                  <span id='writtenBy'>Written By</span>
                </span>
                <span className='middle1'>
                  <span id='autohrName'>{this.props.author.name}</span>
                </span>
                <span className='bottom1'>
                  <span id='authorBio'>{this.props.author.bio}</span>
                </span>
              </div>
              <span id='writerfollowBtn'>
                <button>Follow</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleWriter;
