import './App.css'
import WeatherCard from './components/WeatherCard'
import { useState, useRef, useEffect, useMemo } from 'react'
import { fetchCoordinates } from './api/geo'
import { fetchWeatherbyCoords } from './api/weather'
import { getColorByWeatherId } from './data/bgColor'

function App() {
  
  const [city,setCity]=useState('seoul')
  const [weather,setWeather]=useState(null)
  const [loading,setLoading]= useState(false)
  const [err,setErr]=useState('')
  const inputRef = useRef(null)

  useEffect(()=>{
    inputRef.current.focus
  },[])

  const bg = useMemo(()=>{
    const weatherId = weather?.weather?.[0]?.id

    return getColorByWeatherId(weatherId ?? 0)

  },[weather])

  const handleSearch=async()=>{
    const q =city.trim()
    if(!q) return

    try {
      setLoading(true)
      setErr('')
    const {lat, len, name,country} = await fetchCoordinates(q)
      console.log(lat, len, name,country)
      const data = await fetchWeatherbyCoords(lat, len)
      console.log (data)
      setWeather(data)
      setCity('')
    } catch (error) {
      console.log(error)
      setErr(error) 
      
    }finally {
      setLoading(false)
    }


  }
  const onChangeInput=(e)=> setCity(e.target.value)
  
  const onKeyup=(e)=>{
    if(e.key='Enter') handleSearch()
  }
  return (
    <div className='app' style={{backgroundColor:`${bg}`}}>
      <div className="container">
          <h1>***의 날씨</h1>
          <div className="input-wrap">
            <input
            value={city} 
            onChange={onChangeInput}
            onKeyUp={onKeyup}
            ref={inputRef}
            type="text" 
            placeholder='날씨를 입력하세요.'/>
            <button 
            onClick={handleSearch}
            >검색</button>
          </div>
          {err && <p>{err}</p>}
          {loading && <p>불러오는 중...</p>}
      <WeatherCard weather={weather}/>
      </div>
    </div>
  )
}

export default App
