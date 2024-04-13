import { Pagination } from '@mui/material';

interface Props {
  count: number | undefined;
  page: number;
  setSelectedPage: (value: number) => void;
}

const ListPaginator = ({ count, page, setSelectedPage }: Props) => {
  function ChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setSelectedPage(value);
  }

  return (
    <div className="w-full flex justify-center mb-5">
      <Pagination count={count} page={page} onChange={ChangePage} />
    </div>
  );
};

export default ListPaginator;
