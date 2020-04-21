import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import { RestApiService } from '../rest-api.service';
import { OnlineOfflineService } from '../online-offline.service';



export interface DialogData {
  bidValue: string;
  
}

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListComponent implements OnInit {

  bidValue: string;
  showPopup:Boolean= false;
  data:any;
  online: boolean;
  constructor(public dialog: MatDialog,public router:Router,public sharingService:ShareDataService,
    public restApiService:RestApiService,private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);
   }

  ngOnInit(): void {
    this.data = this.sharingService.getData();
    console.log(this.data);
  }
  public back() {
    this.router.navigate(['']);
  }
  
  openDialog():void{
    this.showPopup = true;
  }
  closePopup(isFromOk:boolean,value:string):void{
    this.showPopup = false;
    if(isFromOk){
    
      this.restApiService.updateBid(value).subscribe((res) => {
            console.log('res++',res);
         })
        if(!this.online){
        localStorage.setItem('bidValue', value);
       }
    }
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      this.online = online;
      
      if (online) {
        console.log('Connected');
        if(localStorage.getItem('bidValue')){
        this.restApiService.updateBid(localStorage.getItem('bidValue')).subscribe((res) => {
          localStorage.removeItem('bidValue');
        })
      }
  
      } else {
        localStorage.removeItem('bidValue');
      }
    });
  }
  

}

