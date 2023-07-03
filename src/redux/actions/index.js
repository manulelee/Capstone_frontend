export const SET_PROFILE = "SET_PROFILE";

export const setProfile = (profileData) => {
  return {
    type: SET_PROFILE,
    payload: profileData,
  };
};
export const getProfile = (username) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/profile/" + username);
      if (response.ok) {
        const data = await response.json();
        dispatch(setProfile(data));
        console.log("PROFILO UTENTE:", data);
      } else {
        alert("Errore nel recupero del profilo");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
