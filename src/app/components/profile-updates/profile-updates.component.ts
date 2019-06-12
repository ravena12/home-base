import { Component, EventEmitter,  Pipe, PipeTransform, Input, OnInit, Output } from '@angular/core';
import { TestDataAccessService } from '../../services/test-mock.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-profile-updates',
    templateUrl: './profile-updates.component.html',
    styleUrls: ['./profile-updates.component.less']
})
export class ProfileUpdatesComponent implements OnInit {
    
    @Input()
    public rootPath: string;
    public changesToPush = {};
    public totalNumberResults: number;
    public tableDataItems: any[];

    public pages: any[];
    public appliedFilter: any;
    public detailData: any;
    public otherDetailData: any;
    public pageID;
    public name;
    public tableData = [];
    public tableDataDatabase;
    public itemsSelected = [];
    public itemsToDisplay = [];


  

    
    public get EncodedAppliedFilter(): string {
        return this.appliedFilter
            ? btoa(JSON.stringify(this.appliedFilter))
            : null;
    }


    constructor(
        private testDataAccessService: TestDataAccessService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) {
   
    }

    public ngOnInit(): void {
        this.testDataAccessService.getTableData().subscribe((result) => {
            this.tableDataDatabase = result['items'];
            this.retrieveProfile();
        });
        this.activatedRoute.params.subscribe((params: Params) => {
            this.pageID = params.id;
        });

      
    }

    public retrieveProfile() {
        for (let i = 0; i <= this.tableDataDatabase.length - 1; i++) {
            const obj = this.tableDataDatabase[i];
            if (obj['practitionerNumber'] == this.pageID) {
                const newObject = JSON.parse(JSON.stringify(obj));
                debugger;
                this.name = newObject.fields[0].valueADB;
                this.tableData.push(newObject.fields);
                return this.tableData;
            }
        }
    }

    public openProfileUpdateModal(): void {
        let select = [];
        for(let i in this.changesToPush){
            console.log(i);
            select.push(i)
        }
        let selectLength = select.length;
        switch(selectLength) {
            case 0:
            this.dialog.open(ModalComponent, { data: { profileSelected: "Nothing was selected, please select what you would like to push to DB"}, panelClass: "error-dialog-container", autoFocus: false});
            break;
            case 1:
            this.dialog.open(ModalComponent, { data: { profileSelected: "Please confirm these changes to " + this.name + "s profile:", items: select}, panelClass: "dialog-container-1", autoFocus: false});
              break;
            case 2:
            this.dialog.open(ModalComponent, { data: { profileSelected: "Please confirm these changes to " + this.name + "s profile:", items: select}, panelClass: "dialog-container-2", autoFocus: false});
              break;
            default:
            this.dialog.open(ModalComponent, { data: { profileSelected: "Please confirm these changes to " + this.name + "s profile:", items: select}, autoFocus: false});

          }
        // if(select.length === 0) {
        //     this.dialog.open(ModalComponent, { data: { profileSelected: "Nothing was selected, please select what you would like to push to DB"}, panelClass: "error-dialog-container", autoFocus: false});
        // } else {
        //     console.log(select, "the data");
        // this.dialog.open(ModalComponent, { data: { profileSelected: "Please confirm these changes to " + this.name + "s profile:", items: select}, autoFocus: false});
        // }
    }


    public handleSelect(e, item): void {
        // e.target.checked ? this.itemsSelected.push(item.name) && this.itemsToDisplay.push(item.title) : this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1) && this.itemsToDisplay.splice(this.itemsToDisplay.indexOf(item), 1);
        if(e.target.checked === false) {
             delete this.changesToPush[item.title];
             console.log(this.changesToPush, "new list deleted");
        // this.itemsSelected = this.itemsSelected.splice(this.itemsSelected.indexOf(item), );
        // console.log(this.itemsSelected);
        } else {
            this.changesToPush[item.title] = true;
            // this.itemsSelected.push(item.name);
            // console.log(this.itemsSelected);
            console.log(this.changesToPush);
        }
        
    }  
}

@Pipe({
    name: 'keys'
  })
export class KeysPipe implements PipeTransform {
    transform(value: any, args?: any): any {
      return Object.keys(value);
    }
}