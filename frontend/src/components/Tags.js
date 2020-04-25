import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";


export default function Tags() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(()=>{
        if (loading){
            fetch('/api/tags/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res=>res.json())
                .then(data=>setItems(data))
                .then(()=>(setLoading(false)));
        }
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography component="h5" variant="h5">Tags</Typography>
                <Divider light />
            </CardContent>
            <CardContent>
                <CardActions>
                    {items.map(value => (
                        <Button variant={"contained"}
                                color={"primary"}
                                href={"/tags/"+value.id+"/"}
                                key={"tag-"+value.id}
                        >{value.name}</Button>
                    ))}
                </CardActions>
            </CardContent>
        </Card>
    )
}