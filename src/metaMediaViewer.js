(function() {
  'use strict';

  angular
    .module('metaMediaViewerMdl',[
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'com.2fdevs.videogular.plugins.poster',
        'ui.bootstrap',
        'pdfjsViewer'
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
    function metaMediaViewerController($scope,$sce,$element) {
        // inizializzo una variabile che referenzia il modulo
        var vm = this;
        var render = function(){
            $element.find(".body img").on("load",$scope.setInitZoom);
            vm.setMedia(1); 
        };
        var timestamp = new Date().getTime();
        vm.modalMode = vm.options.modal;
        vm.contentHeight = !vm.modalMode && vm.options.height;
        vm.pdfjsViewer = {
            url: "pdfViewer.html"
        };
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
            vm.currentMedia = val ? val : dir ? vm.currentMedia+dir : 1;
            vm.media = vm.medias[vm.currentMedia-1];
            if(vm.media.type==="PDF"){
                vm.media.PdfUrl = vm.pdfjsViewer.url + "?file=" + vm.media.url;
            }
            else if(vm.media.type==="VIDEO" || vm.media.type==="AUDIO"){
                vm.videogular.config.sources = [];
                var extension = vm.media.url.split('.').pop();
                var source = {
                    src: $sce.trustAsResourceUrl(vm.media.url), type: vm.media.type.toLowerCase() + "/" + extension
                };
                vm.videogular.config.sources.push(source);
            }
            else {
                vm.media.url = vm.media.url.indexOf("?timestamp=" + timestamp) === -1 ? vm.media.url + "?timestamp=" + timestamp : vm.media.url;
                $element.find(".body img").off().on("load",$scope.setInitZoom);
            }
            vm.prev = vm.currentMedia>1 ? true : false;
            vm.next = vm.currentMedia<(vm.medias.length) ? true : false;
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
            $element.find('.body img').css("zoom",vm.setZoom);
            $element.find(".body img").off("load");
        };
        vm.zoomIn = function(){
            vm.setZoom+=0.2;
            $element.find('.body img').css("zoom",vm.setZoom);
        };
        vm.zoomOut = function(){
            vm.setZoom-=0.2;
            $element.find('.body img').css("zoom",vm.setZoom);
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
            var supportMedia = ["IMAGE","VIDEO","AUDIO","PDF"];
            var support = supportMedia.indexOf(tipo) !==-1 ? true : false;
            return support;
        };
        render();
    }
})();
