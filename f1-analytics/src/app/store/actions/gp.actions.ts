import { Action } from '@ngrx/store';
import { GP } from 'src/app/services/utils';

export const SET_LASTGP = '[GP] Set Last GP';
export const SET_NEXTGP = '[GP] Set Next GP';

export class SetLastGPAction implements Action {
    readonly type = SET_LASTGP;

    constructor(public payload: GP) { }
}

export class SetNextGPAction implements Action {
    readonly type = SET_NEXTGP;

    constructor(public payload: GP) { }
}

export type gpAcciones = SetLastGPAction | SetNextGPAction;
