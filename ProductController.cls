public with sharing class ProductController {

@AuraEnabled
public static List<Product__c> getProductList(String productType) {
    if(productType != null ) {
        return [SELECT Name, Size__c, Core__c, Units__c,Description__c, Product_Type__c,Quanity__c ,List_Price__c   FROM Product__c WHERE Product_Type__c = :productType ];
    }
    return null;
}


@AuraEnabled
public static List<Product__c> getProductListSearchable(String productType,string searchValue) {
    String searchString = '%' + searchValue + '%';
    if(productType != null ) {
        system.debug('===>'+ [SELECT Name, Size__c, Core__c, Units__c,Description__c, Product_Type__c,Quanity__c ,List_Price__c  	 FROM Product__c WHERE Product_Type__c = :productType AND Product__c.Name LIKE :searchString]);
        return [SELECT  Name, Size__c, Core__c, Units__c,Description__c, Product_Type__c ,Quanity__c  ,List_Price__c	 FROM Product__c WHERE Product_Type__c = :productType AND ( Product__c.Name LIKE : searchString OR Product__c.Core__c LIKE : searchString)];
    }
    return null;
}
}
