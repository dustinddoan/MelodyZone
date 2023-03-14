import React from 'react'
import { Pagination, Button } from 'react-bootstrap'

const PaginationNav = ({ prods, prev, next, resetSearch }) => {
    const goToPrev = (page) => {
        prev(page)
    }
    const goToNext = (page) => {

        next(page)
    }

    return (
        <>
            {prods.docs.length ?
                <Pagination>
                    {prods.hasPrevPage ?
                        <>
                            <Pagination.Prev onClick={() => goToPrev(prods.prevPage)} />
                            <Pagination.Item onClick={() => goToPrev(prods.prevPage)}>
                                {prods.prevPage}
                            </Pagination.Item>
                        </>

                        : null}
                    <Pagination.Item active>{prods.page}</Pagination.Item>
                    {prods.hasNextPage ?
                        <>

                            <Pagination.Item onClick={() => goToNext(prods.nextPage)}>
                                {prods.nextPage}
                            </Pagination.Item>
                            <Pagination.Next onClick={() => goToNext(prods.nextPage)} />
                        </>

                        : null}
                </Pagination>

                :
                <div>
                    <div>Sorry, nothing was found</div>
                    <div>
                        <Button
                            className='mt-3'
                            variant='primary'
                            onClick={resetSearch}
                        >
                            Reset search
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default PaginationNav