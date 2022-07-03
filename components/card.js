import React from "react";
import Image from "next/image";
import classes from './card.module.css'
import Link from "next/link";
import cls from "classnames";

const Card = (props) => {
  return (
    <Link href={props.href} >
    <a className={classes.cardLink}>
    <div className={cls("glass", classes.container)}>
          <div className={classes.cardHeaderWrapper}>
            <h2 className={classes.cardHeader}>{props.name}</h2>
          </div>
          <div className={classes.cardImageWrapper}>
            <Image
              className={classes.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
              alt={props.name}
            />
          </div>
        </div>
      </a>
    </Link>
    );
};

export default Card;