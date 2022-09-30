import { ActivatedRoute, Params, Router } from '@angular/router';
import {Component, HostListener, OnInit} from '@angular/core';
import {Detail4Component} from "../detail4/detail4.component";
import {ScootersService} from "../../../services/scooters.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-detail41',
    templateUrl: '../detail4/detail4.component.html',
    styleUrls: ['../detail4/detail4.component.scss']
})
export class Detail41Component extends Detail4Component implements OnInit {

    constructor(public service: ScootersService,
                public activatedRoute: ActivatedRoute,
                public router: Router) {
        super(service, activatedRoute, router);

    }

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        if (((this.isChanged != undefined)) && this.isChanged) {
            let discard = !this.wantsToDiscard();
            this.isChanged = !discard;
            return discard;
        }
        return true;
    }
}
