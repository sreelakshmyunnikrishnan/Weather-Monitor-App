import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public m:ServiceService,public rou:Router) { }
  loginform(log:any)
  {console.log(log);
    this.m.getlogindata(log).subscribe(
 
     (res:any)=>
     {console.log(res);
       this.rou.navigate(['userpage'])
     }
   ); 
   }

  ngOnInit(): void {
  }

}
