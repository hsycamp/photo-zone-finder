const PostUpdateHandler = class {
  constructor() {
    this.updateForm = document.querySelector("#update-form");
    this.cancelUpdateButton = document.querySelector("#cancel-update-btn");
    this.inputText = document.querySelector("#inputText");
    this.postId = window.location.pathname.substring(15);
  }

  async updatePostEvent() {
    try {
      const response = await this.fetchData().updatePost(
        JSON.stringify({ updateText: this.inputText.value })
      );
      if (response.status === 200) {
        location.href = `/detail/${this.postId}`;
        return;
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
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
      try {
        const url = `/detail/${this.postId}`;
        const response = await fetch(url, {
          method: "PATCH",
          body: inputData,
          headers: {
            "Content-Type": "application/json"
          }
        });
        return response;
      } catch (error) {
        throw error;
      }
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
