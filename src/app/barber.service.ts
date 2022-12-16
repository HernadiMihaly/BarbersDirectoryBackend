import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barber } from './barber';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  currentUsername: string | undefined;
  currentPassword: string | undefined;
  constructor(private http: HttpClient) { }


  public getHeaders(): HttpHeaders{
    return new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('currentEmail') + ':' + sessionStorage.getItem('currentPassword')) });
  }

  public getBarbers(): Observable<Barber[]> {
    const headers = this.getHeaders();
    return this.http.get<Barber[]>(`http://localhost:8080/barbers`, {headers});
  }

  public addBarber(barber: Barber): Observable<Barber> {
    const headers = this.getHeaders();
    return this.http.post<Barber>(`http://localhost:8080/barbers`, barber, {headers});
  }

  public deleteBarber(barberId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`http://localhost:8080/barbers/${barberId}`, {headers});
  }

  public updateBarber(barber: Barber): Observable<Barber> {
    const headers = this.getHeaders();
    return this.http.put<Barber>(`http://localhost:8080/barbers`, barber, {headers});
  }

  public getBarberById(barberId: number):Observable<Barber>{
    const headers = this.getHeaders();
    return this.http.get<Barber>(`http://localhost:8080/barbers/${barberId}`, {headers});
  }

  public login(user: User):Observable<any>{
    var username = user.email;
    var password = user.password;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post("http://localhost:8080/login", user, {headers,responseType: 'text' as 'json'})
  }

  public logout(){
    sessionStorage.removeItem("currentEmail");
    sessionStorage.removeItem("currentPassword");
    return this.http.get("http://localhost:8080/logout")
}

  public registerFromBackend(user: User):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/register`, user);
  }
  
}
