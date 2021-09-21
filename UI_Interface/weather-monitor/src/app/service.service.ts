import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { City } from './city';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private h: HttpClient) { }
 
 
getregdata(params:any)
{
  console.log(params);
  const headers = new Headers();
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'GET');
  headers.append('Access-Control-Allow-Origin', '*');
  return this.h.get('http://127.0.0.1:5000/register',{params});
}

getlogindata(params:any)
  {
    console.log(params);
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.h.get('http://127.0.0.1:5000/login/',{params});
  }

getcitydata(params:any)
  {
    console.log(params);
    return this.h.get('http://127.0.0.1:5000/cityadd',{params});
  }

getweatherdata(): Observable<City[]> {
    return this.h.get<City[]>('http://127.0.0.1:5000/cityweather');
  }

deletecitydata(params:any)
  {
    console.log(params);
    return this.h.get('http://127.0.0.1:5000/deletecity?city='+params);
  }
updatecitydata(params:any)
  {
    return this.h.get('http://127.0.0.1:5000/updatecity?city='+params)
  }
 
}
