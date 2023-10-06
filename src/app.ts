import { Draggable } from "./draggable.js";

const dragCont: HTMLElement = document.getElementById("dragContainer")!;
const dragArea: HTMLElement = document.getElementById("DraggableArea")!;

const CenterDragElBtn = document.querySelector(".CenterDragElBtn")!;
const btnsChangePos = document.querySelectorAll(".btnChangePos");

const dragDrop: Draggable = new Draggable({
  dragContainer: dragCont,
  draggableEl: dragArea,
  btnChangePostion: btnsChangePos,
  CenterDragElBtn: CenterDragElBtn,
  positionCount: 70,
});

dragDrop.createDraggableArea();

const AddModal: HTMLElement | null = document.getElementById("AddModal");

const getModalPos = (TargetEl: HTMLElement, TargetModal: HTMLElement): void => {
  const TargetElPos: DOMRect = TargetEl.getBoundingClientRect();
  const ScrollWidth: number =
    document.querySelector(".categories")!.scrollWidth;
  const ScrollLeft: number = document.documentElement.scrollLeft;
  const postionX: number = ScrollLeft + TargetElPos.x + 20;
  TargetModal.style.left = `${postionX - 36}px`;
  TargetModal.style.top = `${TargetElPos.top + 50}px`;
};

const openModelBtnEvntListener = (): void => {
  document.querySelectorAll(".OpenModelBtn").forEach((OpenModelBtn) => {
    OpenModelBtn.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const Target: HTMLElement = e.currentTarget as HTMLElement;
      const TargetModal: HTMLElement = document.getElementById(
        Target.getAttribute("data-modal")!
      )!;
      AddModal!.classList.remove("hidden");
      getModalPos(Target, TargetModal);
    });
  });
};

openModelBtnEvntListener();

document.querySelectorAll(".CloseModalBtn").forEach((CloseModalBtn) => {
  CloseModalBtn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    AddModal!.classList.add("hidden");
    setTimeout(() => {
      const addingCategory = document.querySelector(".AddingCategory");
      if (addingCategory) {
        addingCategory.classList.remove("AddingCategory");
      }
    }, 200);
  });
});

const cancelCategory = (e: Event): void => {
  e.preventDefault();
  const editedCategory = (e.currentTarget! as Element).closest(
    ".edited-category"
  );
  const hLines = document.querySelectorAll(".h-line");
  const hLines2 = editedCategory?.closest(".subCategoryCont");
  console.log(hLines.length);
  editedCategory!.parentElement!.classList.add("hidden");
  if (hLines.length === 1) {
    document.querySelector("#mainCategoryCont")!.classList.add("hidden");
  }
  if (hLines2?.children.length === 1) {
    hLines2?.classList.add("hidden");
  }

  (editedCategory as Element).closest(".h-line")!.remove();
};

const cancelCategoryEvntListener = (): void => {
  document.querySelectorAll(".cancel-category").forEach((cancelCategoryBtn) => {
    cancelCategoryBtn.addEventListener("click", cancelCategory);
  });
};

cancelCategoryEvntListener();

const saveCategory = (e: Event): void => {
  e.preventDefault();
  const Target = e.currentTarget as HTMLElement;
  const EditCategoryCont = Target.closest(".EditCategoryCont") as HTMLElement;
  const EditedCategory = EditCategoryCont.parentElement as HTMLElement;
  const CategoryInp = EditCategoryCont.querySelector(
    ".category-inp"
  ) as HTMLInputElement;
  if (CategoryInp.value.trim() == "") return;
  const CategoryItem = EditedCategory.querySelector(
    ".CategoryInfoCont .category-item"
  ) as HTMLElement;
  CategoryItem.innerText = CategoryInp.value;
  EditedCategory.classList.remove("edited-category");
};

const saveCategoryBtnEvntHndlr = (): void => {
  document.querySelectorAll(".SaveCategoryBtn").forEach((SaveCategoryBtn) => {
    SaveCategoryBtn.addEventListener("click", saveCategory);
  });
};

saveCategoryBtnEvntHndlr();

const getTargetCategory = (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();
  const TargetCategory = (e.currentTarget as HTMLElement).closest(
    ".CategoryInfoCont"
  )!.parentElement as HTMLElement;
  TargetCategory.classList.add("AddingCategory");
};

const getTargetCategoryEvntHndlr = (): void => {
  document.querySelectorAll(".GetCategoryBtn").forEach((GetCategoryBtn) => {
    GetCategoryBtn.addEventListener("click", getTargetCategory);
  });
};

getTargetCategoryEvntHndlr();

const addSubCategory = (e: Event): void => {
  e.preventDefault();
  const Target = e.currentTarget as HTMLElement;
  let CategoryClass = "sub-category";
  const EditedCategory = document.querySelector(
    ".AddingCategory"
  ) as HTMLElement;
  if (!EditedCategory) return;
  if (EditedCategory.closest(".subCategoryCont"))
    CategoryClass = "sub-category bg-gray";
  const subCategoryCont = EditedCategory.parentElement!.querySelector(
    ".subCategoryCont"
  ) as HTMLElement;
  subCategoryCont.classList.remove("hidden");
  const categoryCont = document.createElement("div");
  categoryCont.classList.add("h-line");
  categoryCont.innerHTML = `
    <div class="d-flex justify-center edited-category">
      <div class="d-flex align-center justify-center EditCategoryCont">
        <div class="d-flex align-center relative">
          <input class="category-inp" type="text" placeholder="Category name">
          <div class="d-flex category-btns-2">
            <button class="btn-2 remove-btn remove-yellow mr-5 cancel-category">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="btn-2 save-btn mr-5 SaveCategoryBtn">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex align-center justify-center relative mx-auto w-full CategoryInfoCont">
        <div class="${CategoryClass} category-item">Category 1</div>
        <div class="category-btns d-flex">
          <button class="btn-2 mr-5 GetCategoryBtn OpenModelBtn" data-modal="AddModal">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="btn-2 edit-btn mr-5">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-2 remove-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="subCategoryCont v-line hidden">
      
    </div>
  `;
  subCategoryCont.insertAdjacentElement("beforeend", categoryCont);
  saveCategoryBtnEvntHndlr();
  openModelBtnEvntListener();
  getTargetCategoryEvntHndlr();
  cancelCategoryEvntListener();
};

const createCategoryBtn = (e: Event): void => {
  e.preventDefault();
  const categoryCont = document.createElement("div");
  categoryCont.classList.add("h-line", "main-category");
  categoryCont.innerHTML = `
    <div class="d-flex justify-center edited-category">
      <div class="d-flex align-center justify-center EditCategoryCont">
        <div class="d-flex align-center relative">
          <input class="category-inp" type="text" placeholder="Category name">
          <div class="d-flex category-btns-2">
            <button class="btn-2 remove-btn remove-yellow mr-5 cancel-category">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="btn-2 save-btn mr-5 SaveCategoryBtn">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex align-center justify-center relative mx-auto w-full CategoryInfoCont">
        <div class="category category-item">Category 1</div>
        <div class="category-btns d-flex">
          <button class="btn-2 mr-5 GetCategoryBtn OpenModelBtn" data-modal="AddModal">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="btn-2 edit-btn mr-5">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-2 remove-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="subCategoryCont v-line hidden">
      
    </div>
  `;

  const mainCategoryCont = document.getElementById("mainCategoryCont");

  if (mainCategoryCont!.classList.contains("hidden"))
    mainCategoryCont!.classList.remove("hidden");

  mainCategoryCont!.insertAdjacentElement("beforeend", categoryCont);

  saveCategoryBtnEvntHndlr();
  openModelBtnEvntListener();
  getTargetCategoryEvntHndlr();
  cancelCategoryEvntListener();
};

const addCategoryEvntListener = (): void => {
  document.querySelectorAll(".addCategoryBtn").forEach((addCategoryBtn) => {
    addCategoryBtn.addEventListener("click", createCategoryBtn);
  });
};

addCategoryEvntListener();

document
  .getElementById("CreateSubCategoryBtn")!
  .addEventListener("click", (e) => {
    e.preventDefault();
    addSubCategory(e);
    document
      .querySelector(".AddingCategory")!
      .classList.remove("AddingCategory");
  });
