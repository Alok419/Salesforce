import { LightningElement,track ,api} from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProductList';
import getPickListValue from "@salesforce/apex/WarehouseLwcController.getPickListValue";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import addOrderProducts from '@salesforce/apex/WarehouseLwcController.addOrderProducts';
import { CloseActionScreenEvent } from 'lightning/actions'; 
import getProductListSearchable from '@salesforce/apex/ProductController.getProductListSearchable';

const columns = [
//{ label: 'Alias', fieldName: 'Name', type: 'text' },
{ label: 'Description of goods', fieldName: 'proDescription', type: 'text', wrapText: true },
{ label: 'Alias', fieldName: 'productName', type: 'text', wrapText: true },
{ label: 'Size', fieldName: 'productSize', type: 'text' , wrapText: true},
{ label: 'Core', fieldName: 'prodctCore', type: 'text',  wrapText: true },
{ label: 'Units', fieldName: 'proUnitPrice', type: 'text' ,  wrapText: true },
{ label: 'Quantity', fieldName: 'proQuantity', type: 'number' ,  wrapText: true }
];


export default class WarehouseLWC extends LightningElement {
  //  descrip = proDescription;
@track productType;
@track productOptions= [{ label: 'None', value: 'None' }];
@track warehouseOptions=[{ label: 'None', value: 'None' }];
@track productPickVal;
@track warehousePickVal;
@track data = [];
@track selectedProductsIds = [];
@track choosenProductIds=[];
@track selectedRecords = [];
// @track selectedRows = [];
@track rowNumber;
@track showNext = false;
@track NewRec = false;
@api recordId;
@track showTable = false;
showPriceBook = false;
columns = columns;
@track addProduct=true;
@track holdSearchval
netAmount ;


handleSearch(event){

this.holdSearchval = event.target.value;
console.log('=handleSearch=====>'+ this.holdSearchval);
this.searchData();
}

searchData() {
console.log('======>'+ this.holdSearchval);
getProductListSearchable({ productType: this.productType,searchValue:  this.holdSearchval })
.then(result =>{
    //this.data = result;
    if(result){
        console.log('result======='+result);
        this.data = result.map(value=>{
            return{...value,productName:value.Name,prodctCore:value.Core__c,productSize:value.Size__c, proUnitPrice:value.Units__c,proDescription:value.Description__c,proQuantity:value.Quanity__c   }
        });
    }else{
        console.log('inside else Line 1result======='+result);
        this.refreshData();
        console.log(' Line 2222result======='+result);
    }
    

    
})
.catch(error=>{
    console.log('error-----'+JSON.stringify(error));
})
}

handleDeleteRow(index) {

this.selectedRecords.splice(index, 1);
this.selectedRecords.forEach((item, i) => {
    item.rowNumber = i + 1;
});
this.selectedRecords = [...this.selectedRecords];
}

handleNext(){
this.showTable= true;
this.addProduct=false;
}


@track selectedPriceBook;
getExistingPriceBookName(event) {
this.selectedPriceBook = event.detail.value;
console.log('this.selectedPriceBook....65' + this.selectedPriceBook);

}

savepriceBook() {
console.log('this.selectedPriceBook....16' + this.selectedPriceBook);
saveSelectedPricebook({ selectedPriceBook: this.selectedPriceBook, oppId: this.recordId })
    .then((result => {
        console.log('result345' + result);
        this.showPriceBook = false;
        // this.OnClickNewRec();

    }))
    .catch((error => {
        console.log("Catch Error : " + JSON.stringify(error));
    }))
}
handleProduct(event) {
    this.productType = event.target.value;
    this.refreshData();
}

// handleWarehouse(event) {
//     this.warehouse = event.target.value;
//     this.refreshData();
// }

handleFirstCancel() {

this.NewRec = false;
this.showTable = false
//  this.addProduct = false;

//eval("$A.get('e.force:refreshView').fire();");
this.dispatchEvent(new CloseActionScreenEvent());
//window.location.reload();
}

refreshData() {
    getProductList({ productType: this.productType})
    .then(result =>{
        //this.data = result;
        console.log('result======='+result);
        if(result!=null && result!=''){
            console.log('true------------------');
        }else if(this.productType!=null  && this.productType!='' ){
            console.log('False------------------');
            this.dispatchEvent(new ShowToastEvent({
                title: 'No data',
                message: "No such data found in this category",
                variant: 'Error'

            }),
            );
        }
        this.data = result.map(value=>{
            return{...value,productName:value.Name,prodctCore:value.Core__c,productSize:value.Size__c, proUnitPrice:value.Units__c,proDescription:value.Description__c,proQuantity:value.Quanity__c}
        });
        
    })
    .catch(error=>{
        console.log('error-----'+JSON.stringify(error));
    })
}


// -------------
async connectedCallback() {
    setTimeout(() => {
    console.log('options');
    console.log("recordid-----------"+this.recordId);
}, 
2000
);
   // this.warehouseOptions=await this.getPickList('Product2','Warehouse__c');
    this.productOptions=await this.getPickList('Product__c','Product_Type__c');
    
}

async getPickList(objectApiName,fieldApiName){
    let warehousePickList=[];
    await(getPickListValue({objectApiName:objectApiName,fieldApiName:fieldApiName}))
    .then((result)=>{
        console.log('result'+result);
        warehousePickList=JSON.parse(result).pickListData;
    }).catch((error)=>{
        console.log(error.body.message);
    });
    console.log('warehousePickList '+JSON.stringify(warehousePickList));
    return warehousePickList;
}
@track selectedProductCount= 0;

handleRowSelection(event) {
try {
    console.log('event.detail' + event.detail.config.action);
    this.selectedProductsIds=[];
if (event.detail.config.action == 'rowSelect') {
    const selectedRows = event.detail.selectedRows;
    console.log('selectedRows1.....'+selectedRows);
    console.log('selectedRows.Id ' + JSON.stringify(selectedRows));
    const selectedRec = [];
    const holdData = [...this.selectedRecords, ...selectedRows];
    this.selectedRecords = [...new Set(holdData.map(({ Id }) => Id))].map(e => holdData.find(({ Id }) => Id == e));
    console.log('selectedRecords :' + JSON.stringify(this.selectedRecords));
} else if (event.detail.config.action == 'rowDeselect') {
    let deselectedId = event.detail.config.value;
    console.log('Removed selectedRecords Id :' + event.detail.config.value);
    let recordIndex = this.selectedRecords.findIndex((record) => record.Id == deselectedId);
    this.selectedRecords.splice(recordIndex, 1);
    this.selectedRecords = [...this.selectedRecords];
    console.log('Removed selectedRecords :' + JSON.stringify(this.selectedRecords));
}
this.selectedProductCount = this.selectedRecords.length;
console.log(' this.selectedProductCount.....'+ this.selectedProductCount);

if (this.selectedProductCount > 0) {
    var srNo = 1;
    let baseURL = window.location.origin;
    
    this.selectedRecords.forEach(currentItem => {
        this.selectedProductsIds.push(currentItem.Id);
        currentItem.recordUrl = baseURL + '/' + currentItem.Id;
        this.showNext = true;
        currentItem.rowNumber = srNo;
        srNo++;
       
            
        

    });

} else {
    this.showNext = false;
    
}
console.log('Selected ID-----------'+this.selectedProductsIds);
} catch (error) {
    console.log(error); 
}

}


genericChange(event) {
    let index = event.target.dataset.index;
    let fieldName = event.target.name;
    let value = event.target.value;

    switch (fieldName) {
        case "quantity":
            this.selectedRecords[index].Quantity = parseFloat(value);
            this.calculateNetAmount(index);
            this.calculateTotalAmount(index);
            break;
        // case "ListPrice":
        //     this.selectedRecords[index].ListPrice = parseInt(value);
        //     this.calculateNetAmount(index);
        //     this.calculateTotalAmount(index);
        //     break;
        case "SalesPrice":
            this.selectedRecords[index].SalesPrice = parseInt(value);
            this.calculateNetAmount(index);
            this.calculateTotalAmount(index);
            break;
        case "Discount":
            this.selectedRecords[index].Discount = parseFloat(value);
            this.calculateTotalAmount(index);
            break;
        case "Description": 
            this.selectedRecords[index].Description = value;
            break;
        case "deleteRow":
            this.handleDeleteRow(index);
            break;
    }
}


calculateNetAmount(index) {
let quantity = this.selectedRecords[index].Quantity;
let salesPrice = this.selectedRecords[index].SalesPrice;
this.selectedRecords[index].NetAmount = quantity * salesPrice;
}

calculateTotalAmount(index) {
let netAmount = this.selectedRecords[index].NetAmount || 0;
let discount = this.selectedRecords[index].Discount;
let salprice = this.selectedRecords[index].SalesPrice;

if (!isNaN(discount)) { 
    this.selectedRecords[index].TotalAmount = netAmount - (netAmount*(discount/100));
} else {
    this.selectedRecords[index].TotalAmount = netAmount;
}

}



handlePreviousFirstPage() {
this.addProduct = true;
this.showTable = false;
}


handleSave() {

let lastIndex = this.selectedRecords.length;
let bypass = false;
console.log(" Selected data ---------------------" +JSON.stringify(this.selectedRecords) );
console.log('this.selectedRecords.Name...' + this.selectedRecords.Name);
console.log('this.selectedRecords.ListPrice...' + this.selectedRecords.List_Price__c);
for (let i = 0; i < lastIndex; i++) {
    let rowNumber = i + 1;
    console.log('this.selectedRecords[i].Name...' + this.selectedRecords[i].Name);
    console.log('this.selectedRecords[i].List_Price__c...' + this.selectedRecords[i].List_Price__c);
    console.log('this.selectedRecords[i].Quantity...' + this.selectedRecords[i].Quantity);
    if (this.selectedRecords[i].Quantity == null || this.selectedRecords[i].Quantity == '') {
        this.toastEvent('error', 'Error!', 'Please fill Quantity at row number .' + rowNumber);
        bypass = true;
        break;
    }
    // console.log('this.selectedRecords[i].listprice ...' + this.selectedRecords[i].ListPrice);
    // if (this.selectedRecords[i].ListPrice == null || this.selectedRecords[i].ListPrice == '') {
    //     this.toastEvent('error', 'Error!', 'Please fill Sales Price at row number .' + rowNumber);
    //     bypass = true;
    //     break;
    // }
}
console.log('save data' + JSON.stringify(this.selectedRecords));
if (!bypass) {
    this.isLoading = true;
    console.log('12436---------------------' + this.recordId);
    addOrderProducts({ jsObjoppLineItems: JSON.stringify(this.selectedRecords), quoteId: this.recordId })
        .then((result) => {
            if (result = 'success') {
                this.isLoading = false;

                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: "Record Save Successfully",
                    variant: 'success'

                }),
                );
                //window.location.reload();
                // this.NewRec = false;
                //  this.showTable = false;
                //this.addProduct = false;
                //eval("$A.get('e.force:refreshView').fire();");
                this.dispatchEvent(new CloseActionScreenEvent());


                //refreshApex(this.fetchQuoteLineItem);
            }

            // refreshApex(this.fetchQuoteLineItem);
        })
        .catch(error => {
            this.isLoading = false;
            console.log("Error : " + JSON.stringify(error));
                this.dispatchEvent(new ShowToastEvent({
                            title : 'Error',
                            message :JSON.stringify(error.body.message),
                            variant : 'error'

                        }),
                        );
        })
}
}

}