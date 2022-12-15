import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BarberService } from '../barber.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = new User();
  message:string= "";

  constructor(private barberService: BarberService, private router: Router){

  }

  ngOnInit() {
  
  }

  registerUser(registerForm: NgForm){
    this.user.email = registerForm.value.emailInput;
    this.user.firstName= registerForm.value.firstName;
    this.user.lastName= registerForm.value.lastName;
    this.user.password= registerForm.value.passwordInput;

    this.barberService.registerFromBackend(this.user).subscribe(
      data =>{
        this.router.navigate([''])
      },
      error =>{ 
        this.message="This e-mail is already used! Please enter another!"
      }
    )
  }


}
