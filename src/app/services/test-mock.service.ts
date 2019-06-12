import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTableService } from '../services/data-table-service-interface';
import { PageSpecification }  from '../services/page-specification.interface';
import { FilterSpecification, SortSpecification } from '../components/dashboard/specifications.interface';


@Injectable({
  providedIn: 'root'
})
export class TestDataAccessService implements DataTableService {
    constructor(
        private httpClient: HttpClient
    ) {}

    public getTableData(): Observable<any> {
        return this.httpClient.get('assets/data/dataProfile.json');
    }

    public getActionData(): Observable<any> {
        return this.httpClient.get('assets/data/actionLog.json');
    }

    public getDetailData(id: string): Observable<any> {
        console.log('here');
        return this.httpClient.get('assets/data/actionLog.json')
            .pipe(
                map(result => {
                    let results = (<any[]>result);
                    results = results['items'].filter((data) => {
                        const dataValue = data.id as string;
                        if (dataValue === id) {
                            return dataValue === id;         

                        }
                    });
                    return {
                        results: (<any[]>results[0])
                    };

                })
                
          
                // map(result => (<any>result['items'].find(result => result.id === id)))
            );
            
    }

    public getFilteredPageData(start: number, end: number, prop: string, value: string, sortSpec?: SortSpecification): Observable<any>;
    public getFilteredPageData(pageSpec: PageSpecification, prop: string, value: string, sortSpec?: SortSpecification): Observable<any>;
    public getFilteredPageData(arg1: any, arg2: any, arg3: any, arg4?: any, arg5?: any): Observable<any> {
        return this.httpClient.get('assets/data/table-dest-data')
            .pipe(
                map(result => {
                    let results = (<any[]>result);

                    const startIndex = isNaN(arg1) ? arg1.start : arg1;
                    const endIndex = isNaN(arg1) ? arg1.end : arg2;

                    const propArg = arg4 ? arg3 : arg2;
                    const valueArg = arg4 ? arg4 : arg3;

                    const sortSpec = arg5 ? arg5 : arg4;
                    if (sortSpec) {
                        results = results.sort((a: any, b: any) => { 
                            return (a[sortSpec.columnProperty] < b[sortSpec.columnProperty] ? -1 : 1) * (sortSpec.isAscending ? 1 : -1);
                        });
                    }
                    result = (<any[]>result).filter((data) => {
                        const dataValue = data[propArg] as string;
                        return dataValue && dataValue.indexOf(valueArg) >= 0;
                    });

                    return {
                        totalResults: (<any[]>results).length,
                        results: (<any[]>results).slice(startIndex, endIndex)
                    };
                })
            );
    }


   
    public getPageData(start: number, end: number, sortSpec?: SortSpecification, filterSpec?: FilterSpecification): Observable<any>;
    public getPageData(pageSpec: PageSpecification, sortSpec?: SortSpecification, filterSpec?: FilterSpecification): Observable<any>;
    public getPageData(arg1: any, arg2?: any, arg3?: any, arg4?: any): Observable<any> {
        return this.httpClient.get('assets/data/table-test-data.json')
            .pipe(
                map(result => {
                    let results = (<any[]>result);
                    console.log(results);
                    const startIndex = isNaN(arg1) ? arg1.start : arg1;
                    const endIndex = isNaN(arg1) ? arg1.end : arg2;

                    const sortSpec = (arg3 && arg3.columnProperty ? arg3 : null) as SortSpecification;

                    const filterSpec = (arg4 && arg4.prop ? arg4 : null) as FilterSpecification;

                    const filterSearch = (arg4 && arg4.value ? arg4 : null ) as FilterSpecification;

                    console.log(filterSpec,'filterSpec', filterSearch, 'filterSearch');

                    if (sortSpec) {
                        results = results.sort((a: any, b: any) => {
                            return (a[sortSpec.columnProperty] < b[sortSpec.columnProperty] ? -1 : 1) * (sortSpec.isAscending ? 1 : -1);
                        });
                    }
                  
                    if (filterSpec && filterSearch) {
                        results = results['items'].filter((data) => {
                            const dataValue = data['status'] as string;
                            if (dataValue === filterSpec.prop) {
                                return dataValue === filterSpec.prop; 
                            }
                        });
                        let results2 = results.filter(o =>
                            Object.keys(o).some(k => o[k].toLowerCase().includes(filterSearch.value.toLowerCase())));
                            return {
                                totalResults: (<any[]>results2).length,
                                results: (<any[]>results2).slice(startIndex, endIndex)
                            };        
                    }

                    if (filterSpec) {

                        results = results['items'].filter((data) => {
                            const dataValue = data['status'] as string;
                            if (dataValue === filterSpec.prop) {
                                return dataValue === filterSpec.prop;         
                            }
                        });
                        return {
                            totalResults: (<any[]>results).length,
                            results: (<any[]>results).slice(startIndex, endIndex)
                        };
                    }

                    if (filterSearch) {
                        let results2 = results['items'].filter(o =>
                            Object.keys(o).some(k => o[k].toLowerCase().includes(filterSearch.value.toLowerCase())));
                            return {
                                totalResults: (<any[]>results2).length,
                                results: (<any[]>results2).slice(startIndex, endIndex)
                            };    
                    }

                    return {
                        totalResults: (<any[]>results['items']).length,
                        results: (<any[]>results['items']).slice(startIndex, endIndex)
                    };
                })
            );
    }
    public getPageData2(arg1: any, arg2?: any, arg3?: any, arg4?: any): Observable<any> {
        return this.httpClient.get('assets/data/actionLog.json')
            .pipe(
                map(result => {
                    let results = (<any[]>result);
                    console.log(results);
                    const startIndex = isNaN(arg1) ? arg1.start : arg1;
                    const endIndex = isNaN(arg1) ? arg1.end : arg2;

                    const sortSpec = (arg3 && arg3.columnProperty ? arg3 : null) as SortSpecification;

                    const filterSpec = (arg4 && arg4.prop ? arg4 : null) as FilterSpecification;

                    const filterSearch = (arg4 && arg4.value ? arg4 : null ) as FilterSpecification;

                    console.log(filterSpec,'filterSpec', filterSearch, 'filterSearch');

                    if (sortSpec) {
                        results = results.sort((a: any, b: any) => {
                            return (a[sortSpec.columnProperty] < b[sortSpec.columnProperty] ? -1 : 1) * (sortSpec.isAscending ? 1 : -1);
                        });
                    }
                  
                    if (filterSpec && filterSearch) {
                        results = results['items'].filter((data) => {
                            const dataValue = data['status'] as string;
                            if (dataValue === filterSpec.prop) {
                                return dataValue === filterSpec.prop; 
                            }
                        });
                        let results2 = results.filter(o =>
                            Object.keys(o).some(k => o[k].toLowerCase().includes(filterSearch.value.toLowerCase())));
                            return {
                                totalResults: (<any[]>results2).length,
                                results: (<any[]>results2).slice(startIndex, endIndex)
                            };        
                    }

                    if (filterSpec) {

                        results = results['items'].filter((data) => {
                            const dataValue = data['status'] as string;
                            if (dataValue === filterSpec.prop) {
                                return dataValue === filterSpec.prop;         
                            }
                        });
                        return {
                            totalResults: (<any[]>results).length,
                            results: (<any[]>results).slice(startIndex, endIndex)
                        };
                    }

                    if (filterSearch) {
                        let results2 = results['items'].filter(o =>
                            Object.keys(o).some(k => o[k].toLowerCase().includes(filterSearch.value.toLowerCase())));
                            return {
                                totalResults: (<any[]>results2).length,
                                results: (<any[]>results2).slice(startIndex, endIndex)
                            };    
                    }

                    return {
                        totalResults: (<any[]>results['items']).length,
                        results: (<any[]>results['items']).slice(startIndex, endIndex)
                    };
                })
            );
    }
}