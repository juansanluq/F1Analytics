import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    gp: reducers.GPState;
    drivers: reducers.DriversState;
}

export const appReducers: ActionReducerMap<AppState> = {
    gp: reducers.gpReducer,
    drivers: reducers.driversReducer,
}