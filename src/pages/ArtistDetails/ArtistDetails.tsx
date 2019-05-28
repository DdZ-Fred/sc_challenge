import * as React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import classes from './ArtistDetails.module.css';
import { RouteComponentProps } from 'react-router';

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

interface QData {
  lookup: {
    artist: {
      name: string,
      country: string,
      gender: string|null,
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

interface ArtistDetailsProps extends RouteComponentProps<RouteParams> {

}

const ArtistDetails: React.SFC<ArtistDetailsProps> = (props) => {
  return (
    <div className={classes.root}>
      <Query<QData, QVariables>
        query={gql`
          {
            lookup {
              artist(mbid: "${props.match.params.mbid}") {
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
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div>...LOADING</div>
            );
          }

          if (error) {
            return (
              <p>ERROR: :(</p>
            );
          }

          return (
            <div>
              DATA OK
            </div>
          )
        }}
      </Query>
    </div>
  );
}

export default ArtistDetails;
