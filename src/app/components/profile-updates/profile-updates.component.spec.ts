import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TestDataAccessService } from '../../services/test-mock.service';
import { ProfileUpdatesComponent } from './profile-updates.component';

const dataToReturn = {
    totalResults: 12,
    results: [
        {
            id: '1',
            date: '1/1/1990',
            name: 'item1 from service'
        },
        {
            id: '2',
            date: '1/1/1992',
            name: 'item2 from service'
        },
        {
            id: '3',
            date: '1/1/1989',
            name: 'item4 from service'
        },
        {
            id: '4',
            date: '1/1/1999',
            name: 'item7 from service'
        },
        {
            id: '5',
            date: '1/1/1970',
            name: 'item10 from service'
        },
        {
            id: '6',
            date: '1/1/1966',
            name: 'item100 from service'
        },
        {
            id: '1',
            date: '1/1/1990',
            name: 'item1 from service'
        },
        {
            id: '2',
            date: '1/1/1992',
            name: 'item2 from service'
        },
        {
            id: '3',
            date: '1/1/1989',
            name: 'item4 from service'
        },
        {
            id: '4',
            date: '1/1/1999',
            name: 'item7 from service'
        },
        {
            id: '5',
            date: '1/1/1970',
            name: 'item10 from service'
        },
        {
            id: '6',
            date: '1/1/1966',
            name: 'item100 from service'
        }
    ]
};

class MockDataService {
    public getPageData(start: number, end: number): Observable<any> {
        return of<any>(dataToReturn);
    }
}

describe('ProfileUpdatesComponent', () => {
    let component: ProfileUpdatesComponent;
    let fixture: ComponentFixture<ProfileUpdatesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileUpdatesComponent
            ],
            providers: [{
                provide: TestDataAccessService,
                useClass: MockDataService
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileUpdatesComponent);
        component = fixture.componentInstance;


        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create all the page links if total number of results is knwon', () => {
        expect(component.pages).toBeDefined();
        expect(component.pages.length).toBe(3);
    });

    

    
});
