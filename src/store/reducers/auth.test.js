import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';;

describe('Auth reducer', () => {
    const userId = 'userId';
    const token = 'userToken';
    const error = 'The error/reason why auth failed';

    it('should render the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        });
    })
    it('should set loading state to true', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, { type: actionTypes.AUTH_START })).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: true
        });
    })
    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, { type: actionTypes.AUTH_SUCCESS, token: token, userId: userId })).toEqual({
            token: token,
            userId: userId,
            error: null,
            loading: false
        });
    })
    it('should clear the user credentials upon logout', () => {
        expect(reducer({
            token: token,
            userId: userId,
            error: null,
            loading: false
        }, { type: actionTypes.AUTH_LOGOUT })).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        });
    })
    it('should store the error/reason why authentication failed', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: true
        }, { type: actionTypes.AUTH_FAILED, error: error })).toEqual({
            token: null,
            userId: null,
            error: error,
            loading: false
        });
    })
})