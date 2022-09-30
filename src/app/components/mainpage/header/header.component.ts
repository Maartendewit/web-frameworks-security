import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    time = new Date();

    constructor() {

    }

    ngOnInit(): void {
        this.time = new Date();
    }
}
