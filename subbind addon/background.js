// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id":"parent",
  "title" : "find binding for %s",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.onClicked.addListener(function(info, tab) {
/**
you can't use contains"substance name" in url requset
because it will make the addon not scrap some substnace
due to deffernt subtance sapartor in bindingdb page.
**/
	    chrome.tabs.create({url: 'https://www.bindingdb.org/rwd/bind/AdvancedSearch.jsp'+'?sources=0&sources=1&sources=2&sources=3&sources=4&sources=5&sources=6&criteria=&choices=compound_name:0:0:0&cn_name:0=exact&cn_text:0='+info.selectionText});

});


chrome.action.onClicked.addListener(function(tab) {
	    chrome.tabs.create({url: 'https://www.biotune.org/p/subbind.html'});
    // Tab opened.
  });
