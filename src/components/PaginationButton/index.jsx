import React from 'react';
import './style.css';
import Icon from '../Icon';

export const PaginationButton = ({ currentPage, totalPages, disabledBackButton, disabledNextButton, backButton, nextButton }) => {
    return (
        <div className='wrapper-pagination'>
            <button className='wrapper--paginationButton' disabled={disabledBackButton} onClick={backButton}><Icon name="back-button" /></button>
            <div className='wrapper--pagination-text'>
                {currentPage} de {totalPages}
            </div>
            <button className='wrapper--paginationButton' disabled={disabledNextButton} onClick={nextButton}><Icon name="next-button" /></button>
        </div>
    )
}