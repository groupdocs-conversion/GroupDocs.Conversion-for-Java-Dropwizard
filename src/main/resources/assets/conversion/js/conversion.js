/**
 * GroupDocs.Conversion.JS
 * Copyright (c) 2001-2018 Aspose Pty Ltd
 * Licensed under MIT
 * @author Aspose Pty Ltd
 * @version 1.0.0
 */

/*
******************************************************************
******************************************************************
GLOBAL VARIABLES
******************************************************************
******************************************************************
*/
var applicationPath;
var currentDirectory;
var rewrite;
var download;
var allConvertionTypes = [];
var conversionQueue = [];
var userMouseClick = ('ontouch' in document.documentElement) ? 'touch click' : 'click';

$(document).ready(function () {

    /*
    ******************************************************************
    NAV BAR CONTROLS
    ******************************************************************
    */

    //////////////////////////////////////////////////
    // Hide default download button
    //////////////////////////////////////////////////
    $("#gd-btn-download").remove();
    $(".gd-nav-separator").remove();

    //////////////////////////////////////////////////
    // Disable default file browse click event
    //////////////////////////////////////////////////
    $("#gd-btn-browse").off(userMouseClick);

    //////////////////////////////////////////////////
    // Disable file click event
    //////////////////////////////////////////////////
    $('.gd-modal-body').off(userMouseClick, '.gd-filetree-name');

    //////////////////////////////////////////////////
    // Disable dafault upload
    //////////////////////////////////////////////////
    $('.gd-modal-body').off('change', '#gd-upload-input');

    //////////////////////////////////////////////////
    // Disable dafault URL upload
    //////////////////////////////////////////////////
    $('.gd-modal-body').off(userMouseClick, '#gd-add-url');

    //////////////////////////////////////////////////
    // Disable dafault go up event
    //////////////////////////////////////////////////
    $('.gd-modal-body').off(userMouseClick, '.gd-go-up');

    //////////////////////////////////////////////////
    // Open folder
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '.gd-filetree-name', function (e) {
        var isDir = $(this).parent().find('.fa-folder').hasClass('fa-folder');
        if (isDir) {
            // if directory -> browse
            if (currentDirectory.length > 0) {
                currentDirectory = currentDirectory + "/" + $(this).text();
            } else {
                currentDirectory = $(this).text();
            }
            toggleModalDialog(false, '');
            loadFiles(currentDirectory);
        }
    });

    //////////////////////////////////////////////////
    // Go to parent directory event from file tree
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '.gd-go-up', function (e) {
        if (currentDirectory.length > 0 && currentDirectory.indexOf('/') == -1) {
            currentDirectory = '';
        } else {
            currentDirectory = currentDirectory.replace(/\/[^\/]+\/?$/, '');
        }
        loadFiles(currentDirectory);
    });

    //////////////////////////////////////////////////
    // Select files for conversion upload event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on('change', '#gd-upload-input', function (e) {
        // get selected files
        $("#gd-upload-input-checkbox").prop("checked", false);
        var input = $(this);
        $.each(input.get(0).files, function (index, file) {
            uploadForConversion(file);
        });
    });

    //////////////////////////////////////////////////
    // Add file via URL conversion event
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, '#gd-add-url', function () {
        $('#gd-url-wrap').hide();
        uploadForConversion(null, $("#gd-url").val());
        $('#gd-url').val('');
    });

    //////////////////////////////////////////////////
    // Open file browse modal
    //////////////////////////////////////////////////
    $("#gd-btn-browse").on(userMouseClick, function () {
        loadFiles('');
    });

    //////////////////////////////////////////////////
    // Open / close conversion types drop-down single
    //////////////////////////////////////////////////
    $('#modalDialog').on(userMouseClick, function (event) {
        if ($(event.target).hasClass("fa-plus") && !$(event.target).parent().hasClass("active")) {
            event.preventDefault();
            $("#modalDialog").find(".gd-conversion-input").prop("checked", false);
            $("#modalDialog").find(".gd-conversions.active").removeClass("active");
            $(event.target).parent().find(".gd-conversion-input").prop("checked", true);
            $(event.target).parent().addClass("active");
			if($(".gd-modal-dialog").height() <= event.pageY){
				$(".gd-conversion-input:checked + .gd-conversion-menu").css("top", "-182px");
			} else {
				$(".gd-conversion-input:checked + .gd-conversion-menu").css("top", "-21px");
			}
            return;
        }
        if (event.target.tagName != "LABEL" && event.target.tagName != "LI") {
            $(event.target).parent().find(".gd-conversion-input").prop("checked", false);
            $("#modalDialog").find(".gd-conversions.active").removeClass("active");
        }
    });

    //////////////////////////////////////////////////
    // Open / close conversion types drop-down multiple
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, ".gd-add-selected.active", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(e.target).find(".gd-conversion-input").prop("checked", true);
    });

    //////////////////////////////////////////////////
    // Check all files and add all conversion types drop-down
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, ".gd-select-all", function () {
        var checked = false;
        ($(".gd-checkbox").prop('checked')) ? checked = true : checked = false;
        $(".gd-checkbox").prop('checked', checked);
        if (!checked) {
            $(".gd-add-selected .gd-conversions").remove();
        }
        guids = [];
        $.each($(".gd-filetree-name"), function (index, fileName) {
            if (!~getDocumentFormat($(fileName).data("guid")).format.indexOf("not supported")) {
                guids.push($(fileName).data("guid"));
            }
        });
        var addSelectedInnerHtml = "";
        if ($(".gd-checkbox:checked").length > 0) {
            $(".gd-add-selected").addClass("active");
            addSelectedInnerHtml = 'Add ' + guids.length + ' selected';
        } else {
            $(".gd-add-selected").removeClass("active");
            addSelectedInnerHtml = 'Add selected';
        }
        $($(".gd-add-selected label")[0]).html(addSelectedInnerHtml);
        var types = prepareMultipleConversionTypes();
        var dropDownHtml = getConversionTypesHtml(types, true, "");
        $(".gd-add-selected").append(dropDownHtml);
        // init custom tooltips for warnings
        $('.gd-type-warning').tooltipster({
            side: 'right',
            theme: 'gd-conversion-tooltip'
        });
    });

    //////////////////////////////////////////////////
    // Check single file and add conversion types drop-down
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, ".gd-file-checkbox", function (event) {
        guids = [];
        $(".gd-add-selected .gd-conversions").remove();
        $.each($(".gd-filetree-name"), function (index, fileName) {
            if (!~getDocumentFormat($(fileName).data("guid")).format.indexOf("not supported")) {
                if ($(fileName).parent().find(".gd-checkbox").prop("checked")) {
                    guids.push($(fileName).data("guid"));
                }
            }
        });
        var addSelectedInnerHtml = "";
        var checked = false;
        if ($(".gd-checkbox:checked").length > 0) {
            $(".gd-add-selected").addClass("active");
            addSelectedInnerHtml = 'Add ' + guids.length + ' selected';
            checked = true;
        } else {
            $(".gd-add-selected").removeClass("active");
            addSelectedInnerHtml = 'Add selected';
            checked = false;
        }

        $($(".gd-add-selected label")[0]).html(addSelectedInnerHtml);
        $(".gd-select-all").prop("checked", false);
        if (checked) {
            var types = prepareMultipleConversionTypes();
            var dropDownHtml = getConversionTypesHtml(types, true, "");
            $(".gd-add-selected").append(dropDownHtml);
            // init custom tooltips for warnings
            $('.gd-type-warning').tooltipster({
                side: 'right',
                theme: 'gd-conversion-tooltip'
            });
        }
    });

    //////////////////////////////////////////////////
    // Add files to conversion queue
    //////////////////////////////////////////////////
    $('.gd-modal-body').on(userMouseClick, ".gd-conversion-menu li", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".gd-conversion-input").prop("checked", false);
        var type = "";
        var guid = "";
        switch (e.target.tagName) {
            case "DIV":
                type = $(e.target).html();
                $(e.target).parent().parent().hasClass("multiple") ? "" : guid = $(e.target).parent().parent().parent().parent().data("guid");
                break;
            case "I":
                type = $(e.target).parent().find(".gd-type").html();
                $(e.target).parent().parent().hasClass("multiple") ? "" : guid = $(e.target).parent().parent().data("guid");
                break;
            case "LI":
                type = $(e.target).find(".gd-type").html();
                $(e.target).parent().hasClass("multiple") ? "" : guid = $(e.target).parent().parent().parent().data("guid");
                break;
        }
        addToQueue(type, guid);
        toggleModalDialog(false);
    });

    //////////////////////////////////////////////////
    // remove file from queue
    //////////////////////////////////////////////////
    $('#gd-panzoom').on(userMouseClick, ".gd-convert-remove", function (e) {
        var conversionItemTarget = $(e.target).parent().parent().find(".gd-filequeue-name")[1];
        var destinationGuid = $(conversionItemTarget).data("guid");
        conversionQueue = $.grep(conversionQueue, function (value) {
            return value.guid.replace(/^.*[\\\/]/, '').split('.')[0] + "." + value.destinationType != destinationGuid.replace(/^.*[\\\/]/, '');
        });
        $(e.target).parent().parent().remove();
        if (conversionQueue.length == 0 && $(".gd-convert-item").length == 0) {
            $("#gd-convert-area").show();
            $("#gd-convert-queue").hide();
        }
    });

    //////////////////////////////////////////////////
    // Convert single file
    //////////////////////////////////////////////////
    $('#gd-panzoom').on(userMouseClick, ".gd-convert-single", function (e) {
        var conversionItemSource = $(e.target).parent().parent().find(".gd-filequeue-name")[0];
        var conversionItemTarget = $(e.target).parent().parent().find(".gd-filequeue-name")[1];
        var guid = $(conversionItemSource).data("guid");
        var destinationGuid = $(conversionItemTarget).data("guid");
        $.each(conversionQueue, function (index, file) {
            if (file.guid == guid && file.destinationType == destinationGuid.split(".").pop()) {
                convert(file);
            }
        });
    });

    //////////////////////////////////////////////////
    // Download converted
    //////////////////////////////////////////////////
    $('#gd-panzoom').on(userMouseClick, ".gd-download-single", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (download) {
            documentGuid = $(e.target).parent().parent().find(".gd-destination-file").data("guid").replace(/\\/g, "/").split("/").pop();
            downloadDocument();
        }
    });

    initiConversionDropZone();

    if (isMobile()) {
        showMobileMenu();
    }
});

function initiConversionDropZone() {
    var dropZone = $('.gd-conversion-drop');
    if (typeof dropZone[0] != "undefined") {
        //Drag n drop functional
        if ($('.gd-conversion-drop').length) {
            if (typeof (window.FileReader) == 'undefined') {
                dropZone.text("Your browser doesn't support Drag and Drop");
                dropZone.addClass('error');
            }
        }

        $("#gd-panzoom").on("dragover", function () {
            dropZone.show();
            return false;
        });

        dropZone[0].ondragleave = function () {
            dropZone.hide();
            return false;
        };

        dropZone[0].ondrop = function (event) {
            event.preventDefault();
            var files = event.dataTransfer.files;
            $.each(files, function (index, file) {
                uploadForConversion(file);
            });
            dropZone.hide();
        };
    }
}

/**
* Add slected file into the conversion queue
* @param {string} destinationType - destination file type
* @param {string} guid - file guid
*/
function addToQueue(destinationType, guid) {
    if (guid) {
        // if guid is set we search for the specified file in the files table
        $.each($(".gd-file-table-item"), function (index, fileItem) {
            var fileName = $(fileItem).find(".gd-filetree-name");
            // prepare conversion item object
            if ($(fileName).data("guid") == guid) {
                var conversionItem = {
                    guid: guid,
                    destinationType: destinationType,
                    size: $(fileItem).find(".gd-file-size").html(),
                    added: false
                };
                // add file to queue
                conversionQueue.push(conversionItem);
            }
        });
    } else {
        // if guid is not set add all checked files to the queue
        $.each($(".gd-file-table-item"), function (index, fileItem) {
            var checkbox = $(fileItem).find(".gd-checkbox");
            if ($(checkbox).prop("checked")) {
                var conversionItem = {
                    guid: $(checkbox).parent().parent().find(".gd-filetree-name").data("guid"),
                    destinationType: destinationType,
                    size: $(fileItem).find(".gd-file-size").html(),
                    added: false
                };
                conversionQueue.push(conversionItem);
            }
        });
    }
    // add files queue to the main viewport area
    var queueHtml = getQueueHtml();
    $("#gd-convert-area").hide();
    $("#gd-convert-queue").show();
    $("#gd-convert-queue").append(queueHtml);
    $("#gd-btn-convert-all").hasClass("active") ? "" : $("#gd-btn-convert-all").addClass("active");
    $("#gd-btn-convert-all").on(userMouseClick, convertAll);
}

/**
* Get HTMl of the conversion queue item for the main area
*/
function getQueueHtml() {
    var html = "";
    $.each(conversionQueue, function (index, file) {
        if (!file.added) {    
            html = html + getQueueItemHtml(file);
            file.added = true;
        }
    });
    return html;

}

function getQueueItemHtml(file) {
    var item = "";
    var docFormat = getDocumentFormat(file.guid.split('.').pop());
    var extension = file.guid.replace(/^.*\./, '');
    var destinationGuid = file.guid.replace(extension, file.destinationType);
    var destinationFileName = destinationGuid.replace(/^.*[\\\/]/, '');
    if (isMobile()) {
        item = '<div class="gd-convert-item">' +
                    '<div class="gd-convert-remove">' +
                        '<span>×</span>' +
                    '</div>' +
                    '<div class="gd-filequeue-name" data-guid="' + file.guid + '">' +
                        '<i class="fa ' + docFormat.icon + '"></i>' +
                        '<div class="gd-file-name gd-queue-name">' + file.guid.replace(/^.*[\\\/]/, '') +
                            '<div class="gd-filequeue-name gd-destination-file" data-guid="' + destinationGuid + '">' +
                                '<i class="fa fa-arrow-right"></i>' +
                                '<i class="fa ' + getDocumentFormat(file.destinationType).icon + '"></i>' +
                                '<div class="gd-file-name gd-queue-name">' + destinationFileName + '</div>'+
                            '</div>' +
                        '</div>' +
                    '</div>' +      
                    '<i class="gd-convert-progress fa fa-circle-o-notch fa-spin"></i>' +
                    '<div class="gd-convert-single"><i class="fas fa-exchange-alt"></i></div>' +
                    '<div class="gd-download-single"><i class="fas fa-download"></i></div>' +
                '</div>';
    } else {
        item = '<div class="gd-convert-item">' +
                    '<div class="gd-convert-remove">' +
                        '<span>×</span>' +
                    '</div>' +
                    '<div class="gd-filequeue-name disabled" data-guid="' + file.guid + '">' +
                        '<i class="fa ' + docFormat.icon + '"></i>' +
                        '<div class="gd-file-name gd-queue-name">' + file.guid.replace(/^.*[\\\/]/, '') +
                            '<div class="gd-file-format">' + docFormat.format + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="gd-file-size gd-queue-size">' + file.size + '</div>' +
                    '<div class="gd-convert-status">' +
                        '<i class="far fa-clock gd-conversion-pending"></i>' +
                        '<i class="fas fa-check gd-conversion-complite"></i>' +
                        '<i class="gd-convert-progress fa fa-circle-o-notch fa-spin"></i>' +
                    '</div>' +
                    '<div class="gd-filequeue-name disabled gd-destination-file" data-guid="' + destinationGuid + '">' +
                        '<i class="fa ' + getDocumentFormat(file.destinationType).icon + '"></i>' +
                        '<div class="gd-file-name gd-queue-name">' + destinationFileName +
                            '<div class="gd-file-format">' + getDocumentFormat(file.destinationType).format + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="gd-convert-single"><i class="fas fa-exchange-alt"></i></div>' +
                    '<div class="gd-download-single"><i class="fas fa-download"></i></div>' +
                '</div>';
    }
    return item;
}

/**
* Upload document
* @param {file} file - File for uploading
* @param {string} url - URL of the file, set it if URL used instead of file
*/
function uploadForConversion(file, url) {
    // prepare form data for uploading
    var formData = new FormData();
    // add local file for uploading
    formData.append("file", file);
    // add URL if set
    if (typeof url != "undefined" && url != null) {
        formData.append("url", url);
    }
    formData.append("rewrite", rewrite);
    $.ajax({
        // callback function which updates upload progress bar
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            // upload progress
            xhr.upload.addEventListener("progress", function (event) {
                if (event.lengthComputable) {
                    $(".gd-modal-close-action").off('click');
                    $("#gd-open-document").prop("disabled", true);
                    if (event.loaded == event.total) {
                        $('.gd-modal-close-action').on('click', closeModal);
                        $("#gd-open-document").prop("disabled", false);
                        loadFiles("");
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
        success: function (returnedData) {
            if (returnedData.message != undefined) {
                // open error popup
                printMessage(returnedData.message);
                return;
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            console.log(err.Message);
            // open error popup
            printMessage(err.message);
        }
    });
}

/**
* Load file tree
* @param {string} dir - files location directory
*/
function loadFiles(dir) {
    var data = { path: dir };
    currentDirectory = dir;
    // clear previously entered password
    clearPassword();
    // show loading spinner
    $('#gd-modal-spinner').show();
    // get data
    $.ajax({
        type: 'POST',
        url: getApplicationPath('loadFileTree'),
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (returnedData) {
            if (returnedData.message != undefined) {
                // open error popup
                printMessage(returnedData.message);
                return;
            }
            // assembly modal html
            $('.gd-modal-body').html(''); // clear previous data
            toggleModalDialog(true, "Open Document", getHtmlFileBrowser(true));
            initDragNDrop(uploadForConversion);
            // hide loading spinner
            $('#gd-modal-spinner').hide();
            // append files to tree list
            $.each(returnedData, function (index, elem) {
                // document name
                var name = elem.name;
                // document guid
                var guid = elem.guid;
                // document size
                var size = elem.size;
                // convert to proper size
                var new_size = size + ' Bytes';
                if ((size / 1024 / 1024) > 1) {
                    new_size = (Math.round((size / 1024 / 1024) * 100) / 100) + ' MB';
                } else if ((size / 1024) > 1) {
                    new_size = (Math.round((size / 1024) * 100) / 100) + ' KB';
                }
                // document format
                var docFormat = (getDocumentFormat(name, elem.isDirectory) == undefined) ? 'fa-folder' : getDocumentFormat(name, elem.isDirectory);
                var folderClass = (docFormat.format == "") ? "gd-folder-name" : "";
                var checkBoxes = "";
                if (elem.isDirectory) {
                    checkBoxes = '<div class="gd-file-checkbox empty"></div>';
                } else {
                    checkBoxes = '<div class="gd-file-checkbox"><input type="checkbox" id="' + name + '" name="' + name + '" class="gd-checkbox gd-checkbox-single"></div>';
                }
                var conversionTypes = getConversionTypesHtml(elem.conversionTypes, false, guid);
                // append document
                $('.gd-modal-table-body').append(
                    '<div class="gd-file-table-item">' +
                    checkBoxes +
                    '<div class="gd-filetree-name" data-guid="' + guid + '">' +
                    '<i class="fa ' + docFormat.icon + '"></i>' +
                    '<div class="gd-file-name ' + folderClass + '">' + name +
                    '<div class="gd-file-format">' + docFormat.format + '</div>' +
                    '</div>' +
                    '</div >' +
                    '<div class="gd-file-size">' + new_size + '</div>' +
                    conversionTypes +
                    '</div>');
            });
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            console.log(err.Message);
            // hide loading spinner
            $('#gd-modal-spinner').hide();
            // open error popup
            printMessage(err.message);
        }
    });
}

/**
* Convert all files in the queue one by one
*/
function convertAll() {
    $.each(conversionQueue, function (index, item) {
        convert(item);
    });
}

/**
* Convert file
* @param {Object} conversionItem - conversion item object represents file which should be converted
*/
function convert(conversionItem) {
    var data = conversionItem;
    var extension = conversionItem.guid.replace(/^.*\./, '');
    var destinationGuid = conversionItem.guid.replace(extension, conversionItem.destinationType);
    var currentConversionItem = null;
    $.each($("#gd-convert-queue").find('.gd-destination-file'), function (index, item) {
        var guid = $(item).data("guid");
        if (guid == destinationGuid) {
            currentConversionItem = item;
        }
    });
    if (currentConversionItem) {
        $(currentConversionItem).parent().find(".gd-convert-status .gd-conversion-pending").hide();
       
        var progressBar = "";
        var convertSingle = "";
        var downloadButton = "";
        if (isMobile()) {
            progressBar = $(currentConversionItem).parent().parent().parent().find(".gd-convert-progress");
            convertSingle = $(currentConversionItem).parent().parent().parent().find(".gd-convert-single");
            downloadButton = $(currentConversionItem).parent().parent().parent().find(".gd-download-single");
            $(convertSingle).hide();
        } else {
            progressBar = $(currentConversionItem).parent().find(".gd-convert-progress");
            convertSingle = $(currentConversionItem).parent().find(".gd-convert-single");
            downloadButton = $(currentConversionItem).parent().find(".gd-download-single");
        }       
        $(progressBar).css("display", "flex");
        $.ajax({
            type: 'POST',
            url: getApplicationPath('convert'),
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (returnedData) {
                if (returnedData.message != undefined) {
                    // open error popup
                    printMessage(returnedData.message);
                    return;
                }
                // hide progress
                $(progressBar).hide();
                if (!isMobile()) {
                    $(currentConversionItem).parent().find(".gd-convert-status .gd-conversion-complite").show();
                }
                $(currentConversionItem).removeClass("disabled");
                // change covnert button with download button                
                if (download) {          
                    $(convertSingle).hide();
                    downloadButton.show();
                    $(currentConversionItem).css("cursor", "pointer");
                    $(currentConversionItem).on(userMouseClick, function (e) {
                        documentGuid = $(this).data("guid").replace(/^.*[\\\/]/, '');
                        downloadDocument();
                    });
                }

                // remove converted file from the queue
                conversionQueue = $.grep(conversionQueue, function (value) {
                    return value != conversionItem;
                });
                // disable main conversion button if queue is empty
                if (conversionQueue.length == 0) {
                    $("#gd-btn-convert-all").removeClass("active");
                    $("#gd-btn-convert-all").off(userMouseClick);
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
                // hide loading spinner
                $('#gd-modal-spinner').hide();
                // open error popup
                printMessage(err.message);
            }
        });
    }
}

/**
* Prepare conversion types list
* @param {Object} types - possible conversion types
*/
function addAllConversionTypes(types) {
    if (types.conversionTypes.length > 0) {
        var properties = $.grep(allConvertionTypes, function (e) { return e.guid == types.guid; });
        if (properties.length == 0) {
            var conversionElement = { guid: types.guid, conversions: types.conversionTypes };
            allConvertionTypes.push(conversionElement);
        }
    }
}

/**
* Remove doublicates from the conversion types
*/
function prepareMultipleConversionTypes() {
    var allTypes = [];

    $.each($(".gd-checkbox-single:checked"), function (index, element) {
        var types = $(element).parent().parent().find(".gd-conversion-menu li");
        var typesArray = [];
        $.each(types, function (index, type) {
            typesArray.push($(type).find(".gd-type").html());
        });
        allTypes.push(typesArray);
    });
    //get longest array of types
    var longestArray = allTypes[0];
    $.each(allTypes, function (index, element) {
        if (longestArray.length < element.length) {
            longestArray = element;
        }
    });

    //add warnings
    $.each(allTypes, function (index, element) {
        var counter = 0;
        for (i = 0; i < longestArray.length; i++) {
            var type = (longestArray[i].type) ? longestArray[i].type : longestArray[i];
            if ($.inArray(type, element) == -1) {
                counter = counter + 1;
                longestArray[i] = { type: type, warning: true };
            } else {
				if(!longestArray[i].warning) {
					longestArray[i] = { type: type, warning: false };
				}
            }
        }
        longestArray.filesCounter = counter;
    });
    return longestArray;
}

function getWarningHtml(type, filesNumber) {
    return '<div class="gd-type-warning" title="1 selected file(s) can’t be converted to ' + type.type + ' format">' +
        '<i class="fas fa-exclamation-triangle"></i>' +
        '</div>';
}

/**
* Prepare conversion types drop-down list HTML
* @param {Object} types - possible conversion types
* @param {bool} multiple - determines if multiple supported
* @param {string} guid - file guid
*/
function getConversionTypesHtml(types, multiple, guid) {
    var conversionTypes = '';
    if (types && types.length > 0) {
        $.each(types, function (index, type) {
            var warning = (type.warning) ? getWarningHtml(type, types.filesCounter) : "";
            type = (type.type) ? type.type : type;
            conversionTypes = conversionTypes + '<li><i class="fa ' + getDocumentFormat(type).icon + '"></i><div class="gd-type">' + type + '</div>' +
                warning +
                '</li>';
        });
        var plus = "";
        var multipleClass = "multiple";
        if (!multiple) {
            plus = '<i class="fas fa-plus"></i>';
            multipleClass = "";
        }
        return '<div class="gd-conversions ' + multipleClass + '" data-guid="' + guid + '">' +
            plus +
            '<label class="gd-conversion-dropdown">' +
            '<input type="checkbox" class="gd-conversion-input">' +
            '<ul class="gd-conversion-menu ' + multipleClass + ' ">' +
            conversionTypes +
            '</ul>' +
            '</label>' +
            '</div>';
    } else {
        return '<div class="gd-conversions"></div>';
    }
}

/**
 * Hide all menu. For mobile only.
 */
function showMobileMenu() {
    $('#gd-mobile-menu').show();
}

/*
******************************************************************
******************************************************************
GROUPDOCS.COMAPRISON PLUGIN
******************************************************************
******************************************************************
*/
(function ($) {
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
        init: function (options) {
            // set defaults
            var defaults = {
                applicationPath: "http://localhost:8080/conversion",
                download: true,
                upload: true,
                browse: true,
                rewrite: true,
                enableRightClick: true
            };

            $('#element').viewer({
                applicationPath: options.applicationPath,
                defaultDocument: "",
                htmlMode: false,
                preloadPageCount: 0,
                zoom: false,
                pageSelector: false,
                search: false,
                thumbnails: false,
                rotate: false,
                download: options.download,
                upload: options.upload,
                print: false,
                browse: options.browse,
                rewrite: options.rewrite,
                saveRotateState: false,
                enableRightClick: options.enableRightClick
            });
            $('#gd-header-logo').append(getHtmlHeaderForMobile());
            options = $.extend(defaults, options);
            download = options.download;
            // set global option params
            applicationPath = options.applicationPath;
            rewrite = options.rewrite;

            $(gd_navbar).append(getHtmlconvertPanel);

            // assembly html base
            $("#gd-panzoom").append(getHtmlBase);
        }
    };

    /*
    ******************************************************************
    INIT PLUGIN
    ******************************************************************
    */
    $.fn.conversion = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + ' does not exist on jQuery.comparison');
        }
    };

    /*
    ******************************************************************
    HTML MARKUP
    ******************************************************************
    */
    function getHtmlHeaderForMobile() {
        return '<div id="gd-mobile-menu" class="gd-mobile-menu">' +
            '<span id="gd-mobile-menu-open" class="gd-mobile-menu-open">' +
            '<i class="fas fa-bars fa-lg fa-inverse"></i>' +
            '</span>' +
            '</div>';
    }

    function getHtmlBase() {
        var draglabel = "";
        if (!isMobile()) {
            draglabel = "Drag your document here or click"
        }
        return '<div id="gd-convert-area">' +
            '<i class="fas fa-exchange-alt"></i>' +
            '<div class="gd-conversion-empty-label">' +
            '<label>Conversion queue is empty</label>' +
            '<label>' + draglabel + ' <i class="fa fa-folder-open"></i> to select a files</label>' +
            '</div>' +
            '</div>' +
            '<div id="gd-convert-queue">' +
            '<div class="gd-queue-header">' +
            '<div class="gd-placeholder"></div>' +
            '<div>Source</div>' +
            '<div>Size</div>' +
            '<div>State</div>' +
            '<div>Target</div>' +
            '<div class="gd-queue-last-placeholder"></div>' +
            '</div>' +
            '</div>' +
            '<div class="gd-drag-n-drop-wrap gd-conversion-drop" id="gd-conversion-dropZone">' +
            '<i class="fa fa-cloud-download fa-5x" aria-hidden="true"></i>' +
            '<h2>Drag &amp; Drop your files here</h2>' +
            '</div>';
    }

    function getHtmlconvertPanel() {
        return '<li id="gd-btn-convert-all"><i class="fas fa-exchange-alt"></i><span class="gd-tooltip">Convert</span></li>';
    }

})(jQuery);