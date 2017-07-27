(function() {
  'use strict';

  angular
    .module('metaMediaViewerMdl',[
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'com.2fdevs.videogular.plugins.poster',
        'ui.bootstrap',
        'pdfjsViewer',
        '720kb.tooltips'
  ])
    .directive('metaMediaViewer', metaMediaViewer);

  /** @ngInject */
    function metaMediaViewer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'metaMediaViewer.html',
            scope: {
                medias:"=",
                options:"="
            },
            controller: metaMediaViewerController,
            controllerAs: 'metaMediaViewer',
            bindToController: true,
            replace:true
        };
        return directive;
    }

    /** @ngInject */
    function metaMediaViewerController($scope,$sce,$element,$timeout) {
        // inizializzo una variabile che referenzia il modulo
        var vm = this;
        var render = function(){
            $element.find(".body img").on("load",$scope.setInitZoom);
            vm.setMedia(1); 
        };
        vm.zoomSupported = "zoom" in document.body.style;
        var timestamp = new Date().getTime();
        vm.modalMode = vm.options.modal;
        vm.contentHeight = !vm.modalMode && vm.options.height;
        vm.videogular = {};
        vm.videogular.onUpdateTime = function(current,total) {
            vm.videogular.currentTime = current*1000;
            vm.videogular.totalTime = total*1000;
        };
        vm.videogular.config = {
            sources: []
        };
        vm.close = function(){
            $element.remove();
            var params = vm.options.fnClosePrm;
            vm.options.fnClose.apply(this,params);
        }
        vm.currentMedia = 1;
        vm.totalMedias = vm.medias.length;
        vm.media = null;
        vm.prev = false;
        vm.next = false;
        vm.setMedia = function(val,dir){
            var loadMedia = function(){
                vm.currentMedia = val ? val : dir ? vm.currentMedia+dir : 1;
                vm.media = vm.medias[vm.currentMedia-1];
                var getMimeType = function(media,type,url){
                    var arType = ["mp3","mp4","mkv","flv","vob","ogv","wmv","mpv","m2v","mpg","mpeg","ogg","mov","avi","wav","3gp","m4a","m4b","m4p","oga","mogg","raw","wma","wv","webm"]
                    if(media.mimeType)
                        return media.mimeType;
                    var ext = arType.indexOf(url.split('.').pop());
                    if(ext!==-1)
                        return type.toLowerCase() + "/" + url.split('.').pop();
                    var custom = type === "AUDIO" ? "mp3" : "mp4";
                    return type.toLowerCase() + "/" + custom;
                };
                if(vm.media.type==="PDF"){
                    vm.media.PdfUrl = $sce.trustAsResourceUrl(vm.media.url);
                }
                else if(vm.media.type==="VIDEO" || vm.media.type==="AUDIO"){
                    vm.videogular.config.sources = [];
                    vm.videogular.config.autoPlay=0;
                    vm.videogular.config.preload=0;
                    var mimeType = getMimeType(vm.media,vm.media.type,vm.media.url);
                    var source = {
                        src: $sce.trustAsResourceUrl(vm.media.url), type: mimeType
                    };
                    vm.videogular.config.sources.push(source);
                }
                else {
                    vm.media.url = vm.media.url.indexOf("?timestamp=" + timestamp) === -1 ? vm.media.url + "?timestamp=" + timestamp : vm.media.url;
                    //$element.find(".body img").off().on("load",$scope.setInitZoom);
                    var img = new Image();
                    img.addEventListener('load', function(){
                        $scope.setInitZoom();
                        $scope.$apply();
                    }, false);
                    img.src = vm.media.url;
                }
                vm.prev = vm.currentMedia>1 ? true : false;
                vm.next = vm.currentMedia<(vm.medias.length) ? true : false;
            }
            vm.media = null;
            $timeout(function(){
                loadMedia();
            },300);
        };
        vm.setZoom = null;
        $scope.setInitZoom = function(ev){
            var zoomWidth = null;
            var zoomHeight = null;
            var widthBody = $element.find('.body').width();
            var heightBody = $element.find('.body').height();
            var widthImg = $element.find('.body img').width();
            var heightImg = $element.find('.body img').height();
            if(widthImg>widthBody){
                zoomWidth = widthBody/widthImg;
            }
            if(heightImg>heightBody){
                zoomHeight = heightBody/heightImg;
            }
            if(zoomWidth && zoomHeight){
                vm.setZoom = zoomWidth<=zoomHeight ? zoomWidth : zoomHeight;
            }
            else{
                vm.setZoom = zoomWidth || zoomHeight || 1;
            }
            if(vm.zoomSupported){
                $element.find('.body img').css("transform","none");
                $element.find('.body img').css("zoom",vm.setZoom);
            }
            else{
                $element.find('.body img').css("transform","scale("+vm.setZoom+")");
                $element.find('.body img').css("transform-origin","top");
            }
            $element.find(".body img").off("load");
        };

        vm.zoomIn = function(){
            vm.setZoom+=0.2;
            if(vm.zoomSupported)
                $element.find('.body img').css("zoom",vm.setZoom);
            else{
                $element.find('.body img').css("transform","scale("+vm.setZoom+")");
                $element.find('.body img').css("transform-origin","top");
            }
        };
        vm.zoomOut = function(){
            vm.setZoom-=0.2;
            if(vm.zoomSupported)
                $element.find('.body img').css("zoom",vm.setZoom);
            else{
                $element.find('.body img').css("transform","scale("+vm.setZoom+")");
                $element.find('.body img').css("transform-origin","top");
            }
        };
        vm.safeUrl = function(url){
            return $sce.trustAsResourceUrl(url);
        };
        $scope.$watch("metaMediaViewer.currentMedia",function(newVal,oldVal){
            if(newVal && newVal!==oldVal){
                vm.setMedia(newVal);
            } 
        });
        vm.panelActive = false;
        vm.toggleEle = function(ele){
            if(ele)
                return false;
            else{
                return true;
            }
        };
        vm.checkSupportedMedia = function(tipo){
            var supportMedia = ["IMAGE","VIDEO","AUDIO","PDF","HTML"];
            var support = supportMedia.indexOf(tipo) !==-1 ? true : false;
            return support;
        };
        vm.onUpdateState = function(state){
            if(vm.media.type!=='AUDIO')
                return;
            if(state==='play'){
                createSoundWave();
            }
            else
                renderPlayBtn();
        }
        var createSoundWave = function(){
            var tpl = '<div id="bars">'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                  '<div class="bar"></div>'+
                '</div>';
            var container = $('.overlayPlayContainer');
            container.html(tpl);
        };
        var renderPlayBtn = function(){
            var tpl = '<div class="iconButton play" ng-class="overlayPlayIcon"></div>';
            var container = $('.overlayPlayContainer');
            container.html(tpl);
        };
        render();
    }
})();