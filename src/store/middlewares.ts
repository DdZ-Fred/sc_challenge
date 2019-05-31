import { middlewares as globalMiddlewares } from './global';
import { middlewares as favoriteArtistsMiddlewares } from './favoriteArtists';
import { middlewares as breadcrumbMiddlewares } from './breadcrumb';

const middlewares = [
  ...globalMiddlewares,
  ...favoriteArtistsMiddlewares,
  ...breadcrumbMiddlewares,
];

export default middlewares;
