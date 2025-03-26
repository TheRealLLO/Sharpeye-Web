import React from "react";

const MyEducations = ({item}) => {
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
        Educations
      </div>
    </section>
  );
};

export default MyEducations;
