export interface PageSpecification {
    start: number;
    end: number;
    limit: number;
    pageDataLoaded: (filter?: any) => void;
    reset: (spec: PageSpecification) => void;
    appliedFilter?: any;
}