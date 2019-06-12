export interface SortSpecification {
    isAscending: boolean;
    columnProperty: string;
}

export interface FilterSpecification {
    prop?: string;
    value?: string;
    condition?: 'contains' | 'lt' | 'gt' | 'ne' | 'eq';
}