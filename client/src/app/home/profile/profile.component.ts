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
    private router: Router,
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
      this.homeService.add_additional_info('user/user_info', body)
      .subscribe((res) => {
        alert("Información actualizada correctamente")
        this.router.navigate(['home/characters']);
      },(err) => {
        console.log(err);
      })
    }else{
      Object.keys(this.profileForm.controls).forEach(key => {
        const controlErrors: any = this.profileForm.get(key)!.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            let msg = `${key}: ${keyError} \n`
            alert(msg);
          });
        }})
      }
    }
}
