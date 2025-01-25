const baseURL = 'https://api.github.com/users/'

// Event listener for flip btn
const card = document.querySelector(".card");
const frontCard = document.querySelector(".front");
const backCard = document.querySelector(".back");
const flipBtn = document.querySelector(".flip > .btn");
flipBtn.addEventListener("click", () => {
    rotateCard();
});

document.querySelector("main form").addEventListener("submit", function (event) {
    event.preventDefault();
    const submitBtn = document.querySelector("main form button");

    // Front card elements
    const name = document.querySelector(".front .name");
    const avatar = document.querySelector(".front .avatar");
    const followers = document.querySelector(".front .followers");
    const following = document.querySelector(".front .following");
    const address = document.querySelector(".front address");
    const account_id = document.querySelector(".account-id");

    // Back card elements
    const username = document.querySelector(".back .username");
    const bio = document.querySelector(".back .bio");
    const createdAt = document.querySelector(".back .created-at");
    const updatedAt = document.querySelector(".back .updated-at");
    const blog = document.querySelector(".back .blog");
    const github = document.querySelector(".back .github");

    // Clear function
    function clearData(arg) {
        // Front card info
        name.textContent = arg;
        avatar.src = '';
        avatar.alt = '';
        avatar.style.visibility = 'hidden';
        followers.textContent = '';
        following.textContent = '';
        address.textContent = '';
        account_id.textContent = '';
    
        // Back card info
        username.textContent = '';
        bio.textContent = '';
        createdAt.datetime = '';
        updatedAt.datetime = '';
        createdAt.textContent = '';
        updatedAt.textContent = '';
        blog.href = '';
        blog.style.display = 'none';
        github.href = '';
        github.style.display = 'none';
    }

    // Flip card to front side and Show loading info
    if(!frontCard.classList.contains("active")) {
        rotateCard();
    }
    clearData("Creating ID Card...")

    // Disable btns
    document.querySelector(".flip > .btn").disabled = true;
    submitBtn.disabled = true;
    const url = baseURL + this.username.value;
    fetch(url).then(res => {
        if(res.status === 200) return res.json();
        if(res.status === 403) return { err: "Cannot process your request now" };
        if(res.status === 404) return { err: "No User Found" };
        return null;
    }).then(data => {
        console.log(data);
        if(!data.err) {
            // Front card info
            name.textContent = data.name??data.login;
            avatar.style.visibility = 'visible';
            avatar.src = data.avatar_url;
            avatar.alt = data.name??data.login;
            followers.textContent = `Followers: ${data.followers}`;
            following.textContent = `Following: ${data.following}`;
            address.textContent = data.location??'';
            account_id.innerHTML = `<b>GitHub ID: </b><p>${data.id}</p>`;

            // Back card info
            username.textContent = "@"+data.login;
            bio.textContent = data.bio??'';
            createdAt.datetime = data.created_at;
            updatedAt.datetime = data.updated_at;
            createdAt.innerHTML = `<b>Created At:</b> <span>${data.created_at.split("T")[0]}</span>`;
            updatedAt.innerHTML = `<b>Updated At:</b> <span>${data.updated_at.split("T")[0]}</span>`;
            if(data.blog) {
                blog.style.display = "block";
                blog.href = data.blog;
            }
            github.style.display = "block";
            github.href = data.html_url;

            // Enable the flip button
            document.querySelector(".flip > .btn").disabled = false;
        }
        else{
            clearData(data.err);
        }
        submitBtn.disabled = false;
    }).catch(err => {
        console.warn(err);
        clearData("Something went wrong!");
    });
});

function rotateCard() {
    frontCard.classList.toggle("active");
    backCard.classList.toggle("active");
    card.classList.toggle("rotate");
}