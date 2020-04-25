import React, {Component} from 'react';
import "./Footer.css"
import Typography from "@material-ui/core/Typography";
import config from 'react-global-configuration';


class Footer extends Component {
    render() {
        return (
            <div className={"footer"}>
                <div className={"info"}>
                    Github: <a href={config.get("github")} target={"_blank"} rel="noopener noreferrer">
                    {config.get("github")}</a><br/>
                    E-mail: <a href={"mailto:"+config.get("email")} target={"_blank"} rel="noopener noreferrer">
                    {config.get("email")}
                </a><br/>
                </div>
                <div className={"deco"}>
                    <Typography variant={"h2"}>I'M A FOOTER!!</Typography>
                </div>
            </div>
        );
    }
}

export default Footer;