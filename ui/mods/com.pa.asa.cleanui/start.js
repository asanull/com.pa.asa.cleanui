var menu = {
    buttonCount: 0,
    instantSandbox: false,
    singleplayer: "",
    multiplayer: "",
    modCount: 0
}
menu.singleplayer = document.getElementById('navigation_items').children[0].innerHTML
menu.multiplayer = document.getElementById('navigation_items').children[1].innerHTML

function _start() {

    var _logobackground = document.getElementById('logo-background')
    var _commander = document.getElementById('commander-img')
    var _build = document.getElementById('build-info')
    _commander.style.position = 'absolute'
    _commander.style.height = "75%"
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
    _contentwrapper.style.display = "none"
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
    function _col(element) {
        element.className = "nav_cascade_group"
        element.children[0].style.margin = "0"
        element.children[0].style.textAlign = "center"
        element.children[1].style.left = "0"
        element.children[1].style.top = "50px"
        element.children[1].style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
        element.children[1].style.textAlign = "center"

        var glpyh = element.children[0].children[1]
        glpyh.className = "glyphicon glyphicon-chevron-down nav_carat"
        glpyh.style.top = "6px"
        glpyh.style.right = "12px"

        var col = document.createElement('div')
        col.className = "col p-1"
        col.innerHTML = '<div style="margin: 0" >' + element.outerHTML + '</div>'
        col.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
        col.style.textAlign = "center"
        col.style.boxSizing = "content-box !important"

        return col
    }

    var _content = document.createElement('div')
    _content.className = "container"
    _content.style.zIndex = "100"
    var _row = document.createElement('div')
    _row.className = "row"
    _content.style.width = "100%"
    _content.style.height = "100%"
    _content.style.left = "0"
    _content.style.right = "0"
    _content.style.marginTop = "40%"
    _content.style.marginLeft = "auto"
    _content.style.marginRight = "auto"
    
    api.mods.getMounted("client").then(function (mods) {
        menu.instantSandbox = 
        _.intersection(_.pluck(mods, "identifier"), [
            "com.wondible.pa.instant_sandbox",
        ]).length > 0;
        menu.modCount = mods.length
    })

    var _singleplayer = document.createElement('div')
    _singleplayer.classList.add('nav_cascade_group')
    _singleplayer.innerHTML=menu.singleplayer

    var _multiplayer = document.createElement('div')
    _multiplayer.classList.add('nav_cascade_group')
    _multiplayer.innerHTML=menu.multiplayer

    var _mods = _nav('mods', 'navToCommunityMods')

    _addButton(_row, _col(_singleplayer))
    _addButton(_row, _col(_multiplayer))
    _addButton(_row, _mods)
    _addButton(_row, _nav('settings', 'navToSettings'))
    _addButton(_row, _nav('quit', 'exit'))

    if(menu.instantSandbox) {
        //_addButton(_row, _nav('sandbox', 'startInstantSandbox'))
        //currently disabled as it is not working although the button shows up just fine
    }
    _content.appendChild(_row)

    document.getElementById('start_column').remove()
    document.getElementById('content').remove()
    _contentwrapper.appendChild(_content)

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            _contentwrapper.style.display = null
        }
    }
}
_start()

function _addButton(parent, element) {
    parent.appendChild(element)
    menu.buttonCount++
}