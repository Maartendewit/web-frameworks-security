import {ActivatedRoute, Params, Router} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Scooter} from 'src/app/models/scooter';
import {ScootersService} from 'src/app/services/scooters.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-detail4',
    templateUrl: './detail4.component.html',
    styleUrls: ['./detail4.component.scss']
})
export class Detail4Component implements OnInit, OnDestroy {
    public editedScooterId: number;
    public targetScooter: Scooter;
    public isChanged: boolean;

    constructor(public service: ScootersService, public activatedRoute: ActivatedRoute, public router: Router) {

    }

    public childParamsSubscription: Subscription = null;


    ngOnInit(): void {
        this.childParamsSubscription =
            this.activatedRoute.params.subscribe((params: Params) => {
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
            this.router.navigate(["../" + null], {relativeTo: this.activatedRoute});
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

    save() {
        if (this.targetScooter.tag === "" ||
            this.targetScooter.status === null ||
            this.targetScooter.gpsLocation === "" ||
            this.targetScooter.gpsLocation === null ||
            this.targetScooter.mileage === null ||
            this.targetScooter.batteryCharge === null) {
            return;
        }
        this.service.save(this.targetScooter);
        this.isChanged = false;
        this.targetScooter = this.service.findById(this.editedScooterId);
    }

    clear() {
        if (this.wantsToDiscard()) {
            return;
        }
        this.targetScooter.tag = null;
        this.targetScooter.status = null;
        this.targetScooter.gpsLocation = null;
        this.targetScooter.mileage = null;
        this.targetScooter.batteryCharge = null;
        this.isChanged = true;
    }

    reset() {
        if (this.wantsToDiscard()) {
            return;
        }
        this.isChanged = false;
        this.targetScooter = this.service.findById(this.editedScooterId);
    }

    cancel() {
        if (this.wantsToDiscard()) {
            return;
        }
        this.isChanged = false;
        this.editedScooterId = null;
        this.router.navigate(["../" + null], {relativeTo: this.activatedRoute});
    }

    delete() {
        if (this.wantsToDiscard()) {
            return;
        }
        this.service.deleteById(this.editedScooterId);
        this.editedScooterId = null;
        this.router.navigate(["../" + null], {relativeTo: this.activatedRoute});
    }

    hasChanges() {
        this.isChanged = this.targetScooter !== this.service.findById(this.editedScooterId);
    }

    wantsToDiscard(): boolean {
        if (this.isChanged) {
            if (!confirm("Are you sure to discard unsaved changes?")) {
                return true;
            }
        }
        return false;
    }
}
