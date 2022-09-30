import { SessionSbService } from './../../../services/session-sb.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit {

  constructor(private sessionSbService: SessionSbService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const EMAIL = form.value.email;
    const PASSWORD = form.value.password;

    this.sessionSbService.signIn(EMAIL, PASSWORD)

    form.reset();
  }
}
