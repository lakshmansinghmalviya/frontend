import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { UnifiedResponse } from '@/types/types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const apiCall = async <T>(
    path: string,
    method: string,
    headers: Record<string, string>,
    data?: any
): Promise<UnifiedResponse<T>> => {

    console.log("Sending the data like " + JSON.stringify(data));
    try {
        const options: RequestInit = {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        };
        console.log("Path is going like "+path);
        const response = await fetch(path, options);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }

        return await response.json() as UnifiedResponse<T>;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown API error');
    }
};
