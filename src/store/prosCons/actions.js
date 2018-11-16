import api from '../../services/api';

export const types = {
    FETCH_USER_ID: 'prosCons.FETCH_USER_ID',
    FETCH_GROUP_ID: 'prosCons.FETCH_GROUP_ID',
    FETCH_PROS: 'prosCons.FETCH_PROS',
    FETCH_CONS: 'prosCons.FETCH_CONS',
};

/**
 * @returns {function(*)}
 */
export const getUserId = () => {
    return async dispatch => {
        try {
            const data = await api.get(`user/gevorg_harutyunyan`);
            dispatch(setUserId(data.userId));
        } catch (e) {
            console.log(e);
        }
    }
};

/**
 * @returns {function(*)}
 */
export const getGroupId = () => {
    return async dispatch => {
        try {
            const data = await api.get(`group/gevorg_harutyunyan`);
            dispatch(setGroupId(data.groupId));
        } catch (e) {
            console.log(e);
        }
    }
};

/**
 * @returns {function(*, *)}
 */
export const getProsCons = () => {
    return async (dispatch, getState) => {
        try {
            await dispatch(getUserId());
            await dispatch(getGroupId());
            const {groupId, userId} = getState().prosCons,
                data = await api.get(`proscons/group/${groupId}/user/${userId}`);
            dispatch(setPros(data.pros));
            dispatch(setCons(data.cons))
        } catch (e) {
            console.log(e);
        }
    }
};

/**
 * @returns {function(*, *)}
 */
export const updatePros = (pros) => {
    return async (dispatch, getState) => {
        try {
            const {groupId, userId, cons} = getState().prosCons,
                data = await api.put(`proscons/group/${groupId}/user/${userId}`, {
                    pros: pros,
                    cons: cons
                });
            dispatch(setPros(data.pros));
            dispatch(setCons(data.cons))
        } catch (e) {
            console.log(e);
        }
    }
};

/**
 * @returns {function(*, *)}
 */
export const updateCons = (cons) => {
    return async (dispatch, getState) => {
        try {
            const {groupId, userId, pros} = getState().prosCons,
                data = await api.put(`proscons/group/${groupId}/user/${userId}`, {
                    pros: pros,
                    cons: cons
                });
            dispatch(setPros(data.pros));
            dispatch(setCons(data.cons))
        } catch (e) {
            console.log(e);
        }
    }
};

/**
 * @param userId
 * @returns {{type: string, payload: {userId: *}}}
 */
export const setUserId = (userId) => {
    return {
        type: types.FETCH_USER_ID,
        payload: {
            userId
        }
    }
};

/**
 * @param groupId
 * @returns {{type: string, payload: {groupId: *}}}
 */
export const setGroupId = (groupId) => {
    return {
        type: types.FETCH_GROUP_ID,
        payload: {
            groupId
        }
    }
};

/**
 * @param pros
 * @returns {{type: string, payload: {pros: *}}}
 */
export const setPros = (pros) => {
    return {
        type: types.FETCH_PROS,
        payload: {
            pros
        }
    }
};

/**
 * @param cons
 * @returns {{type: string, payload: {cons: *}}}
 */
export const setCons = (cons) => {
    return {
        type: types.FETCH_CONS,
        payload: {
            cons
        }
    }
};