import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionSbService {

    public readonly BACKEND_URL = "http://localhost:8080/authenticate";

    public currentUserName = null;
    public authenticated = false;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserName = this.getTokenFromSessionStorage("username");
        this.isAuthenticated();
    }

    public signIn(eMail: string, password: string): Observable<any> {
        let signInResponse =
            this.http.post<HttpResponse<User>>(this.BACKEND_URL + "/login",
                {eMail: eMail, password: password},
                {observe: "response"}).pipe(shareReplay(1));

        signInResponse.subscribe(
            response => {
                console.log(response);
                this.saveTokenIntoSessionStorage('username', (response.body as unknown as User).name);
                this.saveTokenIntoSessionStorage("token", response.headers.get("Authorization").replace("Bearer ", ""));
                this.currentUserName = (response.body as unknown as User).name;
                this.isAuthenticated();
                this.router.navigateByUrl("/#/home");
            },
            error => {
                console.error(error);
                this.signOff();
            }
        );

        return signInResponse;
    }

    public signOff() {
        sessionStorage.clear();
        localStorage.clear();
        this.currentUserName = null;
        this.isAuthenticated();
    }

    public isAuthenticated(): boolean {
        this.authenticated = this.getTokenFromSessionStorage("token") != null;
        return this.getTokenFromSessionStorage("token") != "null";
    }

    getTokenFromSessionStorage(key: string): string {
        if (!sessionStorage.getItem(key)) {
            return localStorage.getItem(key);
        }
        return sessionStorage.getItem(key);
    }

    private saveTokenIntoSessionStorage(key: string, value: string) {
        localStorage.setItem(key, value)
        sessionStorage.setItem(key, value)
    }
}
