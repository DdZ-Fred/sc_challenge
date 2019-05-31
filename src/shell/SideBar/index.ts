import { SideBar } from './SideBar';
import { connect } from 'react-redux';
import { FavoriteArtistsState } from '../../store/favoriteArtists';

const mapStateToProps = (state: { favoriteArtists: FavoriteArtistsState}) => ({
  favoriteArtists: state.favoriteArtists.data,
});

const ConnectedSideBar = connect(
  mapStateToProps
)(SideBar);

export default ConnectedSideBar;
