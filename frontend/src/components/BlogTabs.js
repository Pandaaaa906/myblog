import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import config from 'react-global-configuration';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ffffff'
        }
    }
    },
);

export default function BlogTabs(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const onTabClick = tab => props.history.push(tab.path);
    const tabs = config.get("tabs");
    let tabItems = tabs.map( item =>
        <Tab
            key={"blog-tab-"+item.key}
            label={item.title}
            onClick={onTabClick.bind(this,item)} />
    );
    return (
        <MuiThemeProvider theme={theme}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {tabItems}
            </Tabs>
        </MuiThemeProvider>
    )
}