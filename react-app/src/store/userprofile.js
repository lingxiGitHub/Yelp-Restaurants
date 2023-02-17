const GetUserProfile = 'session/GetUserProfile';
const CreateProfile = 'session/CreateProfile';
const EditProfile = 'session/EditProfile';
const DeleteProfile = 'session/DeleteProfile';

const getProfile = (user) => ({
    type: GetUserProfile,
    payload: user
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
    const response = await fetch(`/api/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(response.ok){
        const data = await response.json()
        dispatch(getProfile(data));
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
    const response = await fetch(`/api/users/edit/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(response.ok){
        const data = await response.json();
        dispatch(editProf(data));
        return data;
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
    userProfile: {}
};

export default function userProfileReducer(state = initialState, action){
    // const userProfile = {};
    let newState;

    switch (action.type){
        case GetUserProfile:
            newState = { ...state, userProfile: { ...state.userProfile }}
            newState.userProfile = action.user
            return { ...newState }
        case CreateProfile:
            newState.userProfile = action.user
            return newState
        case EditProfile:
            newState = { userProfile: { ...state.userProfile } }
            newState.userProfile[action.user.id] = action.user
            return newState
        case DeleteProfile:
            newState = { ...state, userProfile: { ...state.userProfile } }
            delete newState.userProfile[action.userId]
            return newState
        default:
            return state;
    }
}
