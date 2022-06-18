import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errors:any= {};
  ngOnInit(): void {}
  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private readonly jwtService: JwtService
  ) {}
  loading = true;
  submitted:boolean=false;
  error = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  hasFormErrors = false;

  // Check if one of form control has an error
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onSubmit(){
    if(this.loginForm.value.email!=""){
      this.authService.login({
        "username": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }).subscribe( (response : any) => {
        this.errors = {};
        if(response.message){
        } else {
          const { accessToken,tokenType, ...user } = response;
          this.jwtService.handle({ token:accessToken, user });
          this.router.navigateByUrl('/')
        }
      }, (error:any) => {
        this.errors.email="invalide email !"
        this.errors.pwd="Mot de passe incorrect !"
      });
    }
    this.submitted=true;
  }

  login() {
    this.checkFormIsValid();
    if (this.hasFormErrors) {
      return;
    }
    const { email, password } = this.loginForm.value;
    const payload = {
      email,
      password,
    };
    
  }

  changeError() {
    this.hasFormErrors = false;
    this.error = '';
  }

  // Check Form is valid
  checkFormIsValid() {
    this.hasFormErrors = false;
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      if (this.isControlHasError('password', 'minlength')) {
        this.error = 'Mot de passe est court(6 caractére minimum)';
        this.hasFormErrors = true;
        return;
      }
      this.error = 'Email ou mot de passe est invalide';

      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
  }
}
