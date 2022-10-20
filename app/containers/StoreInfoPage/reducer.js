import produce from 'immer'
import { SET_STORE_MODULES } from './constants'

export const initialState = {
    storeModules: [] 
}

const storeInfoReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_STORE_MODULES:
                draft.storeModules = action.storeModules
                break
            default:
        }
    })

export default storeInfoReducer