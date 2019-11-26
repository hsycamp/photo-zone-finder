const DetailHandler = class {
  constructor() {
    this.userId = document.querySelector("#user-id").innerText;
    this.deleteButton = document.querySelector("#post-delete-btn");
  }

  async deletePostEvent() {
    const postId = window.location.pathname.substring(8);
    const deleteResult = await this.fetchData().deletePost(postId);
    if (deleteResult === "success") {
      location.href = `/user-page/${this.userId}`;
    }
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
  }
};

window.addEventListener("load", () => {
  const detailHandler = new DetailHandler();
  detailHandler.run();
});
