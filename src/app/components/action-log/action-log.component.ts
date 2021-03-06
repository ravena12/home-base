import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TestDataAccessService} from '../../services/test-mock.service';
import { PageSpecification }  from '../../services/page-specification.interface';
import {Pipe, PipeTransform} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import {  SortSpecification } from '../dashboard/specifications.interface';

@Component({
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.less']
})
export class ActionLogComponent implements OnInit {

  @Input()
  public pageSize: number;

  @Output()
  public updatePage: EventEmitter<any>;

  public currentPage: number;
  public currentSortSpec: SortSpecification;

  public totalNumberResults: number;
  public filterSearch = {};

  public tableDataItems: any[];

  public profileStatus: string;
  public arrow: false;
  public otherDetailData: any;
  public id: any;




  public pages: any[];

  public get TotalNumberPages(): number {
      return Math.ceil(this.totalNumberResults / this.pageSize);
  }

  private isSortedAscending: boolean;


  constructor(
      private testDataAccessService: TestDataAccessService,
  ) {
      this.updatePage = new EventEmitter();
      this.pageSize = 10;
      this.isSortedAscending = true;
  }

  public searchStr: string;
  public contains: any[] = [];
  public isExpanded = false;

  
  public getOtherItemDetail(item: any): void {
    
    this.isExpanded=!this.isExpanded;
    //remove id from contains
    if(this.contains.indexOf(item.id) != -1) {
      this.contains.splice(this.contains.indexOf(item.id), 1);
      item.isExpanded = false;
  } else {
      this.testDataAccessService.getDetailData(item.id).subscribe((detailData) => {
        console.log(detailData);
          this.otherDetailData = detailData['results'];
          this.contains.push(item.id);
          console.log(this.contains);
          item.isExpanded = true;
      });
  }

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

      this.testDataAccessService.getPageData(startIndex, endIndex, this.currentSortSpec).subscribe((result) => {
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

          this.testDataAccessService.getPageData(0, this.pageSize, this.currentSortSpec).subscribe((result) => {
              this.updateTableWithResults(result, 1);
              this.isSortedAscending = !this.isSortedAscending;
          });
      }
  }

  public applyFilter() {
      this.testDataAccessService.getPageData(0, this.pageSize, this.currentSortSpec).subscribe((result) => {
          console.log(result, 'applyFitler Result');
          this.updateTableWithResults(result, 1);
      });
  }


  public clearFilter() {
      this.testDataAccessService.getPageData(0, this.pageSize, this.currentSortSpec).subscribe((result) => {
          this.updateTableWithResults(result, 1);
      });
  }





  public ngOnInit(): void {
    this.testDataAccessService.getPageData2(0, this.pageSize).subscribe((result) => {
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
