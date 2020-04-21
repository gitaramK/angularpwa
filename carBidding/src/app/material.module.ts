import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
    imports: [
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule
        
    ],
    exports: [
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule
      
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    
})

export class MaterialModule { }