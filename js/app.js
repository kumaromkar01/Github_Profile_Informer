const searchBox = document.getElementById('search');
        const main = document.querySelector('#main');

        function formSubmit() {
            if (searchBox.value.trim() !== "") {
                getUser();
            }
            return false;
        }

        const getUser = async () => {
            let APIURL = "https://api.github.com/users/";
            const user = searchBox.value.trim();
            APIURL += user;
            console.log(APIURL);

            try {
                const response = await fetch(APIURL);
                if (!response.ok) throw new Error('User not found');
                const data = await response.json();
                console.log(data);

                const card = `
                    <div class="card">
                        <div>
                            <img class="avatar" src="${data.avatar_url}" alt="${data.name}">
                        </div>
                        <div class="user-info">
                            <h2>${data.name}</h2>
                            <p>${data.bio}</p>
                            <ul class="info">
                                <li>${data.followers}<strong>Followers</strong></li>
                                <li>${data.following}<strong>Following</strong></li>
                                <li>${data.public_repos}<strong>Repos</strong></li>
                            </ul>
                            <div id="repos"></div>
                        </div>
                    </div>
                `;
                main.innerHTML = card;

                getRepos(user);
            } catch (error) {
                console.error(error);
                main.innerHTML = "User not found";
            }
        }

        async function getRepos(user) {
            const box = document.querySelector('#repos');
            const APIURL = `https://api.github.com/users/${user}/repos`;
            try {
                const response = await fetch(APIURL);
                if (!response.ok) throw new Error('Repos not found');
                const data = await response.json();

                data.forEach(repo => {
                    const elem = document.createElement('a');
                    elem.classList.add('repo');
                    elem.href = repo.html_url;
                    elem.innerText = repo.name;
                    elem.target = "_blank";
                    box.appendChild(elem);
                });
            } catch (error) {
                console.error(error);
                box.innerHTML = "Repos not found";
            }
        }