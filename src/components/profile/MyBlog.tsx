import React from "react";

const MyBlog = ({item}) => {
  console.log("item: ", item);
  return (
    <section className=" style-15 section-padding">
      <div
        className="container"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        Blogs
      </div>
    </section>
  );
};

export default MyBlog;
