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
    try {
      const response = await this.fetchData().deletePost(this.postId);
      if (response.status === 200) {
        location.href = `/user-page/${this.userId}`;
        return;
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  async updateLikeEvent() {
    try {
      const response = await this.fetchData().updateLike(this.postId);
      if (response.status === 200) {
        const updateResult = await response.json();
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
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
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
      try {
        const url = `/detail/${postId}`;
        const response = await fetch(url, {
          method: "DELETE"
        });
        return response;
      } catch (error) {
        throw error;
      }
    };

    const updateLike = async postId => {
      try {
        const url = `/detail/like/${postId}`;
        const response = await fetch(url, {
          method: "PATCH"
        });
        return response;
      } catch (error) {
        throw error;
      }
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
