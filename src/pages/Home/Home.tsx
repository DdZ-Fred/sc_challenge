import * as React from 'react';
import { debounce } from 'lodash-es';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import MatchingArtists from './MatchingArtists';
import classes from './Home.module.css';
import { actionCreators as breadcrumbAC } from '../../store/breadcrumb';

interface HomeProps {

}

interface ConnectedHomeProps extends HomeProps {
  setBreadcrumbEntries: typeof breadcrumbAC.setEntries,
};

interface HomeState {
  searchValue: string,
};

const styles = {
  textField: {
    flexGrow: 1,
    minWidth: '400px',
    maxWidth: '500px',
  },
};

export class Home extends React.Component<ConnectedHomeProps, HomeState> {
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
  }, 500);

  componentDidMount() {
    this.props.setBreadcrumbEntries([]);
  }

  render() {
    return (
      <div className={classes.root}>
        <div className={classes.textFieldContainer}>
          <TextField
            id="outlined-adornment-password"
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
