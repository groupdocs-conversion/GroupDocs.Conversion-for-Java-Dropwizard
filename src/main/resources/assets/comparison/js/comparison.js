/**
 * GroupDocs.Comparison.JS
 * Copyright (c) 2001-2018 Aspose Pty Ltd
 * Licensed under MIT
 * @author Aspose Pty Ltd
 * @version 1.1.0
 */

/*
******************************************************************
******************************************************************
GLOBAL VARIABLES
******************************************************************
******************************************************************
*/
var applicationPath;
var preloadResultPageCount;
var currentDirectory;
var compareFileMap = {};
var compareFileGuidMap = {};
var compareFileUrlMap = {};
var uploadFilesList = [];
var documentResultGuid;
var extension;
var changedPages;
var resultData = [];
var fileNumber;
var password = '';
var map = {};
var currentPageNumber = 0;
var rewrite;
var multiComparing;
var idx = 0;
// add supported formats
map['folder'] = { 'format': '', 'icon': 'fa-folder' };
map['pdf'] = { 'format': 'Portable Document Format', 'icon': 'fa-file-pdf' };
map['doc'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word' };
map['docx'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word' };
map['docm'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word' };
map['dot'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word' };
map['dotx'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word' };
map['dotm'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word' };
map['xls'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel' };
map['xlsx'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel' };
map['xlsm'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel' };
map['xlsb'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel' };
map['ppt'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint' };
map['pptx'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint' };
map['pps'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint' };
map['ppsx'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint' };
map['vsd'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vdx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vss'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vsx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vst'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vtx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vsdx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vdw'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vstx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['vssx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code' };
map['mpp'] = { 'format': 'Microsoft Project', 'icon': 'fa-file-alt' };
map['mpt'] = { 'format': 'Microsoft Project', 'icon': 'fa-file-alt' };
map['msg'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-alt' };
map['eml'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-alt' };
map['emlx'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-alt' };
map['one'] = { 'format': 'Microsoft OneNote', 'icon': 'fa-file-word' };
map['odt'] = { 'format': 'Open Document Text', 'icon': 'fa-file-word' };
map['ott'] = { 'format': 'Open Document Text Template', 'icon': 'fa-file-word' };
map['ods'] = { 'format': 'Open Document Spreadsheet', 'icon': 'fa-file-excel' };
map['odp'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint' };
map['otp'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint' };
map['ots'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint' };
map['rtf'] = { 'format': 'Rich Text Format', 'icon': 'fa-file-alt' };
map['txt'] = { 'format': 'Plain Text File', 'icon': 'fa-file-alt' };
map['csv'] = { 'format': 'Comma-Separated Values', 'icon': 'fa-file-excel' };
map['html'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word' };
map['mht'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word' };
map['mhtml'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word' };
map['xml'] = { 'format': 'Extensible Markup Language', 'icon': 'fa-file-word' };
map['xps'] = { 'format': 'XML Paper Specification', 'icon': 'fa-file-word' };
map['dxf'] = { 'format': 'AutoCAD Drawing File Format', 'icon': 'fa-file-image' };
map['dwg'] = { 'format': 'AutoCAD Drawing File Format', 'icon': 'fa-file-image' };
map['bmp'] = { 'format': 'Bitmap Picture', 'icon': 'fa-file-image' };
map['gif'] = { 'format': 'Graphics Interchange Format', 'icon': 'fa-file-image' };
map['jpg'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image' };
map['jpe'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image' };
map['jpeg'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image' };
map['jfif'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image' };
map['png'] = { 'format': 'Portable Network Graphics', 'icon': 'fa-file-image' };
map['tiff'] = { 'format': 'Tagged Image File Format', 'icon': 'fa-file-photo' };
map['tif'] = { 'format': 'Tagged Image File Format', 'icon': 'fa-file-photo' };
map['epub'] = { 'format': 'Electronic Publication', 'icon': 'fa-file-pdf' };
map['ico'] = { 'format': 'Windows Icon', 'icon': 'fa-file-image' };
map['webp'] = { 'format': 'Compressed Image', 'icon': 'fa-file-image' };
map['mobi'] = { 'format': 'Mobipocket eBook', 'icon': 'fa-file-pdf' };
map['tex'] = { 'format': 'LaTeX Source Document', 'icon': 'fa-file-pdf' };
map['djvu'] = { 'format': 'Multi-Layer Raster Image', 'icon': 'fa-file-alt' };
map['unknown'] = { 'format': 'This format is not supported', 'icon': 'fa-file' };
var userMouseClick = ('ontouch' in document.documentElement)  ? 'touch click' : 'click';

$(document).ready(function(){

    /*
    ******************************************************************
    NAV BAR CONTROLS
    ******************************************************************
    */
    //////////////////////////////////////////////////
    // Toggle comparison tab
    //////////////////////////////////////////////////
    $('.gd-lbl-toggle').on(userMouseClick, function(e){
        $(".gd-comparison-bar-wrapper").toggleClass("active");
    });

    //////////////////////////////////////////////////
    // Toggle navigation dropdown menus
    //////////////////////////////////////////////////
    $('.gd-nav-toggle').on(userMouseClick, function(e){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
        }else{
            $(this).addClass('open');
        }
        var nav_drop = getElementByClass($(this), '.gd-nav-dropdown');
        toggleNavDropdown(nav_drop);
    });

    //////////////////////////////////////////////////
    // Close modal dialog event
    //////////////////////////////////////////////////
    $('.gd-modal-close-action').on(userMouseClick, closeModal);

    //////////////////////////////////////////////////
    // File or directory click event from file tree
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '.gd-filetree-name', function(e){
        var isDir = $(this).parent().find('.fa-folder').hasClass('fa-folder');
        if(isDir){
            // if directory -> browse
            if(currentDirectory.length > 0){
                currentDirectory = currentDirectory + "/" + $(this).text();
            }else{
                currentDirectory = $(this).text();
            }
            toggleModalDialog(false, '');
            loadFileTree(currentDirectory);
        }else{
            toggleModalDialog(false, '');
            var guid = $(this).attr('data-guid');
            fillFileVariables(fileNumber, '', '', guid);
            addFileForComparing(null, guid, fileNumber);
        }
    });

    //////////////////////////////////////////////////
    // Go to parent directory event from file tree
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '.gd-go-up', function(e){
        if(currentDirectory.length > 0 && currentDirectory.indexOf('/') == -1){
            currentDirectory = '';
        }else{
            currentDirectory = currentDirectory.replace(/\/[^\/]+\/?$/, '');
        }
        loadFileTree(currentDirectory);
    });

    //////////////////////////////////////////////////
    // Download event
    //////////////////////////////////////////////////
    $('#gd-btn-download-all').on(userMouseClick, function(e){
        downloadDocument();
    });

    $('#gd-btn-download-summary').on(userMouseClick, function(e){
        downloadDocument(resultData.length - 1);
    });
    //////////////////////////////////////////////////
    // Select file for upload event
    //////////////////////////////////////////////////
    $('#gd-upload-input-first').on('change', function(e){
        // get selected files
        var input = $(this);
        // add files to the table
        addFileForComparing(input.get(0).files, null, 'first');
    });

    $('#gd-upload-input-second').on('change', function(e){
        // get selected files
        var input = $(this);
        // add files to the table
        addFileForComparing(input.get(0).files, null, 'second');
    });

    //////////////////////////////////////////////////
    // Open first URL input event
    //////////////////////////////////////////////////
    $('#gd-url-button-first').on(userMouseClick, function () {
        $('#gd-url-wrap-first').slideDown('fast');
        $('#gd-url-first').focus();
    });

    //////////////////////////////////////////////////
    // Close first URL input event
    //////////////////////////////////////////////////
    $('#gd-url-cancel-first').on(userMouseClick, function () {
        $('#gd-url-wrap-first').slideUp('fast');
        $('#gd-url-first').val('');
    });

    //////////////////////////////////////////////////
    // Add first file via URL event
    //////////////////////////////////////////////////
    $('#gd-add-url-first').on(userMouseClick, function () {
        var url = $("#gd-url-first").val();
        fillFileVariables('first', '', url, '');
        addFileForComparing(null, url, 'first');
        $('#gd-url-first').val('');
    });

    //////////////////////////////////////////////////
    // Open second URL input event
    //////////////////////////////////////////////////
    $('#gd-url-button-second').on(userMouseClick, function () {
        $('#gd-url-wrap-second').slideDown('fast');
        $('#gd-url-second').focus();
    });

    //////////////////////////////////////////////////
    // Close second URL input event
    //////////////////////////////////////////////////
    $('#gd-url-cancel-second').on(userMouseClick, function () {
        $('#gd-url-wrap-second').slideUp('fast');
        $('#gd-url-second').val('');
    });

    //////////////////////////////////////////////////
    // Add second file via URL event
    //////////////////////////////////////////////////
    $('#gd-add-url-second').on(userMouseClick, function () {
        var url = $("#gd-url-second").val();
        fillFileVariables('second', '', url, '');
        addFileForComparing(null, url, 'second');
        $('#gd-url-second').val('');
    });

    //////////////////////////////////////////////////
    // Print event
    //////////////////////////////////////////////////
    $('#gd-btn-print').on(userMouseClick, function(){
        printResults();
    });

    //////////////////////////////////////////////////
    // Open document button (upload dialog) click
    //////////////////////////////////////////////////
    $('#gd-open-document-first').on(userMouseClick, function(e){
        toggleModalDialog(false, '');
        fileNumber = 'first';
        loadFileTree('');
    });

    $('#gd-open-document-second').on(userMouseClick, function(e){
        toggleModalDialog(false, '');
        fileNumber = 'second';
        loadFileTree('');
    });

    //////////////////////////////////////////////////
    // Submit password button click (password required modal)
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, "#gd-password-submit", function(e){
        password = $('#gd-password-input').val();
        $('#gd-password-input').val('');
        toggleModalDialog(false, '');
    });

    //////////////////////////////////////////////////
    // Click on modal body event (used to change slide in swiper)
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '#gd-modal-content', function(e){
        if(isMobile()){
            if($('#gd-upload-files-table > div').length > 0){
                var swiper = new Swiper('.swiper-container');
                if(typeof swiper.length == 'undefined'){
                    swiper.slideNext();
                    swiper.slidePrev();
                }
                for(var i = 0; i < swiper.length; i++){
                    swiper[i].slideNext();
                    swiper[i].slidePrev();
                }
            }
        }
    });
    //////////////////////////////////////////////////
    // Compare two files event
    //////////////////////////////////////////////////
    $('#gd-btn-compare').on(userMouseClick, function () {
        var context;
        var contentType = 'application/json';
        var data;
        // collect all selected files in arrays
        var filesData = collectFiles();
        // calculate amount of selected files
        var amountOfFiles1 = amountOfFiles(filesData);
        // if multi-compare supports and amount of files more than 2
        if (multiComparing && amountOfFiles1 > 2) {
            data = new FormData();
            $.each(filesData['files'], function (index, elem) {
                data.append("files", elem);
            });
            data.append("passwords", new Blob([JSON.stringify(filesData['passwords'])], { type: "application/json"}));
            data.append("urls", new Blob([JSON.stringify(filesData['urls'])], { type: "application/json"}));
            data.append("paths", new Blob([JSON.stringify(filesData['paths'])], { type: "application/json"}));

            context = 'multiCompare';
            contentType = false;
        } else {
            var firstPass = getPassword('first');
            var secondPass = getPassword('second');
            // paths of files less than 2
            if (mapIsEmpty(compareFileGuidMap)) {
                // urls less than 2
                if (mapIsEmpty(compareFileUrlMap)) {
                    // files less than 2
                    if (mapIsEmpty(compareFileMap)) {
                        // files are 2, but got by different ways
                        if (amountOfFiles1 == 2) {
                            data = new FormData();
                            $.each(filesData['files'], function (index, elem) {
                                data.append("files", elem);
                            });
                            data.append("passwords", new Blob([JSON.stringify(filesData['passwords'])], { type: "application/json"}));
                            data.append("urls", new Blob([JSON.stringify(filesData['urls'])], { type: "application/json"}));
                            data.append("paths", new Blob([JSON.stringify(filesData['paths'])], { type: "application/json"}));

                            context = 'compare';
                            contentType = false;
                        } else { // files are less than 2
                            printMessage("Select files for comparing first!");
                            return;
                        }
                    } else { // files are 2 for comparing
                        data = new FormData();
                        data.append("firstFile", compareFileMap['first']);
                        data.append("secondFile", compareFileMap['second']);
                        data.append("firstPassword", firstPass);
                        data.append("secondPassword", secondPass);
                        context = 'compareFiles';
                        contentType = false;
                    }
                } else { // urls are 2, compare with urls
                    data = JSON.stringify({
                        firstPath: compareFileUrlMap['first'],
                        secondPath: compareFileUrlMap['second'],
                        firstPassword: firstPass,
                        secondPassword: secondPass
                    });
                    context = 'compareWithUrls';
                }
            } else {// paths are 2, compare with paths
                data = JSON.stringify({
                    firstPath: compareFileGuidMap['first'],
                    secondPath: compareFileGuidMap['second'],
                    firstPassword: firstPass,
                    secondPassword: secondPass
                });
                context = 'compareWithPaths';
            }
        }
        // clear previous results
        clearResultsContents();
        // show loading spinner
        $('#gd-compare-spinner').show();
        // send compare
        $.ajax({
            type: 'POST',
            url: getApplicationPath(context),
            data: data,
            contentType: contentType,
            processData: false,
            success: function (returnedData) {
                if (returnedData.message != undefined) {
                    // open error popup
                    printMessage(returnedData.message);
                    return;
                }
                // hide loading spinner
                $('#gd-compare-spinner').hide();
                documentResultGuid = returnedData.guid;
                extension = returnedData.extension;
                $.each(returnedData.pages, function (index, elem) {
                    changedPages = elem.page;
                });
                var totalPageNumber = returnedData.pages.length;
                // append changes
                $.each(returnedData.pages, function (index, elem) {
                    var pageNumber = index;

                    // append empty page
                    $('#gd-panzoom').append(
                        '<div id="gd-page-' + pageNumber + '" class="gd-page" class="gd-page">' +
                        '<div class="gd-page-spinner"><i class="fa fa-circle-o-notch fa-spin"></i> &nbsp;Loading... Please wait.</div>' +
                        '</div>'
                    );
                    // save page data
                    resultData.push({pageNumber: pageNumber, pageGuid: elem});
                    setZoomValue(getZoomValue());
                });
                var counter = preloadResultPageCount;
                // check pre-load page number is bigger than total pages number
                if (preloadResultPageCount > totalPageNumber) {
                    counter = totalPageNumber;
                }
                // get page according to the pre-load page number
                for (var i = 0; i < counter; i++) {
                    // render page
                    appendHtmlContent(i, resultData[i].pageGuid);
                }

                // hide delete file icon
                $('#gd-cancel-button-first').hide();
                $('#gd-cancel-button-second').hide();
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.message);
                // hide loading spinner
                $('#gd-compare-spinner').hide();
                // open error popup
                printMessage(err.message);
            }
        });
    });
    //////////////////////////////////////////////////
    // Clean current comparison results
    //////////////////////////////////////////////////
    $('#gd-btn-clean-compare').on(userMouseClick, function () {
        clearFilesRows('first');
        clearFilesRows('second');
        clearAndShowSelection('first');
        clearAndShowSelection('second');
        for (var i = 0; i < idx; i++) {
            var prefix = 'idx' + i;
            clearFilesRows(prefix);
            clearAndShowSelection(prefix);
        }
        clearResultsContents();
    });

    //////////////////////////////////////////////////
    // Zoom values event
    //////////////////////////////////////////////////
    $('#gd-btn-zoom-value > li').bind(userMouseClick, function(e){
        var zoomValue = $(this).text();
        switch(zoomValue){
            case 'Fit Width':
                // get page width
                var pageWidth = $('.gd-page').width();
                // get screen width
                var screenWidth = $('#gd-pages').width();
                // get scale ratio
                var scale = (pageWidth / screenWidth) * 100;
                // set values
                zoomValue = 200 - scale;
                break;
            case 'Fit Height':
                // get page height
                var pageHeight = $('.gd-page').height();
                // get screen height
                var screenHeight = $('#gd-pages').height();
                // get scale ratio
                var scale = (screenHeight / pageHeight) * 100;
                // set values
                zoomValue = scale;
                break;
            default:
                zoomValue = zoomValue.slice(0, -1);
                break;
        }
        setZoomValue(zoomValue);
    });

    //////////////////////////////////////////////////
    // Zoom in event
    //////////////////////////////////////////////////
    $('#gd-btn-zoom-in').on(userMouseClick, function(e){
        var zoom_val = getZoomValue();
        if(zoom_val < 490){
            zoom_val = zoom_val + 10;
        }
        setZoomValue(zoom_val);
    });

    //////////////////////////////////////////////////
    // Zoom out event
    //////////////////////////////////////////////////
    $('#gd-btn-zoom-out').on(userMouseClick, function(e){
        var zoom_val = getZoomValue();
        if(zoom_val > 30){
            zoom_val = zoom_val - 10;
        }
        setZoomValue(zoom_val);
    });

    //////////////////////////////////////////////////
    // Page scrolling event
    //////////////////////////////////////////////////
    var previousScroll = 0;
    $('#gd-pages').scroll(function() {
        // get last page number
        var lastPageNumber = resultData.length;
        // get zoom value
        var zoomValue = getZoomValue()/100;
        var pagePosition = 0;
        // get scroll direction
        var scrollDown = true;
        var currentScroll = $(this).scrollTop();
        if (currentScroll > previousScroll) {
            pagePosition = currentPageNumber + 1;
        } else {
            pagePosition = currentPageNumber - 1;
            scrollDown = false;
        }
        // set scroll direction
        previousScroll = currentScroll;
        // check if page is visible in the view port more than 50%
        if($('#gd-page-' + pagePosition).isOnScreen(0.5, 0.5)){
            // load next page
            // to set correct page size we use global array resultData which contains all info about current document
            if(preloadResultPageCount > 0) {
                // if scroll down load next page
                var resultDataPrev = resultData[pagePosition == 0 ? 0 : pagePosition - 1];
                if(scrollDown){
                    if(pagePosition < lastPageNumber) {
                        var resultDatum = resultData[pagePosition];
                        appendHtmlContent(pagePosition, resultDatum.pageGuid);
                    } else if(pagePosition == lastPageNumber) {
                        appendHtmlContent(pagePosition - 1, resultDataPrev.pageGuid);
                    }
                } else {
                    // if scroll up load previous page
                    if(currentPageNumber >= 0) {
                        appendHtmlContent(currentPageNumber, resultDataPrev.pageGuid);
                    }
                }
            }
            if (pagePosition >= 0 && pagePosition < lastPageNumber) {
                currentPageNumber = pagePosition;
            }
        }
    });

    //////////////////////////////////////////////////
    // Open modal dialog (file upload) event
    //////////////////////////////////////////////////
    $('#gd-btn-upload').on(userMouseClick, function(e){
        toggleModalDialog(true, 'Upload Document', getHtmlUploadForModal());
        var dropZone = $('#gd-dropZone');
        if (typeof dropZone[0] != "undefined") {
            //Drag n drop functional
            if ($('#gd-dropZone').length) {
                if (typeof (window.FileReader) == 'undefined') {
                    dropZone.text("Your browser doesn't support Drag and Drop");
                    dropZone.addClass('error');
                }
            }

            dropZone[0].ondragover = function () {
                dropZone.addClass('hover');
                return false;
            };

            dropZone[0].ondragleave = function () {
                dropZone.removeClass('hover');
                return false;
            };

            dropZone[0].ondrop = function (event) {
                event.preventDefault();
                dropZone.removeClass('hover');
                var files = event.dataTransfer.files;
                addFileForUploading(files);
            };
        }
    });
    //////////////////////////////////////////////////
    // Cancel file upload event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, ".gd-cancel-button", function(e){
        // get selected files
        var button = $(this);
        // get file name which will be deleted
        var fileName = button.closest("div").parent().parent().find("div.gd-file-name")[0].innerHTML;
        // find its index in the array
        for(var i = 0; i < uploadFilesList.length; i++){
            if(uploadFilesList[i].name == fileName){
                // remove file from the files array
                uploadFilesList.splice(i, 1);
            }
        }
        // remove table row
        button.closest('div').parent().parent().parent().remove();
        $('#gd-upload-input').val('');
        // recalculate indexes in the files table
        var tableRows = $('#gd-upload-files-table > div');
        for(var n = 0; n < tableRows.length; n++){
            $(tableRows[n]).find('div.gd-pregress').attr('id', 'gd-pregress-bar-' + n);
            $(tableRows[n]).find("div.gd-upload-complete").attr('id', 'gd-upload-complete-' + n);
            $(tableRows[n]).find("div.gd-upload-complete-fail").attr('id', 'gd-upload-failure-' + n);
        }
        // if table is empty disable upload button
        if(tableRows.length == 0){
            $('#gd-upload-button').prop('disabled', true);
        }
    });

    //////////////////////////////////////////////////
    // Upload event
    //////////////////////////////////////////////////
    $(".gd-modal-body").on(userMouseClick, '#gd-upload-button', function(e){
        // get current number of table rows
        var tableRows = $('#gd-upload-files-table > div');
        // initiate URL counter required for proper calculating of the uploaded files in case local files uploaded with URLs
        var urlCounter = 0;
        // upload file one by one
        for (var i = 0; i < tableRows.length; i++) {
            // check if current table row contains URL instead of file
            if($(tableRows[i]).find("div[data-value]").length > 0) {
                // upload URL
                uploadDocument(null, i, $(tableRows[i]).find("div.gd-filetree-name").data().value);
                // increase URL counter
                urlCounter++;
            } else {
                // check if the current file already uploaded
                var isUploaded = $(tableRows[i]).find("div.gd-filetree-name").data().uploaded;
                if(!isUploaded){
                    // upload local file
                    uploadDocument(uploadFilesList[i - urlCounter], i);
                    // mark file as uploaded
                    $(tableRows[i]).find("div.gd-filetree-name").data().uploaded = true;
                } else {
                    continue;
                }
            }
        }
    });

    //////////////////////////////////////////////////
    // Open URL input event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '#gd-url-button', function () {
        $('#gd-url-wrap').slideDown('fast');
        $('#gd-url').focus();
    });

    //////////////////////////////////////////////////
    // Close URL input event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '#gd-url-cancel', function () {
        $('#gd-url-wrap').slideUp('fast');
        $('#gd-url').val('');
    });

    //////////////////////////////////////////////////
    // Add file via URL event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '#gd-add-url', function () {
        addFileForUploading(null, $("#gd-url").val());
        $('#gd-url').val('');
    });

    //////////////////////////////////////////////////
    // Select files for upload event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on('change', '#gd-upload-input', function(e){
        // get selected files
        var input = $(this);
        // add files to the table
        addFileForUploading(input.get(0).files);
    });

    //////////////////////////////////////////////////
    // Open document button (upload dialog) click
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '#gd-open-document', function(e){
        toggleModalDialog(false, '');
        loadFileTree('');
    });

    $('#gd-add-file-multicompare').on(userMouseClick, function(e){
        var prefix = 'idx' + idx;
        var newDragnDrop = getHtmlDragAndDropArea(prefix)
        $(newDragnDrop).insertBefore("#gd-add-multicompare");
        initDropZone(prefix);
        initCloseButton(prefix);
        $('#gd-upload-input-' + prefix).on('change', function(e){
            // get selected files
            var input = $(this);
            // add files to the table
            addFileForComparing(input.get(0).files, null, prefix);
        });
        $('#gd-url-button-' + prefix).on(userMouseClick, function () {
            $('#gd-url-wrap-' + prefix).slideDown('fast');
            $('#gd-url-' + prefix).focus();
        });
        $('#gd-url-cancel-' + prefix).on(userMouseClick, function () {
            $('#gd-url-wrap-' + prefix).slideUp('fast');
            $('#gd-url-' + prefix).val('');
        });
        $('#gd-add-url-' + prefix).on(userMouseClick, function () {
            var url = $("#gd-url-" + prefix).val();
            fillFileVariables(prefix, '', url, '');
            addFileForComparing(null, url, prefix);
            $('#gd-url-' + prefix).val('');
        });
        $('#gd-open-document-' + prefix).on(userMouseClick, function(e){
            toggleModalDialog(false, '');
            fileNumber = prefix;
            loadFileTree('');
        });
        idx = idx + 1;
    });
    //
    // END of document ready function
});

/*
******************************************************************
FUNCTIONS
******************************************************************
*/

/**
 * Checks map with 'first' and 'second' files
 */
function mapIsEmpty(amap) {
    if (amap) {
        if (amap['first'] == null || amap['first'] == undefined || amap['first'] == ''
            || amap['second'] == null || amap['second'] == undefined || amap['second'] == '') {

            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

/**
 * Append html content to an empty page
 * @param {int} pageNumber - page number
 * @param {string} path - document guid, path to the file
 */
function appendHtmlContent(pageNumber, path) {
    // initialize data
    var gd_page = $('#gd-page-' + pageNumber);

    if (!gd_page.hasClass('loaded')) {
        gd_page.addClass('loaded');
        // get document description
        var data = {path: path};
        $.ajax({
            type: 'POST',
            url: getApplicationPath('loadResultPage'),
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (htmlData) {
                if (htmlData.error != undefined) {
                    // open error popup
                    printMessage(htmlData.error);
                    return;
                }

                gd_page.find('.gd-page-spinner').hide();

                // append page image, in image mode append occurred after setting the size to avoid zero size usage
                gd_page.append('<div class="gd-wrapper">' +
                    '<image class="gd-page-image" src="data:image/png;base64,' + htmlData.data + '" alt></image>' +
                    '</div>');
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.message);
                // open error popup
                printMessage(err.error);
            }
        });
    }
}

/**
 * Get the value of password for file
 * @param prefix for specifying the file
 * @returns password
 */
function getPassword(prefix) {
    return $('#gd-password-input-' + prefix).val();
}

/**
 * Fill files for comparing
 * @param fileMap
 * @param prefix
 * @param res
 * @param passwords
 */
function transformInternal(fileMap, prefix, res, passwords) {
    if (fileMap[prefix]) {
        res.push(fileMap[prefix]);
        passwords.push(getPassword(prefix));
    }
}

/**
 * Transform files for comparing
 * @param fileMap
 * @param res
 * @param passwords
 */
function transform(fileMap, res, passwords) {
    if (passwords) {
        transformInternal(fileMap, 'first', res, passwords);
        transformInternal(fileMap, 'second', res, passwords);
    } else {
        transformToObj(fileMap, 'first', res);
        transformToObj(fileMap, 'second', res);
    }
}

/**
 * Transform to object into list
 * @param fileMap
 * @param prefix
 * @param res
 */
function transformToObj(fileMap, prefix, res) {
    if (fileMap[prefix]) {
        res.push({file: fileMap[prefix], password: getPassword(prefix)});
    }
}

/**
 * Collect and prepare files for compare
 *
 * @returns object with files, passwords, urls, paths prepared for compare
 */
function collectFiles() {
    var files = [];
    var passwords = [];
    var urls = [];
    var paths = [];
    transform(compareFileMap, files, passwords);
    transform(compareFileGuidMap, paths, null);
    transform(compareFileUrlMap, urls, null);
    for (var i = 0; i < idx; i++) {
        var prefix = 'idx' + i;
        // fill files and passwords
        transformInternal(compareFileMap, prefix, files, passwords);
        // fill paths by objects with path to file and password
        transformToObj(compareFileGuidMap, prefix, paths);
        // fill urls by objects with url to file and password
        transformToObj(compareFileUrlMap, prefix, urls);
    }

    return {"files": files, "passwords": passwords, "urls": urls, "paths": paths};
}

/**
 * Returns amount of selected files
 * @param filesData
 * @returns
 */
function amountOfFiles(filesData) {
    return filesData['files'].length + filesData['urls'].length + filesData['paths'].length;
}


/**
 * Zoom document
 * @param {int} zoom_val - zoom value from 0 to 100
 */
function setZoomValue(zoom_val){
    // adapt value for css
    var zoom_val_non_webkit = zoom_val / 100;
    var zoom_val_webkit = Math.round(zoom_val) + '%';
    // display zoom value
    setNavigationZoomValues(zoom_val_webkit);
    // set css zoom values
    var style = [
        'zoom: ' + zoom_val_webkit,
        'zoom: ' + zoom_val_non_webkit, // for non webkit browsers
        '-moz-transform: (' + zoom_val_non_webkit + ', ' + zoom_val_non_webkit + ')' // for mozilla browser
    ].join(';');
    // add style
    $('#gd-panzoom').attr('style', style);
}

/**
 * Get currently set zoom value
 */
function getZoomValue(){
    return parseInt($('#gd-zoom-value').text().slice(0, -1));
}

/**
 * Clear all result data from previously comparing
 */
function clearResultsContents() {
    // set zoom to default
    setZoomValue(100);
    // clear result variables
    documentResultGuid = '';
    extension = '';
    changedPages = [];
    resultData = [];
    currentPageNumber = 0;
    // clear passwords
    $('#gd-password-input-first').val('');
    $('#gd-password-input-second').val('');
    for (var i = 0; i < idx; i++) {
        var prefix = 'idx' + i;
        $('#gd-password-input-' + prefix).val('');
    }
    // hide spinner
    $('#gd-compare-spinner').hide();
    // remove previously rendered results pages
    $('#gd-panzoom').html('');
    // go to top
    $('#gd-pages').scrollTo(0, {
        duration: 0
    });
}

/**
 * Set zoom values on navigation panel
 * @param {int} value - zoom value from 0 to 100
 */
function setNavigationZoomValues(value){
    $('#gd-zoom-value').text(value);
}

/**
 * Get HTML content for upload modal
 **/
function getHtmlUploadForModal(){
    // upload section
    var uploadSection = '<section id="gd-upload-section" class="tab-slider-body">'+
        '<div class="gd-drag-n-drop-wrap" id="gd-dropZone">'+
        '<div class="gd-drag-n-drop-icon"><i class="fa fa-cloud-download-alt fa-5x" aria-hidden="true"></i></div>'+
        '<h2>Drag &amp; Drop your files here</h2>'+
        '<h4>OR</h4>'+
        '<div class="gd-drag-n-drop-buttons">'+
        '<label class="btn btn-primary">'+
        '<i class="fa fa-file"></i>'+
        'SELECT FILE'+
        '<input id="gd-upload-input" type="file" multiple style="display: none;">'+
        '</label>'+
        '<label class="btn" id="gd-url-button">'+
        '<i class="fa fa-link"></i>'+
        'URL'+
        '</label>'+
        '</div>'+
        '</div>'+
        '<div class="inner-addon left-addon btn gd-url-wrap" id="gd-url-wrap" style="display: none;">'+
        '<input type="url" class="form-control" id="gd-url" placeholder="Enter your file URL">'+
        '<button class="btn" id="gd-url-cancel"><i class="fa fa-trash"></i></button>'+
        '<button class="btn btn-primary" id="gd-add-url">Add</button>'+
        '</div>'+
        '<div id="gd-upload-files-table">'+
        // list of files
        '</div>'+
        '<button id="gd-upload-button" type="button" class="btn btn-success" disabled>Upload</button>'+
        '<button id="gd-open-document" type="button" class="btn">Browse files</button>'+
        '</section>';
    return uploadSection;
}

/**
 * Load file tree
 * @param {string} dir - files location directory
 */
function loadFileTree(dir) {
    var data = {path: dir};
    currentDirectory = dir;
    // show loading spinner
    $('#gd-modal-spinner').show();
    // get data
    $.ajax({
        type: 'POST',
        url: getApplicationPath('loadFileTree'),
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(returnedData) {
            if(returnedData.message != undefined){
                // open error popup
                printMessage(returnedData.message);
                return;
            }
            // assembly modal html
            $('.gd-modal-body').html(''); // clear previous data
            toggleModalDialog(true, "Open Document", getHtmlFileBrowser());
            // hide loading spinner
            $('#gd-modal-spinner').hide();
            // append files to tree list
            $.each(returnedData, function(index, elem){
                // document name
                var name = elem.name;
                // document guid
                var guid = elem.guid;
                // document size
                var size = elem.size;
                // convert to proper size
                var new_size = size + ' Bytes';
                if((size / 1024 / 1024) > 1){
                    new_size = (Math.round((size / 1024 / 1024) * 100) / 100) + ' MB';
                }else if((size / 1024) > 1){
                    new_size = (Math.round((size / 1024) * 100) / 100) + ' KB';
                }
                // document format
                var documentFormat = getDocumentFormat(name, elem.isDirectory);
                var docFormat = (documentFormat == undefined)? 'fa-folder' : documentFormat;
                // append document
                $('.gd-modal-table tbody').append(
                    '<tr>'+
                    '<td><i class="fas ' + docFormat.icon + '"></i></td>'+
                    '<td class="gd-filetree-name" data-guid="' + guid + '"><div class="gd-file-name">' + name + '</div></td>'+
                    '<td>' + docFormat.format + '</td>'+
                    '<td>' + new_size + '</td>'+
                    '</tr>');
            });
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            console.log(err.message);
            // hide loading spinner
            $('#gd-modal-spinner').hide();
            // open error popup
            printMessage(err.message);
        }
    });
}

/**
 * Get document format (type)
 * @param {string} filename - document name
 * @param {boolean} isDirectory - define if the current element is directory or file
 */
function getDocumentFormat(filename, isDirectory){
    if(!isDirectory){
        if(typeof map[filename.split('.').pop().toLowerCase()] == "undefined"){
            if(filename.split('.').length > 1){
                return map["unknown"];
            } else {
                return map["folder"];
            }
        } else {
            return map[filename.split('.').pop().toLowerCase()];
        }
    } else {
        return map["folder"];
    }
}

/**
 * Get application path for GET/POST requests
 * @param {string} context - application context
 */
function getApplicationPath(context){
    if(applicationPath != null){
        if(applicationPath.slice(-1) == '/'){
            return applicationPath + context;
        }else{
            return applicationPath + "/" + context;
        }
    }else{
        return context;
    }
}

/**
 * Search for element by class (recursive)
 * @param {object} target - object where to search for an id
 * @param {string} class_id - class id
 */
function getElementByClass(target, class_id){
    var elem = target.find(class_id);
    if(!elem.hasClass(class_id.slice(1))){
        return getElementByClass(target.parent(), class_id);
    }else{
        return elem;
    }
}

/**
 * Toggle modal dialog
 * @param {boolean} open - open/close value
 * @param {string} title - title to display in modal dialog (popup)
 */
function toggleModalDialog(open, title, content){
    if(open){
        $('#modalDialog .gd-modal-title').text(title);
        $('#modalDialog')
            .css('opacity', 0)
            .fadeIn('fast')
            .animate(
                { opacity: 1 },
                { queue: false, duration: 'fast' }
            );
        $('#modalDialog').addClass('in');
        $(".gd-modal-body").append(content);
    }else{
        $('#modalDialog').removeClass('in');
        $('#modalDialog')
            .css('opacity', 1)
            .fadeIn('fast')
            .animate(
                { opacity: 0 },
                { queue: false, duration: 'fast' }
            )
            .css('display', 'none');
        $(".gd-modal-body").html('');
    }
}

/**
 * Clear all data from previously loaded document
 * @param {string} message - message to display in popup
 */
function printMessage(message){
    var content = '<div id="gd-modal-error">' + message + '</div>';
    toggleModalDialog(true, 'Error', content);
}

/**
 * Download result
 * @param {index} page number, if undefined, then download all results file
 */
function downloadDocument(index) {
    if(documentResultGuid != "" && typeof documentResultGuid != "undefined") {
        var extensionParam = "&ext=" + extension;
        var imageExtParam = "&ext=jpg";
        var params = index ? "&index=" + index + imageExtParam : extensionParam;
        // Open download dialog
        window.location.assign(getApplicationPath('downloadDocument/?guid=') + documentResultGuid + params);
    } else {
        // open error popup
        printMessage("Please compare documents first");
    }
}

/**
 * Add file to the upload list
 * @param {file[]} uploadFiles - Files array for uploading
 * @param {string} url - URL of the file
 */
function addFileForUploading(uploadFiles, url) {
    // get table in which files will be added
    var table = $("#gd-upload-files-table");
    // get current count of table rows
    var tableRowsNumber = $('#gd-upload-files-table > div').length;

    if(url){
        // append URL
        table.append('<div class="swiper-container">'+
                '<div class="swiper-wrapper">'+
                    '<div class="swiper-slide">'+
                        '<i class="fa ' + getDocumentFormat(url.split('/').pop()).icon + '"></i>'+
                        '<div class="gd-filetree-name" data-uploaded="false" data-value="' + url + '">'+
                            '<div class="gd-file-name">' + url.split('/').pop() + '</div>'+
                            '<span id="gd-upload-size"> type: ' + url.split('/').pop().split('.').pop() +'</span>'+
                        '</div>'+
                        '<div id="gd-pregress-bar-' + tableRowsNumber + '" class="gd-pregress p0 small green gd-upload-status">'+
                            '<div class="slice">'+
                                '<div class="bar"></div>'+
                                '<div class="fill"></div>'+
                            '</div>'+
                        '</div>'+
                        '<div id="gd-upload-complete-' + tableRowsNumber + '" class="gd-upload-complete gd-upload-status"><i class="fa fa-check-circle"></i></div>'+
                        '<div id="gd-upload-failure-' + tableRowsNumber + '" class="gd-upload-complete-fail gd-upload-status"><i class="fa fa-exclamation-circle"></i></div>'+
                    '</div>'+
                    '<div class="swiper-slide gd-desktop swiper-slide-cancel">'+
                        '<div class="files-table-remove">'+
                            '<button class="btn gd-cancel-button"><i class="fa fa-trash"></i></button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>');
        // increase table rows counter after adding new record
        tableRowsNumber++
    } else {
        // append files
        $.each(uploadFiles, function(index, file){
            uploadFilesList.push(file);
            // document format
            var docFormat = getDocumentFormat(file.name);
            // convert to proper size
            var new_size = file.size + ' Bytes';
            if((file.size / 1024 / 1024) > 1){
                new_size = (Math.round((file.size / 1024 / 1024) * 100) / 100) + ' MB';
            }else if((file.size / 1024) > 1){
                new_size = (Math.round((file.size / 1024) * 100) / 100) + ' KB';
            }
            // append document
            table.append('<div class="swiper-container">'+
                            '<div class="swiper-wrapper">'+
                                '<div class="swiper-slide">'+
                                    '<i class="fa ' + docFormat.icon + '"></i>'+
                                    '<div class="gd-filetree-name" data-uploaded="false">'+
                                        '<div class="gd-file-name">' + file.name + '</div>'+
                                        '<span id="gd-upload-size">size: ' + new_size +'</span>'+
                                        '<span id="gd-upload-size"> type: ' + file.name.split('.').pop() +'</span>'+
                                    '</div>'+
                                    '<div id="gd-pregress-bar-' + tableRowsNumber + '" class="gd-pregress p0 small green gd-upload-status">'+
                                        '<div class="slice">'+
                                            '<div class="bar"></div>'+
                                            '<div class="fill"></div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div id="gd-upload-complete-' + tableRowsNumber + '" class="gd-upload-complete gd-upload-status"><i class="fa fa-check-circle"></i></div>'+
                                    '<div id="gd-upload-failure-' + tableRowsNumber + '" class="gd-upload-complete-fail gd-upload-status"><i class="fa fa-exclamation-circle"></i></div>'+
                                '</div>'+
                                '<div class="swiper-slide gd-desktop swiper-slide-cancel">'+
                                    '<div class="files-table-remove">'+
                                        '<button class="btn gd-cancel-button"><i class="fa fa-trash"></i> Remove</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
            // increase table rows counter after adding new record
            tableRowsNumber++
        });
    }
    $("#gd-upload-button").prop("disabled", false);
    if(isMobile()){
        $.each($(".swiper-slide"), function(index, slide){
            $(slide).removeClass("gd-desktop");
        });
        //initialize swiper when document ready
        var swiper = new Swiper ('.swiper-container');
    } else {
        $.each($(".swiper-slide"), function(index, slide){
            $(slide).removeClass("swiper-slide-cancel");
        });
    }
}

/**
 * Close modal
 */
function closeModal(){
    // remove all files from the upload list
    uploadFilesList = [];
    var tableRows = $('#gd-upload-files-table > div');
    for(var n = 0; n < tableRows.length; n++){
        $(tableRows[n]).remove();
    }
    $("#gd-upload-input").val('');
    toggleModalDialog(false, '');
}

/**
 * Clear results and show selection files
 *
 * @param prefix 'first' or 'second' file
 */
function clearAndShowSelection(prefix) {
    // remove file from the files array
    fillFileVariables(prefix, '', '', '');
    $('#gd-upload-input-' + prefix).val('');
    $('#gd-open-document-' + prefix).show();
    $("#gd-dropZone-" + prefix).show();
}

/**
 * Clear table with selected files
 * @param prefix 'first' or 'second' file
 */
function clearFilesRows(prefix) {
    var tableRows = $('#gd-upload-files-table-' + prefix + ' > div');
    for(var n = 0; n < tableRows.length; n++){
        $(tableRows[n]).remove();
    }
}

/**
 * Add file to the upload list
 * @param {file[]} uploadFiles - Files array for uploading
 * @param {string} url - URL of the file
 */
function addFileForComparing(uploadFiles, url, prefix) {
    // get table in which files will be added
    var table = $("#gd-upload-files-table-" + prefix);

    if(url){
        // append URL
        table.append('<div class="swiper-container" id="swiper-container-' + prefix + '">'+
            '<div class="swiper-wrapper">'+
            '<div class="swiper-slide swiper-slide-comparison">'+
            '<i class="fas gd-upload-files-table-i ' + getDocumentFormat(url.split('/').pop()).icon + '"></i>'+
            '<div class="gd-filetree-name-compare" data-uploaded="false" data-value="' + url.split(/[\\\/]/).pop() + '">'+
            '<div class="gd-file-name" id="gd-file-name-' + prefix + '">' + url.split(/[\\\/]/).pop() + '</div>'+
            '<span id="gd-upload-size"> type: ' + url.split('/').pop().split('.').pop() +'</span>'+
            '</div>'+
            '<div class="inner-addon left-addon btn gd-password-wrap" id="gd-password-wrap-' + prefix + '">'+
            '<input type="password" class="form-control" id="gd-password-input-' + prefix + '" placeholder="Enter password">'+
            '</div>'+
            '</div>'+
            '<div class="swiper-slide gd-desktop swiper-slide-cancel">'+
            '<div class="files-table-remove">'+
            '<button class="btn gd-cancel-button" id="gd-cancel-button-' + prefix + '"><i class="fas fa-trash"></i></button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>');
        $('#gd-url-wrap-' + prefix).slideUp('fast');
        $('#gd-url-' + prefix).val('');
    } else {
        // append files
        $.each(uploadFiles, function(index, file){
            fillFileVariables(prefix, file, '', '');
            // document format
            var docFormat = getDocumentFormat(file.name);
            // convert to proper size
            var new_size = file.size + ' Bytes';
            if((file.size / 1024 / 1024) > 1) {
                new_size = (Math.round((file.size / 1024 / 1024) * 100) / 100) + ' MB';
            } else if((file.size / 1024) > 1){
                new_size = (Math.round((file.size / 1024) * 100) / 100) + ' KB';
            }
            // append document
            table.append('<div class="swiper-container" id="swiper-container-' + prefix + '">'+
                '<div class="swiper-wrapper">'+
                '<div class="swiper-slide swiper-slide-comparison">'+
                '<i class="fas gd-upload-files-table-i ' + docFormat.icon + '"></i>'+
                '<div class="gd-filetree-name-compare" data-uploaded="false">'+
                '<div class="gd-file-name" id="gd-file-name-' + prefix + '">' + file.name + '</div>'+
                '<span id="gd-upload-size">size: ' + new_size +'</span>'+
                '<span id="gd-upload-size"> type: ' + file.name.split('.').pop() +'</span>'+
                '</div>'+
                '<div class="inner-addon left-addon btn gd-password-wrap" id="gd-password-wrap-' + prefix + '">'+
                '<input type="password" class="form-control" id="gd-password-input-' + prefix + '" placeholder="Enter password">'+
                '</div>'+
                '</div>'+
                '<div class="swiper-slide gd-desktop swiper-slide-cancel">'+
                '<div class="files-table-remove">'+
                '<button class="btn gd-cancel-button" id="gd-cancel-button-' + prefix + '"><i class="fas fa-trash"></i> Remove</button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>');
        });
    }

    $('#gd-cancel-button-' + prefix).on(userMouseClick, function() {
        // get selected files
        var button = $(this);
        // remove table row
        button.closest('div').parent().parent().parent().remove();

        clearAndShowSelection(prefix);
    });

    $("#gd-dropZone-" + prefix).hide();

    $("#gd-open-document-" + prefix).hide();
    if(isMobile()){
        $.each($(".swiper-slide"), function(index, slide){
            $(slide).removeClass("gd-desktop");
        });
        //initialize swiper when document ready
        var swiper = new Swiper ('.swiper-container');
    } else {
        $.each($(".swiper-slide"), function(index, slide){
            $(slide).removeClass("swiper-slide-cancel");
        });
    }
}

/**
 * Fill variables with data of first or second files
 *
 * @param prefix 'first' or 'second'
 * @param file file data
 * @param url url to file
 * @param path path to file
 */
function fillFileVariables(prefix, file, url, path) {
    compareFileMap[prefix] = file;
    compareFileGuidMap[prefix] = path;
    compareFileUrlMap[prefix] = url;
}

/**
 * Upload document
 * @param {file} file - File for uploading
 * @param {int} index - Number of the file to upload
 * @param {string} url - URL of the file, set it if URL used instead of file
 */
function uploadDocument(file, index, url = ''){
    // prepare form data for uploading
    var formData = new FormData();
    // add local file for uploading
    formData.append("file", file);
    // add URL if set
    formData.append("url", url);
    formData.append("rewrite", rewrite);
    $.ajax({
        // callback function which updates upload progress bar
        xhr: function()
        {
            var xhr = new window.XMLHttpRequest();
            // upload progress
            xhr.upload.addEventListener("progress", function(event){
                if (event.lengthComputable) {
                    $(".gd-modal-close-action").off(userMouseClick);
                    $("#gd-open-document").prop("disabled", true);
                    // increase progress
                    $("#gd-pregress-bar-" + index).addClass("p"+ Math.round(event.loaded / event.total * 100));
                    if(event.loaded == event.total){
                        $("#gd-pregress-bar-" + index).fadeOut();
                        $("#gd-upload-complete-" + index).fadeIn();
                        $('.gd-modal-close-action').on(userMouseClick, closeModal);
                        $("#gd-open-document").prop("disabled", false);
                    }
                }
            }, false);
            return xhr;
        },
        type: 'POST',
        url: getApplicationPath('uploadDocument'),
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(returnedData) {
            if(returnedData.message != undefined){
                // open error popup
                printMessage(returnedData.message);
                $("#gd-upload-complete-" + index).fadeOut();
                $("#gd-upload-failure-" + index).fadeIn();
                return;
            }
        },
        error: function(xhr, status, error) {
            if (xhr && xhr.responseText) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.message);
                // open error popup
                printMessage(err.message);
            }
            $("#gd-upload-complete-" + index).fadeOut();
            $("#gd-upload-failure-" + index).fadeIn();
        }
    });
}

    /**
     * Print results
     */
    function printResults(){
        // get current document content
        var documentContainer = $("#gd-panzoom");
        // force each document page to be printed as a new page
        var cssPrint = '<style>'+
            '@media print'+
            '{.gd-wrapper {page-break-after:always;}';
        // set correct page orientation if page were rotated
        documentContainer.find(".gd-page").each(function(index, page) {
            if($(page).css("transform") != "none"){
                cssPrint = cssPrint + "#" + $(page).attr("id") + "{transform: rotate(0deg) !important;}";
            }
        });
        cssPrint = cssPrint + '}</style>';
        // open print dialog
        var windowObject = window.open('', "PrintWindow", "width=750,height=650,top=50,left=50,toolbars=yes,scrollbars=yes,status=yes,resizable=yes");
        // add current document into the print window
        windowObject.document.writeln(cssPrint);
        // add current document into the print window
        windowObject.document.writeln(documentContainer[0].innerHTML);
        windowObject.document.close();
        windowObject.focus();
        windowObject.print();
        windowObject.close();
    }

    /**
     * Close modal
     */
    function closeModal(){
        toggleModalDialog(false, '');
    }

    /**
     * Get HTML content for file browser modal
     **/
    function getHtmlFileBrowser(){
        return '<section id="gd-browse-section" class="tab-slider-body">'+
            '<div id="gd-modal-spinner"><i class="fas fa-circle-notch fa-spin"></i> &nbsp;Loading... Please wait.</div>'+
            '<table id="gd-modal-filebroswer" class="gd-modal-table">'+
            '<thead>'+
            '<tr>'+
            '<th class="col-md-1"> </th>'+
            '<th class="col-md-5">Document</th>'+
            '<th class="col-md-3">Format</th>'+
            '<th class="col-md-3">Size</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td class="text-center gd-go-up"><i class="fas fa-level-up"></i></td>'+
            '<td class="gd-filetree-up gd-go-up">...</td>'+
            '<td></td>'+
            '<td></td>'+
            '</tr>' +
        // list of files
        '</tbody>'+
        '</table>'+
        '</section>';
    }

    /**
     * Get HTML content for drag and drop area
     **/
    function getHtmlDragAndDropArea(prefix){
        // close icon for multi comparing
        var close = '';
        if (prefix && prefix.startsWith('idx')) {
            close = '<div class="gd-close-dad-area" id="gd-close-dad-area-' + prefix + '"> <i class="fas fa-window-close"></i></div>';
        }

        // drag and drop section
        var htmlSection = '<section id="gd-upload-section-' + prefix + '" class="tab-slider-body">'+
                            close +
                            '<div class="gd-drag-n-drop-wrap-compare" id="gd-dropZone-' + prefix + '">'+
                                '<div class="gd-drag-n-drop-icon"><i class="fas fa-cloud-download-alt fa-5x" aria-hidden="true"></i></div>'+
                                '<h2>Drag &amp; Drop the ' + replacePrefix(prefix) + ' file here</h2>'+
                                '<h4>OR</h4>'+
                                '<div class="gd-drag-n-drop-buttons">'+
                                    '<label class="btn btn-primary gd-upload-section-label">'+
                                        '<i class="fas fa-file"></i>'+
                                        'SELECT FILE'+
                                        '<input id="gd-upload-input-' + prefix + '" type="file" multiple style="display: none;">'+
                                    '</label>'+
                                    '<label class="btn gd-upload-section-label" id="gd-url-button-' + prefix + '">'+
                                        '<i class="fas fa-link"></i>'+
                                        'URL'+
                                    '</label>'+
                                '</div>'+
                                 '<div class="gd-browse-document gd-modal-buttons" id="gd-open-document-' + prefix + '">'+
                                    '<i class="fas fa-folder-open"></i>BROWSE files'+
                                '</div>'+
                            '</div>'+
            '<div class="inner-addon left-addon btn gd-url-wrap" id="gd-url-wrap-' + prefix + '" style="display: none;">'+
                '<input type="url" class="form-control" id="gd-url-' + prefix + '" placeholder="Enter your file URL">'+
                '<button class="btn gd-url-cancel" id="gd-url-cancel-' + prefix + '"><i class="fas fa-trash"></i></button>'+
                '<button class="btn btn-primary gd-add-url" id="gd-add-url-' + prefix + '">Add</button>'+
            '</div>'+
            '<div id="gd-upload-files-table-' + prefix + '" class="gd-upload-files-table-idx">'+
            // list of files
            '</div>'+
            '</section>';
        return htmlSection;
    }

    /**
     * Replace prefix for file more than second
     *
     * @param prefix
     * @returns 'first', 'second' for 1, 2. After 2 returns 'next'
     */
    function replacePrefix(prefix) {
        if (prefix == 'first' || prefix == 'second') {
            return prefix;
        }
        return 'next';
    }

    /**
     * Toggle top navigation menus zoom
     * @param {object} target - dropdown target to be opened/closed
     */
    function toggleNavDropdown(target){
        var isOpened = target.hasClass('opened');
        if(!isOpened){
            $(target).addClass('opened');
            $(target)
                .css('opacity', 0)
                .slideDown('fast')
                .animate(
                    { opacity: 1 },
                    { queue: false, duration: 'fast' }
                );
        }else{
            $(target).removeClass('opened');
            $(target)
                .css('opacity', 1)
                .slideUp('fast')
                .animate(
                    { opacity: 0 },
                    { queue: false, duration: 'fast' }
                );
        }
    }

    /**
     * Init remove button for selection area
     * @param prefix - prefix for selection area
     */
    function initCloseButton(prefix) {
        $('#gd-close-dad-area-' + prefix).on(userMouseClick, function(e) {
            fillFileVariables(prefix, '', '', '');
            $('#gd-upload-section-' + prefix).remove();
        });
    }

    /**
     * Init drop zone for file selection area
     * @param prefix - prefix for selection area
     */
    function initDropZone(prefix) {
        var dropZone = $('#gd-dropZone-' + prefix);
        if (typeof dropZone[0] != "undefined") {
            //Drag n drop functional
            if ($('#gd-dropZone-' + prefix).length) {
                if (typeof (window.FileReader) == 'undefined') {
                    dropZone.text("Your browser doesn't support Drag and Drop");
                    dropZone.addClass('error');
                }
            }

            dropZone[0].ondragover = function (event) {
                event.stopPropagation();
                event.preventDefault();
                dropZone.addClass('hover');
                return false;
            };

            dropZone[0].ondragleave = function (event) {
                event.stopPropagation();
                event.preventDefault();
                dropZone.removeClass('hover');
                return false;
            };

            dropZone[0].ondrop = function (event) {
                event.stopPropagation();
                event.preventDefault();
                dropZone.removeClass('hover');
                var files = event.dataTransfer.files;
                addFileForComparing(files, null, prefix);
            };
        }
    }

    /*
    ******************************************************************
    ******************************************************************
    GROUPDOCS.COMAPRISON PLUGIN
    ******************************************************************
    ******************************************************************
    */
    (function( $ ) {
        /*
        ******************************************************************
        STATIC VALUES
        ******************************************************************
        */
        var gd_navbar = '#gd-navbar';

        /*
        ******************************************************************
        METHODS
        ******************************************************************
        */
        var methods = {
            init : function( options ) {
                // set defaults
                var defaults = {
                    applicationPath: null,
                    preloadResultPageCount: 1,
                    zoom : true,
                    download: true,
                    upload: true,
                    print: true,
                    rewrite: true,
                    multiComparing: false
                };
                options = $.extend(defaults, options);

                // set global option params
                applicationPath = options.applicationPath;
                preloadResultPageCount = options.preloadResultPageCount;
                rewrite = options.rewrite;
                multiComparing = options.multiComparing;

                // assembly html base
                this.append(getHtmlBase);
                this.append(getHtmlModalDialog);

                $(gd_navbar).append(getHtmlComparisonPanel);
                $(gd_navbar).append(getHtmlNavSplitter);

                // assembly nav bar
                if(options.download){
                    $(gd_navbar).append(getHtmlNavDownloadPanel);
                    $(gd_navbar).append(getHtmlNavSplitter);
                }
                if(options.upload){
                    $(gd_navbar).append(getHtmlNavUploadPanel);
                    $(gd_navbar).append(getHtmlNavSplitter);
                }
                if(options.print){
                    $(gd_navbar).append(getHtmlNavPrintPanel);
                    $(gd_navbar).append(getHtmlNavSplitter);
                }
                if(options.zoom){
                    $(gd_navbar).append(getHtmlNavZoomPanel);
                    $(gd_navbar).append(getHtmlNavSplitter);
                }

                initDropZone('first');
                initDropZone('second');

            }
        };

        /*
        ******************************************************************
        INIT PLUGIN
        ******************************************************************
        */
        $.fn.comparison = function( method ) {
            if ( methods[method] ) {
                return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method' +  method + ' does not exist on jQuery.comparison' );
            }
        };

        /*
        ******************************************************************
        HTML MARKUP
        ******************************************************************
        */
        function getHtmlComparisonPanel(){
            return '<li id="gd-btn-compare" class="gd-btn-compare">'+
                '<span id="gd-compare-value">' +
                '<i class="fas fa-book-open"></i>'+
                '<span class="gd-tooltip">Compare</span>'+
                '</span>'+
                '</li>'+
                '<li id="gd-btn-clean-compare" class="gd-btn-clean-compare">'+
                '<span id="gd-clean-compare">' +
                '<i class="fas fa-trash-alt"></i>'+
                '<span class="gd-tooltip">Clean comparing</span>'+
                '</span>'+
                '</li>';
        }

        function getHtmlBase(){
            return '<div id="gd-container">'+
                    '<div class="wrapper">'+
                        // header BEGIN
                        '<div id="gd-header">'+
                            '<div id="gd-header-logo"></div>'+

                            // nav bar BEGIN
                            '<ul id="' + gd_navbar.slice(1) + '">'+
                                // nav bar content
                            '</ul>'+
                            // nav bar END
                        '</div>'+
                        // header END
                        '<div class="gd-comparison-bar-wrapper active">'+
                            '<input id="gd-comparison-toggle" class="gd-comparison-toggle" type="checkbox" />'+
					        '<label for="gd-comparison-toggle" class="gd-lbl-toggle"></label>'+
                            '<div id="gd-select-compare-files">'+
                                '<div id="gd-files-blocks" class="gd-files-blocks">'+
                                    getHtmlDragAndDropArea('first') + getHtmlDragAndDropArea('second') +  getHtmlMultiCompare() +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        // pages BEGIN
                        '<div id="gd-pages">'+
                            '<div id="gd-compare-spinner" style="display: none;"><i class="fas fa-circle-notch fa-spin"></i> &nbsp;Comparing... Please wait.</div>'+
                            '<div id="gd-panzoom">'+
                                // list of pages
                            '</div>'+
                        '</div>'+
                        // pages END
                    '</div>'+
                '</div>';
        }

        function getHtmlMultiCompare() {
            if (multiComparing) {
                return '<section id="gd-add-multicompare" >'+
                    '<div id="gd-add-file-multicompare" class="gd-add-file-multicompare">' +
                    '<i class="fas fa-plus-circle"></i>' +
                    '</div>' +
                    '</section>';
            } else {
                return '';
            }
        }

        function getHtmlModalDialog(){
            return 	'<div class="gd-modal fade" id="modalDialog">'+
                        '<div class="gd-modal-dialog">'+
                            '<div class="gd-modal-content" id="gd-modal-content">'+
                                // header
                                '<div class="gd-modal-header">'+
                                    '<div class="gd-modal-close gd-modal-close-action"><span>x</span></div>'+
                                    '<h4 class="gd-modal-title"></h4>'+
                                '</div>'+
                                // body
                                '<div class="gd-modal-body">'+
                                    // modal content will be here
                                '</div>'+
                                // footer
                                '<div class="gd-modal-footer">'+
                                // empty footer
                                '</div>'+
                            '</div><!-- /.modal-content -->'+
                        '</div><!-- /.modal-dialog -->'+
                '</div>';
        }

        function getHtmlNavSplitter(){
            return '<li class="gd-nav-separator" role="separator"></li>';
        }

        function getHtmlNavDownloadPanel() {
            return '<li class="gd-nav-toggle" id="gd-download-val-container">'+
                '<span id="gd-download-value">' +
                '<i class="fa fa-download"></i>' +
                '<span class="gd-tooltip">Download</span>' +
                '</span>'+
                '<span class="gd-nav-caret"></span>'+
                '<ul class="gd-nav-dropdown-menu gd-nav-dropdown" id="gd-btn-download-value">'+
                    '<li id="gd-btn-download-all">Download All Results</li>' +
                    '<li id="gd-btn-download-summary">Download Summary</li>' +
                '</ul>'+
                '</li>';
        }

        function getHtmlNavPrintPanel(){
            return '<li id="gd-btn-print"><i class="fas fa-print"></i><span class="gd-tooltip">Print</span></li>';
        }

        function getHtmlNavUploadPanel(){
            return '<li id="gd-btn-upload"><i class="fas fa-upload"></i><span class="gd-tooltip">Upload</span></li>';
        }

        function getHtmlNavZoomPanel(){
            return '<li class="gd-nav-toggle" id="gd-zoom-val-container">'+
                '<span id="gd-zoom-value">100%</span>'+
                '<span class="gd-nav-caret"></span>'+
                '<ul class="gd-nav-dropdown-menu gd-nav-dropdown" id="gd-btn-zoom-value">'+
                '<li>25%</li>'+
                '<li>50%</li>'+
                '<li>100%</li>'+
                '<li>150%</li>'+
                '<li>200%</li>'+
                '<li>300%</li>'+
                '<li role="separator" class="gd-nav-dropdown-menu-separator"></li>'+
                '<li>Fit Width</li>'+
                '<li>Fit Height</li>'+
                '</ul>'+
                '</li>'+
                '<li id="gd-btn-zoom-in">'+
                '<i class="fa fa-search-plus"></i>'+
                '<span class="gd-tooltip">Zoom In</span>'+
                '</li>'+
                '<li id="gd-btn-zoom-out">'+
                '<i class="fa fa-search-minus"></i>'+
                '<span class="gd-tooltip">Zoom Out</span>'+
                '</li>';
        }

    })(jQuery);

    /*
    ******************************************************************
    ******************************************************************
    JQUERY SCROLL TO PLUGIN
    ******************************************************************
    ******************************************************************
    */
    $.fn.scrollTo = function( target, options, callback ){
        if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
        var settings = $.extend({
            scrollTarget : target,
            offsetTop    : 50,
            duration     : 500,
            zoom         : 100,
            easing       : 'swing'
        }, options);
        return this.each(function(){
            var scrollPane = $(this);
            var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
            if(typeof settings.scrollTarget != "number"){
                var scrollYTop = scrollTarget.offset().top * settings.zoom / 100;
            }
            var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollYTop + scrollPane.scrollTop() - parseInt(settings.offsetTop);
            scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
                if (typeof callback == 'function') {
                    callback.call(this);
                }
            });
        });
    }

    /*
    ******************************************************************
    ******************************************************************
    JQUERY CHECK IF IN VIEWPORT PLUGIN
    ******************************************************************
    ******************************************************************
    */
    $.fn.isOnScreen = function(x, y){

        if(x == null || typeof x == 'undefined') x = 1;
        if(y == null || typeof y == 'undefined') y = 1;

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var height = this.outerHeight();
        var width = this.outerWidth();

        if(!width || !height){
            return false;
        }

        var bounds = this.offset();
        bounds.right = bounds.left + width;
        bounds.bottom = bounds.top + height;

        var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

        if(!visible){
            return false;
        }

        var deltas = {
            top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
            bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
            left : Math.min(1, ( bounds.right - viewport.left ) / width),
            right : Math.min(1, ( viewport.right - bounds.left ) / width)
        };

        return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
    };

    /*
    ******************************************************************
    ******************************************************************
    CHECK IF MOBILE
    ******************************************************************
    ******************************************************************
    */
    var isMobile = function(){
        return 'ontouchstart' in window // works on most browsers
            || 'onmsgesturechange' in window; // works on ie10
    };