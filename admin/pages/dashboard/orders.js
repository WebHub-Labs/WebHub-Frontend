import React from "react";
import Header from "../components/header";
import Table from "../components/table";
import Router from "next/router";
import Layout from "@/components/layout";

const Orders = () => {
  const handleClick = () => {
    Router.push("/addproduct");
  };
  return (
    <>
      <Layout>
        <Header Title="Orders" buttonTitle="Add Orders" onClick={handleClick} />
        <Table />
      </Layout>
    </>
  );
};

export default Orders;
