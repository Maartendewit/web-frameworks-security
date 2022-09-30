import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from "ngx-bootstrap/alert";


import { HeaderComponent } from './components/mainpage/header/header.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { Detail2Component } from './components/scooters/detail2/detail2.component';
import { Detail3Component } from './components/scooters/detail3/detail3.component';
import { Detail41Component } from './components/scooters/detail41/detail41.component';
import {CanDeactivateGuard} from "./services/can-deactivate_guard.service";
import { NavBarSbComponent } from './components/mainpage/nav-bar-sb/nav-bar-sb.component';
import {AuthSbInterceptor} from "./services/AuthSbInterceptor";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavBarComponent,
        routingComponents,
        Detail2Component,
        Detail3Component,
        Detail41Component,
        NavBarSbComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        BsDropdownModule,
        TooltipModule,
        ModalModule,
        AlertModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [
        CanDeactivateGuard,
        {provide: HTTP_INTERCEPTORS,
        useClass: AuthSbInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
