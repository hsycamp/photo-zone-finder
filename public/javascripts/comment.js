const CommentHandler = class {
  constructor() {
    this.commentBoard = document.querySelector(".ui.comments");
    this.commentBox = document.querySelector("#comment");
  }

  addCommentEvent() {
    this.commentBox.addEventListener("keypress", async event => {
      if (event.keyCode === 13) {
        const text = this.commentBox.value;
        if (!text) return this.commentBox.focus();
        const postId = window.location.pathname.substring(8);
        const inputData = {
          text,
          postId
        };
        const newCommentData = await this.fetchData().addComment(
          JSON.stringify(inputData)
        );
        const newCommentElement = this.createCommentElement(newCommentData);
        this.commentBoard.insertAdjacentHTML("beforeend", newCommentElement);
        this.commentBox.value = "";
      }
    });
  }

  createCommentElement(newCommentData) {
    const commentElement = `
    <div class="comment">
      <a class="avatar"><img src="/images/avatar.png"></a>
      <div class="content">
        <a class="author">${newCommentData.publisher}</a>
        <span class="right floated">
          <i class="trash icon"></i>
        </span>
        <div class="text">${newCommentData.content}</div>
      </div>
    </div>
    `;
    return commentElement;
  }

  fetchData() {
    const addComment = async inputData => {
      const url = "/comment";
      const response = await fetch(url, {
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      return result;
    };
    return { addComment };
  }

  run() {
    this.addCommentEvent();
  }
};

window.addEventListener("load", () => {
  const commentHandler = new CommentHandler();
  commentHandler.run();
});
