import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { UnifiedResponse } from '@/types/types';
import { getAccessToken, getAuthenticatedHeaderWithRefToken, getRefreshToken, logout, setLocalStorage } from '@/services/CommonServices';
import { authEndpoints } from '@/common/endpoints/AuthEndpoint';
import { resetAuthStateOnLogout } from './slices/authSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const dispatch = useAppDispatch();

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        return null;
    }

    try {
        const res = await fetch(authEndpoints.refreshToken, {
            method: 'POST',
            headers: getAuthenticatedHeaderWithRefToken(),
            body: JSON.stringify({ refToken: refreshToken }),
        });
        if (!res.ok) {
            dispatch(resetAuthStateOnLogout());
            logout();
            return null;
        }

        const data = await res.json();

        const newAccessToken = data.data.accessToken;
        console.log("This new access token is saving ...." + newAccessToken);
        setLocalStorage('accessToken', newAccessToken);

        return newAccessToken;
    } catch (err) {
        console.error("Token refresh failed:", err);
        dispatch(resetAuthStateOnLogout());
        logout();        
        return null;
    }
};

//  Universal API Caller
export const apiCall = async <T>(
    path: string,
    method: string,
    headers: Record<string, string> = {},
    data?: any,
    isRetry = false // prevents infinite loops
): Promise<UnifiedResponse<T>> => {
    try {
        const token = getAccessToken();
        const options: RequestInit = {
            method,
            headers: {
                ...headers,
                ...(token ? { 'Authorization': `Bearer ${token}` } : undefined),
            },
            body: data ? JSON.stringify(data) : undefined,
        };
        console.log("Data is coming like " + JSON.stringify(data) + " " + JSON.stringify(path) + "  " + JSON.stringify(options));

        const response = await fetch(path, options);

        if ((response.status === 401 || response.status === 403) && !isRetry) {
            // Refresh and retry logic
            console.log("Refreshing access token....")
            const newToken = await refreshAccessToken();
            if (newToken) {
                return apiCall<T>(path, method, headers, data, true);
            }
        }

        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }

        return await response.json() as UnifiedResponse<T>;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown API error');
    }
};
