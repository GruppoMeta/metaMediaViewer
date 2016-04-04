!function(){"use strict";function e(){var e={restrict:"E",templateUrl:"metaMediaViewer.html",scope:{medias:"=",options:"="},controller:n,controllerAs:"metaMediaViewer",bindToController:!0,replace:!0};return e}function n(e,n,a){var i=this,t=function(){i.setMedia(1)};i.modalMode=i.options.modal,i.contentHeight=!i.modalMode&&i.options.height,i.pdfjsViewer={url:"pdfViewer.html"},i.videogular={},i.videogular.onUpdateTime=function(e,n){i.videogular.currentTime=1e3*e,i.videogular.totalTime=1e3*n},i.videogular.config={sources:[]},i.close=function(){a.remove();var e=i.options.fnClosePrm;i.options.fnClose.apply(this,e)},i.currentMedia=1,i.totalMedias=i.medias.length,i.media=null,i.prev=!1,i.next=!1,i.setMedia=function(e,a){if(i.currentMedia=e?e:a?i.currentMedia+a:1,i.media=i.medias[i.currentMedia-1],"PDF"===i.media.type)i.media.PdfUrl=i.pdfjsViewer.url+"?file="+i.media.url;else if("VIDEO"===i.media.type||"AUDIO"===i.media.type){i.videogular.config.sources=[];var t=i.media.url.split(".").pop(),o={src:n.trustAsResourceUrl(i.media.url),type:i.media.type.toLowerCase()+"/"+t};i.videogular.config.sources.push(o)}else i.media.url=i.media.url+"?timestamp="+(new Date).getTime();i.prev=i.currentMedia>1,i.next=i.currentMedia<i.medias.length},e.$watch("metaMediaViewer.currentMedia",function(e,n){e&&i.setMedia(e)}),i.panelActive=!1,i.toggleEle=function(e){return!e},i.checkSupportedMedia=function(e){var n=["IMAGE","VIDEO","AUDIO","PDF"],a=-1!==n.indexOf(e);return a},t()}n.$inject=["$scope","$sce","$element"],angular.module("metaMediaViewerMdl",["com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster","ui.bootstrap","pdfjsViewer"]).directive("metaMediaViewer",e)}(),angular.module("metaMediaViewerMdl").run(["$templateCache",function(e){e.put("metaMediaViewer.html",'<div class="metaMediaViewer modal-preview animate-modal-preview {{metaMediaViewer.options.customClass}} {{metaMediaViewer.options.theme}}" ng-class="{\'modal-mode\':metaMediaViewer.modalMode, \'with-pagination\':metaMediaViewer.totalMedias>1}" style="height:{{metaMediaViewer.contentHeight}}">\n    <div class="box-numNav" ng-if="metaMediaViewer.totalMedias>1">\n        <uib-pagination total-items="metaMediaViewer.totalMedias" ng-model="metaMediaViewer.currentMedia" class="pagination-sm" boundary-links="true" first-text="Inizio" rotate="true" force-ellipses="true" last-text="Fine" items-per-page="1" max-size="10" direction-links="false" ></uib-pagination>\n    </div>\n    <div class="header">\n        <div class="box-btnHeader box-btnHeader-left">\n            <a class="btn-grid btnHeader" ng-class="{\'active\':metaMediaViewer.panelActive}" ng-click="metaMediaViewer.panelActive=metaMediaViewer.toggleEle(metaMediaViewer.panelActive)">\n                <span class="fa fa-th-large"></span>\n            </a>\n            <a class="btn-download btnHeader" ng-href="{{metaMediaViewer.media.url}}" target="_blank">\n                <span class="fa fa-download"></span>\n            </a>\n        </div>\n        <div class="title">{{metaMediaViewer.media.title}}</div>\n        <div class="btn-close" ng-if="metaMediaViewer.options.btnClose" ng-click="metaMediaViewer.close()">\n            <span class="fa fa-times"></span>\n        </div>\n    </div>\n    <div class="panel-left" ng-class="{\'with-pagination\':metaMediaViewer.totalMedias>1}">\n        <div class="box-mediaThumb" ng-class="{\'active\':metaMediaViewer.currentMedia===$index+1}" ng-repeat="media in metaMediaViewer.medias" ng-click="metaMediaViewer.setMedia($index+1)">\n            <div class="img-middle-responsive">\n                <div class="responsive-container" >\n                    <div class="dummy"></div>\n                    <div class="img-container">\n                        <div class="centerer"></div>\n                        <img ng-src="{{media.thumbnail}}"/>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="body" ng-class="{\'panel-active\':metaMediaViewer.panelActive, \'with-pagination\':metaMediaViewer.totalMedias>1}">\n        <div class="box-btnNav box-btnNav-left" ng-if="metaMediaViewer.prev" ng-click="metaMediaViewer.setMedia(false,-1)">\n            <div class="btnNav btnNav-left">\n                <i class="fa fa-arrow-left"></i>\n            </div>\n        </div>\n        <div class="box-btnNav box-btnNav-right" ng-if="metaMediaViewer.next" ng-click="metaMediaViewer.setMedia(false,1)">\n            <div class="btnNav btnNav-right">\n                <i class="fa fa-arrow-right"></i>\n            </div>\n        </div>\n        <div class="box-none" ng-if="!metaMediaViewer.checkSupportedMedia(metaMediaViewer.media.type)">\n            <h3>Tipo di media non supportato</h3>\n        </div>\n        <img ng-if="metaMediaViewer.media.type===\'IMAGE\'" ng-src="{{metaMediaViewer.media.url}}" />\n        <div class="box-pdf" ng-if="metaMediaViewer.media.type===\'PDF\'">\n            <!--<iframe width="100%" height="100%" ng-src="{{metaMediaViewer.media.PdfUrl}}" frameborder="0"></iframe>-->\n            <pdfjs-viewer src="{{ metaMediaViewer.media.PdfUrl }}" download="{{metaMediaViewer.media.download}}" print="{{metaMediaViewer.media.print}}" open="{{metaMediaViewer.media.open}}">\n            </pdfjs-viewer>\n        </div>\n        <div class="box-multimedia" ng-if="metaMediaViewer.media.type===\'VIDEO\' || metaMediaViewer.media.type===\'AUDIO\'">\n            <videogular vg-update-time="metaMediaViewer.videogular.onUpdateTime($currentTime, $duration)" vg-theme="metaMediaViewer.videogular.config.theme">\n                <vg-media vg-src="metaMediaViewer.videogular.config.sources">\n                </vg-media>\n\n                <vg-controls>\n                    <vg-play-pause-button></vg-play-pause-button>\n                    <vg-time-display>{{ metaMediaViewer.videogular.currentTime | date:\'mm:ss\' }}</vg-time-display>\n                    <vg-scrub-bar>\n                        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\n                    </vg-scrub-bar>\n                    <vg-time-display>{{ metaMediaViewer.videogular.totalTime | date:\'mm:ss\' }}</vg-time-display>\n                    <vg-volume>\n                        <vg-mute-button></vg-mute-button>\n                        <vg-volume-bar></vg-volume-bar>\n                    </vg-volume>\n                    <vg-fullscreen-button></vg-fullscreen-button>\n                </vg-controls>\n\n                <vg-overlay-play></vg-overlay-play>\n                <vg-poster vg-url=\'metaMediaViewer.media.thumbnail\'></vg-poster>\n            </videogular>\n        </div>\n    </div>\n</div>'),e.put("pdfViewer.html",'<pdfjs-wrapper>\n  <div id="outerContainer">\n\n    <div id="sidebarContainer">\n      <div id="toolbarSidebar">\n        <div class="splitToolbarButton toggled">\n          <button id="viewThumbnail" class="toolbarButton group toggled" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs">\n             <span data-l10n-id="thumbs_label">Thumbnails</span>\n          </button>\n          <button id="viewOutline" class="toolbarButton group" title="Show Document Outline" tabindex="3" data-l10n-id="outline">\n             <span data-l10n-id="outline_label">Document Outline</span>\n          </button>\n          <button id="viewAttachments" class="toolbarButton group" title="Show Attachments" tabindex="4" data-l10n-id="attachments">\n             <span data-l10n-id="attachments_label">Attachments</span>\n          </button>\n        </div>\n      </div>\n      <div id="sidebarContent">\n        <div id="thumbnailView">\n        </div>\n        <div id="outlineView" class="hidden">\n        </div>\n        <div id="attachmentsView" class="hidden">\n        </div>\n      </div>\n    </div>  <!-- sidebarContainer -->\n\n    <div id="mainContainer">\n      <div class="findbar hidden doorHanger hiddenSmallView" id="findbar">\n        <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">Find:</label>\n        <input id="findInput" class="toolbarField" tabindex="91">\n        <div class="splitToolbarButton">\n          <button class="toolbarButton findPrevious" title="" id="findPrevious" tabindex="92" data-l10n-id="find_previous">\n            <span data-l10n-id="find_previous_label">Previous</span>\n          </button>\n          <div class="splitToolbarButtonSeparator"></div>\n          <button class="toolbarButton findNext" title="" id="findNext" tabindex="93" data-l10n-id="find_next">\n            <span data-l10n-id="find_next_label">Next</span>\n          </button>\n        </div>\n        <input type="checkbox" id="findHighlightAll" class="toolbarField">\n        <label for="findHighlightAll" class="toolbarLabel" tabindex="94" data-l10n-id="find_highlight">Highlight all</label>\n        <input type="checkbox" id="findMatchCase" class="toolbarField">\n        <label for="findMatchCase" class="toolbarLabel" tabindex="95" data-l10n-id="find_match_case_label">Match case</label>\n        <span id="findMsg" class="toolbarLabel"></span>\n      </div>  <!-- findbar -->\n\n      <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight">\n        <div id="secondaryToolbarButtonContainer">\n          <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView" title="Switch to Presentation Mode" tabindex="51" data-l10n-id="presentation_mode">\n            <span data-l10n-id="presentation_mode_label">Presentation Mode</span>\n          </button>\n\n          <button id="secondaryOpenFile" class="secondaryToolbarButton openFile visibleLargeView" title="Open File" tabindex="52" data-l10n-id="open_file">\n            <span data-l10n-id="open_file_label">Open</span>\n          </button>\n\n          <button id="secondaryPrint" class="secondaryToolbarButton print visibleMediumView" title="Print" tabindex="53" data-l10n-id="print">\n            <span data-l10n-id="print_label">Print</span>\n          </button>\n\n          <button id="secondaryDownload" class="secondaryToolbarButton download visibleMediumView" title="Download" tabindex="54" data-l10n-id="download">\n            <span data-l10n-id="download_label">Download</span>\n          </button>\n\n          <a href="#" id="secondaryViewBookmark" class="secondaryToolbarButton bookmark visibleSmallView" title="Current view (copy or open in new window)" tabindex="55" data-l10n-id="bookmark">\n            <span data-l10n-id="bookmark_label">Current View</span>\n          </a>\n\n          <div class="horizontalToolbarSeparator visibleLargeView"></div>\n\n          <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="56" data-l10n-id="first_page">\n            <span data-l10n-id="first_page_label">Go to First Page</span>\n          </button>\n          <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="57" data-l10n-id="last_page">\n            <span data-l10n-id="last_page_label">Go to Last Page</span>\n          </button>\n\n          <div class="horizontalToolbarSeparator"></div>\n\n          <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="58" data-l10n-id="page_rotate_cw">\n            <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span>\n          </button>\n          <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise" tabindex="59" data-l10n-id="page_rotate_ccw">\n            <span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span>\n          </button>\n\n          <div class="horizontalToolbarSeparator"></div>\n\n          <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="Enable hand tool" tabindex="60" data-l10n-id="hand_tool_enable">\n            <span data-l10n-id="hand_tool_enable_label">Enable hand tool</span>\n          </button>\n\n          <div class="horizontalToolbarSeparator"></div>\n\n          <button id="documentProperties" class="secondaryToolbarButton documentProperties" title="Document Properties…" tabindex="61" data-l10n-id="document_properties">\n            <span data-l10n-id="document_properties_label">Document Properties…</span>\n          </button>\n        </div>\n      </div>  <!-- secondaryToolbar -->\n\n      <div class="toolbar">\n        <div id="toolbarContainer">\n          <div id="toolbarViewer">\n            <div id="toolbarViewerLeft">\n              <button id="sidebarToggle" class="toolbarButton" title="Toggle Sidebar" tabindex="11" data-l10n-id="toggle_sidebar">\n                <span data-l10n-id="toggle_sidebar_label">Toggle Sidebar</span>\n              </button>\n              <div class="toolbarButtonSpacer"></div>\n              <button id="viewFind" class="toolbarButton group hiddenSmallView" title="Find in Document" tabindex="12" data-l10n-id="findbar">\n                 <span data-l10n-id="findbar_label">Find</span>\n              </button>\n              <div class="splitToolbarButton">\n                <button class="toolbarButton pageUp" title="Previous Page" id="previous" tabindex="13" data-l10n-id="previous">\n                  <span data-l10n-id="previous_label">Previous</span>\n                </button>\n                <div class="splitToolbarButtonSeparator"></div>\n                <button class="toolbarButton pageDown" title="Next Page" id="next" tabindex="14" data-l10n-id="next">\n                  <span data-l10n-id="next_label">Next</span>\n                </button>\n              </div>\n              <label id="pageNumberLabel" class="toolbarLabel" for="pageNumber" data-l10n-id="page_label">Page: </label>\n              <input type="number" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1" tabindex="15">\n              <span id="numPages" class="toolbarLabel"></span>\n            </div>\n            <div id="toolbarViewerRight">\n              <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView" title="Switch to Presentation Mode" tabindex="31" data-l10n-id="presentation_mode">\n                <span data-l10n-id="presentation_mode_label">Presentation Mode</span>\n              </button>\n\n              <button id="openFile" class="toolbarButton openFile hiddenLargeView" title="Open File" tabindex="32" data-l10n-id="open_file">\n                <span data-l10n-id="open_file_label">Open</span>\n              </button>\n\n              <button id="print" class="toolbarButton print hiddenMediumView" title="Print" tabindex="33" data-l10n-id="print">\n                <span data-l10n-id="print_label">Print</span>\n              </button>\n\n              <button id="download" class="toolbarButton download hiddenMediumView" title="Download" tabindex="34" data-l10n-id="download">\n                <span data-l10n-id="download_label">Download</span>\n              </button>\n              <a href="#" id="viewBookmark" class="toolbarButton bookmark hiddenSmallView" title="Current view (copy or open in new window)" tabindex="35" data-l10n-id="bookmark">\n                <span data-l10n-id="bookmark_label">Current View</span>\n              </a>\n\n              <div class="verticalToolbarSeparator hiddenSmallView"></div>\n\n              <button id="secondaryToolbarToggle" class="toolbarButton" title="Tools" tabindex="36" data-l10n-id="tools">\n                <span data-l10n-id="tools_label">Tools</span>\n              </button>\n            </div>\n            <div class="outerCenter">\n              <div class="innerCenter" id="toolbarViewerMiddle">\n                <div class="splitToolbarButton">\n                  <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out">\n                    <span data-l10n-id="zoom_out_label">Zoom Out</span>\n                  </button>\n                  <div class="splitToolbarButtonSeparator"></div>\n                  <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in">\n                    <span data-l10n-id="zoom_in_label">Zoom In</span>\n                   </button>\n                </div>\n                <span id="scaleSelectContainer" class="dropdownToolbarButton">\n                   <select id="scaleSelect" title="Zoom" tabindex="23" data-l10n-id="zoom">\n                    <option id="pageAutoOption" title="" value="auto" selected="selected" data-l10n-id="page_scale_auto">Automatic Zoom</option>\n                    <option id="pageActualOption" title="" value="page-actual" data-l10n-id="page_scale_actual">Actual Size</option>\n                    <option id="pageFitOption" title="" value="page-fit" data-l10n-id="page_scale_fit">Fit Page</option>\n                    <option id="pageWidthOption" title="" value="page-width" data-l10n-id="page_scale_width">Full Width</option>\n                    <option id="customScaleOption" title="" value="custom"></option>\n                    <option title="" value="0.5" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 50 }\'>50%</option>\n                    <option title="" value="0.75" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 75 }\'>75%</option>\n                    <option title="" value="1" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 100 }\'>100%</option>\n                    <option title="" value="1.25" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 125 }\'>125%</option>\n                    <option title="" value="1.5" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 150 }\'>150%</option>\n                    <option title="" value="2" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 200 }\'>200%</option>\n                    <option title="" value="3" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 300 }\'>300%</option>\n                    <option title="" value="4" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 400 }\'>400%</option>\n                  </select>\n                </span>\n              </div>\n            </div>\n          </div>\n          <div id="loadingBar">\n            <div class="progress">\n              <div class="glimmer">\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <menu type="context" id="viewerContextMenu">\n        <menuitem id="contextFirstPage" label="First Page"\n                  data-l10n-id="first_page"></menuitem>\n        <menuitem id="contextLastPage" label="Last Page"\n                  data-l10n-id="last_page"></menuitem>\n        <menuitem id="contextPageRotateCw" label="Rotate Clockwise"\n                  data-l10n-id="page_rotate_cw"></menuitem>\n        <menuitem id="contextPageRotateCcw" label="Rotate Counter-Clockwise"\n                  data-l10n-id="page_rotate_ccw"></menuitem>\n      </menu>\n\n      <div id="viewerContainer" tabindex="0">\n        <div id="viewer" class="pdfViewer"></div>\n      </div>\n\n      <div id="errorWrapper" hidden=\'true\'>\n        <div id="errorMessageLeft">\n          <span id="errorMessage"></span>\n          <button id="errorShowMore" data-l10n-id="error_more_info">\n            More Information\n          </button>\n          <button id="errorShowLess" data-l10n-id="error_less_info" hidden=\'true\'>\n            Less Information\n          </button>\n        </div>\n        <div id="errorMessageRight">\n          <button id="errorClose" data-l10n-id="error_close">\n            Close\n          </button>\n        </div>\n        <div class="clearBoth"></div>\n        <textarea id="errorMoreInfo" hidden=\'true\' readonly="readonly"></textarea>\n      </div>\n    </div> <!-- mainContainer -->\n\n    <div id="overlayContainer" class="hidden">\n      <div id="passwordOverlay" class="container hidden">\n        <div class="dialog">\n          <div class="row">\n            <p id="passwordText" data-l10n-id="password_label">Enter the password to open this PDF file:</p>\n          </div>\n          <div class="row">\n            <input type="password" id="password" class="toolbarField" />\n          </div>\n          <div class="buttonRow">\n            <button id="passwordCancel" class="overlayButton"><span data-l10n-id="password_cancel">Cancel</span></button>\n            <button id="passwordSubmit" class="overlayButton"><span data-l10n-id="password_ok">OK</span></button>\n          </div>\n        </div>\n      </div>\n      <div id="documentPropertiesOverlay" class="container hidden">\n        <div class="dialog">\n          <div class="row">\n            <span data-l10n-id="document_properties_file_name">File name:</span> <p id="fileNameField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_file_size">File size:</span> <p id="fileSizeField">-</p>\n          </div>\n          <div class="separator"></div>\n          <div class="row">\n            <span data-l10n-id="document_properties_title">Title:</span> <p id="titleField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_author">Author:</span> <p id="authorField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_subject">Subject:</span> <p id="subjectField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_keywords">Keywords:</span> <p id="keywordsField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_creation_date">Creation Date:</span> <p id="creationDateField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_modification_date">Modification Date:</span> <p id="modificationDateField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_creator">Creator:</span> <p id="creatorField">-</p>\n          </div>\n          <div class="separator"></div>\n          <div class="row">\n            <span data-l10n-id="document_properties_producer">PDF Producer:</span> <p id="producerField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_version">PDF Version:</span> <p id="versionField">-</p>\n          </div>\n          <div class="row">\n            <span data-l10n-id="document_properties_page_count">Page Count:</span> <p id="pageCountField">-</p>\n          </div>\n          <div class="buttonRow">\n            <button id="documentPropertiesClose" class="overlayButton"><span data-l10n-id="document_properties_close">Close</span></button>\n          </div>\n        </div>\n      </div>\n    </div>  <!-- overlayContainer -->\n  </div> <!-- outerContainer -->\n\n  <div id="printContainer"></div>\n  <div id="mozPrintCallback-shim" hidden>\n    <style>\n      @media print {\n        #printContainer div {\n          page-break-after: always;\n          page-break-inside: avoid;\n        }\n      }\n    </style>\n    <style scoped>\n      #mozPrintCallback-shim {\n        position: fixed;\n        top: 0;\n        left: 0;\n        height: 100%;\n        width: 100%;\n        z-index: 9999999;\n\n        display: block;\n        text-align: center;\n        background-color: rgba(0, 0, 0, 0.5);\n      }\n      #mozPrintCallback-shim[hidden] {\n        display: none;\n      }\n      @media print {\n        #mozPrintCallback-shim {\n          display: none;\n        }\n      }\n\n      #mozPrintCallback-shim .mozPrintCallback-dialog-box {\n        display: inline-block;\n        margin: -50px auto 0;\n        position: relative;\n        top: 45%;\n        left: 0;\n        min-width: 220px;\n        max-width: 400px;\n\n        padding: 9px;\n\n        border: 1px solid hsla(0, 0%, 0%, .5);\n        border-radius: 2px;\n        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);\n\n        background-color: #474747;\n\n        color: hsl(0, 0%, 85%);\n        font-size: 16px;\n        line-height: 20px;\n      }\n      #mozPrintCallback-shim .progress-row {\n        clear: both;\n        padding: 1em 0;\n      }\n      #mozPrintCallback-shim progress {\n        width: 100%;\n      }\n      #mozPrintCallback-shim .relative-progress {\n        clear: both;\n        float: right;\n      }\n      #mozPrintCallback-shim .progress-actions {\n        clear: both;\n      }\n    </style>\n    <div class="mozPrintCallback-dialog-box">\n      <!-- TODO: Localise the following strings -->\n      Preparing document for printing...\n      <div class="progress-row">\n        <progress value="0" max="100"></progress>\n        <span class="relative-progress">0%</span>\n      </div>\n      <div class="progress-actions">\n        <input type="button" value="Cancel" class="mozPrintCallback-cancel">\n      </div>\n    </div>\n  </div>\n</pdfjs-wrapper>\n')}]);