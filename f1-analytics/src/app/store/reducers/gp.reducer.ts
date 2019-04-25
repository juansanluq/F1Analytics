import { GP } from 'src/app/services/utils';
import { gpAcciones, SET_LASTGP, SET_NEXTGP } from '../actions/gp.actions';

// GP state
export interface GPState {
    lastGP: GP;
    nextGP: GP;
}

const initState: GPState = {
    lastGP: null,
    nextGP: null,
}

export function gpReducer(state = initState, action: gpAcciones): GPState {
    switch (action.type) {
        case SET_LASTGP:
            return {
                ...state,
                lastGP: action.payload,
            }
        case SET_NEXTGP:
            return {
                ...state,
                nextGP: action.payload,
            }
        default:
            return state;
    }
}