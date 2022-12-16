import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BarberService } from '../barber.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: User = new User();
  message:string= "";

  constructor(private barberService: BarberService, private router: Router){

  }

  ngOnInit() {
  
  }

  loginUser(loginForm: NgForm){
      this.user.email = loginForm.value.emailInput;
      this.user.password= loginForm.value.passwordInput;

    sessionStorage.setItem('currentEmail', this.user.email);
    sessionStorage.setItem('currentPassword', this.user.password);

    this.barberService.login(this.user).subscribe(
      data =>{
        this.router.navigate(['/barber'])
      },
      error =>{
        this.message="Invalid e-mail or password! Please try again!"
      }
    )
  }

}
