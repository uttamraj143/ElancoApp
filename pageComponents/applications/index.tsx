import { useState, useEffect, useRef } from "react";
import Table from "../../components/Table";
import DropDown from "../../components/DropDown";

import FetchElanco from "../../pages/utilities/fetchElanco";
const fetchElancoService = new FetchElanco();

const ApplicationPage = (props: any) => {
  const parentRef = useRef<any>();
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [menuItems, setMenuItems] = useState<[]>();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>();
  const dataSource = async (): Promise<any> => {
    try {
      let menuItems = await fetchElancoService.getApplications("")
      setMenuItems(menuItems);
      setSelectedMenuItem(menuItems[0])
      console.log("get menu items ", menuItems);
      if (menuItems.length > 0)
        parentRef?.current?.autoSelectDropDown()
    } catch (error) {
      console.log("error in dropdown details", error);
    }

  };

  useEffect(() => {
    /*eslint-disable */
    dataSource();
  }, []);

  return (
    <div className="main">
      <div className="headers">
        <h1> Get Application details</h1>
      </div>
      <div className="headertitledropdown">
        <div className="headertitledropdownDiv1"

        >
          <h3 className="titleheader"

          >{`Result (${totalRecords || 0
            })`}</h3>
        </div>
        <div
          className="headertitledropdownDiv2"
        >
          <DropDown
            ref={parentRef}
            menuItems={menuItems}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        </div>
      </div>
      <div
        style={{
          width: "99%",
          height: "calc(85vh - 56px)",
          borderRadius: "1rem",
        }}
      >
        <Table
          applicationName={selectedMenuItem}
          setTotalRecords={setTotalRecords}
        />
      </div>
    </div>
  );
};
export default ApplicationPage;
