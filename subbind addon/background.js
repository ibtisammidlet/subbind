// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Create a context menu which will only show up for images.
 */

chrome.action.onClicked.addListener(function(tab) {
	    chrome.tabs.create({url: 'https://www.biotune.org/p/subbind.html'});
    // Tab opened.
  });






chrome.contextMenus.create({
  "id":"RCD",
  "title" : "goto receptors concept db",
  "type" : "normal",
  "contexts" : ["all"],
});
chrome.contextMenus.create({
  "id":"parent",
  "title" : "find binding for %s",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"GTP",
  "title" : "search in guidetopharmacology",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"europepmc",
  "title" : "search in europepmc [ML]",
  "type" : "normal",
  "contexts" : ["selection"],
});




chrome.contextMenus.create({
  "id":"europepmc",
  "title" : "search in springernature [ML]",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"biomedcentral",
  "title" : "search in biomedcentral [ML]",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"portlandpress",
  "title" : "search in portlandpress [ML]",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"medscape",
  "title" : "search in medscape [ML]",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"drugbank",
  "title" : "search in drugbank",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"psychonautwiki",
  "title" : "search in psychonautwiki",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"erowid",
  "title" : "search in erowid",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"thedrugclassroom",
  "title" : "search in thedrugclassroom",
  "type" : "normal",
  "contexts" : ["selection"],
});
chrome.contextMenus.create({
  "id":"nootropicsindex",
  "title" : "search in nootropicsindex",
  "type" : "normal",
  "contexts" : ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
/**
you can't use contains"substance name" in url requset
because it will make the addon not scrap some substnace
due to deffernt subtance sapartor in bindingdb page.


APi:
https://www.springernature.com/gp/find?queryString=care&pageNumber=1
https://www.biomedcentral.com/search?query=care&searchType=publisherSearch
https://portlandpress.com/biochemj/search-results?page=1&q=care&fl_SiteID=1000022
https://search.medscape.com/search/?q=care
https://go.drugbank.com/unearth/q?searcher=drugs&query=care
https://psychonautwiki.org/w/index.php?search=care&title=Special%3ASearch&go=Go
https://www.erowid.org/search.php?exclude=&q=care&x=3&y=7
https://thedrugclassroom.com/?s=care
https://nootropicsindex.com/search/?q=care

**/
    if (tab) {
        if (info.menuItemId === "parent"){
      chrome.tabs.create({url: 'https://www.bindingdb.org/rwd/bind/AdvancedSearch.jsp'+'?sources=0&sources=1&sources=2&sources=3&sources=4&sources=5&sources=6&criteria=&choices=compound_name:0:0:0&cn_name:0=exact&cn_text:0='+info.selectionText});
        }
        if (info.menuItemId === "RCD"){
      chrome.tabs.create({url: 'https://www.biotune.org/2019/07/what-receptors-do-antidepressants-and.html'});
        }
        if (info.menuItemId === "GTP"){
      chrome.tabs.create({url: 'https://www.guidetopharmacology.org/GRAC/DatabaseSearchForward?searchString='+info.selectionText+'&searchCategories=all&species=none&type=all&comments=includeComments&order=rank'});
        }
       if (info.menuItemId === "europepmc"){
      chrome.tabs.create({url: 'https://europepmc.org/search?query=%28TITLE:%22'+info.selectionText+'%22%29&page=1'});
        }
       if (info.menuItemId === "springernature"){
      chrome.tabs.create({url: 'https://www.springernature.com/gp/find?queryString='+info.selectionText+'&pageNumber=1'});
        }
       if (info.menuItemId === "biomedcentral"){
      chrome.tabs.create({url: 'https://www.biomedcentral.com/search?query='+info.selectionText+'&searchType=publisherSearch'});
        }
       if (info.menuItemId === "portlandpress"){
      chrome.tabs.create({url: 'https://portlandpress.com/biochemj/search-results?page=1&q='+info.selectionText+'&fl_SiteID=1000022'});
        }
       if (info.menuItemId === "medscape"){
      chrome.tabs.create({url: 'https://search.medscape.com/search/?q='+info.selectionText+''});
        }
       if (info.menuItemId === "drugbank"){
      chrome.tabs.create({url: 'https://go.drugbank.com/unearth/q?searcher=drugs&query='+info.selectionText+''});
        }
       if (info.menuItemId === "psychonautwiki"){
      chrome.tabs.create({url: 'https://psychonautwiki.org/w/index.php?search='+info.selectionText+'&title=Special%3ASearch&go=Go'});
        }
       if (info.menuItemId === "erowid"){
      chrome.tabs.create({url: 'https://www.erowid.org/search.php?exclude=&q='+info.selectionText+'&x=3&y=7'});
        }
       if (info.menuItemId === "thedrugclassroom"){
      chrome.tabs.create({url: 'https://thedrugclassroom.com/?s='+info.selectionText+''});
        }
       if (info.menuItemId === "nootropicsindex"){
      chrome.tabs.create({url: 'https://nootropicsindex.com/search/?q='+info.selectionText+''});
        }
    }

});






