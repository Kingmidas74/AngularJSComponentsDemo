"use strict";

DemoWeb_GUI_Files.service('FileService', function (FilesSettings) {

    
    this.FileExtIsAccept = (ext) => {
        return FilesSettings.AcceptableExtensions.indexOf(ext) > -1;
    }

    this.GetExtensionOfFile = (file) => {
        return (/(?:\.([^.]+))?$/.exec(file.name)[1]);
    }
    
    this.FileIsValid = (file) => {        
        let extension = this.GetExtensionOfFile(file);
        let ext_accept = this.FileExtIsAccept(extension);
        return ext_accept;
    }
	
});