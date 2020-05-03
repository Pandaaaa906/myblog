import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import marked from 'marked';
import hljs from "highlight.js";
import "highlight.js/styles/an-old-hope.css";
import Comments from "./Comments";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function Article({history, user}) {
    const pathname = window.location.pathname;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [articleId, setArticleId] = useState();

    useEffect((() => {
        if (loading){
            fetch('/api'+pathname,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((res)=>{
                    if (!res.ok){
                        console.log(res.status);
                        history.push('/404');
                    }
                    return res
                })
                .then(res=>res.json())
                .then(article=>{
                    setTitle(article.title);
                    setContent(article.content);
                    setArticleId(article.id);
                })
                .then(() => setLoading(false));
        }
    }), []);

    const getMarkdownText=()=>{
        marked.Renderer.prototype.blockquote = function(quote) {
            return '<blockquote class="MuiCardContent-root MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded">\n' +
                quote + '</blockquote>\n';
        };
        const renderer = new marked.Renderer();
        renderer.code = (code, infostring) => {
            // Check whether the given language is valid for highlight.js.
            const validLang = !!(infostring && hljs.getLanguage(infostring));
            // Highlight only if the language is valid.
            const highlighted = validLang ? hljs.highlight(infostring, code).value : code;
            // Render the highlighted code with `hljs` class.
            return (
                '<pre>'+
                '<code class="hljs "'+infostring+'>'+
                highlighted+
                '</code>'+
                '</pre>');
        };
        marked.setOptions({
            renderer: renderer,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
            langPrefix: 'hljs language-',
        });
        const rawMarkup = marked(content);
        return { __html: rawMarkup };
    };

    return (
        <Grid container direction={"column"} spacing={3}>
            <Backdrop open={loading} onClick={()=>setLoading(false)} addEndListener={()=>{}}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h4"}>{title}</Typography>
                        <Divider/>
                    </CardContent>
                    <CardContent>
                        <div dangerouslySetInnerHTML={getMarkdownText()}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Comments articleId={articleId} user={user}/>
            </Grid>
        </Grid>
    )
}