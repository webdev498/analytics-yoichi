import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import ParentCard from 'containers/ParentCard';
import DetailsTable from 'components/details';
import {fetchNextSetOfData} from 'actions/parentCard';

import { fetchUserData, logout } from 'actions/auth';
import { fetchActionsList } from 'actions/actionsList';

import Loader from 'components/Loader';
import {Colors} from '../../../commons/colors';
import 'styles/core.scss';

const styles = {
  details: {
    backgroundColor: Colors.cloud,
    position: 'fixed',
    top: '64px',
    left: '72px',
    bottom: 0,
    right: 0,
    zIndex: 3,
    overflow: 'auto'
  },
  base: {
    paddingLeft: '72px',
    paddingTop: '64px',
    boxSizing: 'border-box',
    height: '100%'
  },
  handle: {
    position: 'absolute',
    right: '-20px',
    top: '64px',
    backgroundColor: Colors.slider,
    height: '72px',
    lineHeight: '72px',
    width: '20px',
    borderRadius: '0 10px 10px 0',
    textAlign: 'center',
    cursor: 'pointer',
    zIndex: 1300
  },
  icon: {
    fontSize: '16px',
    color: Colors.arctic
  }
};

export class CoreLayout extends React.Component {
  static propTypes = {
    fetchUserData: PropTypes.func.isRequired,
    fetchActionsList: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showFullSidebar: false,
      sidebarWidth: {width: '72px'},
      sidebar: props.auth.sidebar,
      showSearch: false
    };

    this.hideDetails = this.hideDetails.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  getChildContext() {
    const that = this;
    return {
      clickThrough(input) {
        that.setState({
          input,
          showDetails: true
        });

        // hides the scroll from the body element when details are shown.
        document.body.style.overflow = 'hidden';
      }
    };
  }

  hideDetails() {
    this.setState({
      showDetails: false
    });

    // shows the scroll of the body element when details are shown.
    document.body.style.overflow = '';
  }

  mouseOver() {
    this.setState({
      sidebarWidth: {width: '172px'}
    });
  }

  mouseOut() {
    this.setState({
      sidebarWidth: {width: '72px'}
    });
  }

  toggleSearch = () => {
    this.setState({showSearch: !this.state.showSearch});
  }

  componentDidMount() {
    this.props.fetchUserData();
    this.props.fetchActionsList();

    this.context.router.listen(() => {
      this.hideDetails();
      if (this.state.showSearch) {
        this.toggleSearch();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    this.setState({sidebar: nextProps.auth.sidebar});

    // if user api returns error redirect to auth page.
    if (nextProps.auth.isError) {
      props.logout();
    }
  }

  getDetailsInput(detailsInput) {
    detailsInput.details.meta.api.queryParams = Object.assign({},
      detailsInput.details.meta.api.queryParams, {
        start: detailsInput.data.interval.from,
        end: detailsInput.data.interval.to
      });

    let apiObj = {
      id: detailsInput.details.id,
      api: detailsInput.details.meta.api,
      params: {},
      options: {},
      isDetails: true
    };

    detailsInput = Object.assign({}, detailsInput.details, {
      details: detailsInput.details,
      apiObj,
      fetchNextSetOfData,
      hideDetails: this.hideDetails
    });

    return detailsInput;
  }

  render() {
    const {props, state} = this,
      {showDetails} = this.state;

    let detailsInput = {};

    if (showDetails && state.input && state.input.details) {
      detailsInput = this.getDetailsInput(state.input);
    }

    return (
      <div style={styles.wrap}>
        <Header params={props.params} />

        <Sidebar
          sidebar={this.state.sidebar}
          location={props.location}
          toggleSearch={this.toggleSearch}
          showSearch={state.showSearch} />

        <div style={styles.base}>
          {
            props.auth.isLoading
            ? <Loader />
            : <PageContent
              location={props.location}
              params={props.params}
              history={this.context.router} />
          }

          {
            showDetails && detailsInput.details
            ? (
              <div style={styles.details}>
                <ParentCard {...detailsInput}>
                  <DetailsTable />
                </ParentCard>
              </div>
            )
            : null
          }
        </div>
      </div>
    );
  }
}

CoreLayout.childContextTypes = {
  clickThrough: React.PropTypes.func
};

CoreLayout.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {auth} = state;
  return {
    auth
  };
}

export default connect(mapStateToProps, {
  fetchUserData, logout, fetchActionsList
})(CoreLayout);
