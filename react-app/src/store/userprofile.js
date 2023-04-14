const GetUserProfile = 'session/GetUserProfile';
const CreateProfile = 'session/CreateProfile';
const EditProfile = 'session/EditProfile';
const DeleteProfile = 'session/DeleteProfile';

// const getProfile = (user) => ({
//     type: GetUserProfile,
//     payload: user
// });
const getProfile = (userInfo) => ({
    type: GetUserProfile,
    userInfo
});

const createNew = (user) => ({
    type: CreateProfile,
    payload: user
});

const editProf = (user) => ({
    type: EditProfile,
    payload: user
});

const deleteProf = (user) => ({
    type: DeleteProfile,
    payload: user
});
export const getProfileThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/get/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const reviewsResult = await fetch(`/api/reviews/${userId}`);
    if(response.ok && reviewsResult.ok){
        const userInfo = await response.json()
        const reviews = await reviewsResult.json()
        // console.log("printinguserInfo", userInfo, reviews)
        let result = {}
        result["id"] = userInfo.id
        result["reviews"] = reviews
        result["first_name"] = userInfo.first_name
        result["last_name"] = userInfo.last_name
        result["portrait"] = userInfo.portrait
        result["username"] = userInfo.username
        // console.log("****res", result)
        dispatch(getProfile(result));
        return
    }
    return null
};

export const createProfileThunk = (profile) => async (dispatch) => {
    const response = await fetch("/api/users/new", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    });
    if(response.ok){
        const data = await response.json();
        dispatch(createNew(data));
        return data;
    }
    return
}

export const editProfileThunk = (user, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(response.ok){
        const data = await response.json();
        dispatch(editProf(data));
        return userId;
    }else{
        return ["Username is already in use."]
    }
}

export const deleteProfileThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/delete/${userId}`, {
        method: "DELETE"
    });
    if(response.ok){
        const data = await response.json();
        dispatch(deleteProf(data));
    }
}

const initialState = {
    // userProfile: {}
};

export default function userProfileReducer(state = initialState, action){
    // const userProfile = {};
    let newState;

    switch (action.type){
        case GetUserProfile:
            // console.log("action in reducer", action.userInfo)
            // console.log("old state in reducer", state)
            newState = {...state}
            newState.user = {...action.userInfo}
            newState.user.reviews = {...action.userInfo.reviews}

            return { ...newState }
        // case CreateProfile:
        //     newState.userProfile = action.user
        //     return newState
        // case EditProfile:
        //     newState = { userProfile: { ...state.userProfile } }
        //     newState.userProfile[action.user.id] = action.user
        //     return newState
        // case DeleteProfile:
        //     newState = { ...state, userProfile: { ...state.userProfile } }
        //     delete newState.userProfile[action.userId]
        //     return newState
        default:
            return state;
    }
}
