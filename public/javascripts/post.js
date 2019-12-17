const PostHandler = class {
  constructor() {
    this.postForm = document.querySelector("#post-form");
    this.isSubmitted = false;
  }

  addCreatePostEvent() {
    this.postForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!this.isSubmitted) {
        this.isSubmitted = true;
        return this.postForm.submit();
      }
    });
  }

  run() {
    this.addCreatePostEvent();
  }
};

window.addEventListener("load", () => {
  const postHandler = new PostHandler();
  postHandler.run();
});
