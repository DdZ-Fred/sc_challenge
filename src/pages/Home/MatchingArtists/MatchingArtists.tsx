import * as React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import classes from './MatchingArtists.module.css';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  progressBar: {
    flexGrow: 1,
    minWidth: '400px',
    maxWidth: '500px',
  },
};


interface QData {
  search: {
    artists: {
      nodes: Array<{ id: string, name: string, mbid: string }>
    }
  },
};
interface QVariables {

}

interface MatchingArtistsProps {
  searchValue: string,
}

const MatchingArtists: React.SFC<MatchingArtistsProps> = (props) => {
  if (!props.searchValue) {
    return (
      <div className={classes.noSearchValue}>
        <Icon fontSize="large">mood</Icon>
        <span>Enter an artist above</span>
      </div>
    );
  }

  return (
    <Query<QData, QVariables>
      query={gql`
        {
          search {
            artists(query: "${props.searchValue}") {
              nodes {
                id
                name
                mbid
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div style={styles.container}>
              <LinearProgress
                style={styles.progressBar}
              />
            </div>
          );
        };
        if (error) return <p>Error :(</p>;

        if (!data!.search.artists.nodes.length) {
          return (
            <div className={classes.noResult}>
              <Icon fontSize="large">sentiment_dissatisfied</Icon>
              <span>No Result</span>
              <span>Please try something else</span>
            </div>
          );
        }

        return (
          <List component="nav">
            {data!.search.artists.nodes.map(({ id, name, mbid }) => (
              <ListItem
                key={`${id}-${mbid}`}
                button
                component={Link}
                to={`/artists/${mbid}`}
              >
                <ListItemText primary={name}/>
              </ListItem>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

export default MatchingArtists;
