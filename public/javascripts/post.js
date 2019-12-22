const PostHandler = class {
  constructor() {
    this.postForm = document.querySelector("#post-form");
    this.cancelUploadButton = document.querySelector("#cancel-upload-btn");
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

  addCancelUploadPostEvent() {
    this.cancelUploadButton.addEventListener("click", () => {
      location.href = "javascript:history.back()";
    });
  }

  run() {
    this.addCreatePostEvent();
    this.addCancelUploadPostEvent();
  }
};

window.addEventListener("load", () => {
  const postHandler = new PostHandler();
  postHandler.run();
});
