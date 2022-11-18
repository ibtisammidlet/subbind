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


//* checking if the user are on first page
if (window.location.href.indexOf("sources=1&sources=2") > 0) {
window.location="https://www.bindingdb.org/bind/AdvancedSearch.jsp?kiunit=nM&icunit=nM&submit=repeat&energyterm=kJ%2Fmole&column=KI&startPg=0&Increment=10000";
} else {

$( ".content_index p" ).append('<table  id="tableofscraption" style="width:100%"><tbody class="multisort"><tr id="Human" id="MAINxSELECT"><th colspan="1">Target/Host</th><th colspan="1">species</th><th colspan="1">Ki nM</th><th colspan="1">IC50 nM</th><th colspan="1">kd nM</th><th colspan="1">EC50 nM</th><th colspan="1">act as</th></tr></tbody></table>');
/** if not on the first page do the work **/
//* scrapping info and injecting them to the table
$( ".index_table tbody tr" ).each(function( index ) {
var Target = $(this).find(" td a" ).html();
var species = $(this).find(" td span" ).html();
var Ki = $(this).find(" td:nth-child(6)" ).html();
var IC50 = $(this).find(" td:nth-child(8)" ).html();
var kd = $(this).find(" td:nth-child(9)" ).html();
var EC50 = $(this).find(" td:nth-child(10)" ).html();

/** setting efficacy **/
if (IC50 != "n/a" && EC50 == "n/a") {
var ACTAS = "antagonist";
}else{
if (IC50 == "n/a" && EC50 == "n/a") {var ACTAS = "";}else{
var ACTAS = "agonist";
}
}



$(this).parent().parent().parent().find("#tableofscraption tbody").append('<tr ><td id="Target">'+Target+'</td><td id="species">'+species+'</td><td id="Ki">'+Ki+'</td><td id="IC50">'+IC50+'</td><td id="kd">'+kd+'</td><td id="EC50">'+EC50+'</td><td id="actas">'+ACTAS+'</td></tr>')
});

/**deleting undefined divs **/
$( "tr :contains('undefined')" ).parent().remove();

//* checking if the data loaded completely or not
var fatched = $(".content_index  table caption span.red").text();
var rowCountall = document.getElementById('tableofscraption').rows.length;
var rowCount = rowCountall-1;
if (fatched == rowCount) {
} else {alert("data was not loaded completely, it might be capacity problem or maintenance downtime etc.. try again later")}


/** now using the scraped data **/
/** delete non human study if human study is available for specific receptor **/
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


/** here add efficacy in ki from IC/EC50 **/
//** for antagonist
$( "#tableofscraption").find("#actas:contains('antagonist')" ).each(function( index ) {
var targetwithefficacy = $(this).parent().find("#Target").text();
$( "#tableofscraption").find( "#Target:contains('"+targetwithefficacy+"')").each(function( index ) {
$(this).parent().find("#actas").text("antagonist");
})
})
//** for agonist
$( "#tableofscraption").find("#actas:contains('agonist')" ).each(function( index ) {
if($(this).text() === "agonist") {
var targetwithefficacyag = $(this).parent().find("#Target").text();
//* to this point code tested
$( "#tableofscraption").find( "#Target:contains('"+targetwithefficacyag+"')").each(function( index ) {
$(this).parent().find("#actas").text("agonist");
})
//* to here not tested but its copyed from the antagonist function which works
}
})



/** deleting other value if ki available **/
$( "#tableofscraption").find("#Ki" ).each(function( index ) {
var dubvalue = $(this).parent().find("#Target" ).text();
$(this).parent().attr('id', 'KiValue');

if($("#Human #Target").text().indexOf(''+dubvalue+'') !== -1) {
$("#tableofscraption").find("tr:not(#KiValue) #Target:contains('"+dubvalue+"')").parent().hide();
}
}) //** each end
}

/** the table sorting **/
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









};




//* analytics
$( "body" ).append(' <script type="text/javascript"> var sc_project=12574329;  var sc_invisible=1;  var sc_security="dc48872a";  </script> <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script> <noscript><div class="statcounter"><a title="free hit counter" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/12574329/0/dc48872a/1/" alt="free hit counter"></a></div></noscript> ');
















/** uncompelte , ki sort then others function >>https://stackoverflow.com/questions/70945968/how-to-sort-table-by-two-columns-instead-of-one
const t=(tr,i)=>tr.cells[i].textContent;
$(".multisort tr").get()
  .sort((a,b)=>t(a,0).localeCompare(t(b,0)) || t(a,1).localeCompare(t(b,1)))
  .map(tr=>$(".meterList").append(tr));
*/