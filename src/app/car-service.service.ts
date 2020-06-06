import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "./models/Car";

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private http: HttpClient) { }
  apiUrl: string='https://fathomless-everglades-53342.herokuapp.com';



  public getCars(colour:string, page:number): Observable<any>{
    const url = `${this.apiUrl}?colour=${colour}&page=${page}`;
    return this.http.get<any>(url);
  }

  public addCar(car:Car):Observable<any>{
    car.id=0;
    return this.http.post(this.apiUrl,car);
  }

  public getCar(id:number):Observable<Car>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url);
  }

  public updateCar(car: Car) :Observable<any>{
    const url = `${this.apiUrl}/${car.id}`;
    return this.http.put(url,car);
  }
  public deleteCar(id:number) :Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
