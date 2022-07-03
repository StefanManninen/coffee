import React from "react";
import classes from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        <span className={classes.title1}>Coffee</span>
        <span className={classes.title2}>Connoisseur</span>
      </h1>
      <p className={classes.subTitle}>Discover your local coffee shops!</p>
      <div className={classes.buttonWrapper}>
        <button className={classes.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
