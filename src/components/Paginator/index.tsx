import { RootState, useDispatch } from "app/store";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
import { pokemonActions } from "app/pokemon.slice";
import "./style.scss";
import { ChangeEvent, ReactNode, useState } from "react";
import { Form } from "react-bootstrap";

const PAG_PAGES = 5;

export const Paginator = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(
    (state: RootState) => state.pokemon.totalPages
  );

  const take = useSelector((state: RootState) => state.pokemon.take);

  const currentPage = useSelector(
    (state: RootState) => state.pokemon.currentPage
  );

  const [range, setRange] = useState({ firstIndex: 0, lastIndex: PAG_PAGES });

  const paginatorItems: ReactNode[] = Array(totalPages)
    .fill(1)
    .map((n, i) => n + i)
    .slice(range.firstIndex, range.lastIndex)
    .map((pageNumber) => (
      <Pagination.Item
        key={pageNumber}
        onClick={() => onPageClick(pageNumber)}
        active={currentPage === pageNumber}
      >
        {pageNumber}
      </Pagination.Item>
    ));

  const onPageClick = (page: number) => {
    dispatch(pokemonActions.setCurrentPage(page));
  };

  const onNextClick = () => {
    let lastIndex = range.lastIndex + PAG_PAGES;
    if (lastIndex > totalPages) {
      lastIndex = totalPages - 1;
    }

    onPageClick(range.firstIndex + PAG_PAGES + 1);
    setRange((state) => ({
      ...state,
      firstIndex: state.firstIndex + PAG_PAGES,
      lastIndex: lastIndex,
    }));
  };

  const onPrevClick = () => {
    if (range.lastIndex - PAG_PAGES < 0) {
      return;
    }

    onPageClick(range.lastIndex - PAG_PAGES);
    setRange((state) => ({
      ...state,
      firstIndex: state.firstIndex - PAG_PAGES,
      lastIndex: state.lastIndex - PAG_PAGES,
    }));
  };

  const onChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    setRange((state) => ({
      ...state,
      firstIndex: 0,
      lastIndex: PAG_PAGES,
    }));

    dispatch(pokemonActions.setCurrentPage(1));
    dispatch(pokemonActions.setSizePage(Number(event?.target?.value)));
  };
  return (
    <div className="paginator">
      <Pagination size="sm">
        <Pagination.Prev
          onClick={onPrevClick}
          disabled={range.lastIndex - PAG_PAGES <= 0}
        >
          Prev 5
        </Pagination.Prev>
        {paginatorItems}
        <Pagination.Next
          disabled={range.lastIndex + 1 === totalPages}
          onClick={onNextClick}
        >
          Next 5
        </Pagination.Next>
      </Pagination>

      <Form.Select onChange={onChangePageSize} value={take} size="sm">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </Form.Select>
    </div>
  );
};
