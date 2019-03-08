import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl, FormattedMessage } from 'react-intl';
//injectIntl(funkcja, która "wstrzykuje"do komponentu tłumaczeniedlawiadomości(???))

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

export class PostDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.post.name,
      title: this.props.post.title,
      content: this.props.post.content,
    };
  }
  //metoda obsługująca zmiany zachodzące w każdym z pól formularza
  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
  const {props} = this;
    return (
      <div>
        <Helmet title={props.post.title} />
          <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
          <p className={styles['post-desc']}>{props.post.content}</p>
        </div>
      </div>
    );
  }  
}


// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
