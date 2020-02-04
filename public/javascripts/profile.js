const ProfileHandler = class {
  constructor() {
    this.targetUserName = document.querySelector("#target-user").innerText;
    this.followButton = document.querySelector("#follow-btn");
    this.followersCount = document.querySelector("#followers-count");
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

  addFollowUserEvent() {
    this.followButton.addEventListener("click", () => {
      this.followUserEvent();
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
    return { followUser, unfollowUser };
  }

  run() {
    this.addFollowUserEvent();
  }
};

window.addEventListener("load", () => {
  const profileHandler = new ProfileHandler();
  profileHandler.run();
});
