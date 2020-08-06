import React, {useState, useEffect} from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Table from './Table';
import numeral from 'numeral'
import {sortData} from './util'
import { MenuItem, FormControl, Select,Card, CardContent } from '@material-ui/core';
function App() {

const [countries, setCountries] = useState([]);
const [country, setCountry] = useState("Worldwide");
const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState([]);


  



useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
});
}, [])

useEffect(() => {
  const getCountriesData = async() => {
    await fetch("https://disease.sh/v3/covid-19/countries").then( response => response.json()).then((data) => {
      const countries = data.map(country => ( {
        name: country.country,
        value: country.countryInfo.iso2
      }));

      const sortedData = sortData(data);
      setTableData(sortedData);
      setCountries(countries);
    });
  }

  getCountriesData();
}, [countries])



  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
       await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

      });

      console.log("country info =>", countryInfo)
  };

  return (
    <div className="App">
      <div className="app_left">
      <div className="app__header">
    <h1> COVID_19 Tracker</h1>
      <FormControl >
        <Select className="app__dropdown" variant='outlined' value={country} onChange={onCountryChange}>
  <        MenuItem value = "Worldwide">worldwide</MenuItem>   
          {
            countries.map(country => (    
            <MenuItem value = {country.value}> {country.name}</MenuItem>   

            ))}
        </Select>
      </FormControl>
   </div>
      
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases"  cases= {numeral(countryInfo.todayCases).format("0,0")} total= {numeral(countryInfo.cases).format("0,0")}/>
        <InfoBox title=" Recoverd" cases= {numeral(countryInfo.todayRecovered).format("0,0")} total={numeral( countryInfo.recovered).format("0,0")}/>
        <InfoBox title=" Deaths" cases= {numeral(countryInfo.todayDeaths).format("0,0")} total={numeral(countryInfo.deaths).format("0,0")} />
       
      </div>
      {/* <Map/> */}
      </div>
      <Card className= "app__right">
        <CardContent >
                <h3> Total cases</h3>
                <Table countries={tableData}/>
                {/* <LineGraph/> */}
                
        </CardContent>
      </Card>
    </div>
  );

            }

export default App;
  