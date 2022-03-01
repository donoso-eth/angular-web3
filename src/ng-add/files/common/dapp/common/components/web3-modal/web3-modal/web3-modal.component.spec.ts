import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Web3ModalComponent } from './web3-modal.component';

describe('Web3ModalComponent', () => {
  let component: Web3ModalComponent;
  let fixture: ComponentFixture<Web3ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Web3ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
