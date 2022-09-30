import {ScootersSbService} from '../../../services/scooters-sb.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Scooter} from 'src/app/models/scooter';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-detail5',
    templateUrl: '../detail4/detail4.component.html',
    styleUrls: ['../detail4/detail4.component.scss']
})
export class Detail5Component implements OnInit, OnDestroy {
    public editedScooterId: number;
    public targetScooter: Scooter;
    public remoteScooter: Scooter;
    public isChanged: boolean;

    constructor(public service: ScootersSbService,
                public activatedRoute: ActivatedRoute,
                public router: Router) {
    }

    public childParamsSubscription: Subscription = null;
    public scooterGetSubscription: Subscription = null;
    public scooterPostSubscription: Subscription = null;
    public scooterGetAllSubscription: Subscription = null;
    
    ngOnInit(): void {
        this.childParamsSubscription =
            this.activatedRoute.params.subscribe((params: Params) => {
                this.setEditedScooter(+params["id"] || null)
            });
    }

    ngOnDestroy() {
        this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
        this.scooterGetSubscription && this.scooterGetSubscription.unsubscribe();
        this.scooterPostSubscription && this.scooterPostSubscription.unsubscribe();
        this.scooterGetAllSubscription && this.scooterGetAllSubscription.unsubscribe();
    }

    setEditedScooter(id) {
        if (id != null) {
            this.scooterGetSubscription = this.service.restGetScooter(id).subscribe(
                response => {
                    this.targetScooter = Object.assign(new Scooter(), response);
                    this.remoteScooter = Object.assign(new Scooter(), response);
                    this.editedScooterId = id;
                    this.isChanged = false;
                }
            );
        } else {
            this.router.navigate(["../" + null], {relativeTo: this.activatedRoute});
        }
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
      this.scooterPostSubscription = this.service.restPostScooter(this.targetScooter).subscribe(
          response => {
              this.isChanged = false;
              this.targetScooter = response;
              this.scooterGetAllSubscription = this.service.restGetScooters().subscribe(
                  response => {
                      this.service.scooters = response;
                  }
              )
          }
      );
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
      this.scooterGetSubscription = this.service.restGetScooter(this.editedScooterId).subscribe(
          response => {
            this.targetScooter = response;
          }
      )
    }

    cancel() {
      if (this.wantsToDiscard()) {
          return;
      }

      this.isChanged = false;
      this.editedScooterId = null;
      this.router.navigate(["../" + null], { relativeTo: this.activatedRoute });
    }

    delete() {
      if (this.wantsToDiscard()) {
          return;
      }
      this.service.restDeleteScooter(this.editedScooterId).subscribe(
          response => {
            this.service.restGetScooters().subscribe(
                response => {
                  this.service.scooters = response;
                }
            )
          }
      );
      this.editedScooterId = null;
      this.router.navigate(["../" + null], { relativeTo: this.activatedRoute });
    }

    hasChanges() {
        this.isChanged = this.targetScooter !== this.remoteScooter;
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
