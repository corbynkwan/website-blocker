function matchTab(url, tabid) {
    //please edit bl and enabled if you want to block other sites.
    //bl is where you define sites to block.
    /*
    "custom_name": {
        "block_message": "stop surfing!",      (put text here in between quotation marks if you want a block message, otherwise put null with no quotation marks.)
        "block_redirect": "https://www.google.com",   (put a url between quotation marks if you want a redirect, otherwise put null)
        "block": {
            "regex": /youtube\.com(\/$|$|\/\?feature)/i,  (the extension scans the url and if it matches the regex pattern, it is blocked. look up regex for more details. don't use quotation marks for regex.)
            "exceptions": /some_exception/i        (if the url matches the regex in exceptions, the extension will allow the site to be accessed. put null if you don't want any exceptions.)
        }
    } (be sure to add a comma if there are more entries below.)
    */
    //once you have configured

    var bl = {
        "youtube": {
            "block_message": null,
            "block_redirect": "https://www.youtube.com/account",
            "block": {
                "regex": /youtube\.com(\/$|$|\/\?feature)/i,
                "exceptions": null
            }
        },
        "reddit": {
            "block_message": null,
            "block_redirect": "https://www.google.com",
            "block": {
                "regex": /(?<!out\.)reddit\.com/i,
                "exceptions": null
            }
        },
        "redditnba": {
            "block_message": null,
            "block_redirect": "https://www.coursera.org/learn/machine-learning/home/welcome",
            "block": {
                "regex": /reddit\.com\/r\/nba(.*)/i,
                "exceptions": null
            }
        },
        "twitch": {
            "block_message": null,
            "block_redirect": "https://www.coursera.org/learn/machine-learning/home/welcome",
            "block": {
                "regex": /twitch\.tv(.*)/i,
                "exceptions": null
            }
        }
        
    }

    //enable entries using this. type entries in the line below, seperated by commas (e.g. "youtube", "reddit")
    let enabled = [
        "youtube", //add more here,
        "freestylersworld",
        "fgunz",
        "redditgunz",
        "redditnba",
        "twitch"
    ]

    //don't edit this bit

    var i; //enabled -> i
    var r; //enabled -> i -> r (block)
    var j; //enabled -> i -> r -> j
    for (var i = 0; i < enabled.length; i++) {
        r = bl[enabled[i]]["block"]
        if (url.match(r["regex"]) != null) { //url found
            if (url.match(r["exceptions"]) == null) { //doesn't match exceptions, or is null, do something
                if (bl[enabled[i]]["block_message"] != null) {
                    window.alert(bl[enabled[i]]["block_message"])
                }
                if (bl[enabled[i]]["block_redirect"] != null) {
                    chrome.tabs.update(tabid, {url: bl[enabled[i]].block_redirect});
                    //redirect using tabid
                }
            } // else, matches exceptions, do nothing
        } // else, doesn't match regex, do nothing
    }
}

chrome.tabs.onActivated.addListener(windowId => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        matchTab(tabs[0].url, tabs[0].id)
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    matchTab(tab.url, tab.id)   
});


