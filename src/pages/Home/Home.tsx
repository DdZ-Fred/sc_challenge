import * as React from 'react';
import { debounce } from 'lodash-es';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import MatchingArtists from './MatchingArtists';
import classes from './Home.module.css';

interface HomeProps {

}

interface HomeState {
  searchValue: string,
}

const styles = {
  textField: {
    flexGrow: 1,
    minWidth: '400px',
    maxWidth: '500px',
  },
};

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    searchValue: '',
  };

  handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.handleSearchRequest(e.target.value);
  };

  handleSearchRequest = debounce((value: string) => {
    this.setState({
      searchValue: value,
    });
    console.log('CHANGE', value);
  }, 500);

  render() {
    return (
      <div className={classes.root}>
        <div className={classes.textFieldContainer}>
          <TextField
            id="outlined-adornment-password"
            // variant="outlined"
            style={styles.textField}
            placeholder="Please type an artist"
            onChange={this.handleOnInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />

        </div>
        <MatchingArtists
          searchValue={this.state.searchValue}
        />
      </div>
    );
  }
};

export default Home;
