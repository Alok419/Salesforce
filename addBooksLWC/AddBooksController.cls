public with sharing class AddBooksController {
    @AuraEnabled
    public static String addBooks(string VisitId){
        list<Visit_Report__c> lstOfVisit= [select id, Account__c, Account__r.Name, Visit_Report__c.Name from Visit_Report__c where id =:VisitId];
        system.debug('name= '+lstOfVisit[0].Account__r.Name);
        return lstOfVisit[0].Account__r.Name;
    }
}
