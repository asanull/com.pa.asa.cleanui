var menu = {
    buttonCount: 0,
    instantSandbox: false,
    singleplayer: "",
    multiplayer: "",
    reconnect: {
        visible: false,
        nav: ""
    },
    mods: "",
    settings: "",
    modCount: 0
}

if ($('#nav_reconnect').length > 0) {
    menu.reconnect.visible = true
    menu.reconnect.nav = document.createElement('div')
    menu.reconnect.nav.className = "col"
    menu.reconnect.nav.innerHTML = '<div style="width: auto" class="nav_item nav_item_text btn_std_ix" data-bind="visible: canDirectReconnect, click: directReconnect, click_sound: \'default\', rollover_sound: \'default\'">Reconnect</div>'
    menu.reconnect.nav.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
    menu.reconnect.nav.style.textAlign = "center"
}

self.showModMenu = ko.observable(false);
self.toggleModMenu = function () {
    self.showModMenu(!self.showModMenu());
}
self.showGameMenu = ko.observable(false);
self.toggleGameMenu = function () {
    self.showGameMenu(!self.showGameMenu());
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
self.startInstantSandbox = function () {
    console.log('startInstantSandbox');
}

function _init() {

    // I should really make use of functions here but for time being I'm lazy
    menu.singleplayer = document.getElementById('navigation_items').children[0]
    menu.multiplayer = document.getElementById('navigation_items').children[1]
    menu.singleplayer.children[0].outerHTML = '<div id="nav-single-player" class="btn_std_ix nav_item nav_item_text" data-bind="event: {mouseover: toggleSinglePlayerMenu, mouseout: toggleSinglePlayerMenu}, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showSinglePlayerMenu }"><loc>Single Player</loc><div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div>'
    menu.multiplayer.children[0].outerHTML = '<div id="nav-multiplayer" class="nav_item nav_item_text btn_std_ix" data-bind="event: {mouseover: toggleMultiplayerMenu, mouseout: toggleMultiplayerMenu}, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showMultiplayerMenu }"><loc>Multiplayer</loc><div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div>'

    var _subItem = document.createElement('div')
    _subItem.innerHTML = menu.singleplayer.children[1].outerHTML
    _subItem.style.position = 'absolute'
    _subItem.style.left = "-230px"
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

    menu.settings = document.createElement('div')
    menu.settings.className = "nav_cascade_group"
    menu.settings.innerHTML = '<div id="nav-settings" class="nav_item nav_item_text btn_std_ix" data-bind="event: {mouseover: toggleGameMenu, mouseout: toggleGameMenu}, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showGameMenu }"><loc>Multiplayer</loc><div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div>'

    _subItem = document.createElement('div')
    _subItem.innerHTML = menu.multiplayer.children[1].outerHTML
    _subItem.style.position = 'absolute'
    _subItem.style.left = "-232px"
    _subItem.style.top = "46px"
    _subItem.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
    _subItem.style.textAlign = "center"
    _subItem.children[0].outerHTML = '<div id="nav-settings-sub" class="nav_sub_item" style="display: none" data-bind="visible: showGameMenu"><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToEditPlanet, click_sound: \'default\', rollover_sound: \'default\'"><loc id="reload-mods">System Creator</loc></div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToArmory, click_sound: \'default\', rollover_sound: \'default\'"><loc>Armory</loc></div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToSettings, click_sound: \'default\', rollover_sound: \'default\'"><loc id="reload-mods">Settings</loc></div><button class="nav_item nav_item nav_item_text btn_std_ix" data-toggle="modal" data-target="#cleanUIModal" data-bind="click_sound: \'default\', rollover_sound: \'default\'"><loc id="clean-ui">Clean UI</loc></button></div>'

    menu.multiplayer.children[1].remove()
    menu.settings.children[0].children[0].innerText = "Game"
    menu.settings.children[0].appendChild(_subItem)

    var glpyh = menu.settings.children[0].children[1]
    glpyh.className = "glyphicon glyphicon-chevron-down nav_carat"
    glpyh.style.top = "6px"
    glpyh.style.right = "12px"

    var col = document.createElement('div')
    col.className = "col p-1"
    col.innerHTML = '<div style="margin: 0" >' + menu.settings.outerHTML + '</div>'
    col.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
    col.style.textAlign = "center"
    col.style.boxSizing = "content-box !important"
    menu.settings = col

    _start()
}
_init()

function _start() {

    var _logobackground = document.getElementById('logo-background')
    var _commander = document.getElementById('commander-img')
    var _build = document.getElementById('build-info')
    var _tabs = document.createElement('div')
    _commander.style.position = 'absolute'
    _commander.style.height = "75%"
    _commander.style.left = "0"
    _commander.style.right = "0"
    _commander.style.left = "0%"
    _commander.style.bottom = "5%"
    _commander.style.zIndex = "1"
    _tabs.innerHTML = document.getElementById('content-right').innerHTML
    _tabs.style.position = 'absolute'
    _tabs.style.bottom = "34px"
    _tabs.style.right = "0"
    _tabs.id = "content-right"

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
    document.body.appendChild(_build)
    _contentwrapper.appendChild(_commander)
    document.body.appendChild(_tabs)

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

    _addButton(_row, _col(_singleplayer))
    _addButton(_row, _col(_multiplayer))
    _addButton(_row, menu.mods)
    _addButton(_row, menu.settings)
    _addButton(_row, _nav('quit', 'exit'))
    _content.appendChild(_row)

    document.getElementById('start_column').style.display = "none"
    document.getElementById('content').remove()
    _contentwrapper.appendChild(_content)
    
    var before = document.getElementById('nav-ranked').previousElementSibling
    document.getElementById('nav-multiplayer-custom').insertBefore(menu.reconnect.nav, before)

    $('#start_column #nav-saved-games').remove()
    document.getElementById('nav-saved-games').style.display = null

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            _contentwrapper.style.display = null

            $('#tabs')[0].children[0].remove()
            $('#tabs')[0].children[0].remove()
            var text = 'Patch Notes'
            $('#tabs')[0].children[0].outerHTML =
            '<button data-toggle="modal" data-target="#patchNotesModal"  id="streams-button" class="tab btn_std_ix" data-placement="top" data-bind="click: toggleLiveStreamsTab, click_sound: \'default\', rollover_sound: \'default\', css: { \'btn_std_ix_active\': $root.showingLiveStreamsTab, highlight: $root.liveStreamsCount }, tooltip: \'!LOC:Twitch\'" data-original-title="" title=""><loc>' + text + '</loc></button>'
            $('#tabs')[0].children[0].style.height = "17px"
        }
    }
    
    // Instant Sandbox Support
    document.getElementById( 'navigation_items' ).addEventListener( 'DOMNodeInserted', function ( event ) {
        if( event.target.parentNode.id == 'navigation_items' ) {
            document.getElementById('nav-mods-sub').appendChild(document.getElementById('start_instant_sandbox'))
            document.getElementById('start_column').remove()
        };
    }, false );



    // create div for theme switching
    // add a dropdown to the div
    // add three options to the dropdown "MLA", "Legion" & "Bugs"

    /*
    self.showThemes = ko.observable(false);
    self.toggleThemes = function () {
        self.showThemes(!self.showThemes());
    }

    var themes = document.createElement('div')
    */



    //#region Modals
    var cleanui = {
        "title": "Clean UI",
        "description": "Change Theme:",
        "button": "Close",
        "div": document.createElement('div'),
    }
    cleanui.div.className = "modal"
    cleanui.div.id = "cleanUIModal"
    cleanui.div.setAttribute("tabindex", "-1")
    cleanui.div.setAttribute("role", "dialog")
    cleanui.div.setAttribute("aria-labelledby", "cleanUIModalLabel")
    cleanui.div.setAttribute("aria-hidden", "true")
    cleanui.div.innerHTML =
    '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">' + cleanui.title + '</h5></div><div class="modal-body">' + cleanui.description + '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + cleanui.button + '</button></div></div></div>'
    document.body.appendChild(cleanui.div)
    




    var patchnotes = {
        "title": "patchnotes",
        "description": "patchnotes",
        "button": "Close",
        "div": document.createElement('div'),
    }
    patchnotes.div.className = "modal"
    patchnotes.div.id = "patchNotesModal"
    patchnotes.div.setAttribute("tabindex", "-1")
    patchnotes.div.setAttribute("role", "dialog")
    patchnotes.div.setAttribute("aria-labelledby", "patchNotesLabel")
    patchnotes.div.setAttribute("aria-hidden", "true")
    patchnotes.div.innerHTML =
    '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">' + patchnotes.title + '</h5></div><div class="modal-body">' + patchnotes.description + '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + patchnotes.button + '</button></div></div></div>'
    document.body.appendChild(patchnotes.div)

    //#endregion
}

function _addButton(parent, element) {
    parent.appendChild(element)
    menu.buttonCount++
}