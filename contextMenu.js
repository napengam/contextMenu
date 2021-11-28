function contextMenuF(id) {
    'use strict';
    var contextMenu, context_timeout, innerMenu = '', styleElem;
    if (typeof id === 'string') {
        innerMenu = document.getElementById(id);
    } else if (typeof id === 'object') {
        innerMenu = id;
    }
    if (document.querySelector('.liHover') === null) {
        styleElem = document.createElement('STYLE');
        styleElem.innerHTML = ".liHover:hover{cursor:pointer}";
        document.getElementsByTagName('head')[0].appendChild(styleElem);
    }

    contextMenu = document.createElement('DIV');
    Object.assign(contextMenu.style, {
        display: 'none',
        padding: '10px',
        border: '1px solid #efefef',
        backgroundColor: '#ececec'
    });
    if (innerMenu) {
        contextMenu.id = innerMenu.id;
        innerMenu.id = '';
        contextMenu.appendChild(innerMenu);
        contextMenu.querySelectorAll('li').forEach((elem) => {
            elem.classList.add('liHover');
        });
    } else {
        contextMenu.id = new Date().getTime();
        contextMenu.innerHTML = "<ul></ul>";
        innerMenu = contextMenu.firstChild;
    }
    Object.assign(innerMenu.style, {
        listStyle: 'none',
        margin: '0px',
        padding: '0px'
    });
    document.body.appendChild(contextMenu);
    function add(id, icon, text, handler) {
        var ul;
        if (id === '__sep__') { // ugly ?
            sep();
            return;
        }
        ul = contextMenu.firstChild;
        ul.insertAdjacentHTML('beforeend', `<li class='liHover'  data-id=${id} > ${icon} ${text} `);
        if (typeof handler === 'function') {
            addHandler(id, handler);
        }
    }
    function addHandler(id, handler) {
        let elem;
        elem = getEntry(id);
        elem.onclick = '';
        elem.removeEventListener('click', handler, false);
        elem.addEventListener('click', handler, false);
    }
    function sep() {
        var ul;
        ul = contextMenu.firstChild;
        ul.insertAdjacentHTML('beforeend', `<hr>`);
    }
    function remove(id) {
        let elem;
        elem = getEntry(id);
        elem.parentNode.removeChild(elem);
    }
    function hide(id) {
        let elem;
        elem = getEntry(id);
        elem.style.display = 'none';
    }
    function show(id) {
        let elem = getEntry(id);
        elem.style.display = '';
    }
    function getEntry(id) {
        let ul, elem;
        ul = contextMenu.firstChild;
        elem = ul.querySelector("[data-id='" + id + "']");
        return elem;
    }
    function open(e) {
        let left, top, bedge, redge;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        e.preventDefault();
        //*********************
        // position context menu
        //********************/
        left = e.clientX;
        top = e.clientY;
        left = left + document.documentElement.scrollLeft;
        top = top + document.documentElement.scrollTop;
        ///******************
        //   render to get geometrie
        //******************/
        Object.assign(contextMenu.style, {
            display: 'inline-block',
            position: 'absolute',
            left: left - 5 + 'px',
            top: top - 5 + 'px',
            padding: '10px'
        });
        ///******************
        //   move into view if outside 
        //   past right edge or below bottom
        // ******************/
        bedge = window.pageYOffset + window.innerHeight;
        redge = window.pageXOffset + window.innerWidth;
        if (left + contextMenu.clientWidth >= redge) {
            left -= left + contextMenu.clientWidth - redge + 20;
            contextMenu.style.left = left + 'px';
        }
        if (top + contextMenu.clientHeight >= bedge) {
            top -= top + contextMenu.clientHeight - bedge + 20;
            contextMenu.style.top = top + 'px';
        }
        //*********************
        //  bring to front and set timeouts 
        //  for cursor in/out
        //**********************/
        contextMenu.style.zIndex = heighestZIndex(e.target || e.srcElement);
        contextMenu.focus();
        contextMenu.onmouseout = function () {
            context_timeout = setTimeout(close, 300);
        };
        contextMenu.onmouseover = function () {
            clearTimeout(context_timeout);
        };
    }
    function close() {
        contextMenu.style.display = 'none';
    }
    function heighestZIndex(obj) {// return highest Z-Index along the parent path
        var ob, z = 51, zz = 0;
        if (obj.style.zIndex !== '') {
            z = parseInt(obj.style.zindex, 10);
        }
        ob = obj.offsetParent;
        while (ob !== null && ob.tagName !== 'BODY') {
            if (ob.style.zIndex !== '') {
                zz = parseInt(ob.style.zIndex, 10);
            }
            if (zz > z) {
                z = zz;
            }
            ob = ob.offsetParent;
        }
        return z;
    }

    return{
        id: () => {
            return contextMenu.id;
        },
        add: add,
        addHandler: addHandler,
        remove: remove,
        open: open,
        close: close,
        hide: hide,
        sep: sep,
        show: show,
        getEntry: getEntry
    };
}