import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamCardComponent } from './dream-card.component';

describe('DreamCardComponent', () => {
  let component: DreamCardComponent;
  let fixture: ComponentFixture<DreamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DreamCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DreamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
