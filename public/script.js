"use strict";
const x = document.getElementsByClassName("custom-select");
const l = x.length;
for (let i = 0; i < l; i++) {
    const selElmnt = x[i].getElementsByTagName("select")[0];
    const ll = selElmnt.length;
    const a = document.createElement("div");
    a.setAttribute("class", "select-selected SelectedSelect");
    a.innerHTML = selElmnt.options[8].innerHTML;
    x[i].appendChild(a);
    const b = document.createElement("div");
    b.setAttribute("class", "select-items select-hide");
    b.setAttribute("id", "SelectZoomCont");
    for (let j = 1; j < ll; j++) {
        const c = document.createElement("div");
        if (j == 8) {
            c.innerHTML =
                selElmnt.options[j].innerHTML + '<i class="fa-solid fa-check"></i>';
            c.classList.add("same-as-selected");
        }
        else {
            c.innerHTML = selElmnt.options[j].innerHTML;
        }
        c.addEventListener("click", function (e) {
            const y = this.parentNode.parentNode.getElementsByTagName("select");
            const s = y[0];
            const sl = s.length;
            const h = this.parentNode.previousSibling;
            for (let i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    document.querySelector(".same-as-selected i").remove();
                    const y = this.parentNode.getElementsByClassName("same-as-selected");
                    const yl = y.length;
                    for (let k = 0; k < yl; k++) {
                        y[k].classList.remove("same-as-selected");
                    }
                    const selectedItem = this.innerHTML;
                    this.classList.add("same-as-selected");
                    this.innerHTML = selectedItem + `<i class="fa-solid fa-check"></i>`;
                    break;
                }
            }
            if (h.classList.contains("select-arrow-active")) {
                h.click();
            }
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    const x = document.getElementsByClassName("select-items");
    const y = document.getElementsByClassName("select-selected");
    const xl = x.length;
    const yl = y.length;
    const arrNo = [];
    for (let i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        }
        else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (let i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
