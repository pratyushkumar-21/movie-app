import { memo, useState, useCallback } from "react";
import { debounce } from "../../utils/common";

type InputSearchPropsType = {
  searchValue: string;
  setSearchValue: (search: string) => void;
};

function InputSearch(props: InputSearchPropsType) {
  const { searchValue, setSearchValue } = props;
  const [value, setValue] = useState(searchValue);

  const debounced = useCallback(debounce(setSearchValue, 400), [
    setSearchValue,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounced(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default memo(InputSearch);
