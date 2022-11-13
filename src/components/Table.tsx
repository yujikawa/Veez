import React, { forwardRef, Ref } from "react";
import MaterialTable, { Icons } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import SvgIcon from "@material-ui/core/SvgIcon";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { ThemeProvider, createTheme } from '@mui/material';

const iconComponentByTableIconType: Record<keyof Icons, typeof SvgIcon> = {
  Add: AddBox,
  Check,
  Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage,
  LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search,
  SortArrow: ArrowDownward,
  ThirdStateCheck: Remove,
  ViewColumn,
};

const tableIcons = Object.entries(iconComponentByTableIconType).reduce(
  (currentTableIcons: Icons, [tableIconType, IconComponent]) => {
    currentTableIcons[
      tableIconType as keyof Icons
    ] = forwardRef((props, ref: Ref<SVGSVGElement>) => (
      <IconComponent {...props} ref={ref} />
    ));
    return currentTableIcons;
  },
  {}
);
const defaultMaterialTheme = createTheme();

export const Table = () => {
  return (
    <div style={{ maxWidth: "100%" }}>
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        icons={tableIcons}
        title="SQL profile"
        columns={[
          { title: "SQL Name", field: "sql", type: "string" },
          { title: "Dependencies", field: "dependencies", type: "numeric" },
          { title: "Row count", field: "rowcount", type: "numeric" },
        ]}
        data={[
          {
            sql: 40000,
            dependencies: 5107000,
            rowcount: 2416000,
          },
          {
            sql: 40000,
            dependencies: 5107000,
            rowcount: 2416000,
          },
          {
            sql: 40000,
            dependencies: 5107000,
            rowcount: 2416000,
          }
        ]}
        options={{
          sorting: true,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
        }}
      />
      </ThemeProvider>
    </div>
  );
};

