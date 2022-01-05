
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {

    var apiUrl = 'https://api.github.com/users/' + user +'/repos';
    
    fetch(apiUrl)
    .then(function(response){

        if(response.ok){
            response.json().then(function(data) {
                //console.log(data);
                displayRepos(data, user);
            });

        }else{
            alert("Error: Github User Not Found");
        }
      
       // console.log('inside', response);
    })
    .catch(function(error){
        alert("Unable to connect to Github");
    })
   // console.log('outside');

};


var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }else{
        alert("Please enter a Github username");
    }
};

var displayRepos = function(repos, searchTerm){
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
  //  console.log(repos);
   // console.log(searchTerm);
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;


    for(var i = 0; i < repos.length; i++){
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var repoEl = document.createElement("a");
            repoEl.classList = "list-tiem flex-row justify-space-betwwen align-center";
            repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);


        var titleEl = document.createElement("span");
            titleEl.textContent = repoName;

            repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
            statusEl.classList = "flex-row align-center";
            
            if(repos[i].open_issues_count > 0 ) {
                statusEl.innerHTML = 
                    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";

            }else{
                statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }
            repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);