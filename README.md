# Social Media Platform Project (Kazon App)

This application is a frontend for a simple social media platform. I built this project as a fundamental and very important exercise in consuming and handling data from a ready-made API.

For this project, I used a pre-built API from 'Tarmeez Academy', which provided all the necessary backend operations. This allowed me to focus entirely on building the user experience on the frontend.

---

##  Features I Implemented

I focused on implementing the core features of any social platform:

* **Authentication System (Auth):**
    * **User Registration:** New users can create an account with a name, username, password, and profile picture.
    * **Login:** Users can log in and receive an auth token.
    * **Logout**.
* **Post Management (CRUD):**
    * **View Posts:** Fetches and displays all posts on the homepage.
    * **Create Post:** Logged-in users can create a new post (text + image).
    * **Edit & Delete Posts:** Edit/Delete buttons only appear on posts owned by the currently logged-in user.
* **Profile Page:**
    * A dynamic profile page that displays any user's info (name, username, email, post count) by reading the `userId` from the URL.
* The page also displays **all** posts belonging to that specific user.
* **User Experience (UX):**
    * **Dynamic UI:** Shows 'Login'/'Register' for guests and 'Logout'/'Add Post' for logged-in users.
* **Infinite Scroll:** Automatically fetches more posts when the user hits the bottom of the page.
    * **Alerts:** I used simple success/danger alerts to give the user feedback on their actions.
    * **Loader:** A loading spinner is shown while fetching data from the API.

---

##  Tech Stack

* **HTML5:** (`index.html`, `profile.html`, `postDetalis.html`).
* **Bootstrap 5:** I relied on this heavily for all UI components, especially the Navbar, Cards, and Modals.
* **JavaScript (ES6+):** (Obviously!) for all the application logic.
* **Axios:** I used the Axios library for all API (HTTP) requests.

---

##  How I Handled the API

Handling the API was the core of this project.

**Base URL:** `https://tarmeezacademy.com/api/v1`

* **Token Storage:** On **Login** or **Register**, I receive a `token` and `user` object, which I store in `localStorage`.
* **Authenticated Requests:** For any protected action (like **creating** or **deleting** a post), I read the token from `localStorage` and attach it as a `Bearer Token` in the `Authorization` header.
* **Using `FormData`:** Since creating/editing posts involves image uploads, I used `FormData` to send the data as `multipart/form-data`.
* **Handling `PUT` Requests:** The API requires `PUT` for edits. Since `FormData` is sent via `POST`, I added a `_method: "put"` field to the `FormData` (a common technique to fake a `PUT` request).

---

##  Code Structure

To keep things clean, I separated the JavaScript logic:

* **`mainLogic.js`**: Contains all common functions needed across pages (like `loginBtnClicked`, `registerBtnClicked`, `showAlert`, `setupUI`).
* **`homeScripts.js`**: Specific to the homepage (`index.html`), handles fetching posts and infinite scrolling.
* **`profailScripts.js`**: Specific to the `profile.html` page, responsible for fetching user info and their posts.

---

##  How to Run This Project

This is a static site, so it's very simple:

1.  Download the project files.
2.  Make sure the main page is named `index.html` (in my original files it was `Home.html`).
3.  Open the `index.html` file in any browser. That's it! 
