import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  users:Array<any> = [];

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private snackBar:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });

  }
  createUserForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    username:['',[Validators.required,Validators.maxLength(10)]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',[Validators.required,Validators.minLength(8)]]
  },{
    validators: this.controlValuesAreEqual('password', 'confirmPassword')
  });

  get f(): { [key: string] : AbstractControl } {
    return this.createUserForm.controls;
  }

  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup
      const valueOfControlA = formGroup.get(controlNameA)?.value
      const valueOfControlB = formGroup.get(controlNameB)?.value

      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        return { valuesDoNotMatch: true }
      }
    }
    }

  createAccount(){

    let isHaveEmail:boolean = false;
    let isHaveUsername:boolean = false;
    this.users.forEach((user: { username: any,email: any }) => {
      if(this.createUserForm.value.email == user.email ){
        isHaveEmail = true;
      }
      else if(this.createUserForm.value.username == user.username ){
        isHaveUsername = true;
      }
    });

    if(!isHaveEmail && !isHaveUsername){
      this.userService.createAccount(this.createUserForm.value).subscribe((res) => {
      });
      alert("Hesabınız Başarılı bir şekilde oluşturuldu");
      this.router.navigateByUrl('/login');
    }else if(isHaveEmail){
      this.snackBar.open("Email kullanılıyor","Ok");
    }else if(isHaveUsername){
      this.snackBar.open("Kulanıcı adı kullanılıyor","Ok");
    }

  }

}
