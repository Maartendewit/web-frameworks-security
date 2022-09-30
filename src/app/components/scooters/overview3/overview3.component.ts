import { Component, OnInit } from '@angular/core';
import { Scooter } from 'src/app/models/scooter';
import { ScootersService } from 'src/app/services/scooters.service'

@Component({
    selector: 'app-overview3',
    templateUrl: './overview3.component.html',
    styleUrls: ['./overview3.component.scss']
})
export class Overview3Component implements OnInit {
    public scooters: Scooter[];
    public selectedScooterId: number;

    constructor(public service: ScootersService) {}

    ngOnInit(): void {
        this.scooters = this.service.findAll()
    }

    selectScooter(i) {
        this.selectedScooterId = this.scooters[i].id;
    }

}
