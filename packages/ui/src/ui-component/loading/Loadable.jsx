import { Suspense } from 'react'

// project imports
import Loader from './Loader'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) =>
    function WithLoader(props) {
        return (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        )
    }

export default Loadable
// Modified on Wed Jan 22 04:34:22 PM +01 2025
