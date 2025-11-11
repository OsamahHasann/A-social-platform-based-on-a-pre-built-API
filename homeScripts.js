// ========= INVENT SCROLL =======//
let currentPage = 1;
let lastPage = 1;

window.addEventListener("scroll", () => {
  const endOfpage =
    window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight;
  console.log( window.innerHeight, window.pageYOffset  )
  
  if (endOfpage && currentPage < lastPage) {
    getPosts(false, ++currentPage);
  }
});

// =========// INVENT SCROLL // =======//

setupUI();

getPosts();

function userClicked(userId)
{

  window.location = `profile.html?userid=${userId}`
}

function getPosts(relode = true, page) {

  toggleLoader(true)
  axios.get(`${baseUrl}/posts?limit=5&page=${page}`)
    .then((responce) => {
      toggleLoader(false)
    const posts = responce.data.data;
    lastPage = responce.data.meta.last_page;

    if (relode) {
      document.getElementById("posts").innerHTML = "";
    }

    for (post of posts) {
      console.log(post);

      const author = post.author;

      let user = getCurrentUser();
      let isMyPost = user != null && post.author.id == user.id;
      let editBtnContent = ``;

      if (isMyPost) {
        editBtnContent = `
        
        <button class = "btn btn-danger" style = "float:right; margin-left:5px;" onclick = "deletePostBtnClicked('${encodeURIComponent(
          JSON.stringify(post)
        )}')">Delete</button>
          
        <button class = "btn btn-secondary" style = "float:right;" onclick = "editPostBtnClicked('${encodeURIComponent(
          JSON.stringify(post)
        )}')">Edit</button>
        `;
      }

      let content = `
          <div class="card shadow mt-3">
              <div class="card-header">
              <span onclick= "userClicked(${author.id})" style =" cursor:pointer;">
                <img
                  src="${author.profile_image}"
                  alt=""
                  style="width: 30px; height: 30px"
                  class="rounded-circle border border-2"
                />
                <b>${author.username}</b>
                </span>
                
                   ${editBtnContent}

              </div>
              <div class="card-body" onclick="postClicked(${
                post.id
              })" style = "cursor: pointer" >
                <img
                  src="${post.image}"
                  alt=""
                  style="width: 100%"
                />
                <h6 style="color: rgb(197, 197, 197)" class="mt-1">
                 ${post.created_at}
                </h6>
                <h5>${post.title ?? ""}</h5>

                <p>
                   ${post.body}
                </p>

                <hr />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pen"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                    />
                  </svg>
                  <span>(${post.comments_count}) Comments
                      <span id ="post-tags-${post.id}">
                       
                      </span>
                    </span>
                </div>
              </div>
            </div>
          
          `;

      document.getElementById("posts").innerHTML += content;

      const currentPostTagsId = `post-tags-${post.id}`;
      document.getElementById(currentPostTagsId).innerHTML = "";
      for (tag of post.tags) {
        let tagsContent = `
            <button  class = "btn btn-sm rounded-5 " style ="background-color:blue; color:white" >
              ${tag.name}
            </button>
            `;
        document.getElementById(currentPostTagsId).innerHTML += tagsContent;
      }
    }
  });
}



function postClicked(postId) {
  window.location = `postDetalis.html?postId=${postId}`;
}


function addBtnClicked() {
  document.getElementById("post-modal-submit-btn").innerHTML = "Create";
  document.getElementById("post-id-input").value = "";
  document.getElementById("post-modal-title").innerHTML = "Create A New Post";
  document.getElementById("post-title-input").value = "";
  document.getElementById("post-body-input").value = "";
  let postModle = new bootstrap.Modal(
    document.getElementById("create-post-modal"),
    {}
  );
  postModle.toggle();
}


