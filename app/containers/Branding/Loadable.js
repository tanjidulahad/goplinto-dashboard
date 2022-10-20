/**
 *
 * Asynchronously loads the component for Branding Module
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
