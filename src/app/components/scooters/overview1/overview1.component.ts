import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
    selector: 'app-overview1',
    templateUrl: './overview1.component.html',
    styleUrls: ['./overview1.component.scss']
})
export class Overview1Component implements OnInit {
    scooters: Scooter[];

    constructor() {

    }

    ngOnInit(): void {
        this.scooters = [];
        for (let i = 0; i < 8; i++) {
            this.addRandomScooter();
        }
    }

    public addRandomScooter(): void {
        this.scooters.push(Scooter.createRandomScooter());
    }
}
