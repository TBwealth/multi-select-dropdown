# Multi-Select DropDown Option Component

An Angular(11+cd) Multi-Select Dropdown Component with search option

## Features
- dropdown with single/multiple selction option
- bind to any custom data source
- search item with custom placeholder text
- limit selection
- select/de-select all items
- ability to disable
- return all event action result in a single event
- responsive with quality ui/ux
- customizable item color and background color

## Demo
Here is a [Demo](https://TBwealth.github.io)

## Install
```
npm i tb-multi-select-dropdown

```
after inistallation, include it in your module (see app.modules.ts)
```
import { TbMultiSelectDropdownModule } from 'tb-multi-select-dropdown';
//...

@NgModule({
 imports: [
   TbMultiSelectDropdownModule
   //...
 ]
 //...
})
export class AppModule { }


```
## Usage

```
import { Component, OnInit } from '@angular/core';
import { dropDownSetting } from 'tb-multi-select-dropdown';

export class AppComponent implements OnInit {
  dropdownSettings:dropDownSetting = {};
   selectedVal: any = "";
   listData = [];
ngOnInit() {
    this.dropdownSettings = {
    singleSelection: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  this.listData = [
    { id: 1, name: "Codecademy" },
    { id: 2, name: "Coursera" },
    { id: 3, name: "Khan Academy" },
    { id: 4, name: "LinkedIn Learning" },
    { id: 5, name: "Open Culture" },
    { id: 6 , name: "Sophia" },
    { id: 7, name: "Teacher Training Videos" },
    { id: 8, name: "Udemy" },
    { id: 9, name: "Virtual Nerd Mobile Math" },
    { id: 10, name: "Techsmith" },

  ]
}

  getDropdownValue(selectedItems) {
    console.log(selectedItems)
  }
}

```

```


<tb-multi-select-dropdown           
[placeholder]="'Lookup Type Placeholder'"
[dropDownSettings]="dropdownSettings"
[data]="allgenericdropdown"
[(value)]="dropdown_id"
(change)="getDropdownValue($event)"
[idField] = "'id'"
[textField] = "'name'"
[disabled]="false"
[itemColor] = "#4847E0"
[itemBackgroundColor] = "rgba(72, 71, 224, 0.08)"
></tb-multi-select-dropdown>

```

# Settings

```
Attempt | #1 | #2 | #3 | #4 | #5 | #6 | #7 | #8 | #9 | #10 | #11
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
Seconds | 301 | 283 | 290 | 286 | 289 | 285 | 287 | 287 | 272 | 276 | 269

| Setting        | Type           | Description  | Default Value|
| ------------- |:-------------:| -----:| -------------:|
|      data     | Array | Array of items to select from. Should be an array of objects,the id and text properties must be as it is in the component settings.  |    []           |
| idField      | String      | Name of the id field as it is in the data value |         "id"      |
| textField | String      |    Name of the dispaly field as it is in the data value |    "name"           |
|disabled| boolean | optional disable component | false|
|itemColor| String | color of the selected items | "#4847E0"|
|itemBackgroundColor| String| background color of the selected items with opacity level in RGBA | "rgba(72, 71, 224, 0.08)"|
|placeholder| String | component placeholder | select option |
|dropDownSettings.singleSelection| boolean | Component mode. If set true user can select more than one option. | false |
|dropDownSettings.selectAllText| String | Text to display as the label of select all option | "Select All" |
|dropDownSettings.unSelectAllText| String | Text to display as the label of unselect all option | "UnSelect All"
|dropDownSettings.itemsShowLimit| number | Limit the number of items to show in the input field. | 3 |
|dropDownSettings.allowSearchFilter| boolean | optional settings to toggle search filter feature | true|


```

# Callback ()
change - Return the selected item(s) id(s) when an item or multiple items is/are checked/selected. Example : (change)="itemSelect($event)"



# Run Locally
- Clone the repository or downlod the .zip,.tar files.
- Run npm install
- Run ng serve for a dev server
- Navigate to http://localhost:4200/

# Library Build / NPM Package

Run yarn build:lib to build the library and generate an NPM package. The build artifacts will be stored in the dist-lib/ folder.

# Running unit tests

Run yarn test to execute the unit tests.

# Development

This project was generated with Angular CLI version 11.0.7.

# Contributions

Contributions are welcome, please open an issue and preferrably file a pull request.

# Opening Issue

Please share sample code using codesandbox.com or stackblitz.com to help me re-produce the issue.

# License

MIT License.

