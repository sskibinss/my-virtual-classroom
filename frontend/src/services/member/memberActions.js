import {FETCH_MEMBER_REQUEST, FETCH_MEMBER_FAILURE, FETCH_MEMBER_SUCCESS} from "./memberTypes";
import axios from "axios";

export const fetchMembers = () => {
    return dispatch => {
        dispatch(fetchUserRequest());
        axios.get("/members")
            .then(response => dispatch(fetchUserSuccess(response.data)))
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            });
    }
}
const fetchUserRequest = () => {
    return {
        type: FETCH_MEMBER_REQUEST
    }
}

const fetchUserSuccess = (members) => {
    return {
        type: FETCH_MEMBER_SUCCESS,
        payload: members
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_MEMBER_FAILURE,
        payload: error
    }
}