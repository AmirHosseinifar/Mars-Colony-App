import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Encounter } from '../../models/encounter';
import { EncountersService} from '../../services/encounters.service';
import { Aliens } from '../../models/aliens';
import { AliensService } from'../../services/aliens.service';

import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';
import { RegisterComponent} from '../register/register.component';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import {ColonistService } from '../../services/colonist.service';
import {Colonist} from '../../models/colonist';
import {
   FormGroup,
   FormControl, 
   FormBuilder,
   Validators,
   ValidatorFn,
   AbstractControl
  } from '@angular/forms';

const cantBe = (value: string): ValidatorFn => { 
   return (control: AbstractControl) => {
      return control.value === value ? { 'Cant\'be this value': value } :null;
    };
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService]
})

export class ReportComponent implements OnInit {

  aliens: Aliens[] = [];
  report: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = 'no alien';

  constructor(private aliensService: AliensService,
              private reportService: ReportService,
              private router: Router) { }

  ngOnInit() {

        this.aliensService.getData()
            .subscribe((data) => {
              this.aliens = data.aliens;
        });

  this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('',[Validators.required, Validators.minLength(3)]),
    });
 
 }
 
   reported(event) {
    event.preventDefault();
    // if (this.reportForm.invalid) {
    //  console.log(this.reportForm);
    //  alert("a");
    //  } else {
       const atype = this.reportForm.get('atype').value;
       const date = new Date;
       const prettyDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
       const action = this.reportForm.get('action').value;
       const colonist_id = window.localStorage.colonist_id;
       

      this.report = new Report(atype, prettyDate, action, colonist_id);
      this.postReport();
     }
  //  }

postReport() {
  this.reportService.postData(this.report).subscribe((newReport) => {
      // window.localStorage.setItem('action', newReport.report);
      // const atype = this.reportForm.get('atype').value;
      // const action = this.reportForm.get('action').value;
      // const colonist_id = window.localStorage.colonist_id;
      // const date = new Date;
      // const prettyDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      //  this.report = new Report(atype, prettyDate, action, colonist_id);
    this.router.navigate(['/encounters']);
  });
}

}