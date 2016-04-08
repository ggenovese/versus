import request from 'axios';
import { getResource } from '../utils/api';

export function addUser(user) {
    return {
        type: 'ADD_USER',
        user
    };
}

function versusLoading() {
    return {
        type: 'VERSUS_LOADING'
    };
}

function getVersusComplete(data) {
    return {
        type: 'GET_VERSUS_COMPLETE',
        versusData: data
    };
}

function getVersusFail(error) {
    return {
        type: 'GET_VERSUS_FAIL',
        error
    };
}

export function versusChosen(versus, index) {
    return {
        type: 'VERSUS_CHOSEN',
        versus,
        index
    };
}

export function getVersus() {
    return (dispatch) => {
        dispatch(versusLoading());
        return getResource()
            .then(response => {
                if (!response || !response.data) {
                    return dispatch(getVersusFail('Error loading overview'));
                }
                    return dispatch(getVersusComplete(response.data));
            })
            .catch(error => dispatch(getVersusFail(error || 'Error with ajax loading')));
    };
}

// RESULTS ACTIONS
export function setSettingsState(versus, id) {
    return {
        type: 'SETTINGS_STATE_TOGGLE',
        versus,
        id
    };
}

export function setSettingsFalse(versus, id) {
    return {
        type: 'SETTINGS_STATE_FALSE',
        versus,
        id
    };
}

export function setAltImgState(versus, id) {
    return {
        type: 'ALTIMG_STATE_TOGGLE',
        versus,
        id
    };
}

export function setAltImgFalse(versus, id) {
    return {
        type: 'ALTIMG_STATE_FALSE',
        versus,
        id
    };
}

export function setCommentState(versus, id) {
    return {
        type: 'COMMENT_STATE_TOGGLE',
        versus,
        id
    };
}

export function setCommentFalse(versus, id) {
    return {
        type: 'COMMENT_STATE_FALSE',
        versus,
        id
    };
}

export function emailSent() {
    return {
        type: 'EMAIL_SENT'
    };
}

export function resetEmailSent() {
    return {
        type: 'RESET_EMAIL_SENT'
    };
}
