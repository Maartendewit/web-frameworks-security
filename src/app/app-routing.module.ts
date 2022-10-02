import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1Component} from './components/scooters/overview1/overview1.component';
import {Overview2Component} from './components/scooters/overview2/overview2.component';
import {Overview3Component} from './components/scooters/overview3/overview3.component';
import {Overview4Component} from './components/scooters/overview4/overview4.component';
import {PageNotFoundComponent} from './components/mainpage/page-not-found/page-not-found.component';
import {Detail4Component} from './components/scooters/detail4/detail4.component';
import {Detail41Component} from "./components/scooters/detail41/detail41.component";
import {CanDeactivateGuard} from "./services/can-deactivate_guard.service";
import {Detail4qpComponent} from "./components/scooters/detail4qp/detail4qp.component";
import {Overview4qpComponent} from "./components/scooters/overview4qp/overview4qp.component";
import { Overview5Component } from './components/scooters/overview5/overview5.component';
import { Detail5Component } from './components/scooters/detail5/detail5.component';
import { HeaderSbComponent } from './components/mainpage/header-sb/header-sb.component';
import { SignOnComponent } from './components/mainpage/sign-on/sign-on.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'sign-on', component: SignOnComponent},
    {path: 'scooters/overview1', component: Overview1Component},
    {path: 'scooters/overview2', component: Overview2Component},
    {path: 'scooters/overview3', component: Overview3Component},
    {path: 'scooters/overview4', component: Overview4Component, children: [
        {path: ':id', component: Detail4Component}
    ]},
    {path: 'scooters/overview41', component: Overview4Component, children: [
        {path: ':id', component: Detail41Component, canDeactivate: [CanDeactivateGuard]}
    ]},
    {path: 'scooters/overview4qp', component: Overview4qpComponent, children: [
        {path: 'edit', component: Detail4qpComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange', canDeactivate: [CanDeactivateGuard]}
    ]},
    {path: 'scooters/overview5', component: Overview5Component, children: [
        {path: ':id', component: Detail5Component}
    ]},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
    HomeComponent,
    Overview1Component,
    Overview2Component,
    Overview3Component,
    Overview4Component,
    Overview4qpComponent,
    Detail4Component,
    Detail41Component,
    Detail4qpComponent,
    Overview5Component,
    Detail5Component,
    PageNotFoundComponent,
    HeaderSbComponent,
    SignOnComponent,
]
