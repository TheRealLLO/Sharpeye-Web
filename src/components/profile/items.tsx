import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";

const Items = ({item}) => {
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
        BOK
      </div>
    </section>
  );
};

export default Items;
