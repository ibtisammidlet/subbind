// ==UserScript==
// @name         bindingdb.org scraper
// @namespace    https://biohackit.dailyinternetlife.com/2021/08/bindingdborg-scraper-targethost-species.html
// @version      0.7
// @description  scraping info from bindingdb.org to be usable in excel
// @author       ibtisam midlet (ibtisam tweaks)
// @match        *://www.bindingdb.org/bind/AdvancedSearch.jsp*
// @icon         https://www.google.com/s2/favicons?domain=bindingdb.org
// @updateURL    https://github.com/ibtisammidlet/bindingdb.org-scraper/raw/main/bindingdb.org%20scraper.meta.js
// @downloadURL  https://github.com/ibtisammidlet/bindingdb.org-scraper/raw/main/bindingdb.org%20scraper.user.js
// @supportURL   https://biohackit.dailyinternetlife.com/2021/08/bindingdborg-scraper-targethost-species.html
// @date         2021-08-10
// @homepage     https://biohackit.dailyinternetlife.com/2021/08/bindingdborg-scraper-targethost-species.html
// @license      All Rights Reserved
// @require      https://code.jquery.com/jquery-3.4.0.min.js
// @grant        none
// ==/UserScript==

//* button of start fetching data
$( ".content_index p" ).append('<a id="scrappall" href="">click here to start fetching data and wait..</a><div class="copyright" id="copyright" style="color: #aaa !important; visibility: visible!important; opacity: 1!important;">made with 💊 antidepressant by <a rel="dofollow" title="daily internet life" style="display: inline-block!important; font-size: inherit!important; color: #0000a8 !important; visibility: visible!important; opacity: 1!important;">ibtisam midlet🥰</a> | <a href="https://biohackit.dailyinternetlife.com/2021/08/bindingdborg-scraper-targethost-species.html?utm_source=userscript">fatch for update for this script</a></div><style>#scrappall {    display: inline-block;    font-weight: 361;    text-align: center;    white-space: nowrap;    vertical-align: middle;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none;    border: 1px solid transparent;        border-top-color: transparent;        border-right-color: transparent;        border-bottom-color: transparent;        border-left-color: transparent;    border-top-color: transparent;    border-right-color: transparent;    border-bottom-color: transparent;    border-left-color: transparent;    padding: 0px 6px;    font-size: 9px;    line-height: 12px;    border-radius: .25rem;    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;    color: #fff;    background-color: #e9e9ed;    border-color: #8f8f9d;    color: #000;margin-left: 5px;}</style>');

//* checking if the user are on main page
if (window.location.href == "https://www.bindingdb.org/bind/AdvancedSearch.jsp" || window.location.href == "https://www.bindingdb.org/bind/AdvancedSearch.jsp#") {
//* now adding the link to fatch all the data
//* getting how much info there and set link for all the info
var resultnmbr = $(".content_index  table caption span.red").text();
var name = "https://www.bindingdb.org/bind/AdvancedSearch.jsp?kiunit=nM&icunit=nM&submit=repeat&energyterm=kJ%2Fmole&column=KI&startPg=0&Increment="+resultnmbr;
var a = document.getElementById('scrappall');
a.href = name ;

} else {

$( ".content_index p" ).append('<table  id="tableofscraption" style="width:100%"><tr id="Human"><th colspan="1">Target/Host</th><th colspan="1">species</th><th colspan="1">Ki nM</th><th colspan="1">IC50 nM</th><th colspan="1">kd nM</th><th colspan="1">EC50 nM</th><th colspan="1">act as</th></tr></table><style>#tableofscraption {margin-top: 3px;} table {  font-family: arial, sans-serif;  border-collapse: collapse;  width: 100%;}td, th {  border: 1px solid #dddddd; text-align: center;  padding: 0px;}tr:nth-child(even) {  background-color: #dddddd;}table * {    font-size: 9px;} #clickMe {font-size: 10px; padding: 0px 2px; cursor: pointer;}</style>');
//* now when the user is not on the main page after he click fetch all data the script do the work
//* scrapping info and injecting them to the table
$( ".index_table tbody tr" ).each(function( index ) {
var Target = $(this).find(" td a" ).html();
var species = $(this).find(" td span" ).html();
var Ki = $(this).find(" td:nth-child(6)" ).html();
var IC50 = $(this).find(" td:nth-child(8)" ).html();
var kd = $(this).find(" td:nth-child(9)" ).html();
var EC50 = $(this).find(" td:nth-child(10)" ).html();

if (IC50 != "n/a" && EC50 == "n/a") {
var ACTAS = "antagonist";
}else{
if (IC50 == "n/a" && EC50 == "n/a") {var ACTAS = "";}else{
var ACTAS = "agonist";
}
}

$(this).parent().parent().parent().find("#tableofscraption tbody").append('<tr ><td id="Target">'+Target+'</td><td id="species">'+species+'</td><td id="Ki">'+Ki+'</td><td id="IC50">'+IC50+'</td><td id="kd">'+kd+'</td><td id="EC50">'+EC50+'</td><td id="actas">'+ACTAS+'</td></tr>')
});

//*deleting undefined divs
$( "tr :contains('undefined')" ).parent().remove();

//* checking if the data loaded completely or not
var fatched = $(".content_index  table caption span.red").text();
var rowCountall = document.getElementById('tableofscraption').rows.length;
var rowCount = rowCountall-1;
if (fatched == rowCount) {
} else {alert("data was not loaded completely, it might be capacity problem or maintenance downtime etc.. try again later")}

//* changing fetching button to refetch
$('#scrappall').text("refetch");

//* now using the scraped data
//* delete non human study if human study is available for specific receptor
if (window.location.href.indexOf("&Increment=") > 0) {
//* firstly set a uniqe id for human study
$( "#tableofscraption").find("tr:contains('(Homo sapiens (Human))')" ).each(function( index ) {
$(this).attr('id', 'Human');
})
//* then loop on none human study
$( "#tableofscraption").find("tr:not(#Human)" ).each(function( index ) {
//* get the target of non human study
var nonhumantaregt = $(this).find("#Target").text()
//* check if human study have this target
if($("#Human #Target").text().indexOf(''+nonhumantaregt+'') !== -1) {
//* deleting none human study if there a human study for this receptor
$("#tableofscraption").find("tr:not(#Human) #Target:contains('"+nonhumantaregt+"')").parent().remove();
}
}
)
}

//* the table sorting
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));
};

//* analytics
$( "body" ).append(' <script type="text/javascript"> var sc_project=12574329;  var sc_invisible=1;  var sc_security="dc48872a";  </script> <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script> <noscript><div class="statcounter"><a title="free hit counter" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/12574329/0/dc48872a/1/" alt="free hit counter"></a></div></noscript> ');