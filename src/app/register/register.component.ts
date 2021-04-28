import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SignupRequestPayload } from './register-request.payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:any={}
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signupRequestPayload = {
      empId: null,
      empFirstName: '',
      empLastName: '',
      empUsername: '',
      email: '',
      empPassword: '',
      role: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      empId: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      empFirstName: new FormControl('', Validators.required),
      empLastName: new FormControl('', Validators.required),
      empUsername: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      empPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', Validators.required)
    });
  }

  signup(): void {
    this.signupRequestPayload.empId = this.signupForm.get('empId').value;
    this.signupRequestPayload.empFirstName = this.signupForm.get('empFirstName').value;
    this.signupRequestPayload.empLastName = this.signupForm.get('empLastName').value;
    this.signupRequestPayload.empUsername = this.signupForm.get('empUsername').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.empPassword = this.signupForm.get('empPassword').value;
    this.signupRequestPayload.role = this.signupForm.get('role').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
      }, error => {
        console.log(error);
        //this.toastr.error('Registration Failed! Please try again');
      });

    console.log(this.signupRequestPayload);
  }
}