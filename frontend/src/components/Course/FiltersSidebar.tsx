import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchCourseLevels,
  fetchCourseTags,
} from "../../redux/slices/fetch/fetchSlices";
import SelectInput from "../Reusable/SelectInput";
import MultiSelectInput from "../Reusable/MultiSelectInput";
import Checkbox from "../Reusable/Checkbox";
import Button from "../Reusable/Button";
import Card from "../Reusable/Card";

export interface Filters {
  level: string;
  tags: string[];
  isPaid: boolean;
}

const FilterSidebar = ({
  onApply,
}: {
  onApply: (filters: Filters) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [filters, setFilters] = useState<Filters>({
    level: "",
    tags: [],
    isPaid: true,
  });

  const { courseLevels, courseTags } = useSelector(
    (state: RootState) => ({
      courseLevels: state.courseLevels.data,
      courseTags: state.courseTags.data,
    })
  );

  useEffect(() => {
    dispatch(fetchCourseLevels());
    dispatch(fetchCourseTags());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (target instanceof HTMLInputElement && type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Card className="p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <SelectInput
        label="Level"
        name="level"
        value={filters.level}
        onChange={handleChange}
        options={courseLevels.map((lvl: any) => ({
          label: lvl.name,
          value: lvl._id,
        }))}
      />

      <MultiSelectInput
        label="Tags"
        selectedValues={filters.tags}
        onChange={(selected: string[]) =>
          setFilters((prev) => ({ ...prev, tags: selected }))
        }
        options={courseTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
      />

      <Checkbox
        label="Paid Courses Only"
        name="isPaid"
        checked={filters.isPaid}
        onChange={handleChange}
      />

      <Button
        variant="primary"
        className="mt-4 w-full"
        onClick={() => onApply(filters)}
      >
        Apply Filters
      </Button>
    </Card>
  );
};

export default FilterSidebar;
