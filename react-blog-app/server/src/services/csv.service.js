import fs from "fs";
import { parse } from "@fast-csv/parse";
import { format } from "@fast-csv/format";



/* -------------------- IMPORT -------------------- */

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const blogs = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          headers: true,
          ignoreEmpty: true,
          trim: true,
        })
      )
      .on("error", reject)
      .on("data", (row) => {
        blogs.push(row);
      })
      .on("end", () => {
        resolve(blogs);
      });
  });
};


/* -------------------- EXPORT -------------------- */

export const exportCSV = (blogs, res) => {
  // Tell the browser that the response is a CSV file
  res.setHeader("Content-Type", "text/csv");

  // Tell the browser to download the file instead of displaying it
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="blogs.csv"'
  );

  // Create a CSV formatter
  const csvStream = format({
    headers: true,
  });

  // Send CSV data directly to the client
  csvStream.pipe(res);

  // Write each blog as one CSV row
for (const blog of blogs) {
  csvStream.write({
    title: blog.title,
    description: blog.description,
    imageUrl: blog.imageUrl,
    status: blog.status,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  });
}

  // Finish the CSV stream
  csvStream.end();
};



