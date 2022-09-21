class Forecast{
    constructor(){
        this.key= 'GwKf3ytjqswvGyDllWZQJIlCe06i7Ji3';
        this.weatherURL= 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL=   'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets= await this.getcity(city)
        const weather= await this.getWeather(cityDets.Key);
        return{
            cityDets,weather
              };
    }

    async getcity(city){       
        const query= `?apikey=${this.key}&q=${city}`;
        const response= await fetch(this.cityURL+ query);
        const data = await response.json();
        return data[0];
        }

    async getWeather(id){       
        const query= `${id}?apikey=${this.key}`;
        const response= await fetch(this.weatherURL + query);
        const data= await response.json();
        return data[0];
        }
}
//const forecast= new Forecast();
//console.log(forecast);

// const key='GwKf3ytjqswvGyDllWZQJIlCe06i7Ji3';
// const getWeather= async(id)=>{
//     const base= 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query= `${id}?apikey=${key}`;
//     const response= await fetch( base+ query);
//     const data = await response.json();
//     return data[0];
// }
// const getcity= async(city)=>{

//     const base= 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query= `?apikey=${key}&q=${city}`;
//     const response= await fetch(base + query);
//     const data= await response.json();
//     return data[0];
// };
