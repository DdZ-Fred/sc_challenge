import { Reducer } from "redux";

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION TYPES ───────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export enum GlobalActionTypes {
  INIT_STORE = 'sc_challenge/global/INIT_STORE',
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION CREATORS ────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export const actionCreators = {
  initStore() {
    return {
      type: GlobalActionTypes.INIT_STORE as typeof GlobalActionTypes.INIT_STORE,
      payload: null,
    };
  },
};

type InitStoreAction = ReturnType<typeof actionCreators.initStore>;

// Gathers all FavoriteArtists store actions
export type GlobalActions = InitStoreAction;


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── MIDDLEWARES ────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────


export const middlewares = [

];

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── DEFAULT STATE ──────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export interface GlobalState {
}

const defaultState: GlobalState = {
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── REDUCER ────────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export const reducer: Reducer<GlobalState, GlobalActions> = (state = defaultState, action) => {
  switch (action.type) {
    case GlobalActionTypes.INIT_STORE: {
      return state;
    }
    default: {
      return state;
    }
  }
};