import { Middleware, Reducer } from "redux";
import { ScStoreActions} from "../rootReducer";
import { GlobalActionTypes } from "../global";

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION TYPES ───────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export enum BreadcrumbActionTypes {
  SET_ENTRIES = 'sc_Challenge/breadcrumb/SET_ENTRIES',
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ACTION CREATORS ────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export interface IBreadcrumbEntry {
  to?: string,
  icon?: string,
  label: string,
};


export const actionCreators = {
  setEntries(bcEntries: IBreadcrumbEntry[]) {
    return {
      type: BreadcrumbActionTypes.SET_ENTRIES as typeof BreadcrumbActionTypes.SET_ENTRIES,
      payload: { bcEntries },
    };
  },
};

type SetEntriesAction = ReturnType<typeof actionCreators.setEntries>;

// Gathers all Breadcrumb store actions
export type BreadcrumbActions = SetEntriesAction;


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── MIDDLEWARES ────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────


export const middlewares = [];

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── DEFAULT STATE ──────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────


export interface BreadcrumbState {
  data: IBreadcrumbEntry[],
}

const defaultState: BreadcrumbState = {
  data: [],
};


// ────────────────────────────────────────────────────────────────────────────────
//
// ─── REDUCER ────────────────────────────────────────────────────────────────────
//
// ────────────────────────────────────────────────────────────────────────────────

export const reducer: Reducer<BreadcrumbState, BreadcrumbActions> = (state = defaultState, action) => {
  switch (action.type) {
    case BreadcrumbActionTypes.SET_ENTRIES: {
      return {
        data: action.payload.bcEntries
      };
    }
    default: {
      return state;
    }
  }
};
