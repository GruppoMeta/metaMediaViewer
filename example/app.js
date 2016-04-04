(function(){
    'use strict';
    angular.module('metaMediaViewerApp',['metaMediaViewerMdl'])
    .controller('appCtrl', appCtrl);
    
    function appCtrl(){
        var vm = this;
        var medias = [
            {
                "thumbnail":"./example/assets/images/picasso_thumbnail.jpeg",
                "title":"Picasso's picture",
                "type":"IMAGE",
                "url":"./example/assets/images/picasso.jpeg"
            },
            {
                "thumbnail":"./example/assets/images/dama_thumbnail.jpeg",
                "title":"La dama con l'ermellino",
                "type":"IMAGE",
                "url":"./example/assets/images/dama.jpeg"
            },
            {
                "thumbnail":"./example/assets/pdf/document.png",
                "title":"Pdf document",
                "type":"PDF",
                "download":false, //enable/disable download button
                "open":false, //enable/disable open button
                "print":true, //enable/disable print button
                "url":"./example/assets/pdf/divina_commedia.pdf"
            },
            {
                "thumbnail":"./example/assets/video/video.png",
                "title":"Video example",
                "type":"VIDEO",
                "url":"./example/assets/video/video_example.mp4"
            },
            {
                "thumbnail":"./example/assets/audio/audio.png",
                "title":"Audio example",
                "type":"AUDIO",
                "url":"./example/assets/audio/audio_example.mp3"
            }
        ];
        vm.listMedia = {
            "medias": medias,
            "options": {
                btnClose: false,
                theme:"light"
            }
        };
        vm.listMediaModal = null;
        vm.openViewerModal = function(){
            vm.listMediaModal = {};
            vm.listMediaModal.medias = medias;
            vm.listMediaModal.options = {
                modal:true,
                btnClose: true,
                fnClose: function(){
                    vm.listMediaModal = null;
                },
                fnClosePrm:[]
            };
        }
    }
})();
