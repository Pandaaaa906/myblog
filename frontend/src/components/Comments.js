import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./Comments.css"
import Cookies from "js-cookie";


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


function CommentEditor(props){
    const [isAuthorized] = useState(!Cookies.get("sessionid"));

    useEffect(()=>{
        console.log(Cookies.get("sessionid"))
    }, []);

    return (
        <CardContent style={{display: isAuthorized?"block":"none"}}>
            <TextField label={"New Comment"} variant={"outlined"} fullWidth multiline rows={6}/>
            <Button>Send</Button>
        </CardContent>
    )
}

function ParentComment(props) {
    let {user} = props;
    let {content} = props;
    user = !user?{}:user;
    return (
        <Grid item  xl={10} lg={10} md={10} sm={10} xs={10}
              style={{display:!!content?"block":"none"}}>
            <Card>
                <CardContent>
                    <Typography>@{user.username}:</Typography>
                    <Typography>{content}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}


function Comment(props) {
    return (
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
                <CardContent>
                    <Grid container spacing={3} justify={"space-between"}>
                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                            <Grid container spacing={3}>
                                <Grid item xl={2} lg={2} md={2} sm={3} xs={4}>
                                    <UserAvatar {...props.user}/>
                                </Grid>
                                <Grid item  xl={10} lg={10} md={10} sm={9} xs={8}>
                                    <Grid container direction={"column"}>
                                        <ParentComment {...props.parent}/>
                                        <Grid item>
                                            <Typography>{props.content}</Typography>
                                        </Grid>
                                    </Grid>
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
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const { articleId } = props;
        if (!articleId){
            return
        }
        if (loading){
            fetch(
                '/api/articles/'+articleId+'/comments/',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(res=>res.json())
                .then(data=>(setComments(data)))
                .then((value => (setLoading(false))))
        }
    });

    return (
        <Grid container>
            <Grid item xl={12} lg={12} md={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>Comments</Typography>
                        <Divider/>
                    </CardContent>
                    <CommentEditor />
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