import { legacyRenderIntoContainer } from '../renderer';

export const render = (elements, container, callback) => {
  legacyRenderIntoContainer(null, elements, container, callback);
}
