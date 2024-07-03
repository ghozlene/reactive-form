import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  genders = ['male', 'female'];
  status = 0;
  signupForm: FormGroup;
  projectStatus = new FormArray([
    new FormControl('Stable', Validators.required),
    new FormControl('Critical', Validators.required),
    new FormControl('Finished', Validators.required),
  ]);
  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'projectName': new FormControl(null, [Validators.required, this.forbiddenNames]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asyncValidator.bind(this)),

      }),

      'status': new FormControl(null, this.projectStatus[this.status])
    });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

  }
  onSubmit() {
    console.log(this.projectStatus.get('projectStatus').value);


  }



  get controls() {

    return this.projectStatus.value;

  }

  forbiddenNames(control: FormControl): { [s: string]: boolean; } {
    if (control.value == 'Test') {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  asyncValidator(control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailsIsForbidden': true });
        } else {

          resolve(null);
        }
      }, 1500);

    });
    return promise;
  }



}
