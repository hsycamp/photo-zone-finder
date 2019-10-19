const postController = {
  uploadImage: (req, res, next) => {
    try {
      let payLoad = { url: req.file.location };
      return res.json(200, payLoad);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = postController;
