console.log('Clean UI System Editor');

model.defaultRadiusRange = { min: 100, max: 2500 };
model.valueRanges = {
    radius: { min: 100, max: 2500 },
    heightRange: { min: -1500, max: 1500 },
    biomeScale: { min: 0, max: 5000 },
    waterHeight: { min: 0, max: 100 },
    waterDepth: { min: 0, max: 5000 },
    temperature: { min: 0, max: 100 },
    metalDensity: { min: 0, max: 100 },
    metalClusters: { min: 0, max: 100 },
    numArmies: { min: 2, max: 10 },
    landingZonesPerArmy: { min: 1, max: 5 },
    landingZoneSize: { min: 50, max: 500 },
    mass: { min: 5000, max: 50000 }
};

var header = document.getElementsByClassName('div_header_bar')[0]

header.children[0].style.background = "rgba(0,0,0,0.5)"
header.children[0].style.height = "75px"
header.children[1].remove()

//#region System Creator Title
var _title = header.children[0].children[0]
_title.innerHTML = "<loc>System Creator</loc>"
_title.style.marginLeft = "15px"
//#endregion
//#region System Creator Header
var _systemName = header.children[0].children[1]
//_systemName.style.position = "relative"
//_systemName.style.left = "-660px"

_systemName.children[0].style.fontSize = "17px"
_systemName.children[0].style.fontWeight = "bold"
_systemName.children[0].style.margin = "0px"
_systemName.children[0].style.color = "#e9a71e"
_systemName.children[0].innerHTML = "<loc>System:</loc>"

_systemName.children[1].style = "margin: 0px 10px 0px 0px; padding: 6px 0px 6px 6px;font-weight: bold;"
_systemName.children[1].style.background = "transparent"
_systemName.children[1].style.border = "1px solid transparent"
_systemName.children[1].style.boxShadow = "none"
_systemName.children[1].style.fontSize = "17px"
_systemName.children[1].style.width = "150px"

console.log(model.systemName())


$(document).ready(function () {
    if (document.readyState == "complete") {
        document.body.style.display = null
        var _input = _systemName.children[1]
        
        _input.style.width = _input.value.length*10 + 10 +"px"

        _input.addEventListener("input", function() {
            _input.style.width = _input.value.length*10 + 10 +"px"
        });
        
        _editIcon = document.getElementById('edit-icon')
        _editIcon.style.marginRight = "25px"
        _editIcon.style.display = null
    }
})

_editIcon = document.createElement('svg')
_systemName.appendChild(_editIcon)
var _path = '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>'
_editIcon.outerHTML = '<svg id="edit-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16">' + _path + '</svg>'
document.getElementById('edit-icon').style.display = "none"


//#endregion
//#region Planet Build Bar
var _planetBuildBar = document.getElementById('planet_build_bar')
_planetBuildBar.children[1].id = "new_planet_build_bar"
_planetBuildBar.outerHTML = _planetBuildBar.children[1].outerHTML
_planetBuildBar = document.getElementById('new_planet_build_bar')

_planetBuildBar.style.position = "absolute"
_planetBuildBar.style.bottom = "35px"

$('#bldbar1')[0].children[0].className = ""

$('.div_build_item .asteroid_belt')[0].id = "asteroid-belt-container"
$('.div_build_bar_cont .div_build_item').each(function (i, planet) {
    if(planet.children[0].id!=="asteroid-belt-container") {
        planet.style.borderRight = "none"
        planet.style.borderBottom = "none"
        
        var scale = 57.5
        planet.children[0].style.width = scale + "px"
        planet.children[0].style.height = scale + "px"
        planet.children[0].style.padding = "10px"
    }
})
$('#bldbar1')[0].children[0].children[0].style.background = "rgba(0,0,0,0.5)"
$('#asteroid-belt-container')[0].children[0].style = "padding: 10px"
//#endregion
//#region System Creator Header Buttons
$('.btn_toolbar').each(function(i, btn) {
    btn.style.width = null
    btn.style.fontSize = "15px"
    btn.style.fontWeight = "bold"

    switch (i) {
        case 0:btn.value="PREVIEW";break;
        case 2:btn.value="CLEAR";break;
        case 3:btn.value="EXPORT";btn.classList.toggle("btn_commit_grn");break;
        case 4:btn.value="SAVE";btn.style.width = "100px";break;
        case 5:btn.style.marginRight="40px";break;
    }
});
//#endregion
//#region Planet Editor
_editor = document.getElementsByClassName('div_sys_editor_group')[0]
_editor.children[0].remove()
_editor = _editor.children[0]
_editor.children[0].children[0].remove()
var _planetTitle = _editor.children[0].children[0].children[0].children[0]

_planetTitle.style.background = "transparent"
_planetTitle.style.border = "1px solid transparent"
_planetTitle.style.boxShadow = "none"
_planetTitle.style.fontSize = "30px"
_planetTitle.style.fontWeight = "bold"
_planetTitle.style.marginTop = "5px"
//#endregion
//#region Planet List
var _planetList = document.getElementsByClassName('div_planet_list_control')[0]
_planetList.id = "planet-list"
_planetList.className = ""
_planetList = document.getElementById('planet-list')
_planetList.style.boxShadow = "inset 0px 0px 10px rgba(255,255,255,.2)"
_planetList.style.background = "rgba(0,0,0,0.5)"
_planetList.style.padding = "3px"

$('.div_planet_summary')[0].style.height = "auto"
$('.div_planet_summary')[0].addEventListener( 'DOMNodeInserted', function () {
    $('.btn_planet_thumb ').each(function(i, planet) {
        var scale = 57.5
        planet.children[0].style.width = scale + "px"
        planet.children[0].style.height = scale + "px"
        planet.children[0].style.padding = "10px"
    });
}, false );

$('.div_build_bar_unit_hover_detail')[0].style.marginBottom = "17px"
//#endregion