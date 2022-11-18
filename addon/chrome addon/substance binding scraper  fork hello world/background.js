// here the script act on option menu selected text
/**
chrome.contextMenus.create({
	"title": 'scrap',
	"contexts": 'selection',
	"onclick": function () {
		alert(info.selectionText)
}

})


**/






/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    var url = 'info.html#' + info.srcUrl;

    // Create a new window to the info page.
    chrome.windows.create({ url: url, width: 520, height: 660 });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "scrap",
  "type" : "normal",
  "contexts" : ["selection"],
  "onclick" : getClickHandler()
});
