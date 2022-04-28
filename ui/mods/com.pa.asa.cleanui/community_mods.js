console.log('Clean UI hooked')

function _start() {
    document.body.style.display = null

    var mods = {
        sectionContent : "",
        back : "",
    }

    mods.back = document.createElement('div')
    mods.back = document.getElementsByClassName('content')[0].children[0]
    //mods.back.className = "nav_item nav_item_text btn_std_ix"

    document.getElementsByClassName('section_title')[0].remove()
    document.getElementsByClassName('section_content_top_bar')[0].remove()

    document.getElementsByClassName('col_1')[0].appendChild(mods.back)

    var _card = document.createElement('div')
    _card.classList.add('card')
    _card.style.backgroundColor = '#1a1a1a'
    _card.style.width = '100%'
    _card.style.height = '100%'
    _card.style.padding = '24px'
    _card.appendChild(mods.back)

    var _sectionContent = document.getElementsByClassName('section_content')[0]
    _sectionContent.style.background = "none"
    _sectionContent.innerText = ""
    _sectionContent.appendChild(_card)

    function _nav(text, action) {
        var element = document.createElement('div')
        element.className = "col p-1"
        element.innerHTML = '<div style="width: auto" class="nav_item nav_item_text btn_std_ix" data-bind="click: ' + action + ', click_sound: \'default\', rollover_sound: \'default\'">' + text + '</div>'
        element.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
        element.style.textAlign = "center"
        return element
    }
    function _addButton(parent, element) {
        parent.appendChild(element)
        menu.buttonCount++
    }
}