// ==UserScript==
// @name         bindingdb.org scraper
// @namespace    https://www.biotune.org/2021/08/bindingdborg-scraper-targethost-species.html
// @version      0.8
// @description  scraping info from bindingdb.org to be usable in excel
// @author       ibtisam midlet
// @match        *://*.bindingdb.org/bind/AdvancedSearch.jsp*
// @match        *://*.bindingdb.org/bind/as.jsp*
// @match        *://*.bindingdb.org/*/bind/AdvancedSearch.jsp*
// @match        *://*.bindingdb.org/*/bind/as.jsp*
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

//** css
$( "head" ).append(`<style>
#tableofscraption {
    font-family: 'Open Sans', sans-serif;
    width: 800px;
    text-align: left;
    margin: auto;
    margin-top: 10px;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 10px;

}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

th {
    padding: 3px 6px;
    background-color: #4eb5ff;
    color: #fff;
}

td {
    padding: 3px 6px;
    color: grey;
    color: #3c3c3c;
    border-left: 2px solid #fff;
}

tr {
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
}

tr:nth-child(2n) {
    background-color: #f8f6ff;
}

#tableofscraption tr:last-child {
    border-bottom: 1px solid #eee;
    border-radius: 10px;
}

#tableofscraption tr {
    transition: background 0.2s;
}

#tableofscraption tr:hover {
    background: #eee;
}
</style>`);

//* switch to https
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

//* button of start fetching data
$( ".content_index p" ).append('<a id="scrappall" href="">didnt redirected? click here and wait..</a><div class="copyright" id="copyright" style="color: #aaa !important; visibility: visible!important; opacity: 1!important;">made with 💊 antidepressant by <a rel="dofollow" title="daily internet life" style="display: inline-block!important; font-size: inherit!important; color: #0000a8 !important; visibility: visible!important; opacity: 1!important;">ibtisam midlet🥰</a> | <a href="https://biohackit.dailyinternetlife.com/2021/08/bindingdborg-scraper-targethost-species.html?utm_source=userscript">fatch for update for this script</a></div><style>#scrappall {    display: inline-block;    font-weight: 361;    text-align: center;    white-space: nowrap;    vertical-align: middle;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none;    border: 1px solid transparent;        border-top-color: transparent;        border-right-color: transparent;        border-bottom-color: transparent;        border-left-color: transparent;    border-top-color: transparent;    border-right-color: transparent;    border-bottom-color: transparent;    border-left-color: transparent;    padding: 0px 6px;    font-size: 9px;    line-height: 12px;    border-radius: .25rem;    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;    color: #fff;    background-color: #e9e9ed;    border-color: #8f8f9d;    color: #000;margin-left: 5px;}</style>');

//* checking if the user are on main page
if (window.location.href == "https://www.bindingdb.org/bind/AdvancedSearch.jsp" || window.location.href == "https://www.bindingdb.org/bind/AdvancedSearch.jsp#") {
//* now adding the link to fatch all the data
//* getting how much info there and set link for all the info
var resultnmbr = $(".content_index  table caption span.red").text();
var name = "https://www.bindingdb.org/bind/AdvancedSearch.jsp?kiunit=nM&icunit=nM&submit=repeat&energyterm=kJ%2Fmole&column=KI&startPg=0&Increment="+resultnmbr;
var a = document.getElementById('scrappall');
a.href = name ;
location.href= name
} else {

$( ".content_index p" ).append('<table  id="tableofscraption" style="width:100%"><tbody class="multisort"><tr id="Human" id="MAINxSELECT"><th colspan="1">Target/Host</th><th colspan="1">species</th><th colspan="1">Ki nM</th><th colspan="1">IC50 nM</th><th colspan="1">kd nM</th><th colspan="1">EC50 nM</th><th colspan="1">act as</th></tr></tbody></table>');
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
$("#tableofscraption").find("tr:not(#Human) #Target:contains('"+nonhumantaregt+"')").parent().hide();
}
}
)


//** deleting other value if ki available
$( "#tableofscraption").find("#Ki" ).each(function( index ) {
var dubvalue = $(this).parent().find("#Target" ).text();
$(this).parent().attr('class', 'KiValue');

if($("#Human #Target").text().indexOf(''+dubvalue+'') !== -1) {
$("#tableofscraption").find("tr:not(.KiValue) #Target:contains('"+dubvalue+"')").parent().hide();
}
}) //** each end
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
//** ki sort
$(':contains("Ki nM")').trigger('click');

/** uncompelte , ki sort then others function >>https://stackoverflow.com/questions/70945968/how-to-sort-table-by-two-columns-instead-of-one
const t=(tr,i)=>tr.cells[i].textContent;
$(".multisort tr").get()
  .sort((a,b)=>t(a,0).localeCompare(t(b,0)) || t(a,1).localeCompare(t(b,1)))
  .map(tr=>$(".meterList").append(tr));
*/



};




//* analytics
$( "body" ).append(' <script type="text/javascript"> var sc_project=12574329;  var sc_invisible=1;  var sc_security="dc48872a";  </script> <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script> <noscript><div class="statcounter"><a title="free hit counter" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/12574329/0/dc48872a/1/" alt="free hit counter"></a></div></noscript> ');