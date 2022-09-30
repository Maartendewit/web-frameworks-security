import { Component, OnInit } from '@angular/core';
import { Scooter } from 'src/app/models/scooter';

@Component({
    selector: 'app-overview2',
    templateUrl: './overview2.component.html',
    styleUrls: ['./overview2.component.scss']
})
export class Overview2Component implements OnInit {
    scooters: Scooter[];
    selectedScooter: Scooter = null;
    selected: number;

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

    selectScooter(i) {
        this.selected = i
        this.selectedScooter = this.scooters[i];
    }

    public deleteScooter() {
        const index: number = this.scooters.indexOf(this.selectedScooter);
        if (index !== -1) {
            this.scooters.splice(index, 1);
        }
        this.selectedScooter = null;
    }
}
