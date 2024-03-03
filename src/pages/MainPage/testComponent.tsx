import { GridColumn as Column } from "@progress/kendo-react-grid";

import { Currencies } from "../../interfaces/countryInfo";

export const CustomCol = (props: Currencies) => {
  return (
    <>
      <Column
        title="Moedas"
        cell={() => (
          <td>
            {props &&
              Object.values(props)
                .map((currency) => (currency as { name: string }).name)
                .join(", ")}
          </td>
        )}
      />
    </>
  );
};
