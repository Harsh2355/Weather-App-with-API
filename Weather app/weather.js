
//accessing various elements of the apps
let input=document.querySelector('.city-input input');
let btn=document.querySelector('#search');
let container=document.querySelector(".container");
let appTitle=document.querySelector('.app-title p');
let notification=document.querySelector('.notification');
let weatherIcon=document.querySelector('.weather-icon');
let tempDescription=document.querySelector('.temperature-description p');
let tempValue=document.querySelector('.temperature-value p');
let TempLocation=document.querySelector('.location p');
let back=document.querySelector('.back');

const kelvin=273;
const apikey="7a4bec5dd8b8f514572130dbdb278665";
let city;
let success=false;


btn.addEventListener('click', ()=>{
    //storing the user input value and then resetting it
    city=input.value;
    input.value="";
    //displaying the weather elements
    input.style.display="none";
    btn.style.display="none";
    container.style.display="block";
    back.style.display="block";
    //checking if weather was successfully displayed
    //setTimeout is used so that condition is checked after api returns the data
    setTimeout(()=>{
        if(success==false){
            notification.style.display="block";
            notification.innerHTML="<p>OOPS! Something went wrong</p>";
        }
    },5000);
    getWeather(city);
});

//reloads the page
back.addEventListener('click',()=>{
    window.location.reload();
});

//object where data obtained from api is stored
let Weather = {};
Weather.temperature={
    unit:"C",
}


//api is fetched by city and data is added to the Weather obj
function getWeather(city){
    let api= `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}` ;
    
    fetch(api)
    .then(function(response){
        //response is converted to JavaScript object
        let data = response.json();
        return data;        
    })
    .then(function(data){
        //required info from data is accessed and assigned to the Weather obj 
        Weather.iconId= data.weather[0].icon;
        Weather.temperature.value= Math.floor(data.main.temp)-kelvin;
        Weather.description=data.weather[0].description;
        Weather.city=data.name;
        Weather.country=data.sys.country;
    })
    .then(function(){
        displayWeather(Weather);
    });
    
};


//change the innerHTML of elements to display info
function displayWeather(Weather){
    success=true; //validate input
    weatherIcon.innerHTML=`<img src="icons/${Weather.iconId}.png">`;
    tempValue.innerHTML=`${Weather.temperature.value}&deg;<span>C</span>`;
    tempDescription.innerHTML=`${Weather.description}`;
    TempLocation.innerHTML=`${Weather.city}, ${Weather.country}`;
};

//converts the temp in celsius to fahrenheit
function convert_Celc_To_Fahr(celsius){
     let fahrenheit=((1.8*parseInt(celsius))+32);
     return Math.floor(fahrenheit);
}

//changes the temperature from celsius to fahrenheit and visa-versa 
tempValue.addEventListener('click',()=>{
    //check if input was valid
    if(Weather.temperature.value==undefined) return;
    //celsius to fahrenheit
    if(Weather.temperature.unit=="C"){
        tempValue.innerHTML=`${convert_Celc_To_Fahr(Weather.temperature.value)}&deg;<span>F</span>`;       
        Weather.temperature.unit="F";  
    }
    //fahrenheit to celcius
    else{
        tempValue.innerHTML=`${Weather.temperature.value}&deg;<span>C</span>`;
        Weather.temperature.unit="C";
    }
})

