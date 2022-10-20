import loadable from 'utils/loadable'
import RingLoader from 'react-spinners/RingLoader'
import React from 'react'
export default loadable(() => import('./index'), {
    fallback: (
        <div className="fixed bg-black opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <RingLoader color="#F64C5D" size={150} />
        </div>
    ),
});