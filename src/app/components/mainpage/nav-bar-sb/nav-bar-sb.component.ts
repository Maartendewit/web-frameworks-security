import { SessionSbService } from './../../../services/session-sb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-sb',
  templateUrl: './nav-bar-sb.component.html',
  styleUrls: ['./nav-bar-sb.component.scss']
})
export class NavBarSbComponent implements OnInit {

  constructor(public sessionSbService: SessionSbService) { }

  ngOnInit(): void {
  }

}
