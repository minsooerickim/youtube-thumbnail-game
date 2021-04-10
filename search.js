//appending thumbnail pics prints in order
function keyWordSearch() {
    gapi.client.setApiKey('AIzaSyBYRDGmU8l00ww9MrHfT_xYg4swNBw7iNM');
    gapi.client.load('youtube', 'v1', function() {
            makeRequest();
            makeRequestViews();
    });
    // next();
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

let bruhId = [];
let bruhView = [];
var thumbDict = {};
// let views = [];
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
    
    bruhView.push(views.toString());
    bruhId.push(arryId);
    thumbDict[arryId + ""] = views;
}

//getting thumbnail
function parseImage(dict) {
    let arrIds = [];
    let arr = [];

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

function remove(el) {
    var element = el;
    element.remove();
}

function next() {
    var winningIndex = getWinningIndex();
    console.log(winningIndex);

    console.log(thumbDict);
    console.log(bruhId);
    console.log(bruhView);

    var thumb0 = document.getElementById(bruhId[0]);
    var thumb1 = document.getElementById(bruhId[1]);
    var thumb2 = document.getElementById(bruhId[2]);
    
    thumb0.onclick = function() {
        thumb0.classList.add("blur");
        thumb1.classList.add("blur");
        thumb2.classList.add("blur");
        console.log(bruhView[0]);


            img = document.createElement('img');
            img.src = "imgs/check.png";
            img.classList.add(".correct1");

            document.body.appendChild(img);
            // document.getElementById('thumb-container').appendChild(img);
        if (winningIndex == 0) {
            //dynamically add fading filters (red, green) for wrong correct
        }
        //some function to display if correct or wrong
    }
    thumb1.onclick = function() {
        thumb0.classList.add("blur");
        thumb1.classList.add("blur");
        thumb2.classList.add("blur");
        console.log(bruhView[1]);
        //some function to display if correct or wrong
    }
    thumb2.onclick = function() {

        thumb0.classList.add("blur");
        thumb1.classList.add("blur");
        thumb2.classList.add("blur");
        console.log(bruhView[2]);
        //some function to display if correct or wrong
    }
    
}

function getWinningIndex() {
    var highest = 0;
    for (var i = 1; i < 3; ++i) {
        if (parseInt(bruhView[i]) > parseInt(bruhView[highest])) {
            highest = i;
        }
    }
    return highest;
}