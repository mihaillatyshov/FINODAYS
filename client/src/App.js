import React from 'react'
import Comments from './components/Comments'
import Members from './components/Members'

class App extends React.Component{
    render (){
        return (
            <div className="App">
                <Comments />
            </div>
        )
    }
}

export default App