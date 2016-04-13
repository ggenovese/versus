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

export function setCommentDisplayInput(versus, id) {
    return {
        type: 'SET_COMMENT_DISPLAY_INPUT',
        versus,
        id
    };
}

export function handleScroll(bool) {
    return {
        type: 'HANDLE_SCROLL',
        bool
    }
}
