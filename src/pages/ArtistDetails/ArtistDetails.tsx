import * as React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { RouteComponentProps } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { actionCreators as favoriteArtistsAC } from '../../store/favoriteArtists';
import { actionCreators as breadcrumbAC } from '../../store/breadcrumb';
import classes from './ArtistDetails.module.css';
import ArtistDetailsView from './ArtistDetailsView';

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── QUERY ──────────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

interface Release {
  id: string,
  mbid: string,
  title: string,
  /** Format: YYYY-MM-DD */
  date: string,
};

type Gender = 'Male'|'Female'|'Neither';
export interface QData {
  lookup: {
    artist: {
      name: string,
      country: string,
      gender: Gender|null,
      lifeSpan: {
        /** Format: YYYY-MM-DD */
        begin: string,
        /** Format: YYYY-MM-DD */
        end: string|null,
        ended: boolean,
      },
      releases:{
        totalCount: number,
        nodes: Release[]
      },
    },
  },
};
interface QVariables {

};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── COMPONENT ──────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

type RouteParams = {
  mbid: string
};

export interface ArtistDetailsProps extends RouteComponentProps<RouteParams> {

};

export interface ConnectedArtistDetailsProps extends ArtistDetailsProps {
  isFavoriteArtist: boolean,
  setFavoriteArtist: typeof favoriteArtistsAC.setFavoriteArtist,
  unsetFavoriteArtist: typeof favoriteArtistsAC.unsetFavoriteArtist,
  setBreadcrumbEntries: typeof breadcrumbAC.setEntries,
};


export const DetailItem: React.SFC<{ prim: string, sec: React.ReactNode}> = (props) => (
  <ListItem>
    <ListItemText
      primary={props.prim}
      secondary={props.sec}
    />
  </ListItem>
);

const CustomColorIcon: React.SFC<{
  icon: string,
  color?: string,
}> = (props) => {
  const StyledIcon = withStyles({
    root: {
      color: props.color,
    }
  })(Icon);
  return (
    <StyledIcon fontSize="inherit">{props.icon}</StyledIcon>
  );
}

export const IconListItem: React.SFC<{
  prim: string,
  sec?: React.ReactNode,
  icon: string,
  iconColor?: string,
  button?: boolean,
  component?: React.ReactNode,
  to?: string
}> = ({ prim, sec, icon, iconColor, button, ...rest }) => {
  return (
    <ListItem
      // @ts-ignore: Shouldn't trigger an error
      button={button? true : undefined}
      {...rest}
    >
      <ListItemIcon>
        <CustomColorIcon icon={icon} color={iconColor}/>
      </ListItemIcon>
      <ListItemText
        primary={prim}
        secondary={sec||undefined}
      />
    </ListItem>
  );
};
IconListItem.defaultProps = {
  sec: undefined,
  iconColor: undefined,
  button: false,
  component: undefined,
  to: undefined,
};

export function withDefaultValue<T>(value: T) {
  if (!value) {
    return 'Unknown' as 'Unknown';
  }
  return value;
};


export class ArtistDetails extends React.Component<ConnectedArtistDetailsProps> {
  render() {
    return (
      <div className={classes.root}>
        <Query<QData, QVariables>
          query={gql`
            {
              lookup {
                artist(mbid: "${this.props.match.params.mbid}") {
                  name,
                  country,
                  gender,
                  lifeSpan {
                    begin,
                    end,
                    ended
                  },
                  releases {
                    totalCount,
                    nodes {
                      id,
                      mbid,
                      title,
                      date,
                      country
                    }
                  }
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => (
            <ArtistDetailsView
              {...this.props}
              loading={loading}
              error={error}
              data={data}
            />
          )}
        </Query>
      </div>
    );
  }
}
