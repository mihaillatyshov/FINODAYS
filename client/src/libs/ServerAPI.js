
const I_SAPI  = {
	headers : { 'Content-Type': 'application/json; charset=UTF-8' },
	onDataReceived : (data) => {},
	urlParams : undefined
}

const getStrFromParams = (rawParams) => {
	return rawParams ? '?' + Object.keys(rawParams).map((param) => { return `${param}=${rawParams[param]}` }).join('&') : ""
}

// Usage: ServerAPI_GET({ url : 'yor_url', onDataReceived : (data) => { handleData(data) } })
// Usage: ServerAPI_GET({ url : '/get_comments', onDataReceived : (data) => {setComments(data.comments)} })
export const ServerAPI_GET = ({ url, urlParams = I_SAPI.urlParams, onDataReceived = I_SAPI.onDataReceived }) => {
	fetch(url + getStrFromParams(urlParams)).then(responce => {
		if (responce.ok) {
			return responce.json()
		}
	}).then(data => {
		if (typeof data === 'undefined') {
			console.log("Bad GET responce")
		}
		else {
			console.log(data)
			onDataReceived(data)
		}
	})
} 

// Usage: ServerAPI_POST({ url : 'your_url', sendObj : your_object, onDataReceived : (data) => { handleData(data) } })
// Usage: ServerAPI_GET({ url : '/get_comments', onDataReceived : (data) => {setComments(data.comments)} })
export const ServerAPI_POST = ({ url, sendObj, onDataReceived = I_SAPI.onDataReceived, headers = I_SAPI.headers }) => {
	fetch(url, {
		method : 'POST',
		headers: headers,
		body : JSON.stringify(sendObj)
	}).then(responce => {
			if (responce.ok) {
				return responce.json()
			}
		}).then(data => {
			if (typeof data === 'undefined') {
				console.log("Bad POST responce")
			}
			else {
				console.log(data)
				onDataReceived(data)
			}
		}
	)
}

export const ServerAPI_DELETE = ( { url, urlParams = I_SAPI.urlParams, onDataReceived = I_SAPI.onDataReceived } ) => {
	fetch(url + getStrFromParams(urlParams), { 
		method: 'DELETE' 
	}).then(responce => {
			if (responce.ok) {
				return responce.json()
			}
		}).then(data => {
			if (typeof data === 'undefined') {
				console.log("Bad DELETE responce")
			}
			else {
				console.log(data)
				onDataReceived(data)
			}
		}
	);
}