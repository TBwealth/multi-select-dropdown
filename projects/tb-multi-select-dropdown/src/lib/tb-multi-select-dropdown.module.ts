import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { TbMultiSelectDropdownComponent } from './tb-multi-select-dropdown.component';



@NgModule({
  declarations: [TbMultiSelectDropdownComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [TbMultiSelectDropdownComponent]
})
export class TbMultiSelectDropdownModule { }
