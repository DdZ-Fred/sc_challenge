import { connect } from 'react-redux';
import { actionCreators as breadcrumbAC } from '../../store/breadcrumb';
import { Home } from './Home';

const ConnectedHome = connect(
  null,
  {
    setBreadcrumbEntries: breadcrumbAC.setEntries,
  }
)(Home);

export default ConnectedHome;
