public with sharing class WarehouseLwcController {
@AuraEnabled
public static String getPickListValue(string objectApiName, string fieldApiName){
    MainWrapper mainWrap=new MainWrapper();
    Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectApiName);
    Schema.DescribeSObjectResult res = convertToObj.getDescribe();
    Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(fieldApiName).getDescribe();
List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
for( Schema.PicklistEntry pickListVal : ple){
    DropDownWrapper picklstWrap=new DropDownWrapper();
    picklstWrap.label=pickListVal.label;
    picklstWrap.value=pickListVal.value;
    mainWrap.pickListData.add(picklstWrap);
}
return JSON.serialize(mainWrap);
}

public class MainWrapper{
public list<DropdownWrapper> pickListData=new list<DropDownWrapper>();
}
public class DropdownWrapper{
@AuraEnabled public string label;
@AuraEnabled public string value;
}
/*
@AuraEnabled
public static String getExistingPriceBookOnOrder(string quoteId){
priceBookCheckWrapper PBC = new priceBookCheckWrapper();
system.debug('recordnc---'+quoteId);
Quote objOpp = [select id,Pricebook2Id from Quote where Id =:quoteId];

if(objOpp.Pricebook2Id != null){
    PBC.priceBookId = objOpp.Pricebook2Id;
    //   PBC.pricebookName=objOpp.Price_Book__r.Name;
    return JSON.serialize(PBC);
}
else{
    return null;
}
}
@AuraEnabled
public static String saveSelectedPricebook(String selectedPriceBook ,string oppId){
Quote objDeal = [SELECT Id, Pricebook2Id FROM Quote WHERE Id=:oppId];
    if(selectedPriceBook != null){
        objDeal.Pricebook2Id = selectedPriceBook;
        update objDeal;
        system.debug('update pricebook'+objDeal.Pricebook2Id);
        return 'PriceBook saved successfully!';
    }
else{
    return '';
}
}
*/

@AuraEnabled
public static String addOrderProducts(String jsObjoppLineItems, String quoteId) {
    try {
        if (jsObjoppLineItems != null && jsObjoppLineItems != '' && quoteId != null && quoteId != '') {
            list<object> lstoppLineItems = (list<object>) JSON.deserializeUntyped(jsObjoppLineItems);
          //  
//system.debug(m);
          //  List<productWrapper> lstOppLineItemWrapper = (List<productWrapper>) JSON.deserialize(jsObjoppLineItems, List<productWrapper>.class);
            List<Qoute_Line_Items__c> lstOppLineItem = new List<Qoute_Line_Items__c>();

            for (Object objOLIWrap : lstoppLineItems) {
                system.debug(string.valueOf(objOLIWrap));
                Map<String, Object> m = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(objOLIWrap));
                system.debug(m);
              if (m.get('Id') != null && m.get('Id') != '') {
                    Qoute_Line_Items__c objOLI = new Qoute_Line_Items__c();
                    objOLI.Quotes__c = quoteId;
                    objOLI.Product_c__c =  string.valueOf(m.get('Id') );
                    objOLI.Name = string.valueOf(m.get('Name'));
                    objOLI.Quantity__c = integer.valueOf(m.get('Quantity'));
                   objOLI.List_Price__c = integer.valueOf(m.get('List_Price__c'))  ;
                    objOLI.Unit_Price__c = integer.valueOf(m.get('SalesPrice'))  ;
                    
                    objOLI.Discount__c = integer.valueOf(m.get('Discount'))  ;
                    objOLI.Line_Item_Description__c = String.valueOf(m.get('Description'))  ;
                    objOLI.Total_Price__c =  integer.valueOf(m.get('TotalAmount')) ; 
                    objOLI.Net_Amount__c =  integer.valueOf(m.get('NetAmount')); 
                    
                    lstOppLineItem.add(objOLI);
              }
                
            }

            if (!lstOppLineItem.isEmpty()) {
                insert lstOppLineItem;
                return 'success';
            }
        }
        return 'error';
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}



// @AuraEnabled
// public static String addOrderProducts(String jsObjoppLineItems, String quoteId){
// System.debug('jsObjoppLineItems==='+jsObjoppLineItems);
// System.debug('quoteId==='+quoteId);
// try{
    
//     if (jsObjoppLineItems != null && jsObjoppLineItems != '' && quoteId != null && quoteId != '') {
//         List<productWrapper> lstOppLineItemWrapper = (List<productWrapper>)JSON.deserialize(jsObjoppLineItems, List<productWrapper>.class);
//         Quote__c objOpp = [select id from Quote where Id =:quoteId limit 1];
//         set<id> productIdSet = new set<id>();
//     for (productWrapper objOLIWrap : lstOppLineItemWrapper){
//         productIdSet.add(objOLIWrap.id);
//     }
//     // system.debug('objOpp-------'+objOpp.Pricebook2Id+'........'+productIdSet);
//   //  List<PriceBookEntry> priceBookEntryList = [Select Id, Name, Product2Id from PriceBookEntry where Product2Id in:productIdSet and Pricebook2Id =: objOpp.Pricebook2Id];
//   //  system.debug('priceBookEntryList-------------'+priceBookEntryList);
//     // Map<Id,Id> mapProductToPriceBookEntry = new Map<Id,Id>();
//     // for(PriceBookEntry objPBE :priceBookEntryList){
//     //     mapProductToPriceBookEntry.put(objPBE.Product2Id, objPBE.Id);
//     // }
//    // system.debug('mapProductToPriceBookEntry-------'+mapProductToPriceBookEntry);
//         List<Qoute_Line_Items__c> lstOppLineItem = new List<Qoute_Line_Items__c>();
//         system.debug('lstOppLineItem-------'+lstOppLineItem);
//         for (productWrapper objOLIWrap : lstOppLineItemWrapper) {
//             System.debug('objOLIWrap==='+objOLIWrap);
//             if(objOLIWrap.id != null && objOLIWrap.id != '')
//             {
//                 Qoute_Line_Items__c objOLI = new Qoute_Line_Items__c();
//                 objOLI.Quotes__c = quoteId;
//                 objOLI.Name = objOLIWrap.Name;
//               //  objOLI.Is_Free__c = objOLIWrap.IsFree;
//                 // objOLI.Product2Id=objOLIWrap.id;
//                // system.debug('first Check------'+mapProductToPriceBookEntry.containsKey(objOLIWrap.id));
//                 // if(mapProductToPriceBookEntry.containsKey(objOLIWrap.id)){
//                    // objOLI.PricebookEntryId = objOLIWrap.id;
//                 // }
//                 if(objOLIWrap.Quantity != null)
//                     objOLI.Quantity__c	 = objOLIWrap.Quantity;
//                 if(objOLIWrap.UnitPrice != null)
//                     objOLI.UnitPrice = objOLIWrap.ListPrice; 
//                     // if(objOLIWrap.ListPrice != null)
// //objOLI.ListPrice = objOLIWrap.ListPrice;   
//                 if(objOLIWrap.Discount  != null)
//                     objOLI.Discount  = objOLIWrap.Discount ;     
//                 lstOppLineItem.add(objOLI);    
//                 System.debug('lstOppLineItem==='+lstOppLineItem);
//             }
//         }
//         System.debug('lstOppLineItem=='+lstOppLineItem);
//         if(!lstOppLineItem.isEmpty() ){
//             insert lstOppLineItem;
//             System.debug('lstOppLineItem==='+lstOppLineItem);
//             return 'Deal product have saved successfully!';
//         }
//     }
//     return '';
// }catch (Exception e) {
//     throw new AuraHandledException(e.getMessage());
// }
// }

//-----------------

public class productWrapper {
    @AuraEnabled
    public String id { get; set; } // Assuming id is a field in Qoute_Line_Items__c object

    // Define other fields as needed
    @AuraEnabled
    public String Name { get; set; }
    
    @AuraEnabled
    public Decimal Quantity { get; set; }
    
     @AuraEnabled
    public Decimal ListPrice  { get; set; } // Define List_Price__c field
    
    @AuraEnabled
    public Decimal SalesPrice { get; set; } // Define SalesPrice field
    
    @AuraEnabled
    public Decimal Discount { get; set; }
    
    @AuraEnabled
    public String Description { get; set; } // Define Description field
    
    @AuraEnabled
    public Decimal TotalAmount { get; set; } // Define TotalAmount field
    
    @AuraEnabled
    public Decimal NetAmount { get; set; } // Define NetAmount field
}
//--------------------------------


public class priceBookCheckWrapper{
Public String priceBookId;
public string pricebookName;
}

public class MainProductWrapper{
public List<productWrapper> listProductWrapper;
}

// public class productWrapper{
// public string id;
// public Integer serialNumber;
// public string productId;
// public string Name;
// public decimal listprice;
// public decimal UnitPrice;
// public decimal discount;
// public string ProductType;
// public string productDiscription;
// public string ProductCode;
// public Date dateName;
// public Decimal quantity;
// //  public Boolean canBeRemoved;

// }

}