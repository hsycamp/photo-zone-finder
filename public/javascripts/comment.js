const CommentHandler = class {
  constructor() {
    this.commentBoard = document.querySelector(".ui.comments");
    this.commentBox = document.querySelector("#comment");
    this.deleteButtons = document.querySelectorAll("#comment-delete-btn");
  }

  async createCommentEvent() {
    const text = this.commentBox.value;
    if (!text) return this.commentBox.focus();
    const postId = window.location.pathname.substring(8);
    const inputData = {
      text,
      postId
    };
    const newCommentData = await this.fetchData().createComment(
      JSON.stringify(inputData)
    );
    const newCommentElement = this.createCommentElement(newCommentData);
    this.commentBoard.insertAdjacentHTML("beforeend", newCommentElement);
    this.commentBox.value = "";
    const newDeleteButton = document
      .getElementById(newCommentData._id)
      .querySelector("#comment-delete-btn");
    newDeleteButton.addEventListener("click", event => {
      this.deleteCommentEvent(event);
    });
  }

  createCommentElement(newCommentData) {
    moment.locale("ko");
    const commentElement = `
    <div class="comment" id="${newCommentData._id}">
      <a class="avatar"><img src="/images/avatar.png"></a>
      <div class="content">
        <a class="author" href="/user-page/${newCommentData.publisher}">
          ${newCommentData.publisher}
        </a>
        <span class="right floated">
          <i class="trash icon" id="comment-delete-btn" style="cursor:pointer"></i>
        </span>
        <div class="text">${newCommentData.content}</div>
        <div id="published-date" style="color:#A2A2A2;font-size:12px;">
          ${moment(newCommentData.publishedDate).fromNow()}
        </div>
      </div>
    </div>
    `;
    return commentElement;
  }

  addCreateCommentEvent() {
    this.commentBox.addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        this.createCommentEvent();
      }
    });
  }

  async deleteCommentEvent(event) {
    const commentId = event.target.parentNode.parentNode.parentNode.id;
    const deleteResult = await this.fetchData().deleteComment(commentId);
    if (deleteResult === "success") {
      const targetComment = document.getElementById(commentId);
      this.commentBoard.removeChild(targetComment);
    }
  }

  addDeleteCommentEvent() {
    this.deleteButtons.forEach(button => {
      button.addEventListener("click", event => {
        this.deleteCommentEvent(event);
      });
    });
  }

  fetchData() {
    const createComment = async inputData => {
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

    const deleteComment = async commentId => {
      const url = `/comment/${commentId}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
      const result = await response.json();
      return result;
    };
    return { createComment, deleteComment };
  }

  run() {
    this.addCreateCommentEvent();
    this.addDeleteCommentEvent();
  }
};

window.addEventListener("load", () => {
  const commentHandler = new CommentHandler();
  commentHandler.run();
});
