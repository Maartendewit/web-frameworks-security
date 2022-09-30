import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Scooter} from 'src/app/models/scooter';
import {ScootersService} from 'src/app/services/scooters.service';

@Component({
    selector: 'app-overview4',
    templateUrl: './overview4.component.html',
    styleUrls: ['./overview4.component.scss']
})
export class Overview4Component implements OnInit {
    public scooters: Scooter[];
    public selectedScooterId: number;
    public isSubscribedToChild: boolean = false;

    constructor(
        public service: ScootersService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.scooters = this.service.findAll();
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
        this.selectedScooterId = this.scooters[i].id;
        //In case we want to do it with #
        this.router.navigate([this.selectedScooterId], {relativeTo: this.activatedRoute});
        this.subscribeToChild();
        // In case we want to do it without #
        // this.router.navigate(["../../scooters/overview4/" + this.scooters[i].id]);
    }

    setSelectedScooter(id) {
        if (id != null && this.binarySearch(this.service.findAll(), id)) {
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
