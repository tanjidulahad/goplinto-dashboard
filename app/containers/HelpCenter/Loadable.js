/**
 *
 * Asynchronously loads the component for HelpCenter
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
