import React from 'react'
import './MyStyles.css'

export const PagesMenu = ( {PageId, ElementsCount, ElementsOnPage, PagesOnLR = 3, OnPageChange} ) => {
    let PagesIds = []
    let PagesCount = Math.ceil(ElementsCount / ElementsOnPage)
    

    let hasLeftSkip
    let hasRightSkip
    const updatePages = () => {
        PagesCount = Math.ceil(ElementsCount / ElementsOnPage)
        if (PagesCount < 1)
            return
        const fStartPage = Math.max(PageId - PagesOnLR, 1)
        const fEndPage = Math.min(PageId + PagesOnLR, PagesCount)
        let endPage = Math.max(fEndPage, Math.min(fStartPage + PagesOnLR * 2, PagesCount))
        let startPage = Math.min(fStartPage, Math.max(fEndPage - PagesOnLR * 2, 1))
        hasLeftSkip = startPage === 1 ? false : true 
        hasRightSkip = endPage === PagesCount ? false : true 
        if (hasLeftSkip) 
            startPage++
        if (hasRightSkip) 
            endPage--
        for (let i = startPage; i <= endPage; i++)
        {
            PagesIds.push(i)
        }
    }

    updatePages()

    const handeMinusPage = () => {
        OnPageChange(Math.max(PageId - 1, 1))
    }

    const handePlusPage = () => {
        OnPageChange(Math.min(PageId + 1, PagesCount))
    }

    const handeSetFirst = () => {
        OnPageChange(1)
    }

    const handeSetLast = () => {
        OnPageChange(PagesCount)
    }

    const handeSelectPage = (id) => {
        OnPageChange(id)
    }

    return (
        <div>
            <table className="control-block">
                <tbody>
                    <tr>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <input type="button" className="btn page-btn btn-secondary" value="<<" onClick={handeSetFirst} />
                                <input type="button" className="btn page-btn btn-secondary" value="<" onClick={handeMinusPage} />
                                {hasLeftSkip  === true ? <input type="button" className="btn page-btn btn-secondary disabled" value="..." /> : ""}
                                {
                                    PagesIds.map((i) => (
                                        <input 
                                            key={i} 
                                            type="button" 
                                            className={PageId === i ? "btn page-btn btn-outline-dark disabled" : "btn page-btn btn-dark"}  
                                            value={i} 
                                            onClick={(e) => handeSelectPage(i)} 
                                        />
                                    ))
                                }
                                {hasRightSkip  === true ? <input type="button" className="btn page-btn btn-secondary disabled" value="..." /> : ""}
                                <input type="button" className="btn page-btn btn-secondary" value=">" onClick={handePlusPage} />
                                <input type="button" className="btn page-btn btn-secondary" value=">>" onClick={handeSetLast} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}