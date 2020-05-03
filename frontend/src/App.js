import React, {useRef, Suspense, lazy, useState, useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@material-ui/core/Container";
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import HomePage from "./components/HomePage";
import "./config";

const About = lazy(() => import('./components/About'));
const Login = lazy(() => import('./components/Login'));
const Article = lazy(() => import('./components/Article'));
const Tag = lazy(() => import('./components/Tag'));
const NoMatch = lazy(() => import('./components/NoMatch'));
// import Login from "./components/Login";
// import Article from "./components/Article";
// import Tag from "./components/Tag";
// import NoMatch from "./components/NoMatch";


function App(props) {
    const content = useRef();
    const [ user, setUser] = useState({});
    const [ isAuthorized, setIsAuthorized] = useState(false);

    const isLoggedIn=()=>{
        fetch('/auth/is_logged_in/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setUser(data);
                if(!!data.id) {
                    setIsAuthorized(true);
                }
                return data
            })
    };

    useEffect(()=>{
        isLoggedIn()
    },[]);

    return (
        <Router history={history}>
            <div className="App">
                <Header window={content} history={history}/>
                <Container maxWidth={"lg"} className={"content"} ref={content}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/login" component={Login} />
                            <Route path="/articles/:id/" render={(props)=><Article {...props} user={user}/>}/>
                            <Route path="/tags/:id/" component={Tag} />
                            <Route path="/404" component={NoMatch}/>
                            <Route path="*" component={NoMatch}/>
                        </Switch>
                    </Suspense>
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
