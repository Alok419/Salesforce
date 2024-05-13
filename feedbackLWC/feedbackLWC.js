import { LightningElement,track  } from 'lwc';
import backgroundUrl from '@salesforce/resourceUrl/Bg_Img';

export default class FeedbackLWC extends LightningElement {

    selectedOption = [];
    selectedOption1 = [];
    selectedOption2 = '';
    holdOthers = '' ;
    holdOthers2 = ';'
    highlight;
    highlight1;
    highlight2;
    highlight3;
    highlight4;
    h1;
    h2;
    h3;
    h4;
    @track page1= true;
    @track Page2 = false;
    Page3 = false;
    page4 = false;
    check = false;
    cross = false;

    get backgroundStyle() {
        return `height:30rem ;background-image:url(${backgroundUrl})`;
    }

    get backgroundStyle2() {
        return `height:15rem ;background-image:url(${backgroundUrl})`;
    }

    
    

    handleOptionClick2(event) {
        const clickedValue = event.target.dataset.value;
        const index = this.selectedOption1.indexOf(clickedValue);

        if (index !== -1) {
            if(clickedValue == 'Yes'){
                this.highlight3 = false;
            }
            if(clickedValue == 'No'){
                this.highlight4 = false;
            }
            
            this.selectedOption1.splice(index, 1);
            

        } else {
            
            

            if(clickedValue == 'Yes'){
                this.selectedOption1.push(clickedValue);
                this.highlight3 = true;
                this.Page3 = false;
                this.page4 = true;
            }
            if(clickedValue == 'No'){
                this.highlight4 = true;
            }
            
        }

        console.log('Selected Option 1-----------------', JSON.stringify(this.selectedOption1));
    }


    handleOptionClick(event) {
        const clickedValue = event.target.dataset.value;
        const index = this.selectedOption.indexOf(clickedValue);

        if (index !== -1) {
            if(clickedValue == 'Help retain more Customers'){
                this.highlight = false;
            }
            if(clickedValue == 'Drive More Sales'){
                this.highlight1 = false;
            }
            if(clickedValue == 'Increase Operational Efficiency'){
                this.highlight2 = false;
            }
            this.selectedOption.splice(index, 1);
            

        } else {
            
            this.selectedOption.push(clickedValue);
            if(clickedValue == 'Help retain more Customers'){
                this.highlight = true;
            }
            if(clickedValue == 'Drive More Sales'){
                this.highlight1 = true;
            }
            if(clickedValue == 'Increase Operational Efficiency'){
                this.highlight2 = true;
            }
        }
    }


   

    handleOptionClick3(event) {
        const clickedValue = event.target.dataset.value;
        
        if (this.selectedOption2 === clickedValue) {
            
            this.selectedOption2 = '';
            this.resetHighlights();
        } else {
            
            this.selectedOption2 = clickedValue;
            
            if (clickedValue === 'Within a week') {
                this.setHighlight(true, false, false, false);
            } else if (clickedValue === 'Within a month') {
                this.setHighlight(false, true, false, false);
            } else if (clickedValue === 'Within a quarter') {
                this.setHighlight(false, false, true, false);
            } else if (clickedValue === 'Within a year') {
                this.setHighlight(false, false, false, true);
            }
        }
    
        console.log('selected value: ' + this.selectedOption2);
    }
    
    
    resetHighlights() {
        this.setHighlight(false, false, false, false);
    }
    
    
    setHighlight(h1, h2, h3, h4) {
        this.h1 = h1;
        this.h2 = h2;
        this.h3 = h3;
        this.h4 = h4;
    }
    

    
    handleInputChange(event) {
       this.holdOthers = event.target.value;
    }

    handleInputChange1(event) {
        this.holdOthers2 = event.target.value;
        

     }

    handleNext() {
        
        if (this.holdOthers.trim() !== '') {
            this.selectedOption.push(this.holdOthers);
            this.holdOthers = ''; 
        }

        console.log('Selected Option-----------------', JSON.stringify(this.selectedOption));
        console.log('Selected Option-----------------', this.selectedOption.length);

        this.Page2 = true;
        this.page1 = false;
     
    }


    handleCheck(){
        if(this.check == false){
            this.check = true;
        } else if(this.check == true){
            this.check = false;
        }
        console.log(this.check);
        this.Page2 = false;
        this.Page3 = true;
    }

    handleCross(){
        if(this.cross == false){
            this.cross = true;
        } else if(this.cross == true){
            this.cross = false;
        }
        this.Page2 = false;
        this.Page3 = true;
        console.log(this.cross);
    }

    handleNext2(){
        this.Page2 = false;
        this.Page3 = true;
    }
    handleNext3(){
        this.selectedOption1.push(this.holdOthers2);
        console.log('Selected Option1-----------------', JSON.stringify(this.selectedOption1));
        this.Page3 = false;
        this.page4 = true;
        

    }

    handleBack1(){
        this.Page2 = false;
        this.page1 = true;
    }

    handleBack2(){

        this.Page3 = false;
        this.Page2 = true;
    }


    handleBack3(){
        this.Page3 = true;
       this.page4 = false;
    }
    
}
