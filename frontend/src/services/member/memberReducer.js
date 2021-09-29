import {FETCH_MEMBER_REQUEST, FETCH_MEMBER_FAILURE, FETCH_MEMBER_SUCCESS} from "./memberTypes";

const initialState = {
    members: [],
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEMBER_REQUEST:
            return {
                ...state
            }
        case FETCH_MEMBER_SUCCESS:
            return {
                members: action.payload,
                error: ''
            }
        case FETCH_MEMBER_FAILURE:
            return {
                members: [],
                error: action.payload
            }
        default: return this.state;
    }
};

export default reducer()