import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data = "your perfect banking patner"
  iclass = "form-control"



  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }


  //model form

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
  })

  ngOnInit(): void {

  }

  login() {
    var acnum = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

    if (this.loginForm.valid) {
      this.ds.login(acnum, psw).subscribe((result: any) => {
        localStorage.setItem("currentUser",JSON.stringify(result.currentUser))
        localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
        localStorage.setItem("token",JSON.stringify(result.token))
        alert(result.message)
        this.router.navigateByUrl('dashboard')
      },
        result => {
          alert(result.error.message)

        })



      //   if(result){
      //     alert('login success')
      //     this.router.navigateByUrl('dashboard')
      //   }
      //   else{
      //     alert("incurrect username or password")
      //   }
    }
    else {
      alert('invalid form')
    }
  }
}
  // login(a:any,b:any){

  //   var acnum=a.value
  //   var psw=b.value
  //   var userDetails=this.userDetails
  //   if(acnum in userDetails){
  //     if(psw==userDetails[acnum]["password"]){
  //       alert("login success")
  //     }
  //     else{
  //       alert("incurrect password")
  //     }

  //   }
  //   else{
  //     alert("account num incurrect or not registerd yet")
  //   }
  // }

  // acnoChange(event:any){
  //   this.acno=event.target.value;
  //   // console.log(this.acno);

  // }
  // paswChange(event:any){
  //   this.pasw=event.target.value
  //   // console.log(this.pasw);

  // }




