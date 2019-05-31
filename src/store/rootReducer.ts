import { combineReducers } from "redux";
import {
  reducer as globalReducer,
  GlobalActions,
  GlobalState,
} from './global';
import {
  reducer as favoriteArtistsReducer,
  FavoriteArtistsActions,
  FavoriteArtistsState,
} from './favoriteArtists';
import {
  reducer as breadcrumbReducer,
  BreadcrumbActions,
  BreadcrumbState,
} from './breadcrumb';


export type ScStoreActions = FavoriteArtistsActions | GlobalActions | BreadcrumbActions;

export interface ScStoreState {
  global: GlobalState,
  favoriteArtists: FavoriteArtistsState,
  breadcrumb: BreadcrumbState,
};

const rootReducer = combineReducers({
  global: globalReducer,
  favoriteArtists: favoriteArtistsReducer,
  breadcrumb: breadcrumbReducer,
});

export default rootReducer;
