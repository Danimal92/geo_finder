console.log("index.js")
const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const SUMMARIES_URL = `${BASE_URL}/summaries`;
const CSS_ID_ARRAY = new Set(["after-login-navbar", "before-login", "display-start", "display-Summary", "display-maps"])

document.addEventListener("DOMContentLoaded", () =>{
    displaySigninForm();
    displaySignupForm();
    userLogout();
    viewSummary();
    playButton();
    startGame();
});




