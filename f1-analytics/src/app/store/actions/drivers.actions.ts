import { Action } from '@ngrx/store';
import { Driver } from '../../services/utils';

export const LOAD_DRIVERS = '[Drivers] Load Drivers';
export const LOAD_DRIVEROTD = '[Drivers] Load Driver of the day';

export class LoadDriversAction implements Action {
    readonly type = LOAD_DRIVERS;

    constructor(public payload: Driver[]) {
    }
}

export class LoadDriverOTDAction implements Action {
    readonly type = LOAD_DRIVEROTD;

    constructor(public payload: Driver) { }
}

export type driversAcciones = LoadDriversAction | LoadDriverOTDAction;
