import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";
import axios from "axios";
import SimpleSnackbar from "../../../utils/SimpleSnackbar";
import Chip from "@material-ui/core/Chip";

const List = () => {
  const url = "/journal";
  const pageSize = parseInt(process.env.REACT_APP_paginateSize);
  const match = useRouteMatch();
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [toast, setToast] = useState(false);

  const getJournal = async (urlPaginate) => {
    let res = await axios.get(urlPaginate);
    if (!res.data.status) {
      setMessage(res.data.message);
      return false;
    }
    const { data } = res.data;

    return {
      data: data.data,
      page: data.current_page - 1,
      totalCount: data.total,
    };
  };

  const deleteJournal = async (slug) => {
    console.log(slug);
    let res = await axios.delete(`/journal/${slug}`);
    setToast(res.data.message);
  };

  const columns = [
    {
      title: "Journal title",
      field: "title",
      render: (rowData) => (
        <a href={`/journals/${rowData.slug_title}`} target="_blank" rel="noreferrer">
          {rowData.title}
        </a>
      ),
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => <Chip label={rowData.status} />,
    },
    {
      title: "Created At",
      field: "created_at",
      render: (rowData) => (
        <span>{new Date(rowData.created_at).toDateString()}</span>
      ),
    },
  ];

  if (message) {
    return <div>{message}</div>;
  }

  return (
    <div>
      {/*Material table list*/}
      <SimpleSnackbar toast={toast} setToast={setToast} />
      <MaterialTable
        title="Journals"
        columns={columns}
        data={async (query) => {
          let urlPaginate = `${url}?page=${query.page + 1}&per_page=${
            query.pageSize
          }`;
          return await getJournal(urlPaginate);
        }}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px", marginBottom: "5px" }}>
                <Link to={`${match.path}/create`} className="td-none">
                  <Button variant="contained" size="small" color="primary">
                    Create Journal
                  </Button>
                </Link>
              </div>
            </div>
          ),
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Project",
            onClick: (event, rowData) =>
              history.push(`${match.path}/edit/${rowData.slug_title}`),
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            await deleteJournal(oldData.slug_title);
          },
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: pageSize,
          search: false,
        }}
      />
    </div>
  );
};

export default List;