import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.matchPasswords
    });
  }

  ngOnInit(): void {
  }

  matchPasswords(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {

      const body = {
        'name': this.registerForm.get('name')!.value,
        'email': this.registerForm.get('email')!.value,
        'password': this.registerForm.get('password')!.value
      }
      this.authService.postService('auth/register', body)
        .subscribe((res: any) => {
          alert("Usuario Registrado correctamente")
          this.router.navigate(['auth/login']);
        },(err: any) => {
          console.log(err);
          alert("Error en la solicitud")
        });
    }else{
      if(this.registerForm.hasError("mismatch") && this.registerForm.get('confirmPassword')!.dirty){
        alert("Contraseñas no coinciden")
      }
      Object.keys(this.registerForm.controls).forEach(key => {
        const controlErrors: any = this.registerForm.get(key)!.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            let msg = `${key}: ${keyError} \n`
            alert(msg);
          });
        }})
      }
    }
}
