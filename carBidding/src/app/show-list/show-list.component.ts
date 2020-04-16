import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';


export interface DialogData {
  animal: string;
  name: string;
}
export interface PeriodicElement {
  title: string;
  image: string;
  reservePrice: string;
  currentBid: string;
  currentBidder: string;
  auctionId: string;
  bidExpiry: string;

}


const ELEMENT_DATA: PeriodicElement[] = [
  { title: 'fsdfds', image: 'Black', reservePrice: '15000',currentBid:'500',currentBidder:'Amol',auctionId:'12',bidExpiry:'12' },
  { title: 'sdfsd', image: 'Black', reservePrice: '16000',currentBid:'600',currentBidder:'Sery Meral',auctionId:'14',bidExpiry:'14' },
];

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Title', 'Image', 'Reserve Price', 'Current bid','Current bidder','Auction ID','Bid Expiry'];
  dataSource = ELEMENT_DATA;

  animal: string;
  name: string;
  constructor(public dialog: MatDialog,public router:Router) { }

  public gotoDetailList() {
    this.router.navigate(['detail-list']);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}