
import React, { useRef } from "react";
import './App.css';

const Editabletitel = (props) => {
    const element = useRef();
    let elements = React.Children.toArray(props.children);

    elements = React.cloneElement(elements[0], {
      contentEditable: true,
      suppressContentEditableWarning: true,
      ref: element
    });
    return elements;
  };

class App extends React.Component {

    constructor() {
      super()
      this.state = { results: [] }
    }
  
    componentDidMount() {
        var url = "https://storage.googleapis.com/aller-structure-task/test_data.json"
        fetch(url, {method: "GET",
              headers:{
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({ results: data })
                this.render()
        })
      
    }
  
    render() {
        console.log(this.state.results);
        return (
            <div>
            <h1>Dagbladet front page</h1>
            <div>
                {
                this.state.results.map(result => {
                return (
                <div key={result.length}>
                    {
                    result.map(row => {
                        return(
                            <div className="contt">
                            {
                                row.columns.map(column => {
                                    return(
                                        <div className="artical"  style={{width: column.width/12*100-2+"%"}} >
                                                 <Editabletitel><h2>{column.title}</h2></Editabletitel><img src={column.imageUrl}></img><br></br><a href={column.url}>{column.url}</a><br></br><t>type: {column.type}</t>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        )
                    })
                    }
                </div>
                )
                })}
            </div>
            </div>
        )
    }
}

export default App;

