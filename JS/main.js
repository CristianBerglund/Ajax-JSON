let inputfield = document.getElementById("Inputfield")
let content = document.getElementById("content")
let searchBtn = document.getElementById("search-data")

searchBtn.addEventListener("click", fetchData);

async function fetchData() {
    try {
        let response = await fetch("https://api.tvmaze.com/search/shows?q=superman")
        if (!response.ok) {
            throw new Error('Some network problems')
        }
        let data = await response.json()
        console.log(data)
    } catch (error) {
        content.innerHTML = "Something went wrong, please try again later"
   }
}