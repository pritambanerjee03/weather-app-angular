import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

  WeatherData:any;

  Api_Url = "https://api.openweathermap.org/data/2.5/weather?q=";
  Api_Key = "&appid=216c865be4f7c4d97cdb2a7b873dd6f7";

  Api_Img_UrlPrefix ="http://openweathermap.org/img/wn/";
  Api_Img_UrlSuffix ="@2x.png";

  cityName: String = "kolkata";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      sys : {},
      wind: {},
      isDay: Boolean,
      Icon: String,
      Description: String
    };
    this.getWeatherData();
  }

  getWeatherData(){
  this.http.get<any>(this.Api_Url+this.cityName+this.Api_Key).
    subscribe(
      response =>{
        this.setWeatherData(response);
        console.log('weather data ',response);
      },
      error=>console.log(error)
    );
  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
     this.WeatherData.Icon= this.Api_Img_UrlPrefix + this.WeatherData.weather[0].icon + this.Api_Img_UrlSuffix;
     this.WeatherData.Description= this.WeatherData.weather[0].description;
  }

  onChange(value :String){
    this.cityName = value;
    console.log('Hello City ', this.cityName);
    this.getWeatherData();
  }


}
