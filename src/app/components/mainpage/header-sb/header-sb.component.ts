import { SessionSbService } from './../../../services/session-sb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-sb',
  templateUrl: './header-sb.component.html',
  styleUrls: ['./header-sb.component.scss']
})
export class HeaderSbComponent implements OnInit {
  time = new Date();

  constructor(public sessionSbService: SessionSbService) {
    
  }

  ngOnInit(): void {
    this.time = new Date();
  }

}
