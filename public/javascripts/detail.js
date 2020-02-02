const DetailHandler = class {
  constructor() {
    this.userName = document.querySelector("#user-name").innerText;
    this.postId = window.location.pathname.substring(8);
    this.updateButton = document.querySelector("#post-update-btn");
    this.deleteButton = document.querySelector("#post-delete-btn");
    this.likeButton = document.querySelector("#post-like-btn");
    this.likesCount = document.querySelector("#likes-count");
    this.likersBoard = document.querySelector(".ui.items");
    this.isDeleted = false;
  }

  async deletePostEvent() {
    const isConfirmed = confirm("삭제하시겠습니까?");
    if (!isConfirmed) {
      this.isDeleted = false;
      return;
    }
    try {
      const response = await this.fetchData().deletePost(this.postId);
      if (response.status === 200) {
        location.href = `/user-page/${this.userName}`;
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

  async showLikersEvent() {
    try {
      const response = await this.fetchData().getLikers(this.postId);
      if (response.status === 200) {
        const likers = await response.json();
        if (!likers.length) return;

        this.resetLikersBoard();

        likers.forEach(liker => {
          const newlikerElement = this.createLikerElement(liker);
          this.likersBoard.insertAdjacentHTML("beforeend", newlikerElement);
        });
        this.likesCount.innerText = `좋아요 ${likers.length} 개`;
        $(".ui.longer.modal").modal("show");
        return;
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  resetLikersBoard() {
    while (this.likersBoard.firstChild) {
      this.likersBoard.removeChild(this.likersBoard.firstChild);
    }
  }

  createLikerElement(liker) {
    const likerElement = `
    <div class="item">
      <a class="ui mini image">
        <img src="/images/avatar.png" />
      </a>
      <div class="middle aligned content">
        <a class="author" href="/user-page/${liker.userName}" style="color: #000;">
          ${liker.userName}
        </a>
        <span class="right floated">
          <button class="mini ui primary button">팔로우</button>
        </span>
      </div>
    </div>
    `;
    return likerElement;
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
        if (!this.isDeleted) {
          this.isDeleted = true;
          this.deletePostEvent();
        }
      });
    }
  }

  addLikeEvent() {
    this.likeButton.addEventListener("click", () => {
      this.updateLikeEvent();
    });
  }

  addShowLikerListEvent() {
    this.likesCount.addEventListener("click", () => {
      this.showLikersEvent();
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

    const getLikers = async postId => {
      try {
        const url = `/detail/like/${postId}`;
        const response = await fetch(url, {
          method: "GET"
        });
        return response;
      } catch (error) {
        throw error;
      }
    };

    return { deletePost, updateLike, getLikers };
  }

  run() {
    this.addDeleteEvent();
    this.addGetUpdatePageEvent();
    this.addLikeEvent();
    this.addShowLikerListEvent();
  }
};

window.addEventListener("load", () => {
  const detailHandler = new DetailHandler();
  detailHandler.run();
});
