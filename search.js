//appending thumbnail pics prints in order
function keyWordsearch() {
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
        console.log(dict);
        parseVidId(dict);
        parseImage(dict);
    });
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

    var num = 1;
    var num1 = num.toString();
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
        document.body.appendChild(img);
    }
}

console.log(thumbDict)