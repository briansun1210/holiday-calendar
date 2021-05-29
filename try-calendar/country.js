// const fetch = require("node-fetch");

async function fetchCountry() {
    const response = await fetch('https://calendarific.com/api/v2/countries?api_key=96f8f6e15400fc7e2ac19f502c3a3726c6169dcb');
    const text = await response.json();
    return text;
}

let temp;
fetchCountry().then(text => temp = text.response).then(function() {console.log(temp.countries.length)})
.then(function() {
    async function country(){
        for (var i = 0; i<temp.countries.length; i++){
            // console.log(temp.countries[i]["iso-3166"])
            return temp.countries[i]["iso-3166"]
        }
    }
});



// async function country(){
//     console.log(temp)
//     for (var i = 0; i<temp.countries.length; i++){
//         return temp.countries[i]["iso-3166"]
//     }
// }
