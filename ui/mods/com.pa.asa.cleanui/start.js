function _start() {

    var _logobackground = document.getElementById('logo-background')
    var _commander = document.getElementById('commander-img')
    var _build = document.getElementById('build-info')
    _commander.style.position = 'absolute'
    _commander.style.height="75%"
    _commander.style.left = "0"
    _commander.style.right = "0"
    _commander.style.left = "0%"
    _commander.style.bottom = "5%"
    _commander.style.zIndex = "1"
    
    _build.style.position = "absolute"
    _build.style.textAlign = "center"
    _build.style.left = "0"
    _build.style.right = "0"
    _build.style.marginTop = "13%"
    _build.style.marginLeft = "auto"
    _build.style.marginRight = "auto"
    _build.innerText = "Build: " + window.gVersion
    
    _logobackground.id = ""
    _logobackground.style.position = "absolute"
    _logobackground.style.left = "0"
    _logobackground.style.right = "0"
    _logobackground.style.marginTop = "5%"
    _logobackground.style.marginLeft = "auto"
    _logobackground.style.marginRight = "auto"
    _logobackground.style.height = "100%"
    _logobackground.style.background = "url('uncached://pa/ui/logo/logo.png') center top no-repeat"
    _logobackground.style.backgroundSize = "30%"
    _logobackground.style.opacity = "1"
    _logobackground.style.pointerEvents = "none"
    var _logo = _logobackground
    _logobackground.remove()
    var _contentwrapper = document.getElementById('content-wrapper')
    _contentwrapper.appendChild(_logo)
    _contentwrapper.appendChild(_build)
    _contentwrapper.appendChild(_commander)
    
    function _nav(text, action) {
        var element = document.createElement('div')
        element.className = "col p-1"
        element.innerHTML = '<div style="width: auto" class="nav_item nav_item_text btn_std_ix" data-bind="click: ' + action + ', click_sound: \'default\', rollover_sound: \'default\'">' + text + '</div>'
        element.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
        element.style.textAlign = "center"
        return element
    }

    var _content = document.createElement('div')
    _content.className = "container"
    _content.style.zIndex = "100"
    var _row = document.createElement('div')
    _row.className = "row"
    _content.style.height="100%"
    _content.style.left = "0"
    _content.style.right = "0"
    _content.style.marginTop = "40%"
    _content.style.marginLeft = "auto"
    _content.style.marginRight = "auto"

    _row.appendChild(_nav('ai skirmish', 'navToAISkirmish'))
    _row.appendChild(_nav('galactic war', 'navToGalacticWar'))
    _row.appendChild(_nav('multiplayer', 'navToServerBrowser'))
    _row.appendChild(_nav('mods', 'navToCommunityMods'))
    _row.appendChild(_nav('settings', 'navToSettings'))
    _row.appendChild(_nav('quit', 'exit'))
    _content.appendChild(_row)

    document.getElementById('start_column').remove()
    document.getElementById('content').remove()
    _contentwrapper.appendChild(_content)
}
_start()