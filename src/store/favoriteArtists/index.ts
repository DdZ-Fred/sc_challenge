import { Middleware, Reducer, Dispatch } from "redux";
import { ScStore } from "..";
import { ScStoreActions, ScStoreState } from "../rootReducer";

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION TYPES ───────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export enum FavoriteArtistsActionTypes {
  GET_FAVORITE_ARTISTS = 'sc_Challenge/favoriteArtists/GET_FAVORITE_ARTISTS',
  GET_FAVORITE_ARTISTS_SUCCESS = 'sc_Challenge/favoriteArtists/GET_FAVORITE_ARTISTS_SUCCESS',
  GET_FAVORITE_ARTISTS_FAILURE = 'sc_Challenge/favoriteArtists/GET_FAVORITE_ARTISTS_FAILURE',
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION CREATORS ────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export const actionCreators = {
  getFavoriteArtists() {
    return {
      type: FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS as typeof FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS,
      payload: null,
    };
  },
  getFavoriteArtistsSuccess({ favoriteArtists }: { favoriteArtists: FavoriteArtist[]}) {
    return {
      type: FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS_SUCCESS as typeof FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS_SUCCESS,
      payload: { favoriteArtists },
    };
  },
  getFavoriteArtistsFailure({ error }: { error: Error }) {
    return {
      type: FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS_FAILURE as typeof FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS_FAILURE,
      payload: { error },
    };
  }
};

type GetFavoriteArtistsAction = ReturnType<typeof actionCreators.getFavoriteArtists>;
type GetFavoriteArtistsSuccessAction = ReturnType<typeof actionCreators.getFavoriteArtistsSuccess>;
type GetFavoriteArtistsFailureAction = ReturnType<typeof actionCreators.getFavoriteArtistsFailure>;

// Gathers all FavoriteArtists store actions
export type FavoriteArtistsActions = GetFavoriteArtistsAction | GetFavoriteArtistsSuccessAction | GetFavoriteArtistsFailureAction;


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── MIDDLEWARES ────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

const localStorageSyncMiddleware: Middleware<{}> =
(store) => (next) => (action: ScStoreActions) => {
  const result = next(action);
  return result;
};

export const middlewares = [
  localStorageSyncMiddleware
];

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── DEFAULT STATE ──────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

interface FavoriteArtist {
  id: string,
  name: string,
};

export interface FavoriteArtistsState {
  data: FavoriteArtist[]
}

const defaultState: FavoriteArtistsState = {
  data: [],
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── REDUCER ────────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export const reducer: Reducer<FavoriteArtistsState, FavoriteArtistsActions> = (state = defaultState, action) => {
  switch (action.type) {
    case FavoriteArtistsActionTypes.GET_FAVORITE_ARTISTS: {
      return state;
    }
    default: {
      return state;
    }
  }
};