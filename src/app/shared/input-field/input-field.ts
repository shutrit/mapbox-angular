import { Component, computed, contentChild, input } from "@angular/core";
import { FormField } from "@angular/forms/signals";

@Component({
  selector: "input-field",
  imports: [],
  templateUrl: "./input-field.html",
  styleUrl: "./input-field.scss",
})
export class InputFieldComponent<T> {
  readonly label = input("");
  readonly fieldDirective = contentChild(FormField<T>);
  readonly fieldState = computed(() => this.fieldDirective()?.state());
  readonly fieldErrors = computed(() => this.fieldState()?.errors());
}
