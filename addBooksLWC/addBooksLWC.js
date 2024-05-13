import { LightningElement,api,wire,track } from 'lwc';
import addBooks from '@salesforce/apex/AddBooksController.addBooks';
import getBooks from '@salesforce/apex/AddBooksController.getBooks';
import getBooksLen from '@salesforce/apex/AddBooksController.getBooksLen';
import addOrderProducts from '@salesforce/apex/AddBooksController.addOrderProducts';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import {CurrentPageReference} from 'lightning/navigation';

const columns = [
    { label: 'Code', fieldName: 'productCode' , type: 'Text', hideDefaultActions: true, wrapText: true},
    { label: 'Book', fieldName: 'proName', type: 'Text' ,hideDefaultActions: true, wrapText: true},
   
];

const columns1 = [
    { label: 'Code', fieldName: 'productCode' , type: 'Text', hideDefaultActions: true, wrapText: true},
    { label: 'Book', fieldName: 'proName', type: 'Text',hideDefaultActions: true, wrapText: true },
   
];

const columns2 = [
    { label: 'Code', fieldName: 'productCode' , type: 'Text', hideDefaultActions: true, wrapText: true},
    { label: 'Book', fieldName: 'proName', type: 'Text',hideDefaultActions: true, wrapText: true },
   
];
export default class AddBooksLWC extends LightningElement {

    
    noOfselectedBook = 0 ;
    noOftotalBook = 0 ;
    noOfRemainingBook = 0 ;
    length1 = 0;
    length2 = 0;
    length3 = 0;
    category = '';
    category1 = '';
    category2 = '';
    v1 = false;
    v2 = false;
    v3 = false;
    acountName = '';
    @api recordId;
    columns = columns;
    columns1 = columns1;
    columns2 = columns2;
    data = [];
    data1 = [];
    data2 = [];
    len;
    Purchase_Location__c ;
   Current_Publication__c;
   Return_Yes_No__c;
   Mobile_No__c;
   Pracharya_Name__c;
   Commision__c;
   When_to_come__c;
   Book_Issued_on__c;

   


    @track selectedRecords = [{
       code:'',
       books:'',
   Purchase_Location__c:"",
   Current_Publication__c:"",
   Return_Yes_No__c:"",
   Mobile_No__c:"",
   Pracharya_Name__c:"",
   Commision__c:"",
   When_to_come__c:"",
   Book_Issued_on__c:""
}];

@wire(CurrentPageReference)
getStateParameters(currentPageReference) {
if (currentPageReference) {
    this.recordId = currentPageReference.state.recordId;
  }
}

connectedCallback() {
   
    addBooks({VisitId :this.recordId})
    .then(data =>{

        this.acountName=data;
    })
    .catch(error =>{
        console.log('error----');
    })

    getBooksLen()
    .then(result => {
        this.noOftotalBook = result;
        this.noOfRemainingBook = this.noOftotalBook;

       
    })
    .catch(error => {
        
    });
    
}
handleFirstCancel(){
    this.dispatchEvent(new CloseActionScreenEvent());
}

    
   handle1(event) {
    this.Purchase_Location__c = event.target.value;
    console.log("Purchase_Location__c"+ this.Purchase_Location__c);
   }
   handle2(event) {
    this.Current_Publication__c = event.target.value;
    console.log("Current_Publication__c"+ this.Current_Publication__c);
   }
   handle3(event) {
    this.Return_Yes_No__c = event.target.value;
    console.log("Return_Yes_No__c"+ this.Return_Yes_No__c);
   }
   handle4(event) {
    this.Mobile_No__c= event.target.value;
    console.log("Mobile_No__c"+ this.Mobile_No__c);
   }
   handle5(event) {
    this.Pracharya_Name__c = event.target.value;
    console.log("Pracharya_Name__c"+ this.Pracharya_Name__c);
   }
   handle6(event) {
    this.Commision__c = event.target.value;
    console.log("Commision__c"+ this.Commision__c);
   }
   handle7(event) {
    this.When_to_come__c= event.target.value;
    console.log("When_to_come__c"+ this.When_to_come__c);
   }
   handle8(event) {
    this.Book_Issued_on__c = event.target.value;
    console.log("Book_Issued_on__c"+ this.Book_Issued_on__c);
   }



   

    len;

   

    get options() {
        return [
             { label: 'None', value: 'None' },
            { label: 'Navbodh Little Lamp', value: 'Navbodh Little Lamp' },
            { label: 'Navbodh Teacher Manual', value: 'Navbodh Teacher Manual' },
            { label: 'Navbodh Work Book Navbodh Teacher Manual', value: 'Navbodh Work Book Navbodh Teacher Manual' },
        ];
    }

    get options1() {
        return [
            { label: 'None', value: 'None' },
            { label: 'Navbodh Little Lamp', value: 'Navbodh Little Lamp' },
            { label: 'Navbodh Teacher Manual', value: 'Navbodh Teacher Manual' },
            { label: 'Navbodh Work Book Navbodh Teacher Manual', value: 'Navbodh Work Book Navbodh Teacher Manual' },
        ];
    }

    get options2() {
        return [
             { label: 'None', value: 'None' },
            { label: 'Navbodh Little Lamp', value: 'Navbodh Little Lamp' },
            { label: 'Navbodh Teacher Manual', value: 'Navbodh Teacher Manual' },
            { label: 'Navbodh Work Book Navbodh Teacher Manual', value: 'Navbodh Work Book Navbodh Teacher Manual' },
        ];
    }


    
   

    toggleChoiceA(event) {
        let buttonid = event.currentTarget.dataset.buttonid;
        let currentsection = this.template.querySelector('[data-id="' + buttonid + '"]');
        if (currentsection.className.search('slds-is-open') == -1) {
            currentsection.className = 'slds-section slds-is-open';
        } else {
            currentsection.className = 'slds-section slds-is-close';
        }
    }

    toggleChoiceB(event) {
        let buttonid1 = event.currentTarget.dataset.buttonid1;
        let currentsection1 = this.template.querySelector('[data-id1="' + buttonid1 + '"]');
        if (currentsection1.className.search('slds-is-open') == -1) {
            currentsection1.className = 'slds-section slds-is-open';
        } else {
            currentsection1.className = 'slds-section slds-is-close';
        }
    }

    toggleChoiceC(event) {
        let buttonid2 = event.currentTarget.dataset.buttonid2;
        let currentsection2 = this.template.querySelector('[data-id2="' + buttonid2 + '"]');
        if (currentsection2.className.search('slds-is-open') == -1) {
            currentsection2.className = 'slds-section slds-is-open';
        } else {
            currentsection2.className = 'slds-section slds-is-close';
        }
    }

     
    handleChange(event) {
        this.category = event.target.value;
        console.log("C0-----------" + this.category);
        this.onCategory(); 
        
        
        if( this.category == "None"){
            this.v1 = false;
        }else{
            this.v1 = true;
        }
    }
    
    onCategory() { 
        
        getBooks({ category: this.category })
            .then(result => {
                this.length1 = result.length;
                this.data = result.map(value => {
                    console.log(" this.length1----------------------"+ this.length1);
                    
                    return { ...value, productCode: value.ProductCode, proName: value.Name };
                });
    
            })
            .catch(error => {
                console.log('error----');
            });
    }
    
    handleChange1(event) {
        this.category1 = event.target.value;
        console.log("C1-----------"+this.category1);
        this.onCategory1();
        
        if( this.category1 == "None"){
            this.v2 = false;
        }else{
            this.v2 = true;
        }
    }

    onCategory1() { 
        
        getBooks({ category: this.category1 })
            .then(result => {
                this.length2 = result.length;
                this.data1 = result.map(value => {
                    console.log(" this.length2----------------------"+ this.length2);
                    
                    return { ...value, productCode: value.ProductCode, proName: value.Name };
                });
    
            })
            .catch(error => {
                console.log('error----');
            });
    }

    handleChange2(event) {
        this.category2 = event.target.value;
        console.log("C2-----------"+this.category2);
        this.onCategory2();
        
        if( this.category2 == "None"){
            this.v3 = false;
        }else{
            this.v3 = true;
        }
        
    }
    onCategory2() { 
        
        getBooks({ category: this.category2 })
            .then(result => {
                this.length3 = result.length;
                this.data2 = result.map(value => {
                    console.log(" this.length3----------------------"+ this.length3);
                   
                    return { ...value, productCode: value.ProductCode, proName: value.Name };
                });
    
            })
            .catch(error => {
                console.log('error----');
            });
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

this.noOfselectedBook = this.selectedProductCount-1;
if(this.noOfselectedBook == 0){
    this.noOfRemainingBook = this.noOftotalBook;
}else{
    this.noOfRemainingBook = (this.noOftotalBook - this.noOfselectedBook);
}

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
  
    
}
console.log('Selected ID-----------'+this.selectedProductsIds);
} catch (error) {
    console.log(error); 
}

}




handleSave() {
    try{
    console.log("lopp started");
    var i = 0;
    for(i = 0; i<8; i++){
    console.log("lopp inside");

        this.selectedRecords[i].Purchase_Location__c = this.Purchase_Location__c;
        this.selectedRecords[i].Current_Publication__c = this.Current_Publication__c;
        this.selectedRecords[i].Return_Yes_No__c =this.Return_Yes_No__c;

    
        this.selectedRecords[i].Mobile_No__c=this.Mobile_No__c;
    
        this.selectedRecords[i].Pracharya_Name__c=this.Pracharya_Name__c;
    
        this.selectedRecords[i].Commision__c=this.Commision__c;
    
        this.selectedRecords[i].When_to_come__c=this.When_to_come__c;
    
        this.selectedRecords[i].Book_Issued_on__c=this.Book_Issued_on__c;
        
        console.log("lopp ended" + i);
    
    }
}catch(Exception){
    console.log("error::::"+Exception);
}
    

    let lastIndex = this.selectedRecords.length;
    let bypass = false;
    console.log(" Selected data ---------------------" +JSON.stringify(this.selectedRecords) );
   
    console.log('save data' + JSON.stringify(this.selectedRecords));
    if (!bypass) {
        this.isLoading = true;
        console.log('12436---------------------' + this.recordId);
        addOrderProducts({ jsObjoppLineItems: JSON.stringify(this.selectedRecords), VisitId: this.recordId })
            .then((result) => {
                if (result = 'success') {
                    this.isLoading = false;
    
                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Success',
                        message: "Record Save Successfully",
                        variant: 'success'
    
                    }),
                    );
                   
                    this.dispatchEvent(new CloseActionScreenEvent());
    
    
                    
                }
    
               
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