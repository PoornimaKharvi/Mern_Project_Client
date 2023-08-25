import { USER_AUTH } from "../constants/constants"

export const userAction = (payload)=>{
    return {
        type: USER_AUTH,
        payload 
    }
}

