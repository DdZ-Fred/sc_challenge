import * as React from 'react';
import { ConnectedArtistDetailsProps, QData, withDefaultValue, DetailItem, IconListItem } from '../ArtistDetails';
import { ApolloError } from 'apollo-boost';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
// @ts-ignore: No typings available
import ReactCountryFlag from 'react-country-flag';
import { withStyles } from '@material-ui/core/styles';
import classes from './ArtistDetailsView.module.css';
import { FavoriteArtist } from '../../../store/favoriteArtists';

interface ArtistDetailsViewProps extends ConnectedArtistDetailsProps {
  loading: boolean,
  error: ApolloError|undefined,
  data: QData|undefined,
}

const StyledListSubheader = withStyles({
  root: {
    fontSize: '16px',
    fontWeight: 'bold'
  }
})(ListSubheader);

interface ArtistDetailsViewState {
  snackbarMessage: string,
  isBreadcrumbInitialized: boolean,
};

export class ArtistDetailsView extends React.Component<ArtistDetailsViewProps, ArtistDetailsViewState> {
  state: ArtistDetailsViewState = {
    isBreadcrumbInitialized: false,
    snackbarMessage: '',
  };

  handleOnFavoriteIconClick = () => {
    const artist: FavoriteArtist = {
      mbid: this.props.match.params.mbid,
      name: this.props.data!.lookup.artist.name,
    };
    let snackbarMessage = '';

    if (this.props.isFavoriteArtist) {
      this.props.unsetFavoriteArtist(artist);
      snackbarMessage = `${artist.name}, has been removed from your favorites.`
    } else {
      this.props.setFavoriteArtist(artist);
      snackbarMessage = `${artist.name}, has been added to your favorites.`
    }
    this.setState({snackbarMessage});
  }

  renderGender() {
    const entry = withDefaultValue(this.props.data!.lookup.artist.gender);

    return (
      <DetailItem
        prim="Gender:"
        sec={
          <span
            className={classes.gender}
            data-gender={entry}
            title={entry!}
          >
            {entry}
          </span>
        }
      />
    );
  }

  renderCountryFlag() {
    const entry = withDefaultValue(this.props.data!.lookup.artist.country);

    return (
      <DetailItem
        prim="Country:"
        sec={entry === 'Unknown'
          ? entry
          : <ReactCountryFlag
            className={classes.country}
            code={entry}
            svg
          />
        }
      />
    );
  }

  renderTitle() {
    return (
      <div className={classes.identity}>
        <IconButton
          onClick={this.handleOnFavoriteIconClick}
        >
          <Icon
            style={{ color: 'rgba(159, 187, 4)'}}
          >
            {this.props.isFavoriteArtist
              ? 'star'
              : 'star_border'
            }
          </Icon>
        </IconButton>
        <span className={classes.name}>{this.props.data!.lookup.artist.name}</span>
      </div>
    );
  }


  renderIdentityDetails() {
    return (
      <List
        className={classes.identityDetails}
        dense={false}
        subheader={<StyledListSubheader>Details</StyledListSubheader>}
      >
        <DetailItem
          prim="Born/Start:"
          sec={withDefaultValue(this.props.data!.lookup.artist.lifeSpan.begin)}
        />
        {this.props.data!.lookup.artist.lifeSpan.ended &&
          <DetailItem
            prim="Died/End:"
            sec={this.props.data!.lookup.artist.lifeSpan.end}
          />
        }
        {this.renderGender()}
        {this.renderCountryFlag()}
      </List>
    );
  }

    renderReleases() {
      return (
        <div className={classes.releases}>
          <List
            dense={false}
            subheader={<StyledListSubheader>Releases</StyledListSubheader>}
          >
            {this.props.data!.lookup.artist.releases.nodes.length
              ? this.props.data!.lookup.artist.releases.nodes.map((release) => (
                <IconListItem
                  key={release.mbid}
                  prim={release.title}
                  icon="music_note"
                />
              ))
              : 'No release yet'
            }
          </List>
        </div>
      );
    }

  renderMainContent() {
    return (
      <div className={classes.mainContent}>
        {this.renderIdentityDetails()}
        {this.renderReleases()}
      </div>
    );
  }

  handleOnSnackbarClose = () => {
    this.setState({ snackbarMessage: '' });
  }

  renderToggleFavoriteSnackbar() {
    return (
      <Snackbar
        open={!!this.state.snackbarMessage}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        message={this.state.snackbarMessage}
        onClose={this.handleOnSnackbarClose}
        autoHideDuration={2000}
      />
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <Paper className={classes.progressBarContainer}>
          <CircularProgress size={50} thickness={5}/>
        </Paper>
      );
    }

    if (this.props.error) {
      return (
        <p>ERROR: :(</p>
      );
    }

    return (
      <Paper className={classes.root}>
        {this.renderTitle()}
        {this.renderMainContent()}
        {this.renderToggleFavoriteSnackbar()}
      </Paper>
    )
  }

  componentDidUpdate(prevProps: ArtistDetailsViewProps) {
    if (
      (!prevProps.data!.lookup && this.props.data!.lookup && !this.state.isBreadcrumbInitialized) ||
      (prevProps.data!.lookup && this.props.data!.lookup && prevProps.data!.lookup !== this.props.data!.lookup)
    ) {
      this.props.setBreadcrumbEntries([
        { label: 'Artist' },
        {
          label: `${this.props.data!.lookup.artist.name}`,
          to: `/artists/${this.props.match.params.mbid}`,
        }
      ]);
      this.setState((currentState) => ({
        ...currentState,
        isBreadcrumbInitialized: true,
      }));
    }
  }

}