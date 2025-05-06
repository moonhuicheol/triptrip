import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useSearch({ data, refetch }) {
  const [search, setSearch] = useState();
  const router = useRouter();

  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    });
    setSearch(value);
  }, 500);

  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

  const onClickRegister = (event) => {
    router.push("/boards/new");
  };

  return {
    data,
    refetch,
    search,
    onChangeSearch,
    onClickRegister,
  };
}
