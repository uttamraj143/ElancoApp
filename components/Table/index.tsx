import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import FetchElanco from "../../pages/utilities/fetchElanco";
const fetchElancoService = new FetchElanco();
const Table = (props: any) => {
  
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState<any>(null);
  

  const perPage = 50;

  const customGroupRenderer = () => <></>;

  const sizeToFit = () => {
    gridApi && gridApi.sizeColumnsToFit();
  };
  const customEnvRenderer = (props1: any) => {
    return props1?.value?.environment||""
  };
  const customBusinessRenderer = (props1: any) => {
    return props1?.value["business-unit"]||""
  };

  const columns = [
    {
      cellRenderer: customBusinessRenderer,
      field: "Tags",
      headerName: "Business Unit",
      minWidth: 120,
      width: 120,
      maxWidth: 300,
      sortable: true,
    //   resizable: true,
      suppressMenu: true,
      tooltipField: "Tags",
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },
    {
      field: "Location",
      headerName: "Location",
      minWidth: 120,
      width: 120,
      maxWidth: 300,
      sortable: true,
    //   resizable: true,
      suppressMenu: true,
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },
    {
      field: "ServiceName",
      headerName: "ServiceName",
      minWidth: 115,
      width: 115,
      maxWidth: 350,
      resizable: true,
    //   sortable: true,
      suppressMenu: true,
      tooltipField: "ServiceName",
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },
    {
      field: "UnitOfMeasure",
      headerName: "UnitOfMeasure",
      minWidth: 115,
      width: 115,
      maxWidth: 350,
      resizable: true,
      sortable: true,
      suppressMenu: true,
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },
    {
      field: "ConsumedQuantity",
      headerName: "ConsumedQuantity",
      minWidth: 115,
      width: 115,
      maxWidth: 350,
      resizable: true,
      sortable: true,
      suppressMenu: true,
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },

    {
      field: "Cost",
      headerName: "Cost",
      minWidth: 115,
      width: 115,
      maxWidth: 350,
      resizable: true,
      sortable: true,
      suppressMenu: true,
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },


    {
        cellRenderer: customEnvRenderer,
        field: "Tags",
        headerName: "Environment",
        minWidth: 80,
        width: 120,
        maxWidth: 350,
        resizable: true,
        // sortable: true,
        suppressMenu: true,
        headerClass: "ag-left-aligned-header",
        cellStyle: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
        },
      },

    {
      field: "Date",
      headerName: "Date",
      minWidth: 115,
      width: 115,
      maxWidth: 350,
      resizable: true,
      sortable: true,
      suppressMenu: true,
      headerClass: "ag-left-aligned-header",
      cellStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
      },
    },
  ];
  const getRowId = useCallback(function (params: any) {

    return (new Date().getTime() + Math.random()).toString();
  }, []);
  const dataSource=async () => {
    try {
        let applicationData = await fetchElancoService.getApplications(
          props.applicationName
        );
        
  
        
        if (applicationData.length > 0) {
          props.setTotalRecords(applicationData.length);
        //   setRowData(applicationData);
          gridApi.setRowData(applicationData);
          console.log("resp ", rowData);
        } else {
          props.setTotalRecords(0);
          gridApi.showNoRowsOverlay();
        }
      } catch (error) {
        //setRowData(0)
        console.log("error ")
      }
  }
  const handleGridReady = async (gridParams: any) => {
    setGridApi(gridParams.api);
    dataSource()
  };

  useEffect(() => {
    console.log("selected menu item ",props.applicationName);
    dataSource();
    /*eslint-disable */
  }, [props.applicationName]);

  useEffect(() => {
    if (gridApi) {

      sizeToFit();
    }
    /*eslint-disable */
  }, [gridApi, props]);

  useEffect(() => {
    sizeToFit();
    if (gridApi) {
      if (gridApi.getDisplayedRowCount() == 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }
  }, [props]);

  return (
    <>
      <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        pagination={true}
        rowData={rowData}
        paginationPageSize={perPage}
        cacheBlockSize={perPage}
        animateRows={true}
        onGridReady={handleGridReady}
        rowHeight={32}
        columnDefs={columns}
        aggFuncs={{
          aggForSorting: (params) => params,
        }}
        suppressAggFuncInHeader={true}
        autoGroupColumnDef={{
          headerName: "",
        }}
        getRowStyle={(e) => {
          if (e.node.level > 0) {
            return { backgroundColor: "#e6f0fe" };
          }
        }}
        overlayNoRowsTemplate={
          '<span style="padding: 10px; border: 2px solid #444; background: white">There are no rows for the current selected filter</span>'
        }
        defaultColDef={useMemo(() => {
          return {
            width: 50,
            minWidth: 50,
            maxWidth: 50,
            aggFunc: "aggForSorting",
            resizable: true,
            cellStyle: {
              display: "block",
            },
          };
        }, [])}
        tooltipShowDelay={0}
        // getRowId={getRowId}
        rowSelection={"single"}
        onGridSizeChanged={sizeToFit}
      />
      </div>
    </>
  );
};

export default React.memo(Table);
