const searchVal = document.querySelector('#searchValue');
const city = document.querySelector('.city')
const date_time = document.querySelector('.date_time')
const temp = document.querySelector('.temp')
const min_max = document.querySelector('.min_max')
const weather = document.querySelector('.weather')
const card_body = document.querySelector('.card-body')
const body = document.querySelector('body')

const weatherAPI = {
    key: '6543acd74a7512f84ea48eac4ac4b961',
    URL: 'https://api.openweathermap.org/data/2.5/weather'
}



searchVal.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        console.log(searchVal.value);
        getWeather(searchVal.value)
        searchVal.value = ''
    }
})

// get Weather report
function getWeather(city) {
    fetch(`${weatherAPI.URL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
            else {
                throw new Error('City not found');
            }
        })
        .then(showWeather)
        .catch(error => {
            console.log(error);
        })
}

//  Show weather report
function showWeather(data) {
    console.log(data)

    //    ADD DETAILS

    city.innerText = `${data.name}, ${data.sys.country}`
    temp.innerText = `${Math.round(data.main.temp)}°C`
    min_max.innerText = `${Math.floor(data.main.temp_min)}°C (min) - ${Math.ceil(data.main.temp_max)}°C (max)`
    weather.innerText = `${data.weather[0].description}`
    let todayDate = new Date;
    date_time.innerText = dateManage(todayDate);

    //    ADD BACKGROUND IMAGES
//     const clearSky = document.querySelector('#clearSky')
//     const cloudySky = document.querySelector('#cloudySky')
//     const rainySky = document.querySelector('#rainySky')
//     const smoke = document.querySelector('#smoke')
//     const snowfall = document.querySelector('#snowfall')

//     const ifWeather = weather.textContent;

//     if(ifWeather == 'clear sky'){
//         body.style.backgroundImage = 'url(./bg_img/clear_sky.jpg)';
//     }
//     else if(ifWeather == 'scattered clouds' || ifWeather == 'rain'){

//         body.style.backgroundImage = 'url(./bg_img/rainy.jpg)'
//     }
//    else if(ifWeather == 'broken clouds'){
//         body.style.backgroundImage = 'url(./bg_img/cloudysky.webp);'
//     }
//     else if(ifWeather == 'snow'){
//         body.style.backgroundImage = 'url(./bg_img/snowfall.jpg)'
//     }
//     else if(ifWeather == 'smoke'){
//         body.style.backgroundImage = 'url(./bg_img/smoke.webp)'
//     }
}

// update Date

function dateManage(dateArg) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'Feburay', 'March', 'April', 'May', 'June', 'july', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} ${day} ${year}`

}