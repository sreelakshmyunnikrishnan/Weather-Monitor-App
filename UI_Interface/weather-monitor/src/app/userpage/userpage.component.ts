import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { City } from '../city';
@Component({
  selector: 'app-userpage',
  templateUrl:'./userpage.component.html',
  styleUrls: ['./userpage.component.css']
})


export class UserpageComponent implements OnInit {
  weather: City[] = [];
  mlatlon=[]
  constructor(public m:ServiceService,public rou:Router) { }
  cityform(cityadd:any)
  {console.log(cityadd);
    this.m.getcitydata(cityadd).subscribe(

     (res:any)=>
     {console.log(res)       
   }

   ); 
   }
 weatherdata(): void {
		this.m.getweatherdata().subscribe(
      weather => 
      this.weather = weather
      );
	}
  deldata(del:any)
  {
    console.log(del);
    this.m.deletecitydata(del).subscribe(
 
     (res:any)=>
     {console.log(res);
      this.rou.navigate(['userpage'])
      

    //  if (res['status']==1) 
    //    {alert("success");
    //    this.rou.navigate(['userpage'])
    //  }
 
    //  else if ( res['status']==2)
 
    //    {alert('failed');
    //    this.rou.navigate(['userpage'])
    //   }
 
    //  else if (res['status']==3)
    //  {alert('Variables not set');
    //  this.rou.navigate(['userpage'])
    // }
    }
   );  
   }
  updatedata(udata:any)
  {
    console.log(udata);
    this.m.updatecitydata(udata).subscribe(
      (res:any)=>{
        console.log(res);
        this.rou.navigate(['userpage'])
      }
    )
  }
  ngOnInit(): void {

    this.weatherdata();

  }

}
