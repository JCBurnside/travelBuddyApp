import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchResultsComponent } from './profile-search-results.component';

describe('ProfileSearchResultsComponent', () => {
  let component: ProfileSearchResultsComponent;
  let fixture: ComponentFixture<ProfileSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
