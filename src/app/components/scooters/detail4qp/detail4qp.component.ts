import {Component, HostListener, OnInit} from '@angular/core';
import {Detail4Component} from "../detail4/detail4.component";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Params, QueryParamsHandling, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-detail4qp',
    templateUrl: '../detail4/detail4.component.html',
    styleUrls: ['../detail4/detail4.component.scss']
})
export class Detail4qpComponent extends Detail4Component implements OnInit {
    constructor(public service: ScootersService, public activatedRoute: ActivatedRoute, public router: Router) {
        super(service, activatedRoute, router);
    }

    public childParamsSubscription: Subscription = null;


    ngOnInit(): void {
        this.childParamsSubscription =
            this.activatedRoute.queryParams.subscribe((params: Params) => {
                this.setEditedScooter(+params["id"] || null)
            });
    }

    ngOnDestroy() {
        this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
    }

    setEditedScooter(id) {
        if (id != null && this.binarySearch(this.service.findAll(), id)) {
            this.editedScooterId = id;
            this.targetScooter = this.service.findById(this.editedScooterId);
        } else { 
            this.router.navigate(["../edit"], { relativeTo: this.activatedRoute, queryParams: {id: id} });
        }
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
    
    cancel() {
        super.cancel();
        this.router.navigate(["./"], { relativeTo: this.activatedRoute, queryParams: {id: "null"} });
    }
    
    delete() {
        super.delete();
        this.router.navigate(["./"], { relativeTo: this.activatedRoute, queryParams: {id: "null"} });
    }
}
