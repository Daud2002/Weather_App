import React, { useState, useEffect } from 'react'
import './Weather.css'
import TextField from '@mui/material/TextField';

export default function Weather() {
    let [city, setcity] = useState("");
    let [wdetails, setwdetails] = useState();
    let [isloading, Setisloading] = useState(false);
    const [backgroundClass, setBackgroundClass] = useState("default");


    let getData = (event) => {
        event.preventDefault();
        Setisloading(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
            .then((res) => res.json())
            .then((finalres) => {
                console.log(finalres.cod)
                if (finalres.cod !== 200) {
                    setwdetails(null)
                }
                else {
                    setwdetails(finalres)
                    setcity('')
                }
                Setisloading(false)
            }
            )
            .catch((error) => {
                console.error('Error fetching data:', error);
                Setisloading(false);
                setwdetails(null)
            });
    }
    useEffect(() => {
        if (wdetails) {
            const weatherMain = wdetails.weather[0].main.toLowerCase();
            switch (weatherMain) {
                case 'clear':
                    setBackgroundClass('clear');
                    break;
                case 'clouds':
                    setBackgroundClass('clouds');
                    break;
                case 'rain':
                case 'drizzle':
                    setBackgroundClass('rain');
                    break;
                case 'thunderstorm':
                    setBackgroundClass('thunderstorm');
                    break;
                case 'snow':
                    setBackgroundClass('snow');
                    break;
                case 'mist':
                case 'fog':
                case 'haze':
                case 'smoke':
                    setBackgroundClass('mist');
                    break;
                default:
                    setBackgroundClass('default');
            }
        }
    }, [wdetails]);
    return (
        <div className={`background_div ${backgroundClass} w-[100%] h-[100vh]`}>
            <div className='full_data flex justify-center items-center flex-col gap-8'>
                <div className='mt-12 flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-[60px] underline'>Weather</h1>
                    <p className='shadow-xl font-serif'>By Daud Mir</p>
                </div>
                <div className='searching_div '>
                    <form onSubmit={getData} className='flex flex-row justify-center items-center'>
                        <TextField id="outlined-basic" label="City Name" variant="outlined" value={city} onChange={(e) => setcity(e.target.value)} className=' backdrop-blur-2xl'/>
                        <button className='py-2'>Submit</button>
                    </form>

                </div>
                <div className='show_data flex flex-col items-center text-center my-1 justify-center relative backdrop-blur-xl w-[90%] md:w-[35%] h-[50vh] border border-[black] gap-4 rounded-md'>

                    {
                        isloading ? 
                                <img src="https://i.gifer.com/ZKZg.gif" width={150} className={`absolute ${isloading ? '' : 'hidden'}`} />
                        :(wdetails
                            ?
                            <>
                                <h2 className='text-[white] text-[30px] underline'>
                                {wdetails.name}
                                <span className={`${wdetails.sys.country !== undefined ? ' p-2 text-green-500  bg-slate-500 ml-4 font-bold border rounded-md' : ''}`}>
                                {wdetails.sys.country}
                                </span></h2>
                                <h3 className='text-white text-[25px]'>{wdetails.main.temp}&deg;</h3>
                                <img src={`https://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`} className='w-14'/>
                                <p className='text-white'>{wdetails.weather[0].description}</p>
                            </>
                            :
                    'No Data Founds'
                        )
                    }

                </div>
            </div>

        </div>
    )
}
