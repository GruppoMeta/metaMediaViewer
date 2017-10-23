angular.module("metaMediaViewerMdl").run(["$templateCache", function($templateCache) {$templateCache.put("metaMediaViewer.html","<div class=\"contentMetaMediaViewer\">\n    <div class=\"metaMediaViewer modal-preview animate-modal-preview {{metaMediaViewer.options.customClass}} {{metaMediaViewer.options.theme}} {{metaMediaViewer.modalMode ? \'modal-mode\' : \'\'}} {{metaMediaViewer.totalMedias>1 ? \'with-pagination\' : \'\'}}\" style=\"height:{{metaMediaViewer.contentHeight}}\">\n        <div class=\"box-numNav\" ng-if=\"metaMediaViewer.totalMedias>1\">\n            <uib-pagination total-items=\"metaMediaViewer.totalMedias\" ng-model=\"metaMediaViewer.currentMedia\" class=\"pagination-sm\" boundary-links=\"true\" first-text=\"Inizio\" rotate=\"true\" force-ellipses=\"true\" last-text=\"Fine\" items-per-page=\"1\" max-size=\"10\" direction-links=\"false\" ></uib-pagination>\n        </div>\n        <div class=\"header\">\n            <div class=\"box-btnHeader box-btnHeader-left\">\n                <a class=\"btn-grid btnHeader\" ng-class=\"{\'active\':metaMediaViewer.panelActive}\" ng-click=\"metaMediaViewer.panelActive=metaMediaViewer.toggleEle(metaMediaViewer.panelActive)\">\n                    <span class=\"fa fa-th-large\"></span>\n                </a>\n                <a class=\"btn-download btnHeader\" \n                    ng-href=\"{{metaMediaViewer.media.url}}\" \n                    target=\"_blank\"\n                    ng-if=\"metaMediaViewer.media.download!==false\">\n                    <span class=\"fa fa-download\"></span>\n                </a>\n                <a class=\"btn-zoom btnHeader\" ng-if=\"!metaMediaViewer.loadingImg && metaMediaViewer.media.type===\'IMAGE\'\" ng-click=\"metaMediaViewer.zoomOut()\">\n                    <span class=\"fa fa-search-minus\"></span>\n                </a>\n                <a class=\"btn-zoom btnHeader\" ng-if=\"!metaMediaViewer.loadingImg && metaMediaViewer.media.type===\'IMAGE\'\" ng-click=\"metaMediaViewer.zoomIn()\">\n                    <span class=\"fa fa-search-plus\"></span>\n                </a>\n            </div>\n            <div class=\"btn-spinner\" ng-if=\"metaMediaViewer.loadingImg && metaMediaViewer.media.type===\'IMAGE\'\">\n                <div class=\"sk-circle\">\n                    <div class=\"sk-circle1 sk-child\"></div>\n                    <div class=\"sk-circle2 sk-child\"></div>\n                    <div class=\"sk-circle3 sk-child\"></div>\n                    <div class=\"sk-circle4 sk-child\"></div>\n                    <div class=\"sk-circle5 sk-child\"></div>\n                    <div class=\"sk-circle6 sk-child\"></div>\n                    <div class=\"sk-circle7 sk-child\"></div>\n                    <div class=\"sk-circle8 sk-child\"></div>\n                    <div class=\"sk-circle9 sk-child\"></div>\n                    <div class=\"sk-circle10 sk-child\"></div>\n                    <div class=\"sk-circle11 sk-child\"></div>\n                    <div class=\"sk-circle12 sk-child\"></div>\n                </div>\n            </div>\n            <div class=\"title\" ng-class=\"{\'margin-large\':metaMediaViewer.media.type===\'IMAGE\'}\">{{metaMediaViewer.media.title}}</div>\n            <div class=\"btn-close\" ng-if=\"metaMediaViewer.options.btnClose\" ng-click=\"metaMediaViewer.close()\">\n                <span class=\"fa fa-times\"></span>\n            </div>\n        </div>\n        <div class=\"panel-left\" ng-class=\"{\'with-pagination\':metaMediaViewer.totalMedias>1}\">\n            <div class=\"box-mediaThumb\" ng-class=\"{\'active\':metaMediaViewer.currentMedia===$index+1}\" ng-repeat=\"media in metaMediaViewer.medias\" ng-click=\"metaMediaViewer.setMedia($index+1)\">\n                <div class=\"img-middle-responsive\">\n                    <div class=\"responsive-container\" >\n                        <div class=\"dummy\"></div>\n                        <div class=\"img-container\">\n                            <div class=\"centerer\"></div>\n                            <img ng-src=\"{{media.thumbnail}}\"/>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"box-mediaTitle\" tooltips tooltip-template=\"{{media.title}}\">\n                    {{media.title}}\n                </div>\n            </div>\n        </div>\n        <div class=\"body\" ng-class=\"{\'panel-active\':metaMediaViewer.panelActive, \'with-pagination\':metaMediaViewer.totalMedias>1}\">\n            <div class=\"box-btnNav box-btnNav-left\" ng-if=\"metaMediaViewer.prev\" ng-click=\"metaMediaViewer.setMedia(false,-1)\">\n                <div class=\"btnNav btnNav-left\">\n                    <i class=\"fa fa-arrow-left\"></i>\n                </div>\n            </div>\n            <div class=\"box-btnNav box-btnNav-right\" ng-if=\"metaMediaViewer.next\" ng-click=\"metaMediaViewer.setMedia(false,1)\">\n                <div class=\"btnNav btnNav-right\">\n                    <i class=\"fa fa-arrow-right\"></i>\n                </div>\n            </div>\n            <div class=\"box-none\" ng-if=\"metaMediaViewer.media && !metaMediaViewer.checkSupportedMedia(metaMediaViewer.media.type)\">\n                <h3>Tipo di media non supportato</h3>\n            </div>\n            <div class=\"box-img\" ng-if=\"metaMediaViewer.media.type===\'IMAGE\'\" >\n                <img ng-src=\"{{metaMediaViewer.media.url}}\" ng-init=\"metaMediaViewer.setInitZoom()\"/>\n            </div>\n            <div class=\"box-pdf\" ng-if=\"metaMediaViewer.media.type===\'PDF\'\">\n                <!--<iframe width=\"100%\" height=\"100%\" ng-src=\"{{metaMediaViewer.media.PdfUrl}}\" frameborder=\"0\"></iframe>-->\n                <pdfjs-viewer src=\"{{ metaMediaViewer.media.PdfUrl }}\" download=\"{{metaMediaViewer.media.download}}\" print=\"{{metaMediaViewer.media.print}}\" open=\"{{metaMediaViewer.media.open}}\">\n                </pdfjs-viewer>\n            </div>\n            <div class=\"box-multimedia\" ng-if=\"metaMediaViewer.media.type===\'VIDEO\' || metaMediaViewer.media.type===\'AUDIO\'\">\n                <videogular vg-update-time=\"metaMediaViewer.videogular.onUpdateTime($currentTime, $duration)\" vg-theme=\"metaMediaViewer.videogular.config.theme\" vg-auto-play=\"metaMediaViewer.videogular.config.autoPlay\"\n                vg-update-state=\"metaMediaViewer.onUpdateState($state)\">\n                    <vg-media vg-src=\"metaMediaViewer.videogular.config.sources\">\n                    </vg-media>\n\n                    <vg-controls>\n                        <vg-play-pause-button></vg-play-pause-button>\n                        <vg-time-display>{{ metaMediaViewer.videogular.currentTime | date:\'mm:ss\' }}</vg-time-display>\n                        <vg-scrub-bar>\n                            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\n                        </vg-scrub-bar>\n                        <vg-time-display>{{ metaMediaViewer.videogular.totalTime | date:\'mm:ss\' }}</vg-time-display>\n                        <vg-volume>\n                            <vg-mute-button></vg-mute-button>\n                            <vg-volume-bar></vg-volume-bar>\n                        </vg-volume>\n                        <vg-fullscreen-button></vg-fullscreen-button>\n                    </vg-controls>\n\n                    <vg-overlay-play></vg-overlay-play>\n                    <vg-poster vg-url=\'metaMediaViewer.media.thumbnail\'></vg-poster>\n                </videogular>\n            </div>\n            <div class=\"box-html\" ng-if=\"metaMediaViewer.media.type===\'HTML\'\" >\n                <iframe ng-src=\"{{metaMediaViewer.safeUrl(metaMediaViewer.media.url)}}\" frameborder=\"0\"><iframe>\n            </div>\n        </div>\n    </div>\n</div>");}]);