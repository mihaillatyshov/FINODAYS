import React from 'react'
import Comments from './components/Comments'

class App extends React.Component{
    render (){
        return (
            <div className="App bg-main">
                <Comments />
                <br />
                <div> Rate us! 
                    <div className="simple-rating">
                        <div className="simple-rating_items">
                            <input id="simple-rating_5" type="radio" className="simple-rating_item" name="simple-rating" value="5" onClick={() => console.log("5")} />
                            <label htmlFor="simple-rating_5">5</label>

                            <input id="simple-rating_4" type="radio" className="simple-rating_item" name="simple-rating" value="4" onClick={() => console.log("4")} />
                            <label htmlFor="simple-rating_4">4</label>

                            <input id="simple-rating_3" type="radio" className="simple-rating_item" name="simple-rating" value="3" onClick={() => console.log("3")} />
                            <label htmlFor="simple-rating_3">3</label>

                            <input id="simple-rating_2" type="radio" className="simple-rating_item" name="simple-rating" value="2" onClick={() => console.log("2")} />
                            <label htmlFor="simple-rating_2">2</label>

                            <input id="simple-rating_1" type="radio" className="simple-rating_item" name="simple-rating" value="1" onClick={() => console.log("1")} />
                            <label htmlFor="simple-rating_1">1</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App