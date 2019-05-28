import { compose } from "redux";

export interface EnhancedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose,
}