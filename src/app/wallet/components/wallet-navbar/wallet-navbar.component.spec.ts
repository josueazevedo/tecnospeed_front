import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletNavbarComponent } from './wallet-navbar.component';

describe('WalletNavbarComponent', () => {
  let component: WalletNavbarComponent;
  let fixture: ComponentFixture<WalletNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
