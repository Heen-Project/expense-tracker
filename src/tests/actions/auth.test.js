import { login, logout } from '../../actions/auth'
import { actionMode } from '../fixtures/auth'

test('generate login action object', () => {
    const uid = 'qwerty123'
    const action = login(uid)
    expect(action).toEqual({
        type: actionMode.LOGIN,
        uid
    })
})

test('generate logout action object', () => {
    const action = logout()
    expect(action).toEqual({
        type: actionMode.LOGOUT
    })
})