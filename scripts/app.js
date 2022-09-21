{/* <script src="scripts/forecast.js"></script> */}
// class Forecast{
//     constructor(){
//         this.key= 'GwKf3ytjqswvGyDllWZQJIlCe06i7Ji3';
//         this.weatherURL= 'http://dataservice.accuweather.com/currentconditions/v1/';
//         this.cityURL=   'http://dataservice.accuweather.com/locations/v1/cities/search';
//     }
//     async updateCity(city){
//         const cityDets= await this.getcity(city)
//         const weather= await this.getWeather(cityDets.Key);
//         return{
//             cityDets,weather
//               };
//     }

//     async getcity(city){       
//         const query= `?apikey=${this.key}&q=${city}`;
//         const response= await fetch(this.cityURL+ query);
//         const data = await response.json();
//         return data[0];
//         }

//     async getWeather(id){       
//         const query= `${id}?apikey=${this.key}`;
//         const response= await fetch(this.weatherURL + query);
//         const data= await response.json();
//         return data[0];
//         }
// }
const cityForm= document.querySelector('form');
const card= document.querySelector('.card');
const details=document.querySelector('.details')
const time= document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const forecast= new Forecast();
console.log(forecast);

const updateUI= (data)=>{
    // const cityDets=data.cityDets;
    // const weather= data.weather;
    console.log(data);
    const{cityDets,weather}=data;
// update details template
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>`

    // update images
    const iconSrc=`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    let timeScr=null;
    if(weather.IsDayTime){
        timeScr='img/day.svg';
    }else{
        timeScr='img/night.svg';
    }
    time.setAttribute('src',timeScr);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };
};

// const updateCity= async(city)=>{
//     const cityDets= await getcity(city)
//     const weather= await getWeather(cityDets.Key);
//     return{
//         cityDets,weather
//     };
// };


cityForm.addEventListener('submit',e=>{
    e.preventDefault();

    const city= cityForm.city.value.trim();
    cityForm.reset();
    forecast.updateCity(city)
     .then(data=>updateUI(data))
     .catch(err=>console.log(err));

     localStorage.setItem('location',city);

});
if(localStorage.getItem('location')){
   forecast.updateCity(localStorage.getItem('location'))
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));
}

