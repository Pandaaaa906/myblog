import React, {Component} from "react";
import AppBar from '@material-ui/core/AppBar';
import "./Header.css"
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import BlogTabs from "./BlogTabs";
import config from 'react-global-configuration';


class Avatar extends Component{
    render() {
        return (
            <div className={this.props.className}>
                <div>
                    <a href="/login">
                        <img className="avatar" src="/static/img/avatar.png" alt="avatar"/>
                    </a>
                </div>
            </div>
        );
    }
}


export default function Header(props){
    const trigger = useScrollTrigger({threshold: 30});
    return (
        <AppBar className={trigger?"shrink header":"header"}>
            <Grid className={"headerGrid"} container direction={"row"} justify="space-between">
                <Grid item className={"tab"} xl={6} md={6}>
                    <Grid container className={"tab"} alignItems={"flex-end"} >
                        <BlogTabs {...props}/>
                    </Grid>
                </Grid>
                <Grid item >
                    <Typography variant={"h1"}>{config.get("title")}</Typography>
                </Grid>
            </Grid>

            <Avatar className={trigger?"profiler shrink":"profiler"}/>
        </AppBar>
    )
}
