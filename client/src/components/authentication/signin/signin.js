import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Error from "../error";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../../queries";

const initialState = {
  username: "",
  password: ""
};

const styles = theme => ({
  signin: {
    overflow: "hidden",
    position: "fixed",
    height: "100%",
    width: "100%",
    margin: 0
  },
  loginForm: {
    width: 420,
    margin: "0 auto",
    zIndex: 99,
    display: "block",
    position: "relative",
    marginTop: "5%",
    borderRadius: ".25em .25em .4em .4em",
    textAlign: "center",
    boxShadow: "0 5px 20px 2px rgba(80, 25, 117, 0.2)"
  },
  hgroup: {
    textAlign: "center",
    opacity: "0.7",
    padding: 30,
    background: "#5c0d9f",
    fontFamily: "Avenir"
  },
  hgroupText: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 30,
    fontFamily: "Avenir",
    color: "#fff"
  },
  form: {
    padding: 30,
    paddingTop: 50,
    background: "#fff"
  },
  powered: {
    padding: 10,
    marginTop: "-16px",
    lineHeight: "25px",
    background: "#5c0d9f",
    opacity: "0.8"
  },
  url: {
    color: "#ddd",
    textDecoration: "none"
  },
  input: {
    width: "80%",
    color: "black",
    marginBottom: 20
  },
  button: {
    marginTop: 20,
    width: "80%",
    color: "white",
    backgroundColor: "#5c0d9f",
    boxShadow: "0 5px 20px 2px rgba(80, 25, 117, 0.12)",
    border: "none"
  },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    minHeight: "100%",
    bottom: 0,
    right: 0,
    top: -20,
    left: -20,
    backgroundSize: "cover",
    zIndex: 1,
    "-webkit-filter": "blur(5px)"
  },
  gradient: {
    position: "absolute",
    right: "0px",
    top: "-20px",
    left: "-20px",
    bottom: "0px",
    width: "auto",
    height: "auto",
    background: "purple",
    zIndex: 1,
    opacity: "0.2"
  }
});

class Signin extends React.Component {
  //component state
  state = { ...initialState };

  //reset state
  clearState = () => {
    this.setState({ ...initialState });
  };

  //function to dynamically handle updating the state
  handleChange = event => {
    //destructure and update the value of the state
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/administration");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.signin}>
        <img
          src={`/contents/images/Monster.jpg`}
          alt=""
          className={classes.backgroundImg}
        />

        <div className={classes.gradient} />

        <div className={classes.loginForm}>
          <hgroup className={classes.hgroup}>
            <Typography className={classes.hgroupText}>ADMIN LOGIN</Typography>
          </hgroup>

          <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
            {(signinUser, { data, loading, error }) => {
              return (
                <form
                  className={classes.form}
                  onSubmit={event => this.handleSubmit(event, signinUser)}
                >
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={classes.input}
                    value={username}
                    onChange={this.handleChange}
                  />
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={classes.input}
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className={classes.button}
                    disabled={loading || this.validateForm()}
                  >
                    Submit
                  </button>
                  {error && <Error error={error} />}
                </form>
              );
            }}
          </Mutation>
          <div className={classes.powered}>
            Powered by{" "}
            <a className={classes.url} href="http://tech.monster.com.my/">
              Monster Tech
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Signin));
