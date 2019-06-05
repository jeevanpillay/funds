import React from "react";
import { withRouter } from "react-router-dom";
import Error from "../error";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../../queries/authentication.queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

const styles = theme => ({
  signup: {
    overflow: "hidden",
    position: "fixed",
    height: "100%",
    width: "100%",
    margin: 0
  },
  loginForm: {
    overflow: "hidden",
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
    "-webkit-filter": "blur(5px)",
    overflow: "hidden"
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

class Signup extends React.Component {
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

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { 
      username, 
      email, 
      password, 
      passwordConfirmation } = this.state;

    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;

    return isInvalid;
  };

  render() {
    const { 
      username, 
      email, 
      password, 
      passwordConfirmation 
    } = this.state;

    const { classes } = this.props;

    return (
      <div className={classes.signup}>
        <img
          src={`/contents/images/Monster.jpg`}
          alt=""
          className={classes.backgroundImg}
        />
        <div className={classes.gradient} />
        <div class={classes.loginForm}>
          <hgroup className={classes.hgroup}>
            <Typography className={classes.hgroupText}>
              ADMIN SIGN-UP
            </Typography>
          </hgroup>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{ username, email, password }}
          >
            {(signupUser, { data, loading, error }) => {
              return (
                <form
                  className={classes.form}
                  onSubmit={event => this.handleSubmit(event, signupUser)}
                >
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm Password"
                      value={passwordConfirmation}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || this.validateForm()}
                    className="button-primary"
                  >
                    Submit
                  </button>
                  {error && <Error error={error} />}
                </form>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Signup));
