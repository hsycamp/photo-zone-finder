const ProfileHandler = class {
  constructor() {
    this.targetUserName = document.querySelector("#target-user").innerText;
    this.followButton = document.querySelector("#follow-btn");
    this.followersCount = document.querySelector("#followers-count");
    this.followersBoard = document.querySelector("#follower-board");
  }

  async followUserEvent() {
    try {
      let response;
      if (this.followButton.innerText === "팔로우") {
        response = await this.fetchData().followUser(this.targetUserName);
      }
      if (this.followButton.innerText === "팔로잉") {
        response = await this.fetchData().unfollowUser(this.targetUserName);
      }
      if (response.status === 200) {
        const updateResult = await response.json();
        if (updateResult.updatedStatus === "followed") {
          this.followButton.className = "medium ui basic button";
          this.followButton.innerText = "팔로잉";
          this.followersCount.innerText = `팔로워 ${updateResult.followersCount}`;
          return;
        }
        if (updateResult.updatedStatus === "unfollowed") {
          this.followButton.className = "medium ui primary button";
          this.followButton.innerText = "팔로우";
          this.followersCount.innerText = `팔로워 ${updateResult.followersCount}`;
          return;
        }
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  async showFollowersEvent() {
    try {
      const response = await this.fetchData().getFollowers(this.targetUserName);
      if (response.status === 200) {
        const followers = await response.json();
        if (!followers.length) return;

        this.resetFollowersBoard();

        followers.forEach(follower => {
          const newFollowerElement = this.createFollowerElement(follower);
          this.followersBoard.insertAdjacentHTML(
            "beforeend",
            newFollowerElement
          );
        });
        this.followersCount.innerText = `팔로워 ${followers.length}`;
        $("#follower-list").modal("show");
        return;
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  resetFollowersBoard() {
    while (this.followersBoard.firstChild) {
      this.followersBoard.removeChild(this.followersBoard.firstChild);
    }
  }

  createFollowerElement(follower) {
    const followerElement = `
    <div class="item">
      <a class="ui mini image">
        <img src="/images/avatar.png" />
      </a>
      <div class="middle aligned content">
        <a class="author" href="/user-page/${follower.userName}" style="color: #000;">
          ${follower.userName}
        </a>
        <span class="right floated">
          <button class="mini ui primary button">팔로우</button>
        </span>
      </div>
    </div>
    `;
    return followerElement;
  }

  addFollowUserEvent() {
    if (!this.followButton) return;
    this.followButton.addEventListener("click", () => {
      this.followUserEvent();
    });
  }

  addShowFollowerListEvent() {
    this.followersCount.addEventListener("click", () => {
      this.showFollowersEvent();
    });
  }

  fetchData() {
    const followUser = async userName => {
      try {
        const url = `/users/follow/${userName}`;
        const response = await fetch(url, {
          method: "POST"
        });
        return response;
      } catch (error) {
        throw error;
      }
    };
    const unfollowUser = async userName => {
      try {
        const url = `/users/follow/${userName}`;
        const response = await fetch(url, {
          method: "DELETE"
        });
        return response;
      } catch (error) {
        throw error;
      }
    };

    const getFollowers = async userName => {
      try {
        const url = `/users/followers/${userName}`;
        const response = await fetch(url, {
          method: "GET"
        });
        return response;
      } catch (error) {
        throw error;
      }
    };
    return { followUser, unfollowUser, getFollowers };
  }

  run() {
    this.addFollowUserEvent();
    this.addShowFollowerListEvent();
  }
};

window.addEventListener("load", () => {
  const profileHandler = new ProfileHandler();
  profileHandler.run();
});
