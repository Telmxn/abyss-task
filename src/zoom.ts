document
  .querySelectorAll("#SelectZoomCont div")
  .forEach((SelectZoom, index) => {
    SelectZoom.classList.add("SelectZoom");
    const zoomPersent: string = (SelectZoom as HTMLElement).innerText;
    SelectZoom.setAttribute(
      "data-zoom-class",
      `zoomPercent${zoomPersent.slice(0, -1)}`
    );
    SelectZoom.parentElement!.setAttribute("data-zoom-item", "DraggableArea");
    if (index == 7) SelectZoom.classList.add("ActiveZoom");
  });

const zoomInOut = (
  targetZoomCont: HTMLElement,
  ActiveZoom: HTMLElement,
  TargetItem: HTMLElement
): void => {
  ActiveZoom.classList.remove("ActiveZoom");
  targetZoomCont.classList.remove(ActiveZoom.getAttribute("data-zoom-class")!);
  TargetItem.classList.add("ActiveZoom");
  targetZoomCont.classList.add(TargetItem.getAttribute("data-zoom-class")!);
};
const getZoomItems = (
  TargetItem: HTMLElement
): { ActiveZoom: HTMLElement; targetZoomCont: HTMLElement } | false => {
  const ActiveZoom: HTMLElement | null = document.querySelector(".ActiveZoom");
  const targetZoomCont: HTMLElement | null = document.getElementById(
    TargetItem.getAttribute("data-zoom-item")!
  );
  if (!targetZoomCont || !ActiveZoom) return false;
  return { ActiveZoom, targetZoomCont };
};
document.querySelectorAll(".BtnZoomIn").forEach((BtnZoomIn) => {
  BtnZoomIn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    const target: HTMLElement = e.currentTarget as HTMLElement;
    const ZoomItems = getZoomItems(target);
    if (!ZoomItems) return false;
    const TargetItem: HTMLElement | null = ZoomItems.ActiveZoom
      .nextElementSibling as HTMLElement;
    if (!TargetItem) return false;
    TargetItem.click();
  });
});
document.querySelectorAll(".BtnZoomOut").forEach((BtnZoomIn) => {
  BtnZoomIn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    const target: HTMLElement = e.currentTarget as HTMLElement;
    const ZoomItems = getZoomItems(target);
    if (!ZoomItems) return false;
    const TargetItem: HTMLElement | null = ZoomItems.ActiveZoom
      .previousElementSibling as HTMLElement;
    if (!TargetItem) return false;
    TargetItem.click();
  });
});

document.querySelectorAll(".SelectZoom").forEach((SelectZoom) => {
  SelectZoom.addEventListener("click", (e: Event) => {
    const target: HTMLElement = e.currentTarget as HTMLElement;
    const ZoomItems = getZoomItems(target.parentElement as HTMLElement);
    if (!ZoomItems) return false;
    console.log(ZoomItems.ActiveZoom);
    zoomInOut(ZoomItems.targetZoomCont, ZoomItems.ActiveZoom, target);
  });
});
