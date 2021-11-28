# Create Context Menu  

  
### Dependencies:    
Fontawesome is used to creat the icons within a contextmenu.  
You can use what ever you want for doing this or leave it blank

### Demo

Please see demo at [hgsweb.de](https://hgsweb.de/)

### JavaScript functions to create a context menu. 

A call to `ctm=new contextMenuF();` will return the object below in `ctm` , with access to  
functions inside the module.   

```
return {  
    id: () => {  // return id of context menu
    return contextMenu.id;  
    },  
    add: add,  // add(id, icon, text, handler)  a new entry to the menue at the end
    addHandler: addHandler,   //addHandler(id, handler) add an eventlistener for a given menu entry
    remove: remove, // remove(id) , remove an entry  
    open: open,  // open(e)  open context menu
    close: close,   // close() close contextmenu
    hide: hide,   // hide(id) entry 
    sep: sep,   // sep(), add a <hr> 
    show: show,  // show(id) given entry
    getEntry: getEntry  // getEntry(id) get Entry  
}
```

### Creat a contextmenu from HTML


`ctm=new contextMenuF('todomenu');`

```
<ul id='todomenue'>
    <li data-id='soup' ><i class="fas fa-sort-alpha-up" aria-hidden="true"></i> sort ascending
    <li data-id='sodown'  ><i class="fas fa-sort-alpha-down" aria-hidden="true"></i> sort descending
    <li><hr>
    <li data-id='insert' ><i class=" fas fa-sign-in-alt fa-flip-horizontal" aria-hidden="true"></i> new row
    <li data-id='delete' ><i class=" fas fa-trash" aria-hidden="true"></i> delet row ...
</ul>
```
Now add eventlisteners to some entrys

```
ctm.addHandler('soup',sortUp)
ctm.addHandler('sodown',sortDown)
```

Attache the contextmenu to an element of your choice like:

```
document.getElementById('herewego').oncontextmenu = ctm.open;
```

### Creta a contextmenu from JavaScript

Please see demo at [hgsweb.de](https://hgsweb.de/)