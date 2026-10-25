import { useMemo, useState } from "react";
import { Search, Download, Trash2 } from "lucide-react";

function DataTable({
  data,
  columns,
  role = "admin"
}) {

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc"
  });


  const pageSize = 5;


  // SEARCH

  const filteredData = useMemo(() => {

    return data.filter((row) => {

      return Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    });

  }, [data, search]);


  // SORT

  const sortedData = useMemo(() => {

    if (!sortConfig.key) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {

      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA < valueB) {
        return sortConfig.direction === "asc"
          ? -1
          : 1;
      }

      if (valueA > valueB) {
        return sortConfig.direction === "asc"
          ? 1
          : -1;
      }

      return 0;

    });

  }, [filteredData, sortConfig]);


  // PAGINATION

  const totalPages =
    Math.ceil(sortedData.length / pageSize);


  const currentData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );


  function handleSort(key) {

    setSortConfig((previous) => ({

      key,

      direction:
        previous.key === key &&
          previous.direction === "asc"
          ? "desc"
          : "asc"

    }));

  }


  function toggleSelect(id) {

    setSelected((previous) => {

      if (previous.includes(id)) {

        return previous.filter(
          item => item !== id
        );

      }

      return [...previous, id];

    });

  }


  function selectAll() {

    const ids = currentData.map(
      row => row.id
    );

    if (selected.length === ids.length) {

      setSelected([]);

    } else {

      setSelected(ids);

    }

  }


  function exportCSV() {

    const headers = columns
      .map(column => column.label)
      .join(",");


    const rows = sortedData.map(row => {

      return columns
        .map(column => row[column.key])
        .join(",");

    });


    const csv = [
      headers,
      ...rows
    ].join("\n");


    const blob = new Blob(
      [csv],
      {
        type: "text/csv"
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "admin-dashboard-data.csv";

    link.click();

    URL.revokeObjectURL(url);
  }


  return (

    <div className="table-wrapper">

      {/* TABLE TOOLBAR */}

      <div className="table-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>


        <div className="table-actions">

          {selected.length > 0 &&
            role === "admin" && (

              <button
                className="danger-button"
                onClick={() =>
                  setSelected([])
                }
              >

                <Trash2 size={17} />

                Delete ({selected.length})

              </button>

            )}


          <button
            className="secondary-button"
            onClick={exportCSV}
          >

            <Download size={17} />

            Export CSV

          </button>

        </div>

      </div>


      {/* TABLE */}

      <div className="table-scroll">

        <table>

          <thead>

            <tr>

              <th>

                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={
                    currentData.length > 0 &&
                    selected.length ===
                    currentData.length
                  }
                />

              </th>


              {columns.map(
                (column) => (

                  <th
                    key={column.key}
                    onClick={() =>
                      handleSort(column.key)
                    }
                  >

                    {column.label}

                    {sortConfig.key ===
                      column.key && (
                        <span>
                          {sortConfig.direction ===
                            "asc"
                            ? " ↑"
                            : " ↓"}
                        </span>
                      )}

                  </th>

                )
              )}

            </tr>

          </thead>


          <tbody>

            {currentData.length === 0 ? (

              <tr>

                <td
                  colSpan={
                    columns.length + 1
                  }
                  className="empty-state"
                >

                  No results found

                </td>

              </tr>

            ) : (

              currentData.map((row) => (

                <tr key={row.id}>

                  <td>

                    <input
                      type="checkbox"
                      checked={selected.includes(
                        row.id
                      )}
                      onChange={() =>
                        toggleSelect(row.id)
                      }
                    />

                  </td>


                  {columns.map(
                    (column) => (

                      <td
                        key={column.key}
                      >

                        {row[column.key]}

                      </td>

                    )
                  )}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* PAGINATION */}

      <div className="pagination">

        <span>

          Showing{" "}

          {currentData.length}{" "}

          of{" "}

          {sortedData.length}

        </span>


        <div className="page-buttons">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Previous
          </button>


          {Array.from(
            { length: totalPages },
            (_, index) => (

              <button
                key={index}
                className={
                  page === index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setPage(index + 1)
                }
              >

                {index + 1}

              </button>

            )
          )}


          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );
}

export default DataTable;