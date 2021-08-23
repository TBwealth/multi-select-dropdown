import { Component, EventEmitter, Input, OnInit, Output }  from '@angular/core';
export interface dropDownSetting{
  singleSelection?: boolean,
  selectAllText?: string,
  unSelectAllText?: string,
  itemsShowLimit?: number,
  allowSearchFilter?: boolean,
}
@Component({
  selector: 'lib-tb-multi-select-dropdown',
  template: `
  <div style="position: relative;
  width: 100%;
  font-size: inherit;
  font-family: inherit;
  height: 33px;
  
  ">
  
  
  <div style="display: inline-block;
  border: 1px solid #adadad;
  width: 100%;
  padding: 6px 12px;
  margin-bottom: 0;
  font-weight: 400;
  line-height: 1.52857143;
  text-align: left;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  height: 33px;
  border-radius: 4px;" >
  <div style="display: flex;flex-direction: row;box-sizing: border-box;" >
      <div  style="flex:auto;display: flex;flex-direction: row;overflow:hidden;white-space: nowrap;">
          <div *ngFor="let sel of selectedOptions;let i = index" style="width: 7.8rem;">
          <div style="display: flex;flex-direction: row;  color:#4847E0;
          font-weight:500;
          padding:2px 4px;
          min-width: 33px;
          font-size: 1rem;
          background: rgba(72, 71, 224, 0.08);
          border-radius:  4px;
          margin-right: 5px;">
          <div style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;flex: 1;">
              {{sel.textField}}
          </div>
           <span (click)="removefromselected(sel.textField,i)" style="cursor: pointer;color: red;">x</span>
          </div>
      </div>
      <div *ngIf="selectedOptions.length < 1" style="width: 101px;"><span style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;flex: 1;">{{placeholder}}</span></div>
      </div>
      <div style="display: flex;flex-direction: row;">
  <div style="padding:3px">
  <span *ngIf="selectedOptions.length > dropDownSettings.itemsShowLimit">+{{selectedOptions.length-dropDownSettings.itemsShowLimit}}</span>
  </div>
  <div  style="padding:3px" (click)="toggleDataPanel()" >
     <span *ngIf="!isShowdataPanel" style="display: inline-block;
     top: 5px;
     width: 0;
     height: 0;
     border-top: 7px solid #adadad;
     border-left: 7px solid transparent;
     border-right: 7px solid transparent;cursor: pointer;">
  </span>
  <span *ngIf="isShowdataPanel"  style="display: inline-block;
  width: 0;
  height: 0;
  border-bottom: 7px solid #adadad;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;cursor: pointer;">
  
  </span>
  </div>
      </div>
  </div>
  
  </div>
  <!---data list panel-->
  
      <div  *ngIf="isShowdataPanel" style="position: absolute;
      padding-top: 6px;
      padding-bottom: 10px;
      width: 96.5%;
      z-index: 9999;
      border: 1px solid #ccc;
      border-radius: 3px;
      background: #fff;
      margin-top: 10px;
      box-shadow: 0 1px 5px #959595;height: 280px;overflow: scroll;">
      <div *ngIf="empty" style="display: flex;justify-content: center;align-items: center;padding:20px">
      <span>No Record Found</span>
      </div>
      <div *ngIf="!empty" style="display: flex;flex-direction: column; padding: 10px;">
      <div *ngIf="!dropDownSettings.singleSelection" style="display: flex;flex-direction: row;">
           <input #selectAll (change)="checkedAcction(selectAll.checked)" [checked]="bulkAction_isChecked" name="" class="form-control" type="checkbox"> 
           <div style="padding-left: 5px;display: flex;align-items: center;">
              <span *ngIf="!bulkAction_isChecked" >Select All</span>
              <span *ngIf="bulkAction_isChecked">UnSelect All</span>
          </div>
      </div>
      <div *ngIf="dropDownSettings.allowSearchFilter"><input (keyup)="handleSearch(searchPara.value)" #searchPara class="form-control" name=""  type="text" [placeholder]="'Filter Option List'"></div>
      <div *ngFor="let data of userData;let i = index" style="padding-top: 10px;" >
          <div *ngIf="!dropDownSettings.singleSelection"  (click)="selectOption(i,data,chkbox.checked)" style="display: flex;flex-direction: row;cursor: pointer;">
          <div>
              <div class="form-check">
                  <input name="" class="form-control" #chkbox type="checkbox" [checked]="data['isSelected']">
                  
              </div>
            
        
          </div>
          <div style="flex:auto;display: flex;align-items: center;padding-left: 5px;">{{data[textField]}}</div>
          </div>
      
          <div *ngIf="dropDownSettings.singleSelection"  (click)="selectOption(i,data,'')" style="display: flex;flex-direction: row;cursor: pointer;">
              <!-- <div >
                  <div class="form-check">
                      <input class="form-check-input" #chkbox type="radio" name="flexRadioDefault" [checked]="data['isSelected']">
       
                  </div>
              </div> -->
              <div style="flex:auto;display: flex;align-items: center;padding-left: 5px;">{{data[textField]}}</div>
          </div>
      </div>
      </div>
      
      </div>
  
  </div>
  `,
  styles: [
  ]
})
export class TbMultiSelectDropdownComponent implements OnInit {
  @Input() idField: string = "";
  @Input() textField: string = "";
  @Input() dropDownSettings: dropDownSetting = {};
  @Input() placeholder: string = '';
  @Input() set data(val: any[]) {
    if(val){
    if (val.length > 0) {
      this.panelData = val.map(x => { x.isSelected = false;return x});
      if (!this.isSearching) {
        this.oPanelData = val.map(x => { x.isSelected = false;return x});
      }
      setTimeout(() => {
        if (this.userValue) {
          this.setValues(this.userValue);
        }    
      }, 50);
    }
  }
  }
  @Output() valueChange = new EventEmitter<string>();
  @Output() change = new EventEmitter();
  @Input() set value(data: any) {  
    if (data) {
      this.userValue = data;
      if (this.userValue) {
        this.setValues(this.userValue);
      }
    }
   
  }
  @Output() onItemSelect = new EventEmitter<any>();
  @Output() onSelectAll = new EventEmitter<any>();
  userValue: any = '';
  oPanelData = [];
  panelData = [];
  isSearching: boolean = false

  get userData() {
    return this.panelData
  }
  isShowdataPanel: boolean = false;
  selectedOptions = [];
  bulkAction_isChecked: boolean = false;
  constructor() { }
  get empty() {
    return this.oPanelData.length === 0;
}
  checkedAcction(event) {
if(!this.dropDownSettings.singleSelection)
  {  if (event) {
      this.selectedOptions = [];
      this.userData.map(d => {
        d.isSelected = true;
        let newSelectedObj = {
          idField: d[this.idField],
          textField: d[this.textField],
        }
        this.selectedOptions.push(newSelectedObj)
        return d;
      })
    } else {
      this.userData.map(d => {
        d.isSelected = false;
        return d;
      })
      this.selectedOptions = [];
    }
    this.bulkAction_isChecked = event != true ? false : true;
    this.changes(this.selectedOptions);

}

  }
  setValues(data: any) {  
    if (this.userData.length > 0) {
      this.selectedOptions = [];
      if (this.dropDownSettings.singleSelection) {
        var findIdex = this.userData.find(x => x[this.idField] == data);
        let newSelectedObj = {
          idField: findIdex[this.idField],
          textField: findIdex[this.textField],
        }
        this.selectedOptions.push(newSelectedObj)
      } else {
        var arr = [];
        arr = data.split(",");
        arr.forEach(val => {
          var findIdex = this.userData.find(x => x[this.idField] == val);
          let newSelectedObj = {
            idField: findIdex[this.idField],
            textField: findIdex[this.textField],
          }
          this.selectedOptions.push(newSelectedObj)
        });
      }
}
    
}

  selectOption(colIndex, data, event) {
    if(!this.dropDownSettings.singleSelection){
    this.userData[colIndex].isSelected = event ? true : false;
      if (event) {
        let newSelectedObj = {
          idField: data[this.idField],
          textField: data[this.textField],
        }
        this.selectedOptions.push(newSelectedObj)
      
    } else {
      var dIndex = this.selectedOptions.findIndex(x => x.idField == data[this.idField]);
      this.selectedOptions.splice(dIndex, 1);
    }

   // emit changes
      this.changes(this.selectedOptions);
    } else {
      this.selectedOptions = [];
      this.userData[colIndex].isSelected = !this.userData[colIndex].isSelected;
      let newSelectedObj = {
        idField: data[this.idField],
        textField: data[this.textField],
      }
      this.selectedOptions.push(newSelectedObj)
      //emit changes
      this.changes(this.selectedOptions);
      this.toggleDataPanel();
    }
  

  }
  async handleSearch(event) {
    this.isSearching = true;
    if(event && (event != "" || event == null))
    {
      this.panelData = this.oPanelData;
      var truchk = false;        
      this.panelData = await this.panelData.filter(uf => {
          if(uf[this.textField].toString().toLowerCase().indexOf(event.toString().toLowerCase()) > -1)
          { truchk = true; return true; }
          else { truchk = false; }       
       
          return truchk;
      })
      this.isSearching = false;
    } else {
      this.isSearching = false;
     // console.log(this.otableData)
      this.panelData = this.oPanelData;
    }
  }
  removefromselected(sel, i) {
    
    var findIdex = this.userData.findIndex(x => x[this.textField] == sel);
    this.userData[findIdex].isSelected = false;
    this.selectedOptions.splice(i, 1);

    //emit changes
    this.changes(this.selectedOptions);
  }

  changes(selectedOptions: any[]) {
    
    if(selectedOptions.length > 0){
    if (!this.dropDownSettings.singleSelection) {
      var selVal = selectedOptions.map(x => x.idField);
      this.change.emit();
      this.valueChange.emit(selVal.join(','));
    }
    else {
      let fieldId = selectedOptions[0].idField;   
        this.change.emit(fieldId);
        this.valueChange.emit(fieldId);

     
      }
    } else {
      this.change.emit();
      this.valueChange.emit("");
    }
  }
  toggleDataPanel() {
    this.isShowdataPanel = !this.isShowdataPanel;

  }
  ngOnInit(): void {
  
  }
  closeDropdown() {

     if (this.isShowdataPanel) {
      this.isShowdataPanel = false;
     }
   

  }

}
