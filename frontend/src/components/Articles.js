import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import "./Articles.css"

export function ArticleSummary(props) {
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
                <CardContent>
                    <Link href={"/articles/"+props.id+'/'} underline={"none"}>
                        <Typography variant={"h6"}>{props.title}</Typography>
                    </Link>
                    <Divider/>
                    <Grid container className={"summary"}>
                        <Typography nowrap="true" display={"block"} gutterBottom>{props.content}</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}


export default function Articles() {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        if (loading){
            fetch('/api/articles/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res=>res.json())
                // .then(data=>{console.log(data); return data})
                .then(data=>{setArticles(data);return data})
                .then(()=>setLoading(false))
        }
    }, []);

    return (
        <Grid container>
            <Card>
                <CardContent>
                    <Typography component="h5" variant="h5">Recent Articles</Typography>
                    <Divider light />
                    <Grid container spacing={3} direction={"column"}>
                        {articles.map(value => (
                            <ArticleSummary key={"article-id-"+value.id} {...value}/>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}