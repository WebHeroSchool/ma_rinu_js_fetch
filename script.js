window.setTimeout(function () {
  let body = document.body;
  let url = window.location.search;
  document.body.classList.add('loaded');
  const date = new Date();

  const getNameFromUrl = (url) => {
    let getUrl = url.split('=');
    let name = getUrl[1];
    if(name == undefined) {
    name = 'MarinaMix';
    }
  return name;
  }

  const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('Ошибка'), 4000)
  })

  const getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject('Ошибка'), 4000)
  })

  Promise.all([getUrl, getDate])
    .then(([url, date]) => fetch(`https://api.github.com/users/${getNameFromUrl(url)}`)
    .then(res => res.json())
    .then(json => {

        let photo = document.createElement('img');
        photo.src = json.avatar_url;
        body.append(photo);

        let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация недоступна';
        }
        body.append(name);
        name.addEventListener("click", () => window.location = json.html_url);

        let bio = document.createElement('p');
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация недоступна';
        }
        body.append(bio);
        body.append(date)

    })
    .catch(err => alert('Информация недоступна')));
  }, 3000);
