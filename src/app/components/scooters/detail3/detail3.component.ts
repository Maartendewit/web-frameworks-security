import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Scooter } from 'src/app/models/scooter';
import { ScootersService } from 'src/app/services/scooters.service'

@Component({
    selector: 'app-detail3',
    templateUrl: './detail3.component.html',
    styleUrls: ['./detail3.component.scss']
})
export class Detail3Component implements OnInit, OnChanges {
    @Input() editedScooterId: number;
    @Output() editedScooterIdChange = new EventEmitter();
    public targetScooter: Scooter;
    public isChanged: boolean;

    constructor(public service: ScootersService) {
        
    }

    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges) {
        this.targetScooter = this.service.findById(this.editedScooterId);
        this.isChanged = false;
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
        this.editedScooterIdChange.emit(null);
        this.isChanged = false;
        this.editedScooterId = null;
    }

    delete() {
        if (this.wantsToDiscard()) {
            return;
        }
        this.service.deleteById(this.editedScooterId);
        this.editedScooterId = null;
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
