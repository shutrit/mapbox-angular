import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InputFieldComponent } from "./input-field";
import { contentChild, input } from "@angular/core";
import { FormField } from "@angular/forms/signals";

describe("InputField", () => {
  let component: InputFieldComponent<string>;
  let fixture: ComponentFixture<InputFieldComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent<string>);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
