function keyWordsearch() {
    gapi.client.setApiKey('AIzaSyBYRDGmU8l00ww9MrHfT_xYg4swNBw7iNM');
    gapi.client.load('youtube', 'v3', function() {
            makeRequest();
    });
}

function makeRequest() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
               q: q,
            part: 'snippet'                        
    });
    request.execute(function(response) {
            const strRes = JSON.stringify(response.result);
            console.log(strRes);
            parseImage(strRes);
            //$('#search-container').html('<pre>' + str + '</pre>');
    });
}

function parseImage(strRes) {
    var split1 = strRes.split('":{"default":{"url":"');
    var split2 = split1[1].split('"');
    const link1 = split2[0];
    console.log(link1);
    createImage(link1);

    console.log('test');
    console.log(split1[1]);

    var secSplit1 = split1[1];
    secSplit2 = secSplit1.split('":{"default":{"url":"');
    console.log(secSplit2[1]);
    //var secSplit1 = split1[1].split('":{"default":{"url":"');
    // var secSplit2 = secSplit1[1].split('"');
    // const link2 = secSplit2[0];
    // createImage(link2);
}

function createImage(src) {
    img = document.createElement('img');
    img.src = src;
    document.body.appendChild(img);
}