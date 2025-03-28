import React, { useEffect } from "react";
import { EmployeeData } from "./data";
import { useState } from "react";

export const Crud = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [technology, setTechnology] = useState("");
  const [isupdate, setIsUpdate] = useState(true);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleDelete = (id) => {
    if (id > 0) {
      let dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };
  const handleUpdate = () => {
    const index = data
      .map((item, index) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].id = id;
    dt[index].Name = name;
    dt[index].Technology = technology;
    setData(dt);
    handleClear();
  };

  const handleEdit = (id) => {
    setIsUpdate(false);
    console.log(id);
    const dt = data.filter((item) => item.id === id);

    if (dt !== undefined) {
      setId(dt[0].id);
      setName(dt[0].Name);
      setTechnology(dt[0].Technology);
    }
  };
  const handleClear = () => {
    setIsUpdate(true);
    setId("");
    setName("");
    setTechnology("");
  };

  const handleSave = () => {
    const dt = [...data];
    const newObject = {
      id: EmployeeData.length + 1,
      Name: name,
      Technology: technology,
    };
    dt.push(newObject);
    setData(dt);
    handleClear();
  };
  return (
    <>
      <div className="App">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="Name">
              <input
                type="text"
                placeholder="Name"
                style={{ textAlign: "center" }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
            </label>
          </div>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="Technology">
              <input
                type="Text"
                placeholder="Technology"
                style={{ textAlign: "center" }}
                onChange={(e) => setTechnology(e.target.value)}
                value={technology}
              ></input>
            </label>
          </div>
          <div>
            {isupdate ? (
              <button
                className="btn btn-primary"
                //   onClick={handleEdit(item.id)}
                onClick={() => handleSave()}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-primary"
                //   onClick={handleEdit(item.id)}
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => {
                handleClear();
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <td>Sr.no</td>
              <td>Id</td>
              <td>Name</td>
              <td>Technology</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Technology}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      //   onClick={handleEdit(item.id)}
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      //   onClick={handleDelete(item.id)}
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
