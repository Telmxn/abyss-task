"use strict";
export class Draggable {
    constructor(dragItems) {
        this.dragContainer = dragItems.dragContainer;
        this.draggableEl = dragItems.draggableEl;
        this.CenterDragElBtn = dragItems.CenterDragElBtn;
        this.btnChangePostion = dragItems.btnChangePostion;
        this.positionCount = dragItems.positionCount;
        this.DragStarted = false;
        this.DragElTop = 0;
        this.DragElLeft = 0;
        this.firstX = 0;
        this.firstY = 0;
        this.draggableElStyle = window.getComputedStyle(this.draggableEl);
    }
    handleMouseMove(e) {
        let x = 0, y = 0;
        if (e.type == "touchstart" ||
            e.type == "touchmove" ||
            e.type == "touchend" ||
            e.type == "touchcancel") {
            let touch = e.touches[0] || e.changedTouches[0];
            x = touch.pageX;
            y = touch.pageY;
        }
        else if (e.type == "mousedown" ||
            e.type == "mouseup" ||
            e.type == "mousemove" ||
            e.type == "mouseover" ||
            e.type == "mouseout" ||
            e.type == "mouseenter" ||
            e.type == "mouseleave") {
            x = e.clientX;
            y = e.clientY;
        }
        return { x, y };
    }
    startDrag(e) {
        const { x, y } = this.handleMouseMove(e);
        this.DragElTop = this.draggableEl.offsetLeft;
        this.DragElLeft = this.draggableEl.offsetTop;
        this.firstX = x;
        this.firstY = y;
        this.DragStarted = true;
    }
    endDrag() {
        this.DragStarted = false;
        this.draggableEl.classList.remove("isDragging");
    }
    dragMove(x, y) {
        this.draggableEl.style.left = this.DragElTop + x - this.firstX + "px";
        this.draggableEl.style.top = this.DragElLeft + y - this.firstY + "px";
    }
    addDragMove(e, Target) {
        const { x, y } = this.handleMouseMove(e);
        if (!this.DragStarted) {
            this.endDrag();
            return false;
        }
        if (Target.classList.contains("isDragging")) {
            this.dragMove(x, y);
        }
        this.draggableEl.classList.add("isDragging");
    }
    changePos(Target) {
        if (Target.classList.contains("BtnPosTop")) {
            this.draggableEl.style.top =
                parseFloat(this.draggableElStyle.top) + this.positionCount + "px";
        }
        else if (Target.classList.contains("BtnPosBottom")) {
            this.draggableEl.style.top =
                parseFloat(this.draggableElStyle.top) - this.positionCount + "px";
        }
        else if (Target.classList.contains("BtnPosRight")) {
            this.draggableEl.style.left =
                parseFloat(this.draggableElStyle.left) - this.positionCount + "px";
        }
        else if (Target.classList.contains("BtnPosLeft")) {
            this.draggableEl.style.left =
                parseFloat(this.draggableElStyle.left) + this.positionCount + "px";
        }
    }
    centerDragEl() {
        const { width, height } = this.draggableEl.getBoundingClientRect();
        const leftCenter = (window.innerWidth - width) / 2;
        const topCenter = (window.innerHeight - height - 140) / 2;
        // const leftWindowMargin = leftCenter - (w / 2);
        // const topWindowMargin = topCenter - (h / 2);
        this.draggableEl.style.left = `${leftCenter}px`;
        this.draggableEl.style.top = `${topCenter}px`;
    }
    bindEventListener() {
        this.draggableEl.addEventListener("mousedown", (e) => {
            this.startDrag(e);
        });
        this.draggableEl.addEventListener("touchstart", (e) => {
            this.startDrag(e);
        });
        window.addEventListener("mouseup", (e) => {
            this.endDrag();
        });
        window.addEventListener("touchend", (e) => {
            this.endDrag();
        });
        this.draggableEl.addEventListener("mousemove", (e) => {
            const Target = e.currentTarget;
            this.addDragMove(e, Target);
        });
        this.draggableEl.addEventListener("touchmove", (e) => {
            const Target = e.currentTarget;
            this.addDragMove(e, Target);
        });
        this.CenterDragElBtn.addEventListener("click", (e) => {
            this.centerDragEl();
        });
        if (this.btnChangePostion) {
            this.btnChangePostion.forEach((btnChangePos) => {
                btnChangePos.addEventListener("click", (e) => {
                    const Target = e.currentTarget;
                    console.log(Target);
                    this.changePos(Target);
                });
            });
        }
    }
    createDraggableArea() {
        this.bindEventListener();
        this.centerDragEl();
    }
}
