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

class Drag implements DragAndDrop {
  dragElement: HTMLDivElement;
  dragElementId: string;
  dropElement: HTMLDivElement;

  constructor() {
    this.dragElement = document.querySelector("#drag") as HTMLDivElement;
    this.dragElementId = this.dragElement.id;
    console.log(this.dragElementId);

    this.dropElement = document.querySelector("#drop") as HTMLDivElement;
    this.configure();
  }

  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.dragElementId);
    console.log(this.dragElementId);

    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(_: DragEvent): void {}

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.dropElement.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    event.preventDefault();
    const dragId = event.dataTransfer!.getData("text/plain");
    console.log(dragId);

    dragId === "drag" ? console.log("huhu") : console.log("hihi");
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
}

const drag = new Drag();
