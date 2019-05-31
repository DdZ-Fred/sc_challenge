import { Middleware, Reducer } from "redux";
import { ScStoreActions} from "../rootReducer";
import { GlobalActionTypes } from "../global";

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION TYPES ───────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export enum FavoriteArtistsActionTypes {
  INIT = 'sc_Challenge/favoriteArtists/INIT',
  SET_FAVORITE_ARTIST = 'sc_Challenge/favoriteArtists/SET_FAVORITE_ARTIST',
  UNSET_FAVORITE_ARTIST = 'sc_Challenge/favoriteArtists/UNSET_FAVORITE_ARTIST',
  RESET_FAVORITE_ARTISTS = 'sc_Challenge/favoriteArtists/RESET_FAVORITE_ARTISTS',
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION CREATORS ────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export const actionCreators = {
  init(favoriteArtistsState: FavoriteArtistsState) {
    return {
      type: FavoriteArtistsActionTypes.INIT as typeof FavoriteArtistsActionTypes.INIT,
      payload: { state: favoriteArtistsState } ,
    };
  },
  setFavoriteArtist(artist: FavoriteArtist) {
    return {
      type: FavoriteArtistsActionTypes.SET_FAVORITE_ARTIST as typeof FavoriteArtistsActionTypes.SET_FAVORITE_ARTIST,
      payload: { artist },
    };
  },
  unsetFavoriteArtist(artist: FavoriteArtist) {
    return {
      type: FavoriteArtistsActionTypes.UNSET_FAVORITE_ARTIST as typeof FavoriteArtistsActionTypes.UNSET_FAVORITE_ARTIST,
      payload: { artist },
    };
  },
  resetFavoriteArtists() {
    return {
      type: FavoriteArtistsActionTypes.RESET_FAVORITE_ARTISTS as typeof FavoriteArtistsActionTypes.RESET_FAVORITE_ARTISTS,
      payload: null,
    };
  },
};

type InitAction = ReturnType<typeof actionCreators.init>;
type SetFavoriteArtistAction = ReturnType<typeof actionCreators.setFavoriteArtist>;
type UnsetFavoriteArtistAction = ReturnType<typeof actionCreators.unsetFavoriteArtist>;
type ResetFavoriteArtistsAction = ReturnType<typeof actionCreators.resetFavoriteArtists>;

// Gathers all FavoriteArtists store actions
export type FavoriteArtistsActions =
  InitAction |
  SetFavoriteArtistAction |
  UnsetFavoriteArtistAction |
  ResetFavoriteArtistsAction;


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── MIDDLEWARES ────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

const localStorageFavoriteArtistsStateKey = 'favorite_artists';

const localStorageSyncMiddleware: Middleware<{}> =
(store) => (next) => (action: ScStoreActions) => {
  const result = next(action);

  switch (action.type) {
    // IF STATE PRESENT IN LOCALSTORAGE  => GET IT & ASSIGN AS CURRENT STATE
    // IF STATE ABSENT FROM LOCALSTORAGE => ADD IT TO LOCALSTORAGE
    case GlobalActionTypes.INIT_STORE: {
      const lsFavoriteArtistsStateString = localStorage.getItem(localStorageFavoriteArtistsStateKey);
      if (lsFavoriteArtistsStateString) {
        const lsFavoriteArtistsStateObj = JSON.parse(lsFavoriteArtistsStateString!) as FavoriteArtistsState;
        store.dispatch(actionCreators.init(lsFavoriteArtistsStateObj));
      } else {
        // Save in localStorage
        const wholeState = store.getState();
        localStorage.setItem(
          localStorageFavoriteArtistsStateKey,
          JSON.stringify(wholeState.favoriteArtists)
        );
      }
      break;
    }

    // SAVE STATE IN LOCALSTORAGE ON EVERY SET/UNSET/RESET ACTION
    case FavoriteArtistsActionTypes.SET_FAVORITE_ARTIST:
    case FavoriteArtistsActionTypes.UNSET_FAVORITE_ARTIST:
    case FavoriteArtistsActionTypes.RESET_FAVORITE_ARTISTS: {
      const wholeState = store.getState();
      localStorage.setItem(
        localStorageFavoriteArtistsStateKey,
        JSON.stringify(wholeState.favoriteArtists)
      );
      break;
    }
    default: {
      break;
    }
  }

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

export interface FavoriteArtist {
  mbid: string,
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
    case FavoriteArtistsActionTypes.INIT: {
      return action.payload.state;
    }
    case FavoriteArtistsActionTypes.SET_FAVORITE_ARTIST: {
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.artist,
        ],
      };
    }
    case FavoriteArtistsActionTypes.UNSET_FAVORITE_ARTIST: {
      return {
        ...state,
        data: state.data.filter((favArtist) => favArtist.mbid !== action.payload.artist.mbid),
      };
    }
    case FavoriteArtistsActionTypes.RESET_FAVORITE_ARTISTS: {
      return {
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};
