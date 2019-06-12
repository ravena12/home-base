import { Observable } from 'rxjs';

/**
 * Service interface that data table component consumes.
 */
export interface DataTableService {
    getTableData<T>(): Observable<T[]>;
}