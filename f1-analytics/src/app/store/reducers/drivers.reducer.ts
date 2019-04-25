import { Driver } from '../../services/utils';
import { driversAcciones, LOAD_DRIVERS, LOAD_DRIVEROTD } from '../actions/drivers.actions';

// Driver's state
export interface DriversState {
    driverOTD: Driver;
    driversList: Driver[];
    driverSelected: Driver;
}

const initState: DriversState = {
    driverOTD: null,
    driverSelected: null,
    driversList: null,
}

export function driversReducer(state = initState, action: driversAcciones): DriversState {
    switch (action.type) {
        case LOAD_DRIVERS:
            return {
                ...state,
                driversList: action.payload,
            }
        case LOAD_DRIVEROTD:
            return {
                ...state,
                driverOTD: action.payload,
            }
        default:
            return state;
    }
}
