!function(){"use strict";function e(){var e={restrict:"E",templateUrl:"metaMediaViewer.html",scope:{medias:"=",options:"="},controller:i,controllerAs:"metaMediaViewer",bindToController:!0,replace:!0};return e}function i(e,i,a,t){var n=this,d=function(){a.find(".body img").on("load",e.setInitZoom),n.setMedia(1)};n.zoomSupported="zoom"in document.body.style;var o=(new Date).getTime();n.modalMode=n.options.modal,n.contentHeight=!n.modalMode&&n.options.height,n.videogular={},n.videogular.onUpdateTime=function(e,i){n.videogular.currentTime=1e3*e,n.videogular.totalTime=1e3*i},n.videogular.config={sources:[]},n.close=function(){a.remove();var e=n.options.fnClosePrm;n.options.fnClose.apply(this,e)},n.currentMedia=1,n.totalMedias=n.medias.length,n.media=null,n.prev=!1,n.next=!1,n.setMedia=function(a,d){var r=function(){n.currentMedia=a?a:d?n.currentMedia+d:1,n.media=n.medias[n.currentMedia-1];var t=function(e,i,a){var t=["mp3","mp4","mkv","flv","vob","ogv","wmv","mpv","m2v","mpg","mpeg","ogg","mov","avi","wav","3gp","m4a","m4b","m4p","oga","mogg","raw","wma","wv","webm"];if(e.mimeType)return e.mimeType;var n=t.indexOf(a.split(".").pop());if(-1!==n)return i.toLowerCase()+"/"+a.split(".").pop();var d="AUDIO"===i?"mp3":"mp4";return i.toLowerCase()+"/"+d};if("PDF"===n.media.type)n.media.PdfUrl=i.trustAsResourceUrl(n.media.url);else if("VIDEO"===n.media.type||"AUDIO"===n.media.type){n.videogular.config.sources=[],n.videogular.config.autoPlay=0,n.videogular.config.preload=0;var r=t(n.media,n.media.type,n.media.url),s={src:i.trustAsResourceUrl(n.media.url),type:r};n.videogular.config.sources.push(s)}else{n.media.url=-1===n.media.url.indexOf("?timestamp="+o)?n.media.url+"?timestamp="+o:n.media.url;var m=new Image;m.addEventListener("load",function(){e.setInitZoom(),e.$apply()},!1),m.src=n.media.url}n.prev=n.currentMedia>1,n.next=n.currentMedia<n.medias.length};n.media=null,t(function(){r()},300)},n.setZoom=null,e.setInitZoom=function(e){var i=null,t=null,d=a.find(".body").width(),o=a.find(".body").height(),r=a.find(".body img").width(),s=a.find(".body img").height();r>d&&(i=d/r),s>o&&(t=o/s),i&&t?n.setZoom=t>=i?i:t:n.setZoom=i||t||1,n.zoomSupported?(a.find(".body img").css("transform","none"),a.find(".body img").css("zoom",n.setZoom)):(a.find(".body img").css("transform","scale("+n.setZoom+")"),a.find(".body img").css("transform-origin","top")),a.find(".body img").off("load")},n.zoomIn=function(){n.setZoom+=.2,n.zoomSupported?a.find(".body img").css("zoom",n.setZoom):(a.find(".body img").css("transform","scale("+n.setZoom+")"),a.find(".body img").css("transform-origin","top"))},n.zoomOut=function(){n.setZoom-=.2,n.zoomSupported?a.find(".body img").css("zoom",n.setZoom):(a.find(".body img").css("transform","scale("+n.setZoom+")"),a.find(".body img").css("transform-origin","top"))},n.safeUrl=function(e){return i.trustAsResourceUrl(e)},e.$watch("metaMediaViewer.currentMedia",function(e,i){e&&e!==i&&n.setMedia(e)}),n.panelActive=!1,n.toggleEle=function(e){return!e},n.checkSupportedMedia=function(e){var i=["IMAGE","VIDEO","AUDIO","PDF","HTML"],a=-1!==i.indexOf(e);return a},n.onUpdateState=function(e){"AUDIO"===n.media.type&&("play"===e?r():s())};var r=function(){var e='<div id="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>',i=$(".overlayPlayContainer");i.html(e)},s=function(){var e='<div class="iconButton play" ng-class="overlayPlayIcon"></div>',i=$(".overlayPlayContainer");i.html(e)};d()}i.$inject=["$scope","$sce","$element","$timeout"],angular.module("metaMediaViewerMdl",["com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster","ui.bootstrap","pdfjsViewer","720kb.tooltips"]).directive("metaMediaViewer",e)}(),angular.module("metaMediaViewerMdl").run(["$templateCache",function(e){e.put("metaMediaViewer.html",'<div class="contentMetaMediaViewer">\n    <div class="metaMediaViewer modal-preview animate-modal-preview {{metaMediaViewer.options.customClass}} {{metaMediaViewer.options.theme}} {{metaMediaViewer.modalMode ? \'modal-mode\' : \'\'}} {{metaMediaViewer.totalMedias>1 ? \'with-pagination\' : \'\'}}" style="height:{{metaMediaViewer.contentHeight}}">\n        <div class="box-numNav" ng-if="metaMediaViewer.totalMedias>1">\n            <uib-pagination total-items="metaMediaViewer.totalMedias" ng-model="metaMediaViewer.currentMedia" class="pagination-sm" boundary-links="true" first-text="Inizio" rotate="true" force-ellipses="true" last-text="Fine" items-per-page="1" max-size="10" direction-links="false" ></uib-pagination>\n        </div>\n        <div class="header">\n            <div class="box-btnHeader box-btnHeader-left">\n                <a class="btn-grid btnHeader" ng-class="{\'active\':metaMediaViewer.panelActive}" ng-click="metaMediaViewer.panelActive=metaMediaViewer.toggleEle(metaMediaViewer.panelActive)">\n                    <span class="fa fa-th-large"></span>\n                </a>\n                <a class="btn-download btnHeader" \n                    ng-href="{{metaMediaViewer.media.url}}" \n                    target="_blank"\n                    ng-if="metaMediaViewer.media.download!==false">\n                    <span class="fa fa-download"></span>\n                </a>\n                <a class="btn-zoom btnHeader" ng-if="metaMediaViewer.media.type===\'IMAGE\'" ng-click="metaMediaViewer.zoomOut()">\n                    <span class="fa fa-search-minus"></span>\n                </a>\n                <a class="btn-zoom btnHeader" ng-if="metaMediaViewer.media.type===\'IMAGE\'" ng-click="metaMediaViewer.zoomIn()">\n                    <span class="fa fa-search-plus"></span>\n                </a>\n            </div>\n            <div class="title" ng-class="{\'margin-large\':metaMediaViewer.media.type===\'IMAGE\'}">{{metaMediaViewer.media.title}}</div>\n            <div class="btn-close" ng-if="metaMediaViewer.options.btnClose" ng-click="metaMediaViewer.close()">\n                <span class="fa fa-times"></span>\n            </div>\n        </div>\n        <div class="panel-left" ng-class="{\'with-pagination\':metaMediaViewer.totalMedias>1}">\n            <div class="box-mediaThumb" ng-class="{\'active\':metaMediaViewer.currentMedia===$index+1}" ng-repeat="media in metaMediaViewer.medias" ng-click="metaMediaViewer.setMedia($index+1)">\n                <div class="img-middle-responsive">\n                    <div class="responsive-container" >\n                        <div class="dummy"></div>\n                        <div class="img-container">\n                            <div class="centerer"></div>\n                            <img ng-src="{{media.thumbnail}}"/>\n                        </div>\n                    </div>\n                </div>\n                <div class="box-mediaTitle" tooltips tooltip-template="{{media.title}}">\n                    {{media.title}}\n                </div>\n            </div>\n        </div>\n        <div class="body" ng-class="{\'panel-active\':metaMediaViewer.panelActive, \'with-pagination\':metaMediaViewer.totalMedias>1}">\n            <div class="box-btnNav box-btnNav-left" ng-if="metaMediaViewer.prev" ng-click="metaMediaViewer.setMedia(false,-1)">\n                <div class="btnNav btnNav-left">\n                    <i class="fa fa-arrow-left"></i>\n                </div>\n            </div>\n            <div class="box-btnNav box-btnNav-right" ng-if="metaMediaViewer.next" ng-click="metaMediaViewer.setMedia(false,1)">\n                <div class="btnNav btnNav-right">\n                    <i class="fa fa-arrow-right"></i>\n                </div>\n            </div>\n            <div class="box-none" ng-if="metaMediaViewer.media && !metaMediaViewer.checkSupportedMedia(metaMediaViewer.media.type)">\n                <h3>Tipo di media non supportato</h3>\n            </div>\n            <div class="box-img" ng-if="metaMediaViewer.media.type===\'IMAGE\'" >\n                <img ng-src="{{metaMediaViewer.media.url}}" ng-init="metaMediaViewer.setInitZoom()"/>\n            </div>\n            <div class="box-pdf" ng-if="metaMediaViewer.media.type===\'PDF\'">\n                <!--<iframe width="100%" height="100%" ng-src="{{metaMediaViewer.media.PdfUrl}}" frameborder="0"></iframe>-->\n                <pdfjs-viewer src="{{ metaMediaViewer.media.PdfUrl }}" download="{{metaMediaViewer.media.download}}" print="{{metaMediaViewer.media.print}}" open="{{metaMediaViewer.media.open}}">\n                </pdfjs-viewer>\n            </div>\n            <div class="box-multimedia" ng-if="metaMediaViewer.media.type===\'VIDEO\' || metaMediaViewer.media.type===\'AUDIO\'">\n                <videogular vg-update-time="metaMediaViewer.videogular.onUpdateTime($currentTime, $duration)" vg-theme="metaMediaViewer.videogular.config.theme" vg-auto-play="metaMediaViewer.videogular.config.autoPlay"\n                vg-update-state="metaMediaViewer.onUpdateState($state)">\n                    <vg-media vg-src="metaMediaViewer.videogular.config.sources">\n                    </vg-media>\n\n                    <vg-controls>\n                        <vg-play-pause-button></vg-play-pause-button>\n                        <vg-time-display>{{ metaMediaViewer.videogular.currentTime | date:\'mm:ss\' }}</vg-time-display>\n                        <vg-scrub-bar>\n                            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\n                        </vg-scrub-bar>\n                        <vg-time-display>{{ metaMediaViewer.videogular.totalTime | date:\'mm:ss\' }}</vg-time-display>\n                        <vg-volume>\n                            <vg-mute-button></vg-mute-button>\n                            <vg-volume-bar></vg-volume-bar>\n                        </vg-volume>\n                        <vg-fullscreen-button></vg-fullscreen-button>\n                    </vg-controls>\n\n                    <vg-overlay-play></vg-overlay-play>\n                    <vg-poster vg-url=\'metaMediaViewer.media.thumbnail\'></vg-poster>\n                </videogular>\n            </div>\n            <div class="box-html" ng-if="metaMediaViewer.media.type===\'HTML\'" >\n                <iframe ng-src="{{metaMediaViewer.safeUrl(metaMediaViewer.media.url)}}" frameborder="0"><iframe>\n            </div>\n        </div>\n    </div>\n</div>')}]);