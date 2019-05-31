import { connect } from 'react-redux';
import { actionCreators as favoriteArtistsAC, FavoriteArtistsState } from '../../store/favoriteArtists';
import { ArtistDetails, ArtistDetailsProps } from './ArtistDetails';
import { actionCreators as breadcrumbAC } from '../../store/breadcrumb';

function isFavoriteArtistSelector(
  state: { favoriteArtists: FavoriteArtistsState },
  ownProps: ArtistDetailsProps
) {
  return !!state.favoriteArtists.data.find(favArtist => favArtist.mbid === ownProps.match.params.mbid);
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isFavoriteArtist: isFavoriteArtistSelector(state,ownProps)
});

const { setFavoriteArtist, unsetFavoriteArtist } = favoriteArtistsAC;
const { setEntries } = breadcrumbAC;

const ConnectedArtistDetails = connect(
  mapStateToProps,
  {
    setFavoriteArtist,
    unsetFavoriteArtist,
    setBreadcrumbEntries: setEntries,
  }
)(ArtistDetails);


export default ConnectedArtistDetails;