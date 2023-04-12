import { useState, useEffect,useRef } from "react";
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
        let menuItems=await fetchElancoService.getApplications("")
        setMenuItems(menuItems);
        setSelectedMenuItem(menuItems[0])
        console.log("get menu items ",menuItems);
        if(menuItems.length>0)
        parentRef?.current?.autoSelectDropDown()    
    } catch (error) {
        console.log("error in dropdown details",error);
    }
    
  };

  useEffect(() => {
    /*eslint-disable */
    dataSource();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ width: "99%", height: "5vh", textAlign: "center" }}>
        <h1> Get Application details</h1>
      </div>
      <div style={{ width: "99%", height: "7vh", display: "flex" }}>
        <div
          style={{
            width: "55%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "16px" }}>{`Result (${
            totalRecords || 0
          })`}</h3>
        </div>
        <div
          style={{
            width: "55%",
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
          }}
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
