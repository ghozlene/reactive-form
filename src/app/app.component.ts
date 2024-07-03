import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  forbiddenUserName = ['anna', 'max'];
  signupForm: FormGroup;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asyncValidator.bind(this)),

      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
    this.signupForm.patchValue({

      'userData': {
        'username': 'achref',
        'email': "achref@example.com"
      }
    });
    this.signupForm.setValue({

      'userData': {
        'username': 'achref',
        'email': "test@example.com"
      },
      'gender': 'female',
      'hobbies': []
    });
  }
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'userData': {
        'username': '',
        'email': ""
      },
      'gender': 'female',
      'hobbies': []
    });

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean; } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
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
