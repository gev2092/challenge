import {types} from './actions';

const initialState = {
    userId: '',
    groupId: '',
    pros: [],
    cons: []
};

/**
 * @param state
 * @param payload
 * @returns {{userId}}
 */
const setFetchedUserId = (state, payload) => {
    return {
        ...state,
        userId: payload.userId
    }
};

/**
 * @param state
 * @param payload
 * @returns {{groupId}}
 */
const setFetchedGroupId = (state, payload) => {
    return {
        ...state,
        groupId: payload.groupId
    }
};

/**
 * @param state
 * @param payload
 * @returns {{pros}}
 */
const setFetchedPros = (state, payload) => {
    return {
        ...state,
        pros: payload.pros
    }
};

/**
 * @param state
 * @param payload
 * @returns {{cons}}
 */
const setFetchedCons = (state, payload) => {
    return {
        ...state,
        cons: payload.cons
    }
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.FETCH_USER_ID:
            return setFetchedUserId(state, action.payload);
        case types.FETCH_GROUP_ID:
            return setFetchedGroupId(state, action.payload);
        case types.FETCH_CONS:
            return setFetchedCons(state, action.payload);
        case types.FETCH_PROS:
            return setFetchedPros(state, action.payload);
        default:
            return state;
    }
};
