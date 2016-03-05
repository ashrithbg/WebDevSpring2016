function(){

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object.
    var accessToken = document.getElementById("accessToken").value;
    var upgrade_to_1080 = document.getElementById("upgrade_to_1080").checked;

    // Set Video Data
    var videoName = document.getElementById("videoName").value;
    var videoDescription = document.getElementById("videoDescription").value;

    // Clear the results div
    var node = document.getElementById('results');
    while (node.hasChildNodes()) node.removeChild(node.firstChild);

    // Rest the progress bar
    updateProgress(0);

    var uploader = new MediaUploader({
        file: files[0],
        token: accessToken,
        upgrade_to_1080: upgrade_to_1080,
        videoData: {
            name: (videoName > '') ? videoName : 'Default name',
            description: (videoDescription > '') ? videoDescription : 'Default description'
        },
        onError: function(data) {

            var errorResponse = JSON.parse(data);
            message = errorResponse.error;

            var element = document.createElement("div");
            element.setAttribute('class', "alert alert-danger");
            element.appendChild(document.createTextNode(message));
            document.getElementById('results').appendChild(element);

        },
        onProgress: function(data) {
            updateProgress(data.loaded / data.total);
        },
        onComplete: function(videoId) {

            var url = "https://vimeo.com/"+videoId;

            var a = document.createElement('a');
            a.appendChild(document.createTextNode(url));
            a.setAttribute('href',url);

            var element = document.createElement("div");
            element.setAttribute('class', "alert alert-success");
            element.appendChild(a);

            document.getElementById('results').appendChild(element);
        }
    });
    uploader.upload();
}

/**
 * Dragover handler to set the drop effect.
 */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

/**
 * Wire up drag & drop listeners once page loads
 */
document.addEventListener('DOMContentLoaded', function () {
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
});
;
/**
 * Updat progress bar.
 */
function updateProgress(progress) {
    progress = Math.floor(progress * 100);
    var element = document.getElementById('progress');
    element.setAttribute('style', 'width:'+progress+'%');
    element.innerHTML = progress+'%';
}
})();



