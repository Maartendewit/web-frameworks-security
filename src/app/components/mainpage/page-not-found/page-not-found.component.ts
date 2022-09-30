import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  public pathname: string;

  constructor() {
    document.addEventListener("click", () => {
      this.onClick();
    })
  }

  ngOnInit(): void {
    // If we want to use routing with #
    this.pathname = window.location.hash;
    // If we want to use routing without # 
    // this.pathname = window.location.pathname;
  }

  onClick() {
    // If we want to use routing with #
    this.pathname = window.location.hash;
    // If we want to use routing without # 
    // this.pathname = window.location.pathname;
  }

}
