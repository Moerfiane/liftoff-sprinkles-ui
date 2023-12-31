//Example data fetcher function I developed for a weather API, mostly for reference
//TODO: connect data fetcher to local backend
const getData = (() => {
    const fetchWeatherData = async function(city) {
        try {
            const weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=2924c3986bf946cc828152529231805&q=${city}`, {mode: 'cors'});
            return weather.json()
        } catch (err) {
            console.log(err)
        }
    }
    return {fetchWeatherData}
})();

export default getData;