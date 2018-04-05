// import NewsAPI from 'newsapi';

// export default newsAPI = new NewsAPI(require("./cert.json").newsapi);

// newsAPI.v2.topHeadlines(
//     {
//         // category: 'business',
//         // language: 'en',
//         country: 'th',
//         pageSize: 5
//     }
// ).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.warn(err);
// })

const API = require("./cert.json").newsapi
const LINK = "https://newsapi.org/v2"
const HEADLINE = "/top-headlines"

export default newsAPI = {
    getLatest: async function (country = "us", category = "technology", pageSize = 10) {
        result = await fetch(
            LINK + HEADLINE +
            `?country=${country}` +
            `&category=${category}` +
            `&pageSize=${pageSize}` +
            `&apiKey=${API}`
        )
        jsonObj = await result.json()
        return jsonObj
    }
}