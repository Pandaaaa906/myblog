import config from 'react-global-configuration';


config.set({
    base_url: "/api",
    title: "Pandaaaa's Playground",
    email: "ye.pandaaaa906@gmail.com",
    github: "https://github.com/Pandaaaa906",
    GITHUB_CLIENT_ID: '30dabe99b208160ea951',
    GITHUB_REDIRECT_URI: 'http://www.pandaaaa906.ga/github_oauth',
    tabs: [
        {key: 'home', title: 'Home', path: '/'},
        {key: 'about', title: 'About', path: '/about'},
    ],
    about_msg : "我就随便记点笔记",
}, { freeze: false});

export default config;