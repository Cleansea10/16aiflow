import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../actions'

export const initialState = {
    notifications: []
}

const notifierReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification
                    }
                ]
            }

        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    action.dismissAll || notification.key === action.key ? { ...notification, dismissed: true } : { ...notification }
                )
            }

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter((notification) => notification.key !== action.key)
            }

        default:
            return state
    }
}

export default notifierReducer
// Modified on Wed Jan 22 04:34:32 PM +01 2025
console.log('Debug update');
