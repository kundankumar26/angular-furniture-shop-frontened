import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { AuthService } from '../_services/auth.service';
import { SharedService } from '../_services/shared.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};

  user: Employee = new Employee();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: String[];

  constructor(private authService: AuthService, private router: Router, 
    private tokenStorage: TokenStorageService, private sharedServices: SharedService) { }


   ngOnInit(): void {
     if (this.tokenStorage.getToken()) {
       this.isLoggedIn = true;
       this.roles = this.tokenStorage.getUser().roles;
     }
  }

   onSubmit(): void {
    this.authService.login(this.form).subscribe(
       data => {
         this.tokenStorage.saveToken(data.accessToken);
         this.tokenStorage.saveUser(data);

         this.isLoginFailed = false;
         this.isLoggedIn = true;
         this.roles = this.tokenStorage.getUser().roles;
         this.reloadPage();
       },
       err => {
         this.errorMessage = err.error.message;
         this.isLoginFailed = true;
       }
     );
   }

  reloadPage(): void {
    if(String(this.roles) == "ROLE_EMPLOYEE") 
      this.router.navigate(["/employee"]);
    else if (String(this.roles) == "ROLE_ADMIN") 
      this.router.navigate(["/admin"]);
    else if(String(this.roles) == "ROLE_VENDOR") 
      this.router.navigate(["/ventor"]);
  }
}
