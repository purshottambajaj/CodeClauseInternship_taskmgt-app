import React, { useState } from "react";

const Todo = () => {
  const [showForm, setshowform] = useState(true);
  const [showNew, setshowNew] = useState(true);
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [editMessage, seteditMessage] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [items, setitems] = useState([
    {
      id: "001",
      name: "Default Task",
      desc: "Default Description",
      status: false,
    },
  ]);

  // HANDLING INPUT FIELDS
  const handleInput = (e) => {
    setinputTitle(e.target.value);
  };
  const handleInputdesc = (e) => {
    setinputDesc(e.target.value);
  };

  // SUBMITTING FORM
  const handleSubmit = (e) => {
    setshowList(true);
    setshowNew(true);

    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Please fill in all data");
      showList(false);
    } else if (inputTitle && !toggleSubmit) {
      setitems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputTitle, desc: inputDesc };
          }
          return elem;
        })
      );

      setinputTitle("");
      setinputDesc("");
      settoggleSubmit(true);
      setshowform(false);
      setshowDelete(true);
    } else {
      const allinputTitle = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        desc: inputDesc,
      };
      setitems([allinputTitle, ...items]);
      setinputTitle("");
      setinputDesc("");
      setshowform(false);
    }
  };

  // DELETE
  const handleDelete = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setdeleteMessage(true);

    setTimeout(() => {
      setitems(updatedItems);
      setdeleteMessage(false);
    }, 1000);
  };

  // EDIT
  const handleEdit = (id) => {
    setshowList(false);
    setshowDelete(false);
    setshowNew(false);
    setshowform(true);

    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setinputTitle(newEditItem.name);
    setinputDesc(newEditItem.desc);
    setisEditItem(id);
  };

  // ADD NEW TASK
  const handleAdd = () => {
    setshowform(true);
    setshowList(true);
    setshowNew(false);
  };

  return (
    <>
      {showNew ? (
        <div className="container">
          <div className="text-end mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 my-5  rounded hover:bg-blue-700"
              onClick={handleAdd}
            >
              + Add New Task
            </button>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <div className="container mx-auto border rounded-lg p-5 shadow-lg bg-gray-50">
          <h2 className="text-center text-xl font-bold">
            {toggleSubmit ? "Add Task" : "Edit Task"}
          </h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <label htmlFor="title" className="block font-medium mb-1">
              Enter Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="w-full border-2 p-2 rounded-md mb-4"
              onChange={handleInput}
              value={inputTitle}
            />
            <label htmlFor="description" className="block font-medium mb-1">
              Enter Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="w-full border-2 p-2 rounded-md mb-4"
              onChange={handleInputdesc}
              value={inputDesc}
            />
            <button
              className={`w-full py-2 px-4 rounded text-white ${toggleSubmit ? "bg-green-500 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-700"
                }`}
            >
              {toggleSubmit ? "Save" : "Update"}
            </button>
          </form>
        </div>
      ) : null}

      {showList ? (
        <div className="container mx-auto mt-6">
          {deleteMessage ? (
            <p className="text-center text-red-500">Item Deleted Successfully</p>
          ) : null}
          {items.map((elem, index) => (
            <div
              className="border rounded-lg shadow-md bg-white p-4 flex justify-between items-center mb-4"
              key={elem.id}
            >
              <div>
                <h4 className="text-lg font-bold">{elem.name}</h4>
                <p className="text-gray-600">{elem.desc}</p>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2"
                  onClick={() => handleEdit(elem.id)}
                >
                  Edit
                </button>
                {showDelete ? (
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => handleDelete(elem.id)}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Todo;
