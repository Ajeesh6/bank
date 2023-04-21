import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  user: any
  acno:any
  datedetails:any





  constructor(private ds: DataService, private fb: FormBuilder,private router:Router ) {
    if(localStorage.getItem("currentUser")){
      this.user = JSON.parse(localStorage.getItem("currentUser") || "")
    }

    //access date
    this.datedetails=new Date()
  }

  depositeForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]]

  })

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw1: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt1: ['', [Validators.required, Validators.pattern('[0-9]+')]]

  })

  ngOnInit(): void{
    if(!localStorage.getItem("token")){
      alert('please login')
      this.router.navigateByUrl("")
    }
  }

  deposite() {

    var acno = this.depositeForm.value.acno
    var psw = this.depositeForm.value.psw
    var amnt = this.depositeForm.value.amnt
    if (this.depositeForm.valid) {
     this.ds.deposite(acno, psw, amnt).subscribe((result:any)=>{
      alert(result.message)
     },
     result=>{
      alert(result.error.message)
     })
     
    }
    else {
      alert('invalid form')
    }

  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var psw = this.withdrawForm.value.psw1
    var amnt = this.withdrawForm.value.amnt1
    if (this.withdrawForm.valid) {
    this.ds.withdraw(acno, psw, amnt).subscribe((result:any)=>{
      alert(result.message)
     },
     result=>{
      alert(result.error.message)
     })
      }
    else {
      alert('invalid form')
    }
  }

  logout(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }

  deleteParent(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno") || "")
  }

  cancel(){
    this.acno=''
  }

  Delete(event:any){
    //alert(event)
    this.ds.deleteAc(event).subscribe((result:any)=>{
      alert(result.message)
      this.logout()
      // this.router.navigateByUrl("")
    })
  }
}
