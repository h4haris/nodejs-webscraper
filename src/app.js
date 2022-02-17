const feedDisplay = document.querySelector('#feed');

console.log('Starting Fetching Data. Wait...');

fetch('http://localhost:8080/results')
    .then(response => { return response.json() })
    .then(data => {
        console.log('Data Received');
        console.log(data);
        data.forEach(article => {
            const articleItem = `<div><h3>` + article.title + `</h3><p>` + article.url + `</p></div>`
            feedDisplay.insertAdjacentHTML("beforeend", articleItem)
        })
    })
    .catch(err => console.log(err));