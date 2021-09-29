import {combineReducers} from "redux";
import memberReducer from "./member/memberReducer";

const rootReducer = combineReducers({
    member: memberReducer
})

export default rootReducer;
