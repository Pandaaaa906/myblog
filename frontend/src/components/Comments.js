import React, {useEffect, useRef, useState} from "react";
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


function CommentEditor({parent_id, user, refProp}){
    const pathname = window.location.pathname;
    const [content, setContent] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("/api"+pathname+"add_comment/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify({
                parent_id: parent_id,
                content: content,
            })
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
    };

    return (
        <CardContent style={{display: !!user?"block":"none"}} ref={refProp}>
            <TextField
                label={"New Comment"} variant={"outlined"}
                fullWidth multiline rows={6}
                onChange={(event)=>setContent(event.target.value)}
            />
            <Button onClick={handleSubmit}>Send</Button>
        </CardContent>
    )
}

function ParentComment(props) {
    let {user} = props;
    let {content} = props;
    user = !user?{}:user;
    return (
        <Grid item  xl={10} lg={10} md={10} sm={12} xs={12}
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

function Comment({id, user, parent, content, onReply}) {

    const handleReply=()=>{
        onReply(id)
    };

    return (
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card>
                <CardContent>
                    <Grid container spacing={3} justify={"space-between"}>
                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                            <Grid container spacing={3}>
                                <Grid item xl={2} lg={2} md={2} sm={3} xs={4}>
                                    <UserAvatar {...user}/>
                                </Grid>
                                <Grid item  xl={10} lg={10} md={10} sm={9} xs={8}>
                                    <Grid container direction={"column"}>
                                        <ParentComment {...parent}/>
                                        <Grid item>
                                            <Typography>{content}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleReply}>Reply</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-100);

export default function Comments({ articleId, user }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [parent_id, setParentId] = useState(null);
    const commentEditorRef = useRef(null);

    useEffect(()=>{
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
                .then(() => (setLoading(false)))
        }
    });

    const onReply=(parent_id)=>{
        setParentId(parent_id);
        scrollToRef(commentEditorRef);
    };

    return (
        <Grid container>
            <Grid item xl={12} lg={12} md={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>Comments</Typography>
                        <Divider/>
                    </CardContent>
                    <CommentEditor user={user} parent_id={parent_id} refProp={commentEditorRef}/>
                    <CardContent>
                        <Grid container spacing={1}>
                            {comments.map(value => (
                                <Comment key={"comment-id-"+value.id} onReply={onReply} {...value}/>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}