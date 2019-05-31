import { Breadcrumb } from './Breadcrumb';
import { connect } from 'react-redux';
import { BreadcrumbState } from '../../store/breadcrumb';

const mapStateToProps = (state: { breadcrumb: BreadcrumbState }) => ({
  entries: state.breadcrumb.data,
});

const ConnectedBreadcrumb = connect(
  mapStateToProps
)(Breadcrumb);

export default ConnectedBreadcrumb;