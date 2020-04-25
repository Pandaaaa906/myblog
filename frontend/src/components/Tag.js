import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card/Card";
import {ArticleSummary} from "./Articles";

export default function () {
    const pathname = window.location.pathname;
    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState([]);
    const [tag, setTag] = useState("");

    useEffect((() => {
        if (loading){
            fetch('/api'+pathname,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res=>res.json())
                .then(items=>{
                    setItems(items.articles);
                    setTag(items.name);
                })
                .then(() => setLoading(false));
        }
    }), []);

    return (
        <Card>
            <CardContent>
                <Typography component="h5" variant="h5">Tag: {tag}</Typography>
                <Divider light />
            </CardContent>
            <CardContent>
                <Grid container spacing={3} direction={"column"}>
                    {items.map(value => (
                        <ArticleSummary key={"article-id-"+value.id} {...value}/>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}