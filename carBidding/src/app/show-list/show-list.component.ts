import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { ShareDataService } from '../share-data.service';


export interface TableElement {
  title: string;
  image: string;
  reservePrice: string;
  currentBid: string;
  currentBidder: string;
  auctionId: string;
  bidExpiry: string;

}

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  

  ngOnInit(): void {
  }
  Data: TableElement[];
  displayedColumns: string[] = ['Title', 'Image', 'Reserve Price', 'Current bid','Current bidder','Auction ID','Bid Expiry'];
  dataSource = new MatTableDataSource<TableElement>(this.Data);
  
  animal: string;
  name: string;

  

  constructor(private restApiService: RestApiService,public router:Router,public sharingService:ShareDataService) {
    this.restApiService.getCarDetails().subscribe((res) => {
      this.dataSource = new MatTableDataSource<TableElement>(res);
      
    })
   
  }

  public gotoDetailList(row,event) {
    
    this.sharingService.setData(row);
    this.router.navigate(['detail-list']);
  }
 
  /***Add to home screen button */
  deferredPrompt: any;
  showButton = false;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
    //this.addToHomeScreen();
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });

  }



}

