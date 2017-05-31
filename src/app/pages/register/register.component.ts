
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private registerService: RegisterService) { }

  ngOnInit() {

    this.registerService
        .getData()
        .subscribe((data) => {
          this.jobs = data.jobs;
        });

  }

}