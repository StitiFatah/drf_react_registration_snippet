import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
//
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

// using directly the Link from react router
// import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { api_axios } from "../../common/api.service";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/home">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormFata] = useState(initialFormData);
  const [registerErrors, setRegisterErrors] = useState({ errors: [] });

  const handleChange = (event) => {
    updateFormFata({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);

    let register_endpoint = "/dj-rest-auth/registration/";
    let register_data = {
      username: formData.username,
      email: formData.email,
      password1: formData.password1,
      password2: formData.password2,
    };

    let register_method = "post";

    let response = await api_axios(
      register_endpoint,
      register_method,
      register_data
    );

    if (response.status === 201) {
      console.log("USER CREATED");
      console.log(response, response.data);
      history.push("/login");
    } else {
      console.log(response);
      console.log(response.data);

      let register_errors = response.data;
      let error_list = [];

      for (let i in register_errors) {
        error_list.push(...register_errors[i]);
      }

      setRegisterErrors({ errors: error_list });
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password1"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Repeat Password"
                type="password"
                id="password2"
                autoComplete="current-password2"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          {registerErrors.errors.length > 0 && (
            <ul className="mt-3 mb-4 list-disc">
              {registerErrors.errors.map((error, index) => (
                <li className="text-red-600 font-semibold my-3" key={index}>
                  {error}
                </li>
              ))}
            </ul>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                className="text-blue-600 hover:underline"
                to="/login"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
