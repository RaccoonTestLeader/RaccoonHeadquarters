import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lunarphase } from './lunarphase';

describe('Lunarphase', () => {
  let component: Lunarphase;
  let fixture: ComponentFixture<Lunarphase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lunarphase],
    }).compileComponents();

    fixture = TestBed.createComponent(Lunarphase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
