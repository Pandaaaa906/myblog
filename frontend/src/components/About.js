import Grid from "@material-ui/core/Grid";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import config from 'react-global-configuration';


export default function About(props) {
    return (
        <Grid item xl={12} md={12}>
            <Card>
                <CardContent>
                    <Typography variant={"h3"}>About</Typography>
                    <Divider />
                </CardContent>
                <CardContent>
                    <Typography>{config.get("about_msg")}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}