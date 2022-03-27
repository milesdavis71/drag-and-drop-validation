interface DragAndDrop {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;

  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class RenderLogin {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor() {
    this.templateElement = document.getElementById(
      "login"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;

    this.renderLogin();
  }

  renderLogin() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

// class RenderMain {
//   templateElement: HTMLTemplateElement;
//   hostElement: HTMLDivElement;
//   element: HTMLElement;

//   constructor() {
//     this.templateElement = document.getElementById(
//       "main"
//     ) as HTMLTemplateElement;
//     this.hostElement = document.getElementById("app") as HTMLDivElement;
//     const importedNode = document.importNode(
//       this.templateElement.content,
//       true
//     );

//     this.element = importedNode.firstElementChild as HTMLElement;

//     this.renderMainPage();
//   }

//   renderMainPage() {
//     this.hostElement.insertAdjacentElement("afterbegin", this.element);
//   }
// }

class DragAndDrop implements DragAndDrop {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  dragElement: HTMLDivElement;
  dropElement: HTMLDivElement;
  constructor() {
    this.templateElement = document.getElementById(
      "main"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;

    this.dragElement = document.querySelector(".drag") as HTMLDivElement;
    this.dropElement = document.querySelector(".drop") as HTMLDivElement;
    this.configure();
  }

  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", "drag");

    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(_: DragEvent): void {}

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.dropElement.classList.add("drop--drop");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    event.preventDefault();
    const dragId = event.dataTransfer!.getData("text/plain");

    dragId === "drag"
      ? this.clearHostAndRenderMain()
      : alert("Hiba a betöltéssel");
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {}

  configure() {
    this.dragElement.addEventListener("dragstart", this.dragStartHandler);
    this.dragElement.addEventListener("dragend", this.dragEndHandler);

    this.dropElement.addEventListener("dragover", this.dragOverHandler);
    this.dropElement.addEventListener("drop", this.dropHandler);
    this.dropElement.addEventListener("dragleave", this.dragLeaveHandler);
  }

  clearHostAndRenderMain() {
    this.hostElement.innerHTML = "";
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const renderLogin = new RenderLogin();
const dragAndDrop = new DragAndDrop();
