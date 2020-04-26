import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import config from 'react-global-configuration';
import Cookies from 'js-cookie';
import Typography from "@material-ui/core/Typography";
import "./Login.css"


function github_loin_url() {
    const client_id = config.get('GITHUB_CLIENT_ID');
    const redirect_uri = config.get('GITHUB_REDIRECT_URI');
    const state = Cookies.get("csrftoken");
    return "https://github.com/login/oauth/authorize?client_id="+
        client_id+
        "&redirect_uri="+
        redirect_uri+
        "&state="+state
}


function Warning(props) {
    const {location} = props;
    const params = new URLSearchParams(location.search);
    const err_msg = params.get('err_msg');
    return (
        <Card className={"warning"} style={{display: !!err_msg?"block":"none"}}>
            <CardContent>
                <Typography variant={"h5"}>
                    {err_msg}
                </Typography>
            </CardContent>
        </Card>
    )
}


export default function Login(props) {
    const csrf_token = Cookies.get("csrftoken");

    const onSubmit=(event)=>{
        event.preventDefault();
        const {target} = event;
        target.submit();
    };

    return (
        <Grid container direction={"column"} spacing={3}>
            <Grid item>
                <Warning {...props}/>
            </Grid>
            <Grid container justify={"space-around"}>
                <Grid item xl={6}>
                    <Card>
                        <CardContent>
                            <form
                                name={"login"}
                                action="/auth/login/"
                                method="POST"
                            >
                                <input name={"csrfmiddlewaretoken"} hidden defaultValue={csrf_token}/>
                                <Grid item>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="E-Mail"
                                        placeholder="Email or UserName"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                        fullWidth
                                        type="password"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Button
                                            type={"submit"}
                                            variant={"contained"}
                                            color={"primary"}>Login</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant={"contained"}
                                            color={"secondary"}
                                            href={github_loin_url()}
                                            target={"_blank"}
                                        >Github Login</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}