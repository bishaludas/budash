import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    wordSpacing: "2px",
    "& p": {
      marginBottom: "5%",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "10%",
      },
    },
  },
  links: {
    color: "inherit",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <p>
        Hi, I'm Bishal! I'm a full-stack engineer with a passion for building
        beautiful things from scratch. I've been building websites and saas
        services since 2017.
      </p>

      <p>
        In 2019 I got opportunity to explore Data Analytics which helped me
        better understand how it could help to make relevant decisions and have
        been working on improving my skills.
      </p>
      <p>
        Right now I'm working at{" "}
        <a
          href="https://www.mobwizards.com/"
          target="_blank"
          className={classes.links}
          rel="noreferrer"
        >
          Mobwizards
        </a>
        , a digital marketing company where I'm remodeling the old backoffice
        using React.js and Laravel. The next phase is to make use of data
        analytics to provide results that help in making better decision to the
        company.
      </p>

      <p>
        I work on challenging projects and I enjoy writing about it. I
        occasionally make myself available for contract work and consultancy.
      </p>
      <p>
        You can reach me at{" "}
        <a href="mailto: abc@example.com" className={classes.links}>
          bishal.udash@budash.net
        </a>{" "}
      </p>
    </div>
  );
};

export default About;
