import React, { useState } from "react";
import axiosAuth from "../utils/axiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log(colorToEdit);
    axiosAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>
        updateColors(
          colors.map(color => {
            if (color.id === res.data.id) {
              return res.data;
            }
            return color;
          })
        )
      )
      .catch(err => console.error(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => updateColors(colors.filter(item => item.id !== res.data)))
      .catch(err => console.error(err));
  };

  const handleAdd = () => {
    axiosAuth()
      .post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(res => {
        updateColors(res.data);
        setColorToAdd(initialColor);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form>
        <legend>add a color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                color: e.target.value,
                id: colors.length
              })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value },
                id: colors.length
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="button" onClick={handleAdd}>
            Add Color
          </button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
