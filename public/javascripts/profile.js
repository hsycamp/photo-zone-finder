const ProfileHandler = class {
  constructor() {
    this.targetUserName = document.querySelector("#target-user").innerText;
    this.followButton = document.querySelector("#follow-btn");
    this.followersCount = document.querySelector("#followers-count");
  }

  async followUserEvent() {
    try {
      const response = await this.fetchData().followUser(this.targetUserName);
      if (response.status === 200) {
        const updateResult = await response.json();
        if (updateResult.updatedStatus === "followed") {
          this.followButton.className = "medium ui basic button";
          this.followButton.innerText = "팔로잉";
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
    return { followUser };
  }

  run() {
    this.addFollowUserEvent();
  }
};

window.addEventListener("load", () => {
  const profileHandler = new ProfileHandler();
  profileHandler.run();
});
