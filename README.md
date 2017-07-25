# metaMediaViewer - 0.3.3

`metaMediaViewer` - Meta Media Viewer for angular applications. It allows you to view a carousel of elements. Compatible media : images, video, audio, pdf, html.

## Installation
* Download the latest release: [v0.3.3](https://github.com/GruppoMeta/metaMediaViewer/archive/master.zip)
* Clone the repository: `git clone https://github.com/GruppoMeta/metaMediaViewer.git`
* Install with [Bower](http://bower.io): `bower install metaMediaViewer`
* Install with [Npm](https://www.npmjs.com/): `npm install metaMediaViewer`


## Requirements
The plugin requires
* [jQuery 1.9.0+](http://jquery.com)
* [Angularjs 1.5.0+](https://angularjs.org/)
* [Bootstrap CSS 3.3.5+](http://getbootstrap.com)
* [Ui-Bootstrap 1.1.0+](https://angular-ui.github.io/bootstrap)
* [Videogular, with poster, overlayplay and controls plugin 1.2.5+](http://www.videogular.com)
* [Angular Pdfjs Viewer 1.0.0+](https://github.com/legalthings/angular-pdfjs-viewer)
* [Pdf.js-viewer 0.2.0+](https://github.com/legalthings/pdf.js-viewer)

## Initialization, Configuration, Usage & Demo
* Install dependencies (`bower install`)
* Put a video called `video_example.mp4` in `example/assets/video` directory
* Put an audio called `audio_example.mp4` in `example/assets/audio` directory
* Open `index.html` file in `example` directory.

## Quick-help for usage
* Inject into your module the `metaMediaViewerMdl` dependency:

```javascript
angular.module('myApp',['metaMediaViewerMdl']);
``` 

* Create an object with the information to pass to the directive:

```javascript
var medias = [
    {
        "thumbnail":"./assets/images/picasso_thumbnail.jpeg",
        "title":"Picasso's picture",
        "type":"IMAGE",
        "url":"./assets/images/picasso.jpeg",
        "mimeType":"image/jpeg" //not mandatory for image, recommended for audio and video
    },
    {
        "thumbnail":"./assets/images/dama_thumbnail.jpeg",
        "title":"La dama con l'ermellino",
        "type":"IMAGE",
        "url":"./assets/images/dama.jpeg",
        "mimeType":"image/jpeg" //not mandatory for image, recommended for audio and video
    }
    /*continue for all media you want to add ...*/
];
vm.listMedia = {
    "medias": medias,
    "options": {
        btnClose: false,
        theme:"light"
    }
};
```

* Put the directive in your html:

```html
<meta-media-viewer medias="vm.listMedia.medias" options="vm.listMedia.options"></meta-media-viewer>
```

### Advanced configuration for Pdf viewer
By default the location of PDF.js assets are automatically determined. However if you place them on alternative locations they may not be found. If so, you can configure these locations. You may choice to disable use of Web Workers API. This is useful if you want to add pdf.worker.js to your concatinated JavaScript file. However this will have a negative effect on the runtime performance.

```javascript
angular.module('myApp').config(function(pdfjsViewerConfigProvider) {
    //To configure locations for Pdf viewer files use:
    pdfjsViewerConfigProvider.setWorkerSrc("/assets/pdf.js-viewer/pdf.worker.js");
    pdfjsViewerConfigProvider.setCmapDir("/assets/pdf.js-viewer/cmaps");
    pdfjsViewerConfigProvider.setImageDir("/assets/pdf.js-viewer/images");
    
    //to disable worker
    pdfjsViewerConfigProvider.disableWorker();
});
```

To reference the viewer.css file, override the pdf.js-viewer options in your bower.json like this:

```javascript
"overrides": {
    "pdf.js-viewer": {
        "main": [
            "pdf.js",
            "viewer.css"
        ]
    }
}
```

## Screen
* Inline directive in light theme
![Alt text](/screen/image1.jpg "Inline directive in light theme")

* Panel of media open
![Alt text](/screen/image2.jpg "Panel of media open")

* Modal mode and dark theme
![Alt text](/screen/image3.jpg "Modal mode and dark theme")

## News
v0.3.3
* Fixed image zoom problem in Firefox
* Add audio wave animation

v0.3.0
* Added support to html type (html type's medias are opened in iframe)

v0.2.9
* Added title media in box preview

v0.2.7
* Added field `mimeType` in media object to describe the mime type of the media (recommended for audio and video)

v0.2.4
* Changed `build` folder with `src`

v0.2.1
* Added zoomIn and zoomOut button for IMAGE type

## Bug fixed
v0.3.2
* Fixed problem download multimedia

v0.3.1
* Fixed problem loading multiple audio/video

v0.2.6
* Fixed Pdf Viewer problem. View installation section to know how enable pdf viewer for app builded with Grunt/Gulp.

v0.1.1
* Fixed problem to load ng-class for container div with some angular.js version.

## Copyright and license
Copyright @2016 Gruppo Meta srl, under [MIT license]