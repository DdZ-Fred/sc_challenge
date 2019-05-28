import { combineReducers } from "redux";
import {
  reducer as global,
  GlobalActions,
  GlobalState,
} from './global';
import {
  reducer as favoriteArtists,
  FavoriteArtistsActions,
  FavoriteArtistsState,
} from './favoriteArtists';


export type ScStoreActions = FavoriteArtistsActions | GlobalActions;

export interface ScStoreState {
  global: GlobalState,
  favoriteArtists: FavoriteArtistsState,
};

const rootReducer = combineReducers({
  global,
  favoriteArtists,
});

export default rootReducer;
