"use strict";
const x: HTMLCollectionOf<Element> =
  document.getElementsByClassName("custom-select");
const l: number = x.length;
for (let i: number = 0; i < l; i++) {
  const selElmnt: HTMLSelectElement = x[i].getElementsByTagName("select")[0];
  const ll: number = selElmnt.length;
  const a: HTMLDivElement = document.createElement("div");
  a.setAttribute("class", "select-selected SelectedSelect");
  a.innerHTML = selElmnt.options[8].innerHTML;
  x[i].appendChild(a);
  const b: HTMLDivElement = document.createElement("div");
  b.setAttribute("class", "select-items select-hide");
  b.setAttribute("id", "SelectZoomCont");
  for (let j: number = 1; j < ll; j++) {
    const c: HTMLDivElement = document.createElement("div");
    if (j == 8) {
      c.innerHTML =
        selElmnt.options[j].innerHTML + '<i class="fa-solid fa-check"></i>';
      c.classList.add("same-as-selected");
    } else {
      c.innerHTML = selElmnt.options[j].innerHTML;
    }
    c.addEventListener("click", function (e: Event) {
      const y: HTMLCollectionOf<Element> = (
        this.parentNode!.parentNode! as HTMLElement
      ).getElementsByTagName("select");
      const s: HTMLSelectElement = y[0] as HTMLSelectElement;
      const sl: number = s.length;
      const h: HTMLElement = this.parentNode!.previousSibling as HTMLElement;
      for (let i: number = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          document.querySelector(".same-as-selected i")!.remove();
          const y: HTMLCollectionOf<Element> = (
            this.parentNode! as HTMLElement
          ).getElementsByClassName("same-as-selected");
          const yl: number = y.length;
          for (let k: number = 0; k < yl; k++) {
            y[k].classList.remove("same-as-selected");
          }
          const selectedItem: string = this.innerHTML;
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
  a.addEventListener("click", function (e: Event) {
    e.stopPropagation();
    closeAllSelect(this);
    (this.nextSibling! as HTMLElement).classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt: HTMLElement) {
  const x: HTMLCollectionOf<Element> =
    document.getElementsByClassName("select-items");
  const y: HTMLCollectionOf<Element> =
    document.getElementsByClassName("select-selected");
  const xl: number = x.length;
  const yl: number = y.length;
  const arrNo: number[] = [];
  for (let i: number = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (let i: number = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
// document.addEventListener("click", closeAllSelect);
