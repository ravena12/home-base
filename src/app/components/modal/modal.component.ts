import { Component, OnInit, Input, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TestDataAccessService } from '../../services/test-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  name: string;
  constructor( private dataService: TestDataAccessService, public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {profileSelected: any, items: any}) {
  }

  onNoClick(items): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}



