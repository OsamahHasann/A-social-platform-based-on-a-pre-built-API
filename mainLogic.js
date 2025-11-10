const baseUrl = "https://tarmeezacademy.com/api/v1";

// ========= POSTS REQUESTS ============= ///
function editPostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));

  document.getElementById("post-modal-submit-btn").innerHTML = "Update";
  document.getElementById("post-id-input").value = post.id;
  document.getElementById("post-modal-title").innerHTML = "Edit post";
  document.getElementById("post-title-input").value = post.title;
  document.getElementById("post-body-input").value = post.body;
  let postModle = new bootstrap.Modal(
    document.getElementById("create-post-modal"),
    {}
  );
  postModle.toggle();
}

function deletePostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));

  document.getElementById("delete-post-id-input").value = post.id;
  let postModle = new bootstrap.Modal(
    document.getElementById("delete-post-modal"),
    {}
  );
  postModle.toggle();
}

function ConfirmPostDelete() {
  const postId = document.getElementById("delete-post-id-input").value;
  const url = `${baseUrl}/posts/${postId}`;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };

  axios
    .delete(url, {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
      const modal = document.getElementById("delete-post-modal");
      const modalinstance = bootstrap.Modal.getInstance(modal);
      modalinstance.hide();
      showAlert("hte post has been deleted successfully!", "success");
      getPosts();
    })
    .catch((error) => {
      let message = error.response.data.message;
      showAlert(message, "danger");
    });
}
// =========  // POSTS REQUESTS  //    ============= ///
function CreateNewPostClicked() {
  let postid = document.getElementById("post-id-input").value;
  let isCreate = postid == null || postid == "";

  const title = document.getElementById("post-title-input").value;
  const body = document.getElementById("post-body-input").value;
  const image = document.getElementById("post-image-input").files[0];
  const token = localStorage.getItem("token");

  let formData = new FormData();
  formData.append("body", body);
  formData.append("title", title);
  formData.append("image", image);

  let url = ``;

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };

  if (isCreate) {
    url = `${baseUrl}/posts`;
  } else {
    formData.append("_method", "put");
    url = `${baseUrl}/posts/${postid}`;
  }

  toggleLoader(true)

  axios.post(url, formData, {
      headers: headers,
    })
    .then((response) => {
      toggleLoader(false)
      const modal = document.getElementById("create-post-modal");
      const modalinstance = bootstrap.Modal.getInstance(modal);
      modalinstance.hide();
      showAlert("New Post Has Been Created", "success");
      getPosts();
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    })
    .finally(() => {
    toggleLoader(false)
  })
}

function porfailClicked()
{
  const user = getCurrentUser()
  const userId =user.id
   window.location = `profile.html?userid=${userId}`
}

function setupUI() {
  const token = localStorage.getItem("token");

  const loginDiv = document.getElementById("logged-in-div");
  const logoutDiv = document.getElementById("logout-div");

  // add btn
  const addBtnDiv = document.getElementById("add-btn");
  if (token == null) {
    // user is guest (not logged in)

    if (addBtnDiv != null) {
      addBtnDiv.style.setProperty("display", "none", "important");
    }

    loginDiv.style.setProperty("display", "flex", "important");
    logoutDiv.style.setProperty("display", "none", "important");
  } else {
    // for logged user
    if (addBtnDiv != null) {
      addBtnDiv.style.setProperty("display", "block", "important");
    }

    loginDiv.style.setProperty("display", "none", "important");
    logoutDiv.style.setProperty("display", "flex", "important");

    const user = getCurrentUser();
    document.getElementById("nav-user-name").innerHTML = user.username;
    document.getElementById("nav-user-imag").src = user.profile_image;
  }
}

//  =========== AUTH FUNCTIONS ===========
function loginBtnClicked() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;
  const params = {
    username: username,
    password: password,
  };
  const url = `${baseUrl}/login`;
  toggleLoader(true)
  axios.post(url, params)
    .then((response) => {
      toggleLoader(false)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    const modal = document.getElementById("login-modal");
    const modalinstance = bootstrap.Modal.getInstance(modal);
    modalinstance.hide();
    showAlert("logged in successfully!", "success");
    setupUI();
    })
    .catch((error) => {
    const message = error.response.data.message;
      showAlert(message, "danger");
    })
    .finally(() => {
    toggleLoader(false)
  })
}



function registerBtnClicked() {
  const name = document.getElementById("register-name-input").value;
  const username = document.getElementById("register-username-input").value;
  const password = document.getElementById("register-password-input").value;
  const image = document.getElementById("register-image-input").files[0];

  let formData = new FormData();
  formData.append("username", username);
  formData.append("name", name);
  formData.append("password", password);
  formData.append("image", image);

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const url = `${baseUrl}/register`;

  toggleLoader(true)
  axios.post(url, formData, {
      headers: headers,
    })
    .then((response) => {
      toggleLoader(false)
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const modal = document.getElementById("register-modal");
      const modalinstance = bootstrap.Modal.getInstance(modal);
      modalinstance.hide();

      showAlert("New User Registerd in successfully!", "success");
      setupUI();
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    })
    .finally(() => {
      toggleLoader(false)
    })
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showAlert("logged out successfully! ");
  setupUI();
}

function showAlert(custemMessage, type = "success") {
  const alertPlaceholder = document.getElementById("success-alert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  appendAlert(custemMessage, type);
  // todo: hide the alert
  setTimeout(() => {
    const alerttiHide = bootstrap.Alert.getOrCreateInstance("#success-alert");
    // alerttiHide.close()
  }, 3000);
}

function getCurrentUser() {
  let user = null;
  const storageUser = localStorage.getItem("user");
  if (storageUser != null) {
    user = JSON.parse(storageUser);
  }
  return user;
}

function toggleLoader(show = true)
{
  if (show) {
    document.getElementById("loader").style.visibility = 'visible'
  } else {
    document.getElementById("loader").style.visibility = 'hidden'
  }
}

