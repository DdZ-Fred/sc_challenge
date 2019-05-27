import React from 'react';
import classes from './ArtistDetails.module.css';

function ArtistDetails(props) {
  return (
    <div className={classes.root}>
      ARTIST DETAILS #{props.match.params.id}
    </div>
  );
}

export default ArtistDetails;
