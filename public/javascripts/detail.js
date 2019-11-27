const DetailHandler = class {
  constructor() {
    this.userId = document.querySelector("#user-id").innerText;
    this.updateButton = document.querySelector("#post-update-btn");
    this.deleteButton = document.querySelector("#post-delete-btn");
    this.postId = window.location.pathname.substring(8);
  }

  async deletePostEvent() {
    const deleteResult = await this.fetchData().deletePost(this.postId);
    if (deleteResult === "success") {
      location.href = `/user-page/${this.userId}`;
    }
  }

  addGetUpdatePageEvent() {
    this.updateButton.addEventListener("click", () => {
      location.href = `/detail/update/${this.postId}`;
    });
  }

  addDeleteEvent() {
    this.deleteButton.addEventListener("click", () => {
      this.deletePostEvent();
    });
  }

  fetchData() {
    const deletePost = async postId => {
      const url = `/detail/${postId}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
      const result = await response.json();
      return result;
    };
    return { deletePost };
  }

  run() {
    this.addDeleteEvent();
    this.addGetUpdatePageEvent();
  }
};

window.addEventListener("load", () => {
  const detailHandler = new DetailHandler();
  detailHandler.run();
});
