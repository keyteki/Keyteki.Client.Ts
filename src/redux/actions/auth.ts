import {
    RegisterUser,
    Auth,
    LoginDetails,
    AuthAction,
    UpdateProfileDetails,
    RequestSessionsAction,
    RemoveSessionAction
} from '../types';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';

function authenticateInternal(token?: string, refreshToken?: string): AuthAction {
    return {
        type: Auth.AuthTokenReceived,
        types: [Auth.RequestAuthToken, Auth.AuthTokenReceived],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/token',
            method: 'post',
            data: { token: token, refreshToken: refreshToken }
        }
    };
}

export function registerAccount(user: RegisterUser): AuthAction {
    return {
        type: Auth.AccountRegistered,
        types: [Auth.RegisterAccount, Auth.AccountRegistered],
        shouldCallApi: (): boolean => true,
        skipAuth: true,
        apiParams: {
            url: '/api/account/register',
            method: 'post',
            data: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        }
    };
}

export function loginAccount(user: LoginDetails): AuthAction {
    return {
        type: Auth.AccountLogin,
        types: [Auth.LoginAccount, Auth.AccountLogin],
        shouldCallApi: (): boolean => true,
        skipAuth: true,
        apiParams: {
            url: '/api/account/login',
            method: 'post',
            data: {
                username: user.username,
                password: user.password
            }
        }
    };
}

export function setAuthTokens(token: string, refreshToken: string): AuthAction {
    return {
        type: Auth.SetAuthTokens,
        token: token,
        refreshToken: refreshToken
    };
}

export function checkAuth(): AuthAction {
    return {
        type: Auth.AuthChecked,
        types: [Auth.CheckAuth, Auth.AuthChecked],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/checkauth',
            method: 'post'
        }
    };
}

export function authenticate(): ThunkAction<void, RootState, void, AuthAction> {
    return (
        dispatch: (action: AuthAction) => AuthAction,
        getState: () => RootState
    ): AuthAction => {
        const state = getState();

        return dispatch(authenticateInternal(state.auth.token, state.auth.refreshToken));
    };
}

export function updateProfile(username: string, profile: UpdateProfileDetails): AuthAction {
    return {
        type: Auth.ProfileUpdated,
        types: [Auth.UpdateProfile, Auth.ProfileUpdated],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/account/${username}`,
            method: 'put',
            data: profile
        }
    };
}

export function linkPatreon(authCode: string): AuthAction {
    return {
        type: Auth.PatreonLinked,
        types: [Auth.LinkPatreon, Auth.PatreonLinked],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/linkPatreon',
            method: 'POST',
            data: { authCode: authCode }
        }
    };
}

export function getActiveSessions(): RequestSessionsAction {
    return {
        type: Auth.SessionsReceived,
        types: [Auth.RequestSessions, Auth.SessionsReceived],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/sessions',
            method: 'GET'
        }
    };
}

export function removeSession(sessionId: number): RemoveSessionAction {
    return {
        type: Auth.SessionRemoved,
        types: [Auth.RemoveSession, Auth.SessionRemoved],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/account/sessions/${sessionId}`,
            method: 'DELETE'
        }
    };
}
