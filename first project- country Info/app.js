function time(){
    let time = new Date();
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    document.querySelector(".month").innerHTML =   weekDays[time.getDay()-1]+ ", "  + months[time.getMonth()]+  " " + time.getDate();
}
time()

function weather(city){
    let appId = "ff481f559fea02934cdb1cf3a79b991a"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appId}`)
    .then(resp => resp.json())
    .then(data => {
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + city + "')";
        document.querySelector(".tempreture").innerHTML = `${data.main.temp} °C`;
        document.querySelector(".weather img").src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.querySelector(".descripion").innerHTML = data.weather[0].description;
        document.querySelector(".wind").innerHTML =`Wind: ${data.wind.speed} km/hr`;
    })
}





let countryInfo = {
    country : function (name){
        fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => res.json())
        .then(data => {console.log(data[0].region)
            this.displayInfo(data)})
            
        },
        displayInfo : function (data){
            const capitalCity = data[0].capital[0];
            let a = (data[0].tld[0]).replace(".","")
            console.log(a)
            
        document.querySelector(".info h1").innerHTML = `Weather in ${capitalCity}`;
        document.querySelector(".name").innerHTML = `Name: ${data[0].name.common}`
        document.querySelector(".capital").innerHTML = `Capital city: ${capitalCity}`
        document.querySelector("img").src = `https://flagcdn.com/${a}.svg`
        document.querySelector(".region").innerHTML = `Region: ${data[0].region}`
        weather(capitalCity)
        // document.querySelector(".currency").innerHTML += data[0].currencies
        // document.querySelector(".language").innerHTML = data[0].languages.eng
    }
}
let input = "";
function inputEnter() {
    input = document.querySelector("input").value;
    countryInfo.country(input)
}
countryInfo.country("Nepal")