import { Component, OnInit } from '@angular/core';
import {Overview4Component} from "../overview4/overview4.component";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScootersService} from "../../../services/scooters.service";

@Component({
    selector: 'app-overview4qp',
    templateUrl: '../overview4/overview4.component.html',
    styleUrls: ['../overview4/overview4.component.scss']
})
export class Overview4qpComponent extends Overview4Component implements OnInit {
    selectScooter(i) {
        this.selectedScooterId = this.scooters[i].id;
        //In case we want to do it with #
        this.router.navigate(["./edit/"], { relativeTo: this.activatedRoute, queryParams: {id: this.selectedScooterId} });
        this.subscribeToChild();
        // In case we want to do it without #
        // this.router.navigate(["../../scooters/overview4/" + this.scooters[i].id]);
    }

    subscribeToChild() {
        if (this.activatedRoute.firstChild !== null && this.isSubscribedToChild === false) {
            this.activatedRoute.firstChild.queryParams.subscribe((param: Params) => {
                this.setSelectedScooter(+param["id"] || null)
            });
        } else {
            this.router.navigate(["./edit/"], { relativeTo: this.activatedRoute, queryParams: {id: null} });
        }
    }
}
