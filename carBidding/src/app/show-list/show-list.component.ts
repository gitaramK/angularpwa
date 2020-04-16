import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from '../rest-api.service';


export interface TableElement {
  title: string;
  image: string;
  reservePrice: string;
  currentBid: string;
  currentBidder: string;
  auctionId: string;
  bidExpiry: string;

}


// const ELEMENT_DATA: PeriodicElement[] = [
//   { title: 'fsdfds', image: 'Black', reservePrice: '15000',currentBid:'500',currentBidder:'Amol',auctionId:'12',bidExpiry:'12' },
//   { title: 'sdfsd', image: 'Black', reservePrice: '16000',currentBid:'600',currentBidder:'Sery Meral',auctionId:'14',bidExpiry:'14' },
// ];

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
  //dataSource = ELEMENT_DATA;

  animal: string;
  name: string;

  

  constructor(private restApiService: RestApiService,public router:Router) {
    this.restApiService.getCarDetails().subscribe((res) => {
      this.dataSource = new MatTableDataSource<TableElement>(res);
      
    })
  }

  public gotoDetailList() {
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
