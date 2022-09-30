import {ScootersSbService} from '../../../services/scooters-sb.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Scooter} from 'src/app/models/scooter';

@Component({
    selector: 'app-overview5',
    templateUrl: '../overview4/overview4.component.html',
    styleUrls: ['../overview4/overview4.component.scss']
})
export class Overview5Component implements OnInit { //TODO: Dont allow use to go here when not logged in
    public selectedScooterId: number;
    public isSubscribedToChild: boolean = false;
    public scooters: Scooter[];

    constructor(
        public service: ScootersSbService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.service.restGetScooters().subscribe(
            response => {
                this.service.scooters = response;
            }
        );
        this.subscribeToChild();
    }

    subscribeToChild() {
        if (this.activatedRoute.firstChild !== null && this.isSubscribedToChild === false) {
            this.activatedRoute.firstChild.params.subscribe((param: Params) => {
                this.setSelectedScooter(+param["id"] || null)
            });
        } else {
            this.router.navigate(["null"], {relativeTo: this.activatedRoute});
        }
    }

    selectScooter(i) {
        this.selectedScooterId = this.service.scooters[i].id;
        //In case we want to do it with #
        this.router.navigate([this.selectedScooterId], {relativeTo: this.activatedRoute});
        this.subscribeToChild();
        // In case we want to do it without #
        //this.router.navigate(["../../scooters/overview5/" + this.service.scooters[i].id]);
    }

    setSelectedScooter(id) {
        if (id != null && this.binarySearch(this.service.scooters, id)) {
            this.selectedScooterId = id;
        } else {
            this.selectedScooterId = null;
        }
    }

    binarySearch(searchData, scooterId): Boolean {
        let currentIndex = Math.floor(searchData.length / 2);
        if (searchData.length === 0 || currentIndex === searchData.length) {
            return false;
        }
        if (searchData[currentIndex].id === scooterId) {
            return true;
        }
        if (searchData[currentIndex].id < scooterId) {
            return this.binarySearch(searchData.slice(currentIndex), scooterId);
        }
        if (searchData[currentIndex].id > scooterId) {
            return this.binarySearch(searchData.slice(0, currentIndex), scooterId);
        }
        return false
    }
}
