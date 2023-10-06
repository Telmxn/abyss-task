"use strict";
document
    .querySelectorAll("#SelectZoomCont div")
    .forEach((SelectZoom, index) => {
    SelectZoom.classList.add("SelectZoom");
    const zoomPersent = SelectZoom.innerText;
    SelectZoom.setAttribute("data-zoom-class", `zoomPercent${zoomPersent.slice(0, -1)}`);
    SelectZoom.parentElement.setAttribute("data-zoom-item", "DraggableArea");
    if (index == 7)
        SelectZoom.classList.add("ActiveZoom");
});
const zoomInOut = (targetZoomCont, ActiveZoom, TargetItem) => {
    ActiveZoom.classList.remove("ActiveZoom");
    targetZoomCont.classList.remove(ActiveZoom.getAttribute("data-zoom-class"));
    TargetItem.classList.add("ActiveZoom");
    targetZoomCont.classList.add(TargetItem.getAttribute("data-zoom-class"));
};
const getZoomItems = (TargetItem) => {
    const ActiveZoom = document.querySelector(".ActiveZoom");
    const targetZoomCont = document.getElementById(TargetItem.getAttribute("data-zoom-item"));
    if (!targetZoomCont || !ActiveZoom)
        return false;
    return { ActiveZoom, targetZoomCont };
};
document.querySelectorAll(".BtnZoomIn").forEach((BtnZoomIn) => {
    BtnZoomIn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const ZoomItems = getZoomItems(target);
        if (!ZoomItems)
            return false;
        const TargetItem = ZoomItems.ActiveZoom
            .nextElementSibling;
        if (!TargetItem)
            return false;
        TargetItem.click();
    });
});
document.querySelectorAll(".BtnZoomOut").forEach((BtnZoomIn) => {
    BtnZoomIn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const ZoomItems = getZoomItems(target);
        if (!ZoomItems)
            return false;
        const TargetItem = ZoomItems.ActiveZoom
            .previousElementSibling;
        if (!TargetItem)
            return false;
        TargetItem.click();
    });
});
document.querySelectorAll(".SelectZoom").forEach((SelectZoom) => {
    SelectZoom.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const ZoomItems = getZoomItems(target.parentElement);
        if (!ZoomItems)
            return false;
        console.log(ZoomItems.ActiveZoom);
        zoomInOut(ZoomItems.targetZoomCont, ZoomItems.ActiveZoom, target);
    });
});
