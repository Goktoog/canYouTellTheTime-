function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

const apiKey = 'WRITE_YOUR_API_KEY_HERE'; // Buraya api key'inizi yazınız.
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector("#search input");
const searchBtn = document.querySelector("#searchbutton");
const weatherIcon = document.querySelector("#weatherIcon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector("#error").style.display = "block";
        document.querySelector("#weather").style.display = "none";
    }else{

        const data = await response.json();

        console.log(data);
    
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector("#nem").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind").innerHTML = data.wind.speed + " km/s";
    
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjdsZmM1cWs2Z2VzdHFjNGUzbmh2OXBxbGozYWo0ejh3ZjVjZ2hjeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/139VhIY2eHewz6/giphy.webp";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHU3cGZsYXFkdThmYXhuNnE1dnhjdHpvYm8yaGZ0b3F6dXE3aGxkZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/09zIVvkcB22xPkaIIX/giphy.gif";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWdsdGZwaHZhaWt6d2c5b2QwZm5kNGJ1ZDIwM2dlZnVvYXZ1aGQyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/t3s9gZkWX1cg8OxgD2/giphy.webp";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWdsdGZwaHZhaWt6d2c5b2QwZm5kNGJ1ZDIwM2dlZnVvYXZ1aGQyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/t3s9gZkWX1cg8OxgD2/giphy.webp";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "https://i.giphy.com/C8okPSDOWUydX9zQwC.webp";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "https://media0.giphy.com/media/JZCZt389Gj2ysYVI8r/giphy.webp?cid=ecf05e47hjp2zpz4a25xhxvsvqose7apx2o3o4ph62fvhytp&ep=v1_stickers_search&rid=giphy.webp&ct=s";
        }
        document.querySelector("#error").style.display = "none";

    }

   
}

// Varsayılan şehir olarak Ankara'yı ayarla
checkWeather("Ankara");

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
