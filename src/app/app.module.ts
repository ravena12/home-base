import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTestComponent } from './components/header-test/header-test.component';

// PluralStack
import { TestDataAccessService } from './services/test-data.service';
import { ModalComponent } from './components/modal/modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileUpdatesComponent, KeysPipe } from './components/profile-updates/profile-updates.component';
import { ActionLogComponent } from './components/action-log/action-log.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    HeaderTestComponent,
    ModalComponent,
    DashboardComponent,
    ProfileUpdatesComponent,
    ActionLogComponent,
    KeysPipe
  ],
  providers: [
    TestDataAccessService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
],
  bootstrap: [ AppComponent ],
  entryComponents: [ModalComponent]
})
export class AppModule {}
