import SERVER_SETTINGS from '@lib/serverSettings';

const BACKEND_URL = SERVER_SETTINGS.baseURL;

export function saveToken(tokenData) {
    setAccessToken(tokenData.token);
    setRefreshToken(tokenData.refreshToken);
}

export function saveUserId(id) {
    localStorage.setItem('id', id);
}

export function getUserIdIfLogged() {
    if (!isUserLoggedIn()) return { data: undefined };
    else {
        const token = getUserId();
        return token;
    }
}

export function getUserId() {
    return localStorage.getItem('id');
}

export function saveAdminToken(tokenData) {
    setAccessToken(tokenData.jwToken);
    setRefreshToken(tokenData.refreshToken);
}

export function saveLanguage(lang) {
    localStorage.setItem('language', lang);
}

export function getLanguage() {
    if (!process.browser) return 'en';

    return localStorage.getItem('language');
}

export function isUserLoggedIn() {
    const token = getAccessToken();
    return token !== null;
}

export function setUserData(user) {
    localStorage.setItem('user_profile', JSON.stringify(user));
}

export function getUserData() {
    const userData = localStorage.getItem('user_profile');
    return userData ? JSON.parse(userData) : undefined;
}

export function setAccessToken(token) {
    localStorage.setItem('idToken', token);
}

export function setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
}

export function getAccessToken() {
    if (!process.browser) return null;

    return localStorage.getItem('idToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function clearToken() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user_profile');
}

export function signInFacebook(idToken, userId) {
    return fetchAuth('FB', idToken, userId);
}

export function signInGoogle(idToken, userId) {
    return fetchAuth('GOOGLE', idToken, userId);
}

export async function signInManual(data) {
    return fetch(`${BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
    }).then(async (res) => {
        if (res.status == 200) return await res.json();
        return await res;
    });
}

export async function signInManualAdmin(data) {
    return fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
    }).then(async (res) => {
        if (res.status == 200) return await res.json();
        return await res;
    });
}

export function fetchAuth(authProvider, idToken, userId) {
    return fetch(`${BACKEND_URL}/api/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, social: authProvider, userId }),
    }).then(async (res) => {
        if (res.status == 200) return res.json();
        throw new Error(await res.text());
    });
}
