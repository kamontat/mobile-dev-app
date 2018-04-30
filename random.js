const LINK = "https://randomuser.me/api/"

export default UserAPI = {
    getLatest: async function (country = "us", size = 20, page = 1, seed = 1) {
        const privateLink = `${LINK}?results=${size}&nat=${country}&seed=${seed}&page=${page}`
        const result = await fetch(privateLink)
        const jsonObj = await result.json()
        return jsonObj
    }
}
