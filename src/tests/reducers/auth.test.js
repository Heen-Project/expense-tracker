import authReducer from '../../reducers/auth'
import { actionMode } from '../fixtures/auth'

test('set uid for login', () => {
    const action = {
        type: actionMode.LOGIN,
        uid: 'qwerty123'
    }
    const state = authReducer({}, action)
    expect(state.uid).toBe(action.uid)
})


test('clear uid for logout', () => {
    const action = {
        type: actionMode.LOGOUT,
    }
    const state = authReducer({ uid: 'qwerty123' }, action)
    expect(state).toEqual({})
})