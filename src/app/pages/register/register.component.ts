
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';

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

    const tooOld = (age: number): ValidatorFn => {
    return (control: AbstractControl) => {
        return control.value > age ? { 'you\'re too old to go to Mars': age } :null;
    };
  };
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService]
})

export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonist: Colonist[] = [];
  registerForm: FormGroup;
  NO_JOB_SELECTED = 'no job';

  constructor(private jobService: JobsService,
  private colonistService: ColonistService) { }

  ngOnInit() {

    this.jobService.getData()
        .subscribe((data)=> {
          this.jobs = data.jobs;
        });

    this.registerForm = new FormGroup({
      name: new FormControl('',[
        Validators.required, 
        Validators.maxLength(100), 
        Validators.minLength(3)
        ]),
      age: new FormControl('',[Validators.required, tooOld(100)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)]) 
    });
 
 }
 
  postColonist(){
    const colonistName = this.registerForm.get('name').value;
    const colonistJob = this.registerForm.get('job_id').value;
    const colonistAge = this.registerForm.get('age').value;

   const colonist = new Colonist(colonistName, colonistAge, colonistJob);
   
   this.colonistService.postData(colonist)
      .subscribe((newColonist) => {
        console.log(newColonist);
                        });

  }
    register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      // the form is invalid
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      const colonist = new Colonist(name, age, job_id);
      console.log('WIN!', colonist);


    }
  }
}