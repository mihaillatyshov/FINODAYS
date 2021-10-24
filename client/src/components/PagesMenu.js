import React from 'react'

const PagesMenu = ( {pageId, elementsCount, pageSize, pagesOnLR = 3, onPageChange} ) => {
	let pagesIds = []
	let pagesCount = Math.ceil(elementsCount / pageSize)
	
	const minPage = 0;
	const maxPage = pagesCount - 1;

	let hasLeftSkip
	let hasRightSkip
	const updatePages = () => {
		pagesCount = Math.ceil(elementsCount / pageSize)
		if (pagesCount < 1)
			return
		const fStartPage = Math.max(pageId - pagesOnLR, minPage)
		const fEndPage = Math.min(pageId + pagesOnLR, maxPage)
		let endPage = Math.max(fEndPage, Math.min(fStartPage + pagesOnLR * 2, maxPage))
		let startPage = Math.min(fStartPage, Math.max(fEndPage - pagesOnLR * 2, minPage))
		hasLeftSkip = startPage === minPage ? false : true 
		hasRightSkip = endPage === maxPage ? false : true 
		if (hasLeftSkip) 
			startPage++
		if (hasRightSkip) 
			endPage--
		for (let i = startPage; i <= endPage; i++)
		{
			pagesIds.push(i)
		}
	}

	updatePages()

	const handeLeftPage = () => {
		if (pagesCount < 1 || pageId === minPage)
			return
		onPageChange(Math.max(pageId - 1, minPage))
	}

	const handeRightPage = () => {
		if (pagesCount < 1 || pageId === maxPage)
			return
		onPageChange(Math.min(pageId + 1, maxPage))
	}

	const handeSetFirst = () => {
		if (pagesCount < 1 || pageId === minPage)
			return
		onPageChange(minPage)
	}

	const handeSetLast = () => {
		if (pagesCount < 1 || pageId === maxPage)
			return
		onPageChange(maxPage)
	}

	const handeSelectPage = (id) => {
		if (pagesCount < 1 || id === pageId)
			return
		onPageChange(id)
	}

	return (
		<div>
			<table className="control-block">
				<tbody>
					<tr>
						<td>
							<div className="btn-group" role="group" aria-label="Basic outlined example">
								<input type="button" className="btn page-btn btn-secondary" value="<<" onClick={handeSetFirst} />
								<input type="button" className="btn page-btn btn-secondary" value="<" onClick={handeLeftPage} />
								{hasLeftSkip  === true ? <input type="button" className="btn page-btn btn-secondary disabled" value="..." /> : ""}
								{
									pagesIds.map((i) => (
										<input 
											key={i} 
											type="button" 
											className={pageId === i ? "btn page-btn btn-outline-dark disabled" : "btn page-btn btn-dark"}  
											value={i + 1} 
											onClick={(e) => handeSelectPage(i)} 
										/>
									))
								}
								{hasRightSkip  === true ? <input type="button" className="btn page-btn btn-secondary disabled" value="..." /> : ""}
								<input type="button" className="btn page-btn btn-secondary" value=">" onClick={handeRightPage} />
								<input type="button" className="btn page-btn btn-secondary" value=">>" onClick={handeSetLast} />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default PagesMenu