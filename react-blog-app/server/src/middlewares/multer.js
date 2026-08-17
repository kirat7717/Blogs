import multer from "multer";
import path from "path";

const upload = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (type === "blog") {
        cb(null, "public/blog-images");
      } else if (type === "user") {
        cb(null, "public/user-images");
      } else if (type === "csv") {
        cb(null, "temp/csv");
      } else {
        cb(new Error("Invalid upload type"));
      }
    },

    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);

      cb(
        null,
        file.fieldname +
          "-" +
          uniqueSuffix +
          path.extname(file.originalname),
      );
    },
  });

  return multer({ storage });
};

export default upload;