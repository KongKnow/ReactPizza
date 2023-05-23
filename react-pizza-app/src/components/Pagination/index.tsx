import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type PaginationProps = {
  onPageChange: (n: number) => void
}

const Pagination: React.FC<PaginationProps> = ({onPageChange}) => {
    return (
        <ReactPaginate
        breakLabel="..."
        className={styles.root}
        nextLabel=">"
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    )
}

export default Pagination