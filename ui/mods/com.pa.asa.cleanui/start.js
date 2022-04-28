var menu = {
    buttonCount: 0,
    instantSandbox: false,
    singleplayer: "",
    multiplayer: "",
    mods: "",
    modCount: 0
}
menu.singleplayer = document.getElementById('navigation_items').children[0]
menu.multiplayer = document.getElementById('navigation_items').children[1]
menu.singleplayer.children[0].outerHTML = '<div id="nav-single-player" class="btn_std_ix nav_item nav_item_text" data-bind="event: {mouseover: toggleSinglePlayerMenu, mouseout: toggleSinglePlayerMenu}, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showSinglePlayerMenu }"><loc>Single Player</loc><div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div>'
menu.multiplayer.children[0].outerHTML = '<div id="nav-multiplayer" class="nav_item nav_item_text btn_std_ix" data-bind="event: {mouseover: toggleMultiplayerMenu, mouseout: toggleMultiplayerMenu}, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showMultiplayerMenu }"><loc>Multiplayer</loc><div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div>'

var _subItem = document.createElement('div')
_subItem.innerHTML = menu.singleplayer.children[1].outerHTML
_subItem.style.position = 'absolute'
_subItem.style.left = "-232px"
_subItem.style.top = "46px"
_subItem.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
_subItem.style.textAlign = "center"
menu.singleplayer.children[1].remove()
menu.singleplayer.children[0].appendChild(_subItem)

_subItem = document.createElement('div')
_subItem.innerHTML = menu.multiplayer.children[1].outerHTML
_subItem.style.position = 'absolute'
_subItem.style.left = "-232px"
_subItem.style.top = "46px"
_subItem.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
_subItem.style.textAlign = "center"
menu.multiplayer.children[0].appendChild(_subItem)

self.showModMenu = ko.observable(false);
self.toggleModMenu = function () {
    self.showModMenu(!self.showModMenu());
}
self.reload = function () {

    document.getElementById('reload-mods').classList.add('nav_item_text_disabled')

    cmm = CommunityModsManager
    var start = Date.now();
    cmm.updateFileSystemMods().done(function () {
        cmm.processAvailableModData(cmm.availableMods());
        console.log((Date.now() - start) / 1000 + ' seconds to reload file system mods');
        location.reload()

    }).fail(function (results) {
        console.error('reloadFileSystemMods failed');

    });

}

menu.mods = document.createElement('div')
menu.mods.className = "nav_cascade_group"
menu.mods.innerHTML = '<div id="nav-mods" class="nav_item nav_item_text btn_std_ix" data-bind="event: {mouseover: toggleModMenu, mouseout: toggleModMenu}, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showModMenu }"><loc>Multiplayer</loc><div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div>'

_subItem = document.createElement('div')
_subItem.innerHTML = menu.multiplayer.children[1].outerHTML
_subItem.style.position = 'absolute'
_subItem.style.left = "-232px"
_subItem.style.top = "46px"
_subItem.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
_subItem.style.textAlign = "center"
_subItem.children[0].outerHTML = '<div id="nav-mods-sub" class="nav_sub_item" style="display: none" data-bind="visible: showModMenu"><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToCommunityMods, click_sound: \'default\', rollover_sound: \'default\'"><loc>Community Mods</loc></div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: reload, click_sound: \'default\', rollover_sound: \'default\'"><loc id="reload-mods">Reload Mods</loc></div></div>'

menu.multiplayer.children[1].remove()
menu.mods.children[0].children[0].innerText = "Mods"
menu.mods.children[0].appendChild(_subItem)

var glpyh = menu.mods.children[0].children[1]
glpyh.className = "glyphicon glyphicon-chevron-down nav_carat"
glpyh.style.top = "6px"
glpyh.style.right = "12px"

var col = document.createElement('div')
col.className = "col p-1"
col.innerHTML = '<div style="margin: 0" >' + menu.mods.outerHTML + '</div>'
col.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
col.style.textAlign = "center"
col.style.boxSizing = "content-box !important"
menu.mods = col

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
    _singleplayer.innerHTML = menu.singleplayer.innerHTML

    var _multiplayer = document.createElement('div')
    _multiplayer.classList.add('nav_cascade_group')
    _multiplayer.innerHTML = menu.multiplayer.innerHTML

    var _mods = _nav('mods', 'navToCommunityMods')

    _addButton(_row, _col(_singleplayer))
    _addButton(_row, _col(_multiplayer))
    _addButton(_row, menu.mods)
    _addButton(_row, _nav('settings', 'navToSettings'))
    _addButton(_row, _nav('quit', 'exit'))

    if (menu.instantSandbox) {
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