/**
 *
 * Asynchronously loads the component for Auth page
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
