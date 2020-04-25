import React, {useRef} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@material-ui/core/Container";
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Login from "./components/Login";
import "./config";
import Article from "./components/Article";
import Tag from "./components/Tag";
import NoMatch from "./components/NoMatch";


function App(props) {
    const content = useRef();
    return (
        <Router history={history}>
            <div className="App">
                <Header window={content} history={history}/>
                <Container fixed className={"content"} ref={content}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route path="/articles/:id/" component={Article} />
                        <Route path="/tags/:id/" component={Tag} />
                        <Route path="*" component={NoMatch}/>
                    </Switch>
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
