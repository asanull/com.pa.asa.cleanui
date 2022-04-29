var _contentwrapper = document.getElementsByClassName('section_content')[0]
var _content = document.createElement('div')
var _commit = document.getElementsByClassName('div_commit_cont')
var _backgroundGlow = document.getElementsByClassName('background_glow')
var _sectionTitle = document.getElementsByClassName('section_title')

function _start() {
    console.log("_start()")
    _contentwrapper.style.display = "none"
    _commit[0].style.display = "none"
    _backgroundGlow[0].style.display = "none"
    _sectionTitle[0].style.display = "none"
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            _continue()
        }
    }
}
//_start()
//currently disabled as it is not in a playable state

function _continue() {
    console.log("_continue()")
    
    var _gameRoster = document.getElementsByClassName('game_roster')[0]

    _content.className = "w-50 h-100"
    _contentwrapper.className = "d-flex align-items-center w-100 h-100"
    _content.innerHTML = _gameRoster.innerHTML
    _contentwrapper.innerHTML = null
    _contentwrapper.appendChild(_content)
    _contentwrapper.style.display = null

}