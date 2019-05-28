import { middlewares as globalMiddlewares } from './global';
import { middlewares as favoriteArtistsMiddlewares } from './favoriteArtists';

const middlewares = [
  ...globalMiddlewares,
  ...favoriteArtistsMiddlewares,
];

export default middlewares;
