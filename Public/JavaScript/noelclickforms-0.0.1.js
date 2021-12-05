/**
 * @name noelClickForms
 * @author Noel Kayabasli
 * @copyright 2021 by Noel Kayabasli
 * @license https://github.com/NoelClick/noelclickforms/blob/main/LICENSE
 * @version 0.0.1
 */
class NcfMultiselect {

    /**
     * Get all multiselect elements.
     */
    constructor() {
        console.log('%c noelClickForms %c created with ❤ by Noel Kayabasli.', 'font-weight: bold; font-size: 40px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)','font-weight: bold; font-size: 20px;');
        const multiselectElements = document.querySelectorAll(".ncf-multiselect");
        let i = 0;
        multiselectElements.forEach(multiselectElementsItem => {
            multiselectElementsItem.setAttribute("ncf-multiselect-id",i);
            this.createNcfMultiselect(multiselectElementsItem,i);
            i++;
        });
        this.searchNcfMultiselect();
    }

    /**
     * create new ncf multiselect element
     * @param item - select source item
     * @param id
     */
    createNcfMultiselect(item,id) {
        item.insertAdjacentElement('afterend', this.buildNcfMultiselect(item,id));
    }

    /**
     * build + insert ncf multiselect element (html)
     * @param item
     * @param id
     * @return {*}
     */
    buildNcfMultiselect(item,id) {
        // hide default multiselect item
        item.style.display = "none";
        // create new ncf multiselect element
        let resultElement;
        resultElement = document.createElement("div");
        resultElement.classList = "ncf-multiselect--container";
        resultElement.setAttribute("target-id",item.getAttribute("id"));
        resultElement.setAttribute("ncf-multiselect-id",id);
        resultElement.innerHTML =   '<div class="ncf-multiselect--box"></div>' +
            '<div class="ncf-multiselect--body">' +
            '<input type="text" class="ncf-multiselect--input" placeholder="Search for an item..." />' +
            '<hr>' +
            '<div class="ncf-multiselect--selectbox" ncf-multiselect-selectboxid="'+id+'" id="ncf-multiselect-selectboxid'+id+'">' +
            '</div>' +
            '</div>';

        // insert options
        this.insertNcfMultiselectItems(item,resultElement);

        return resultElement;
    }

    /**
     * insert multiselect options into current multiselect element that was inserted into DOM before.
     * @param item
     * @param resultElement
     * @return {*}
     */
    insertNcfMultiselectItems(item,resultElement) {
        // this version gets the data from the select element
        let option;
        for (let i = 0; i < item.length; i++) {
            option = item[i];
            resultElement.querySelector(".ncf-multiselect--box").innerHTML += '<div class="ncf-multiselect--selectitem ncf-multiselect--selectitem--inactive" ncf-multiselect-selectid="'+i+'" ncf-multiselect-value="'+option.getAttribute("value")+'">'+option.innerText+'<span><i class="bi bi-dash-circle"></i></span></div>';
            resultElement.querySelector(".ncf-multiselect--selectbox").innerHTML += '<div class="ncf-multiselect--selectitem ncf-multiselect--selectitem--in" ncf-multiselect-list="true" ncf-multiselect-selectid="'+i+'" ncf-multiselect-value="'+option.getAttribute("value")+'">'+option.innerText+'<span><i class="bi bi-plus-circle"></i></span></div>';
        }
        // add event listener
        this.addEventListenerNcfMultiselect(resultElement);

        // this version would get the data from an ajax query.
        // const url = "/";
        // $.ajax({
        //     type: 'POST',
        //     url: url,
        //     cache: false,
        //     contentType: false,
        //     processData: false,
        //     success: function (data) {
        //         data = JSON.parse(data);
        //         let i = 0;
        //         data.forEach(dataItem => {
        //             resultElement.querySelector(".ncf-multiselect--box").innerHTML += '<div class="ncf-multiselect--selectitem ncf-multiselect--selectitem--inactive" ncf-multiselect-selectid="'+i+'" ncf-multiselect-value="'+dataItem["id"]+'">'+dataItem["title"]+'<span><i class="bi bi-dash-circle"></i></span></div>';
        //             resultElement.querySelector(".ncf-multiselect--selectbox").innerHTML += '<div class="ncf-multiselect--selectitem ncf-multiselect--selectitem--in" ncf-multiselect-list="true" ncf-multiselect-selectid="'+i+'" ncf-multiselect-value="'+dataItem["id"]+'">'+dataItem["title"]+'<span><i class="bi bi-plus-circle"></i></span></div>';
        //             i++;
        //         });
        //         this.addEventListenerNcfMultiselect(resultElement);
        //         return true;
        //     },
        //     error: function (data) {
        //         console.log("error");
        //         console.log(data)
        //     }
        // });
        return resultElement;
    }

    /**
     * add click event listener to all multiselect options
     * @param resultElement
     */
    addEventListenerNcfMultiselect(resultElement) {
        let selectItems = resultElement.querySelector(".ncf-multiselect--selectbox").children;
        for (let i = 0; i < selectItems.length; i++) {
            selectItems[i].addEventListener("click", event => {
                if (!event.target.classList.contains("ncf-multiselect--selectitem")) {
                    event.target.closest(".ncf-multiselect--selectitem").classList.toggle("ncf-multiselect--selected");
                    this.toggleToSelectedTwinElementNcfMultiselect(event.target.closest(".ncf-multiselect--selectitem"));
                    this.editOriginalSelectElementNcfMultiselect(event.target.closest(".ncf-multiselect--selectitem"));
                } else {
                    event.target.classList.toggle("ncf-multiselect--selected");
                    this.toggleToSelectedTwinElementNcfMultiselect(event.target);
                    this.editOriginalSelectElementNcfMultiselect(event.target);
                }
            });
        }
        // add eventlistener to .ncf-multiselect--box and its children
        selectItems[0].closest(".ncf-multiselect--body").previousElementSibling.addEventListener("click", event => {
            if (event.target.classList.contains("ncf-multiselect--box")) {
            } else {
                let e;
                if (event.target.classList.contains("ncf-multiselect--item")) {
                    e = event.target;
                } else if (event.target.closest(".ncf-multiselect--selectitem").classList.contains("ncf-multiselect--selectitem")) {
                    e = event.target.closest(".ncf-multiselect--selectitem");
                }
                this.toggleToSelectedTwinElementNcfMultiselect(e);
                this.editOriginalSelectElementNcfMultiselect(e);
            }
        });
    }

    /**
     * edit original select element
     * @param e
     */
    editOriginalSelectElementNcfMultiselect(e) {
        let originalElement;
        if (e.getAttribute("ncf-multiselect-list")) {
            originalElement = e.parentElement.parentElement.parentElement.previousElementSibling;
        } else {
            originalElement = e.parentElement.parentElement.previousElementSibling;
        }
        originalElement.children[e.getAttribute("ncf-multiselect-selectid")].toggleAttribute("selected");
    }

    /**
     * toggle element as selected items (show/hide twin element)
     * @param e
     */
    toggleToSelectedTwinElementNcfMultiselect(e) {
        let id = e.getAttribute("ncf-multiselect-selectid");
        let twinElement;
        if (e.closest(".ncf-multiselect--box")) {
            twinElement = e.parentElement.nextElementSibling.querySelector(".ncf-multiselect--selectitem[ncf-multiselect-selectid='"+id+"']");
            twinElement.classList.toggle("ncf-multiselect--selected");
            e.classList.toggle("ncf-multiselect--selectitem--inactive");
        } else {
            twinElement = e.parentElement.parentElement.previousElementSibling.querySelector(".ncf-multiselect--selectitem[ncf-multiselect-selectid='"+id+"']");
            twinElement.classList.toggle("ncf-multiselect--selectitem--inactive");
        }
    }

    /**
     * Search multiselect items
     */
    searchNcfMultiselect() {
        $(".ncf-multiselect--input").keyup(function () {
            let searchTerm = this.value;
            let selectbox = this.nextElementSibling.nextElementSibling;
            let id = selectbox.getAttribute("ncf-multiselect-selectboxid");
            let selectitems = selectbox.querySelectorAll('div.ncf-multiselect--selectitem');
            let searchSplit = searchTerm.replace(/ /g, "'):containsi('");

            $.extend($.expr[':'], {
                'containsi': function(elem, i, match) {
                    return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
                }
            });

            $(selectitems).not(":containsi('" + searchSplit + "')").each(function()   {
                $(this).addClass('ncf-multiselect--selectitem--hiding ncf-multiselect--selectitem--out').removeClass('ncf-multiselect--selectitem--in');
                setTimeout(function() {
                    $('.ncf-multiselect--selectitem--out').addClass('ncf-multiselect--selectitem--hidden');
                }, 300);
            });

            $(".ncf-multiselect--selectbox[ncf-multiselect-selectboxid='"+id+"'] div.ncf-multiselect--selectitem:containsi('" + searchSplit + "')").each(function() {
                $(this).removeClass('ncf-multiselect--selectitem--hidden ncf-multiselect--selectitem--out').addClass('ncf-multiselect--selectitem--in');
                setTimeout(function() {
                    let items = $(".ncf-multiselect--selectbox[ncf-multiselect-selectboxid='"+id+"'] div.ncf-multiselect--selectitem");
                    for (var i = 0; i < items.length; i++) {
                        items[i].classList.remove('ncf-multiselect--selectitem--hiding');
                    }
                }, 1);
            });

            let itemCount = selectbox.querySelectorAll('.ncf-multiselect--selectitem--in').length;
            if(itemCount == '0') {
                selectbox.classList.add('ncf-multiselect--selectbox--empty');
            }
            else {
                selectbox.classList.remove('ncf-multiselect--selectbox--empty');
            }

        });
    }
}

$(document).ready(function () {
    new NcfMultiselect();
});