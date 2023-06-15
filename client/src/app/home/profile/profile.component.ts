import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.homeService.getProfile('user/get_user_info/')
    .subscribe((res:any) => {
      console.log(res);
      var date:Date | null = null,
          formattedDate = "";
      if(res.birthdate != null){
        date = new Date(res.birthdate);
        formattedDate = date.toISOString().split("T")[0];
      }
      this.profileForm = this.fb.group({
        name: [res.name, [Validators.required]],
        email: [res.email, [Validators.required, Validators.email]],
        address: [res.address, [Validators.required]],
        city: [res.city, [Validators.required]],
        birthdate: [formattedDate, [Validators.required]],
      });
    }, (err) => {
      console.log(err);
    })
  }

  onSubmit(){

    if (this.profileForm.valid) {

      const body = {
        'address': this.profileForm.get('address')!.value,
        'city': this.profileForm.get('city')!.value,
        'birthdate': this.profileForm.get('birthdate')!.value
      }
     /*  this.authService.postService('auth/register', body)
        .subscribe((res: any) => {
          alert("Usuario Registrado correctamente")
          this.router.navigate(['auth/login']);
        },(err: any) => {
          console.log(err);
          alert("Error en la solicitud")
        }); */
    }else{
      /* if(this.registerForm.hasError("mismatch") && this.registerForm.get('confirmPassword')!.dirty){
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
      } */
    }

  }



}
