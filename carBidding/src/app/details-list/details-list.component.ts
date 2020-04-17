import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import { RestApiService } from '../rest-api.service';



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
  constructor(public dialog: MatDialog,public router:Router,public sharingService:ShareDataService,public restApiService:RestApiService) { }

  ngOnInit(): void {
    this.data = this.sharingService.getData();
    console.log(this.data);
  }
  public back() {
    this.router.navigate(['show-list']);
  }
  
  openDialog():void{
    this.showPopup = true;
  }
  closePopup(isFromOk:boolean,value:string):void{
    this.showPopup = false;
    if(isFromOk){
      console.log('value++',value);
      this.restApiService.updateBid(value).subscribe((res) => {
        
        
      })
    }
  }
  

}

