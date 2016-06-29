import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';
import Loader from '../components/Loader';

import {fetchApiData} from 'actions/ParentCard';
import {Colors} from 'theme/colors';

const styles = {
  wrap: {
    position: 'relative',
    borderTop: '6px solid ' + Colors.smoke,
    padding: '33px',
    borderRadius: 0,
    // boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 1px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '60px'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '21px',
    fontWeight: 300
  },
  iconWrap: {
    width: '50px',
    marginLeft: 'auto',
    textAlign: 'right'
  },
  refreshIcon: {
    cursor: 'pointer',
    fontSize: '20px'
  },
  crossIcon: {
    fontSize: '20px'
  },
  inputWrap: {
    marginLeft: '20px',
    width: '50%'
  },
  input: {
    width: '100%'
  }
};

class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
  }

  static propTypes = {
    meta: PropTypes.object.isRequired
  }

  getData() {
    const { props } = this;
    const {api, query} = props.meta;

    props.fetchApiData(props.id, api, query);
  }

  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {});

    if (this.props.meta.api) {
      this.getData();
    }
  }

  getElement() {
    const {props} = this;
    return React.cloneElement(props.children, {...props});
  }

  refreshData() {
    return () => {
      this.getData();
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateSearch() {
    return (event) => {
      this.setState({
        search: event.target.value
      });
    };
  }

  render() {
    const {props} = this;

    if (props.meta.showHeader) {
      let childProps = Object.assign({}, props, {search: this.state.search});

      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {props.isFetching ? <Loader /> : null}

          <header style={styles.header}>
            <div>
              <span style={styles.title}>{props.meta.title}</span>
            </div>

            {
              props.meta.showSearch
              ? <div style={styles.inputWrap}>
                <input
                  type='text'
                  style={styles.input}
                  onChange={this.updateSearch()} />
              </div>
              : null
            }

            <div style={styles.iconWrap}>
              <FontIcon className='material-icons'
                style={styles.refreshIcon}
                onClick={this.refreshData()}>
                refresh
              </FontIcon>
            </div>
          </header>
          <div> {React.cloneElement(props.children, {...childProps})} </div>
        </Card>
      );
    }
    else {
      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {props.isFetching ? <Loader /> : null}
          {this.getElement()}
        </Card>
      );
    }
  }
}

ParentCard.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {apiData} = state;

  let data = null,
    isFetching = true,
    isError = false,
    errorData = null;

  if (apiData.hasIn(['components', ownProps.id])) {
    const propsById = apiData.getIn(['components', ownProps.id]);

    data = propsById.get('data');
    isFetching = propsById.get('isFetching');
    isError = propsById.get('isError');
    errorData = propsById.get('errorData');
  }

  const duration = apiData.get('duration');

  return {
    data,
    isFetching,
    isError,
    errorData,
    duration
  };
}

export default connect(mapStateToProps, {
  fetchApiData
})(ParentCard);
