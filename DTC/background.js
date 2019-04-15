// chrome.runtime.onInstalled.addListener(function () {
//     // do nothing
// });

var filter = {
    urls: ["<all_urls>"],
    types: [ "main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
};

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    var url = details.url;
    var isDisabled=localStorage.getItem("disabled");
    if(url.indexOf("localhost")>-1&&isDisabled!="true"){
       var token = "createBy=RomanYu;lastPing="+((new Date()).getTime()-121312)+"; lastReset="+(new Date()).getTime()+";CAMToken="+localStorage.getItem("token")+"; HSBCnet-Gateway-Cache-Token="+localStorage.getItem("gateway");
       //var token = localStorage.getItem('cookie');
        for (var j = details.requestHeaders.length-1; j >=0; j--) {
            if (details.requestHeaders[j].name == "cookie") {
                details.requestHeaders[j].value = token;
                console.log("update token->"+details.requestHeaders[j].value);
                break;
            }
        }
        //no found, self add header
        if (j == -1) {
            details.requestHeaders.push({"name": "cookie", value: token});
        }
    }
    return {requestHeaders: details.requestHeaders};
}, filter, ["blocking","requestHeaders"]);