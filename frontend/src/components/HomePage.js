import Grid from "@material-ui/core/Grid";
import React from "react";
import Articles from "./Articles";
import Activities from "./Activities";
import Tags from "./Tags";


export default function HomePage(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xl={8} md={8} sm={12} xs={12}>
                <Articles />
            </Grid>
            <Grid item xl={4} md={4} sm={12} xs={12}>
                <Grid container spacing={3} direction={"column"}>
                    <Grid item>
                        <Activities />
                    </Grid>
                    <Grid item>
                        <Tags />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}