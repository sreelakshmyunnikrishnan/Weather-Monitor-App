import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  constructor(public m: ServiceService,public rou:Router) { }
  regform(reg:any)
  {console.log(reg);
    this.m.getregdata(reg).subscribe(
 
     (res:any)=>
     {console.log(res);
       this.rou.navigate(['login'])
     }
 
     
   ); 
   }

  ngOnInit(): void {
  }

}
