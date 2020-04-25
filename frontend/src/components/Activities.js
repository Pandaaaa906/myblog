import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React from "react";

export default function() {
    return (
        <Card>
            <CardContent>
                <Typography component="h5" variant="h5">Activities</Typography>
                <Divider light />
            </CardContent>
        </Card>
    )
}