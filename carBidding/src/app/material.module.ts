import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

//import { MatPaginatorModule, MatToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule
        
    ],
    exports: [
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule
      
    ],
    
})

export class MaterialModule { }