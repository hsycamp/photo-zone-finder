const OauthSignUpHandler = class {
  constructor() {
    this.oauthSignUpForm = document.querySelector("#oauth-sign-up-form");
    this.userName = document.querySelector("#user-name");
    this.messageBox = document.querySelector("#message-box");
    this.isValidUserName = false;
    this.timer;
  }

  async checkDuplicateUserNameEvent() {
    try {
      const inputValue = this.userName.value;

      if (!inputValue) {
        this.messageBox.style.color = "black";
        this.messageBox.innerText = "이름을 입력해주세요.";
        return;
      }
      const response = await this.fetchData().checkDuplicateUserName(
        inputValue
      );
      if (response.status == 200) {
        const result = await response.text();
        if (result === "duplicate") {
          this.messageBox.style.color = "#D51414";
          this.messageBox.innerText = "이미 사용중인 이름입니다.";
          this.isValidUserName = false;
          return;
        }
        this.messageBox.style.color = "#121AF6";
        this.messageBox.innerText = "사용 가능한 이름입니다.";
        this.isValidUserName = true;
        return;
      }
      throw new Error("서버에 문제가 발생했습니다.");
    } catch (error) {
      alert(error.message);
    }
  }

  addCheckDuplicateUserNameEvent() {
    this.userName.addEventListener("keyup", event => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.checkDuplicateUserNameEvent();
      }, 300);
    });
  }

  addCreateUserNameEvent() {
    this.oauthSignUpForm.addEventListener("submit", event => {
      event.preventDefault();
      if (this.isValidUserName) {
        return this.oauthSignUpForm.submit();
      }
    });
  }

  fetchData() {
    const checkDuplicateUserName = async userName => {
      const url = `/users/${userName}`;
      const response = await fetch(url, {
        method: "GET"
      });
      return response;
    };
    return { checkDuplicateUserName };
  }

  run() {
    this.addCheckDuplicateUserNameEvent();
    this.addCreateUserNameEvent();
  }
};

window.addEventListener("load", () => {
  const oauthSignUpHandler = new OauthSignUpHandler();
  oauthSignUpHandler.run();
});
