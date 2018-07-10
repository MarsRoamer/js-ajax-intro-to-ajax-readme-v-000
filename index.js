function showRepos(event, data) {
	let repositories = JSON.parse(this.responseText);
	console.log(repositories)
	const repoList = `<ul>${repositories.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
	document.getElementById("repos").innerHTML = repoList;
}


function getRepos() {
	const req = new XMLHttpRequest();
	req.addEventListener("load", showRepos);
	req.open("GET", 'https://api.github.com/users/MarsRoamer/repos')
	req.send();
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/MarsRoamer/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}