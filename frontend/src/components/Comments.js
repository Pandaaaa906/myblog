import React, {useEffect} from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./Comments.css"


const comments = [
    {id:1, content:"asdf", user: {username:"Pandaaaa", avatar:"/static/img/avatar.png"}},
    {id:2, content: "zxcv", user: {username:"Pandaaaa", avatar:"/static/img/avatar.png"}},
];


function UserAvatar(props) {
    return (
        <Grid container direction={"column"}>
            <Grid item>
                <img className={"avatar"} src={props.avatar} alt={props.username} style={{ratio: 'auto', maxWidth:'100%'}}/>
            </Grid>
            <Grid item>
                <Typography align={"center"}>{props.username}</Typography>
            </Grid>
        </Grid>
    )
}


function Comment(props) {
    return (
        <Grid item  xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
                <CardContent>
                    <Grid container spacing={3} justify={"space-between"}>
                        <Grid item>
                            <Grid container spacing={3}>
                                <Grid item xl={2} lg={2} md={2} sm={3} xs={4}>
                                    <UserAvatar {...props.user}/>
                                </Grid>
                                <Grid item>
                                    <Typography>{props.content}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button>Reply</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}


export default function Comments(props) {
    useEffect(()=>{
        const articleId = props.articleId;
        console.log(articleId);
    }, []);

    return (
        <Grid container>
            <Grid item xl={12} lg={12} md={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>Comments</Typography>
                        <Divider/>
                    </CardContent>
                    <CardContent>
                        <TextField label={"New Comment"} variant={"outlined"} fullWidth multiline rows={6}/>
                        <Button>Send</Button>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={1}>
                            {comments.map(value => (
                                <Comment key={"comment-id-"+value.id} {...value}/>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}