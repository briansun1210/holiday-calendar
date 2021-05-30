// const fetch = require("node-fetch");

async function fetchCountry() {
    const response = await fetch('https://calendarific.com/api/v2/countries?api_key=c694e798937f5e5a37d37b63b5d02eabd17d7c32');
    const text = await response.json();
    // const text2 = await text.reponse;
    return text;
}

let temp;

let res = [];
fetchCountry().then(text => temp = text.response).then(function() {console.log(temp.countries.length)})
.then(
    function() {
    // async function country(){
        for (var i = 0; i<temp.countries.length; i++){
            // console.log(temp.countries[i]["iso-3166"])
            res.push(temp.countries[i]["iso-3166"])
        }
    // }
}
).then(function() {
    var myDiv = document.getElementById("cboxes");
    // console.log(myDiv)

    for (var i = 0; i < res.length; i++) {
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.value = res[i];
        // checkbox.checked = "false";
        myDiv.appendChild(checkBox);
        myDiv.appendChild(label);
        label.appendChild(document.createTextNode(res[i]));
    }
    var button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'Submit');
    myDiv.appendChild(button);
}
);

let resn = function () {return res;}
console.log(res)




// async function country(){
//     console.log(temp)
//     for (var i = 0; i<temp.countries.length; i++){
//         return temp.countries[i]["iso-3166"]
//     }
// }
