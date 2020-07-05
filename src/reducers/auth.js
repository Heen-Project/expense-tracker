import { actionMode } from '../utils/auth'

export default (state = {}, action) => {
    switch (action.type){
        case actionMode.LOGIN:
            return {
                uid: action.uid
            }
        case actionMode.LOGOUT:
            return  {}
        default:
            return state
    }
}

