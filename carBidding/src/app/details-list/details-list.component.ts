import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnlineOfflineService } from '../online-offline.service';
import { RestApiService } from '../rest-api.service';
import { ShareDataService } from '../share-data.service';



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
    
  }
  public back() {
    this.router.navigate(['']);
  }
  
  openDialog():void{
    this.showPopup = true;
  }
  closePopup(isFromOk:boolean,value:string):void{
    this.showPopup = false;
    if(value){
    this.data.updatedBid=value;
    this.data.currentBid = value;
    }
    if(isFromOk){
    
      this.restApiService.updateBid(this.data).subscribe((res) => {
            
         })
        if(!this.online){
        localStorage.setItem('bidValue', JSON.stringify(this.data));
       }
    }
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      this.online = online;
      
      if (online) {
        
        if(localStorage.getItem('bidValue')){
        this.restApiService.updateBid(JSON.parse(localStorage.getItem('bidValue'))).subscribe((res) => {
          localStorage.removeItem('bidValue');
        })
      }
  
      } else {
        localStorage.removeItem('bidValue');
      }
    });
  }
  

}

