import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Film} from "./models/Film";

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {

  constructor(private http: HttpClient) { }
  apiUrl: string='http://server347875.nazwa.pl:8000';
  public getFilms(): Observable<Film[]>{
    return this.http.get<Film[]>(this.apiUrl);
  }

  public addFilm(film:Film):Observable<any>{
    film.id=0;
    return this.http.post(this.apiUrl,film);
  }

  public getFilm(id:number):Observable<Film>{
    const url = `${this.apiUrl}/id/${id}`;
    return this.http.get<Film>(url);
  }
  public updateFilm(film: Film) :Observable<any>{
    const url = `${this.apiUrl}/${film.id}`;
    return this.http.put(url,film);
  }
  public deleteFilm(id:number) :Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
