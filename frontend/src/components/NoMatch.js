import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


export default function NoMatch(props) {
    return (
        <Grid container justify={"space-around"}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Typography variant={"h1"} align={"center"}>
                    404 Error
                </Typography>
            </Grid>
        </Grid>
    )
}