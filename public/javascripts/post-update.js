const PostUpdateHandler = class {
  constructor() {
    this.updateForm = document.querySelector("#update-form");
    this.submitUpdateButton = document.querySelector("#submit-update-btn");
    this.cancelUpdateButton = document.querySelector("#cancel-update-btn");
    this.inputText = document.querySelector("#inputText");
    this.postId = window.location.pathname.substring(15);
  }

  async updatePostEvent() {
    const updateResult = await this.fetchData().updatePost(
      JSON.stringify({ updateText: this.inputText.value })
    );
    if (updateResult === "success") {
      location.href = `/detail/${this.postId}`;
    }
  }

  addUpdatePostEvent() {
    this.updateForm.addEventListener("submit", event => {
      event.preventDefault();
      this.updatePostEvent();
    });
  }
  addCancelUpdatePostEvent() {
    this.cancelUpdateButton.addEventListener("click", () => {
      location.href = "javascript:history.back()";
    });
  }

  fetchData() {
    const updatePost = async inputData => {
      const url = `/detail/${this.postId}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: inputData,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      return result;
    };
    return { updatePost };
  }

  run() {
    this.addUpdatePostEvent();
    this.addCancelUpdatePostEvent();
  }
};

window.addEventListener("load", () => {
  const postUpdateHandler = new PostUpdateHandler();
  postUpdateHandler.run();
});
