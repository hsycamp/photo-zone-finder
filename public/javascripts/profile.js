const ProfileHandler = class {
  constructor() {
    this.userName = document.querySelector("#user-name").innerText;
    this.targetUserName = document.querySelector("#target-user").innerText;
    this.followButton = document.querySelector("#follow-btn");
    this.followersCount = document.querySelector("#followers-count");
    this.followingsCount = document.querySelector("#followings-count");
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

  async showUserListEvent(listType) {
    try {
      const userBoard = document.querySelector(`#${listType}-board`);
      const userCount = document.querySelector(`#${listType}-count`);
      const response = await this.fetchData().getUsers(
        listType,
        this.targetUserName
      );
      if (response.status === 200) {
        const users = await response.json();
        if (!users.length) return;

        this.resetUserBoard(userBoard);

        users.forEach(user => {
          let newUserElement;
          if (user.followers.length) {
            newUserElement = this.createFollowingUserElement(user);
          } else if (user.userName !== this.userName) {
            newUserElement = this.createNotFollowingUserElement(user);
          } else {
            newUserElement = this.createUserElement(user);
          }
          userBoard.insertAdjacentHTML("beforeend", newUserElement);
        });

        const followButtons = userBoard.querySelectorAll("#list-follow-btn");
        followButtons.forEach(button => {
          button.addEventListener("click", event => {
            this.followListUserEvent(event);
          });
        });
        $(`#${listType}-list`).modal("show");
        if (listType === "followers") {
          userCount.innerText = `팔로워 ${users.length}`;
          return;
        }
        if (listType === "followings") {
          userCount.innerText = `팔로우 ${users.length}`;
          return;
        }
        return;
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  resetUserBoard(userBoard) {
    while (userBoard.firstChild) {
      userBoard.removeChild(userBoard.firstChild);
    }
  }

  createFollowingUserElement(user) {
    const followingUserElement = `
    <div class="item" id="${user.userName}">
      <a class="ui mini image">
        <img src="/images/avatar.png" />
      </a>
      <div class="middle aligned content">
        <a class="author" href="/user-page/${user.userName}" style="color: #000;">
          ${user.userName}
        </a>
        <span class="right floated">
          <button class="mini ui basic button" id="list-follow-btn">팔로잉</button>
        </span>
      </div>
    </div>
    `;
    return followingUserElement;
  }

  createNotFollowingUserElement(user) {
    const notFollowingUserElement = `
    <div class="item" id="${user.userName}">
      <a class="ui mini image">
        <img src="/images/avatar.png" />
      </a>
      <div class="middle aligned content">
        <a class="author" href="/user-page/${user.userName}" style="color: #000;">
          ${user.userName}
        </a>
        <span class="right floated">
          <button class="mini ui primary button" id="list-follow-btn">팔로우</button>
        </span>
      </div>
    </div>
    `;
    return notFollowingUserElement;
  }

  createUserElement(user) {
    const userElement = `
    <div class="item" id="${user.userName}">
      <a class="ui mini image">
        <img src="/images/avatar.png" />
      </a>
      <div class="middle aligned content">
        <a class="author" href="/user-page/${user.userName}" style="color: #000;">
          ${user.userName}
        </a>
      </div>
    </div>
    `;
    return userElement;
  }

  async followListUserEvent(event) {
    const followButton = event.target;
    const targetUserName = event.target.parentNode.parentNode.parentNode.id;

    try {
      let response;
      if (followButton.innerText === "팔로우") {
        response = await this.fetchData().followUser(targetUserName);
      }
      if (followButton.innerText === "팔로잉") {
        response = await this.fetchData().unfollowUser(targetUserName);
      }
      if (response.status === 200) {
        const updateResult = await response.json();
        if (updateResult.updatedStatus === "followed") {
          followButton.className = "mini ui basic button";
          followButton.innerText = "팔로잉";
          return;
        }
        if (updateResult.updatedStatus === "unfollowed") {
          followButton.className = "mini ui primary button";
          followButton.innerText = "팔로우";
          return;
        }
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  addFollowUserEvent() {
    if (!this.followButton) return;
    this.followButton.addEventListener("click", () => {
      this.followUserEvent();
    });
  }

  addShowFollowerListEvent() {
    this.followersCount.addEventListener("click", () => {
      this.showUserListEvent("followers");
    });
  }
  addShowFollowingListEvent() {
    this.followingsCount.addEventListener("click", () => {
      this.showUserListEvent("followings");
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

    const getUsers = async (listType, userName) => {
      try {
        const url = `/users/${listType}/${userName}`;
        const response = await fetch(url, {
          method: "GET"
        });
        return response;
      } catch (error) {
        throw error;
      }
    };

    return { followUser, unfollowUser, getUsers };
  }

  run() {
    this.addFollowUserEvent();
    this.addShowFollowerListEvent();
    this.addShowFollowingListEvent();
  }
};

window.addEventListener("load", () => {
  const profileHandler = new ProfileHandler();
  profileHandler.run();
});
