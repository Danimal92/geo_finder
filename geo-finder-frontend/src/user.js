let USER_ID = "";
let ALL_USERS = [];
let T_POINTS = 0;

function addNewUser(email) {
  fetchAllUsers().then(() => {
    testifyUserEmail(email);
  });
}

function getUser(email) {
  fetch(`http://localhost:3000/getUserByEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Accept: "Application/json"
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then(response => response.json())
    .then(user => {
      if (user) {
        afterLogIn(user);
      } else {
        alert("user not registered");
      }
    });
}

function afterLogIn(user) {
  USER_ID = user.id;
  T_POINTS = user.points;
  hideEachDisplay(CSS_ID_ARRAY);
  onlyDisplay(["after-login-navbar", "after-login", "pano", "map", "mapPageButtons"]);
  displayUsername(user);
  displayedUserPoints(user);
  nextMapButtonPress()
  
}

function displayUsername(user) {
  let displayedUser = document.getElementById("welcome");
  let username = user.email.match(/^(.+)@/)[1]
  displayedUser.textContent = `Welcome ${username}`;
}
function displayedUserPoints(user) {
  let displayedUserPoints = document.getElementById("points");
  displayedUserPoints.textContent = `Points:${T_POINTS}`;
}

function createNewUserFetchRequest() {
  fetch(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Accept: "Application/json"
    },
    body: JSON.stringify({
      email: email,
      points: 0
    })
  })
    .then(response => response.json())
    .then(user => afterLogIn(user));
}

function fetchAllUsers() {
  return fetch(USERS_URL)
    .then(resp => resp.json())
    .then(users => {
      ALL_USERS = users;
    });
}

function testifyUserEmail() {
  let testUser = ALL_USERS.map(userObject => {
    if (userObject.email === email) {
      return false;
    } else {
      return true;
    }
  });
  if (!testUser.includes(false)) {
    createNewUserFetchRequest(email);
  } else {
    alert("Try Another Email!!");
    let emailDom = document.getElementById("sign-up-input");
    emailDom.placeholder = "Email";
  }
}
