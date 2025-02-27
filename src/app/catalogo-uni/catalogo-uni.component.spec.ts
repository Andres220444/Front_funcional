import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUniComponent } from './catalogo-uni.component';

describe('CatalogoUniComponent', () => {
  let component: CatalogoUniComponent;
  let fixture: ComponentFixture<CatalogoUniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoUniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoUniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
