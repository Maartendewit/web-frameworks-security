import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SessionSbService} from "./session-sb.service";

@Injectable({
    providedIn: 'root'
})
export class AuthSbInterceptor implements HttpInterceptor {

    constructor(private session: SessionSbService) {
        
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.session.getTokenFromSessionStorage("token");
        if (token != null) {
            //Clone the request, adding the token in the authorization header
            //pass on the cloned request to the next handler
            req = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(req);
        } else {
            //Just forward the request to the next handler
            return next.handle(req);
        }
    }
}
