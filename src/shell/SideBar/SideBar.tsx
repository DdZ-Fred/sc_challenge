import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'

import classes from './SideBar.module.css';
import { FavoriteArtist } from '../../store/favoriteArtists';
import { IconListItem } from '../../pages/ArtistDetails/ArtistDetails';

interface SideBarProps {
};

interface ConnectedSideBarProps extends SideBarProps {
  favoriteArtists: FavoriteArtist[],
};

const StyledIcon = withStyles({
  root: {
    marginRight: '6px'
  }
})(Icon);

export const SideBar: React.SFC<ConnectedSideBarProps> = (props) => {
  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        className={classes.title}
      >
        <StyledIcon className={classes.icon}>star</StyledIcon>
        Favorites
      </Typography>
      {props.favoriteArtists.length
        ? <List
          dense={false}
        >
          {props.favoriteArtists.map((favArtist) => (
            <IconListItem
              key={favArtist.mbid}
              prim={favArtist.name}
              icon="face"
              iconColor="rgba(255, 255, 255, 0.7)"
              component={Link}
              to={`/artists/${favArtist.mbid}`}
              button
            />
          ))}
        </List>
        : <span className={classes.noFavoriteMessageContainer}>
          No favorite yet
        </span>
      }
    </div>
  );
}
