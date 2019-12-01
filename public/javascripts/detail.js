const DetailHandler = class {
  constructor() {
    this.userId = document.querySelector("#user-id").innerText;
    this.postId = window.location.pathname.substring(8);
    this.updateButton = document.querySelector("#post-update-btn");
    this.deleteButton = document.querySelector("#post-delete-btn");
    this.likeButton = document.querySelector("#post-like-btn");
    this.likesCount = document.querySelector("#likes-count");
  }

  async deletePostEvent() {
    const deleteResult = await this.fetchData().deletePost(this.postId);
    if (deleteResult === "success") {
      location.href = `/user-page/${this.userId}`;
    }
  }

  async updateLikeEvent() {
    const updateResult = await this.fetchData().updateLike(this.postId);
    if (updateResult.updatedStatus === "liked") {
      this.likeButton.className = "heart red like icon";
      this.likesCount.innerText = `좋아요 ${updateResult.likesCount} 개`;
      return;
    }
    if (updateResult.updatedStatus === "unliked") {
      this.likeButton.className = "heart outline like icon";
      this.likesCount.innerText = `좋아요 ${updateResult.likesCount} 개`;
      return;
    }
  }

  addGetUpdatePageEvent() {
    if (this.updateButton) {
      this.updateButton.addEventListener("click", () => {
        location.href = `/detail/update/${this.postId}`;
      });
    }
  }

  addDeleteEvent() {
    if (this.deleteButton) {
      this.deleteButton.addEventListener("click", () => {
        this.deletePostEvent();
      });
    }
  }

  addLikeEvent() {
    this.likeButton.addEventListener("click", () => {
      this.updateLikeEvent();
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
    const updateLike = async postId => {
      const url = `/detail/like/${postId}`;
      const response = await fetch(url, {
        method: "PATCH"
      });
      const result = await response.json();
      return result;
    };

    return { deletePost, updateLike };
  }

  run() {
    this.addDeleteEvent();
    this.addGetUpdatePageEvent();
    this.addLikeEvent();
  }
};

window.addEventListener("load", () => {
  const detailHandler = new DetailHandler();
  detailHandler.run();
});
