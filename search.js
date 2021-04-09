//appending thumbnail pics prints in order
function keyWordSearch() {
    gapi.client.setApiKey('AIzaSyBYRDGmU8l00ww9MrHfT_xYg4swNBw7iNM');
    gapi.client.load('youtube', 'v3', function() {
            makeRequest();
            makeRequestViews();
    });
}

function makeRequest() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet',
            maxResults: 3,
            type: "video"                     
    });
    request.execute(function(response) {    
        const strRes = JSON.stringify(response.result);
        var dict = JSON.parse(strRes);
        parseVidId(dict);
        parseImage(dict);
    });
    next();
}

function makeRequestViews(arrId) {
    var request = gapi.client.youtube.videos.list({
            part: 'statistics',
            id: arrId                
    });
    request.execute(function(response) {    
        const strRes = JSON.stringify(response.result);
        var dict = JSON.parse(strRes);
        parseViews(arrId, dict);
    });
}

//getting vidId for views
function parseVidId(dict) {
    let arrIds = [];

    var items = dict.items;

    for (var i = 0; i < items.length; ++i) {
        var obj = items[i];
    
        arrIds.push(obj.id.videoId);
    }
    
    for (var i = 0; i < arrIds.length; ++i) {
        makeRequestViews(arrIds[i]);
    }
}

let thumbDict = {}
//parsing views after request
function parseViews(arryId, dict) {
    let arrViews = [];
    let viewCounts = [];
    let views = [];

    var items = dict.items;

    for (var item in items) {
        arrViews.push(item, items[item]);
    }

    for (var i = 0; i < arrViews.length; ++i) {
        viewCounts.push(arrViews[i].statistics)
    }
    
    views = (viewCounts["1"].viewCount);
    
    thumbDict[arryId] = views;
}

//getting thumbnail
function parseImage(dict) {
    let arr = [];
    let arrIds = [];

    var items = dict.items;
    
    for (var i = 0; i < items.length; ++i) {
        var obj = items[i];
    
        arr.push(obj.snippet.thumbnails.high.url);
    }

    for (var i = 0; i < items.length; ++i) {
        var obj = items[i];
    
        arrIds.push(obj.id.videoId);
    }
    createImage(arr, arrIds);
}
//inserting thumbnail
function createImage(arr, arrIds) {
    for (var i = 0; i < arr.length; ++i) {
        img = document.createElement('img');
        img.src = arr[i];
        img.id = arrIds[i];
        // img.onclick = mostViews(this.id);
        document.getElementById('thumb-container').appendChild(img);
    }
}

function next() {
    console.log('yo')
    //test if console.log('yo') prints after the images laod
    //then go https://stackoverflow.com/questions/51660696/set-a-parameter-when-changing-a-button-onclick-function
    //implement click then decide which one has the most views
}

function remove(el) {
    var element = el;
    element.remove();
}

