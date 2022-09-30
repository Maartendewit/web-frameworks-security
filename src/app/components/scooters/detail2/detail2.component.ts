import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
    selector: 'app-detail2',
    templateUrl: './detail2.component.html',
    styleUrls: ['./detail2.component.scss']
})
export class Detail2Component implements OnInit {
    @Input() targetScooter: Scooter;
    @Output() scooterToDelete = new EventEmitter();

    constructor() {
    }


    ngOnInit(): void {

    }

    public deleteScooter() {
      this.scooterToDelete.emit();
    }
}
