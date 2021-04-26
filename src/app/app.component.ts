import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showVendorBoard = false;
  showEmployeeBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showVendorBoard = this.roles.includes('ROLE_VENDOR');
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.reload();
    this.route.navigate(['/login']);
    window.location.reload();
  }
}
