import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const body = {
        'email': this.loginForm.get('email')!.value,
        'password': this.loginForm.get('password')!.value
      }
      this.authService.postService('auth/login', body)
        .subscribe((res: any) => {
          console.log(res);
          const token = res['access_token'];
          this.authService.setToken(token)
          alert("Usuario logeado correctamente")
          this.router.navigate(['home/characters']);
        },(err: any) => {
          console.log(err);
          alert("Error en la solicitud")
        });
    }else{
      Object.keys(this.loginForm.controls).forEach(key => {
        const controlErrors: any = this.loginForm.get(key)!.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            let msg = `${key}: ${keyError} \n`
            alert(msg);
          });
        }})
      }
    }

}
