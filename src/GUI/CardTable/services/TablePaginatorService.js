"use strict";

DemoWeb_GUI_CardTable.service('TablePaginatorService', function () {

	this.CreatePagesInfo = (elementsLength) => {
        let result = {};
        result.elementsPerPages=[];
        for(let i=0;i<elementsLength;i++) {
            result.elementsPerPages.push({
                id:`${i+1}`,
                label:i+1
            });
        }
        let elementsCount=this.max(elementsLength,50);
        result.elementsPerPage=result.elementsPerPages[elementsCount-1];
        result.currentPage=1;
        result.totalElements = elementsLength;
        return result;
    }

    this.max = (a,b) => {
        if(a<b) return a;
        return b;
    }

    this.ElementInRange = (index,pagesInfo) => {        
        return index+1>=(pagesInfo.currentPage-1)*pagesInfo.elementsPerPage.label+1 && index+1<=pagesInfo.currentPage*pagesInfo.elementsPerPage.label;
    }
});
