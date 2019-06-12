import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TestDataAccessService} from '../../services/test-mock.service';
import { PageSpecification }  from '../../services/page-specification.interface';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterSpecification, SortSpecification } from './specifications.interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
    @Input()
    public pageSize: number;

    @Output()
    public updatePage: EventEmitter<any>;

    public currentPage: number;

    public totalNumberResults: number;
    public filterSpecExample: FilterSpecification;
    public filterSearch = {};

    public tableDataItems: any[];

    public profileStatus: string;
    public arrow: false;




    public pages: any[];

    public get TotalNumberPages(): number {
        return Math.ceil(this.totalNumberResults / this.pageSize);
    }

    private isSortedAscending: boolean;

    private currentSortSpec: SortSpecification;

    constructor(
        private testDataAccessService: TestDataAccessService,
        private dialog: MatDialog
    ) {
        this.updatePage = new EventEmitter();
        this.pageSize = 10;
        this.isSortedAscending = true;
        this.filterSpecExample = {};
    }

    public searchStr: string;
    public modelChange(str: string): void {
    this.filterSpecExample.value = str;
    const startIndex = (1- 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.testDataAccessService.getPageData(startIndex, endIndex, this.currentSortSpec, this.filterSpecExample).subscribe((result) => {
        this.updateTableWithResults(result, 1);
    });
  }



    public paginate(event: Event, to: 'prev' | 'next'): void {
        event.preventDefault();
        event.stopPropagation();

        const pageToGo = to === 'next' ? this.currentPage + 1 : this.currentPage - 1;
        this.goToPage(event, pageToGo);
    }

    public goToPage(event: Event, page: number): void {
     
        event.preventDefault();
        event.stopPropagation();
        console.log(page);
        
        const startIndex = (page - 1) * this.pageSize;
        console.log(startIndex);
        const endIndex = startIndex + this.pageSize;

        this.testDataAccessService.getPageData(startIndex, endIndex, this.currentSortSpec, this.filterSpecExample).subscribe((result) => {
            this.updateTableWithResults(result, page);
        });
    }

    public determineVisbility(type: 'prev' | 'next'): boolean {
        if (type === 'prev') {
            return this.currentPage > 1;
        }

        return this.currentPage < this.TotalNumberPages;
    }

    public sort(columnProperty: string, scope?: 'local' | 'remote'): void {
        if (scope === 'local') {
            this.tableDataItems = this.tableDataItems.sort((a: any, b: any) => {
                return (a[columnProperty] < b[columnProperty] ? -1 : 1) * (this.isSortedAscending ? 1 : -1);
            });

            this.isSortedAscending = !this.isSortedAscending;
        } else {
            this.currentSortSpec = {
                columnProperty: columnProperty,
                isAscending: this.isSortedAscending
            };

            this.testDataAccessService.getPageData(0, this.pageSize, this.currentSortSpec, this.filterSpecExample).subscribe((result) => {
                this.updateTableWithResults(result, 1);
                this.isSortedAscending = !this.isSortedAscending;
            });
        }
    }

    public applyFilter() {
        this.testDataAccessService.getPageData(0, this.pageSize, this.currentSortSpec, this.filterSpecExample).subscribe((result) => {
            console.log(result, 'applyFitler Result');
            this.updateTableWithResults(result, 1);
        });
    }
    public selectFilter(event: string) {
        this.profileStatus = event;

        console.log(event);
        this.filterSpecExample.prop = event;
        this.applyFilter();
    }

    public clearFilter() {
        this.testDataAccessService.getPageData(0, this.pageSize, this.currentSortSpec).subscribe((result) => {
            this.updateTableWithResults(result, 1);
        });
    }

    public openControlPanelModal(item): void {
        this.dialog.open(ModalComponent,{ data: { profileSelected: "Are you sure you would like to push " + item.fullname + "'s profile to DB?"} });
      }

    public getItemColor(item: any) {
        if (item.status.toLowerCase() === 'added') {
            return {'color': 'green'};
        }
        if (item.status.toLowerCase() === 'removed') {
            return {'color': 'red'};
        }
      }

    public ngOnInit(): void {
        this.profileStatus = "Status";
        this.testDataAccessService.getPageData(0, this.pageSize).subscribe((result) => {
            this.updateTableWithResults(result, 1);

        });
    }

    private updateTableWithResults(result: any, currentPageToSet: number): void {
        this.totalNumberResults = result.totalResults;
        this.tableDataItems = result.results;
        this.currentPage = currentPageToSet;
        this.TotalNumberPages;
        this.createPages();
        this.sendUpdatePageEvent(currentPageToSet);
    }

    private sendUpdatePageEvent(currentPage: number): void {
        const startIndex = (currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        if (!isNaN(startIndex) && !isNaN(endIndex)) {
            setTimeout(() => {
                this.updatePage.emit({
                    start: startIndex,
                    end: endIndex
                });
            });
        }
    }

    private createPages() {
        this.pages = [];
        for (let i = 1; i <= this.TotalNumberPages; i++) {
            this.pages.push({
                pageNum: i
            });

        }
    }
}
