// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch((err) => {
//     res.status(500).json({ message: err.message });
//   });
// };
// export default asyncHandler;
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // Multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "File size exceeds 1MB limit",
      });
    }

    // File type errors
    if (err.message.includes("file type") || err.message.includes("only")) {
      return res.status(415).json({
        success: false,
        message: "Unsupported file type",
      });
    }

    // Validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors).map((val) => val.message),
      });
    }

    // Default error (500)
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production" ? "Server error" : err.message,
    });
  });
};

export default asyncHandler;
