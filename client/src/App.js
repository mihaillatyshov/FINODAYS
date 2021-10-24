import React from 'react'
import Comments from './components/comments/Comments'
import Rating from './components/Rating'
import './MyStyles.css'

class App extends React.Component{
	render (){
		return (
			<div className="App bg-main">
				<Comments />
				<Rating />
			</div>
		)
	}
}

export default App