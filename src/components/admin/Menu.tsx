import React, { useEffect, useRef, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { toast } from "sonner";
import { addMenuItemAction, fetchMenuItemsAction, updateMenuItemAction } from "@/store/actions/menu.action";
import { MenuItem } from "@/store/slices/menu/menu.state";

export default function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdding, setIsAdding] = useState(false);
  const { items: menuItems, loading } = useSelector((state: RootState) => state.menu);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sessionOptions = ["breakfast", "lunch", "dinner", "desserts", "beverages"];
  const restaurantOptions = ["Restaurant-1", "Restaurant-2"];

  useEffect(() => {
    dispatch(fetchMenuItemsAction());
  }, [dispatch]);


const [isModalOpen, setIsModalOpen] = useState(false);
const [editedItem, setEditedItem] = useState<Partial<MenuItem>>({
  _id: Date.now(),
  name: "",
  description: "",
  price: "",
  category: "",
  session: "",
  restaurant: "",
  image: "",
});
const [editingId, setEditingId] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);

// Open modal for add
const openAddModal = () => {
  setEditedItem({
    _id: Date.now(),
    name: "",
    description: "",
    price: "",
    category: "",
    session: "",
    restaurant: "",
    image: "",
  });
  setEditingId(null);
  setIsModalOpen(true);
};

// Open modal for edit
const openEditModal = (item: MenuItem) => {
  setEditedItem(item);

  // Safely extract _id or fallback to null
  const itemId = item._id ?? item._id ?? null;

  setEditingId(itemId ? itemId.toString() : null);
  setIsModalOpen(true);
};

// Handle input changes
const handleEditChange = (key: keyof MenuItem, value: string) => {
  setEditedItem((prev) => ({ ...prev, [key]: value }));
};

// Validate required fields in editedItem
const validateEditedItem = (): keyof MenuItem | null => {
  const requiredFields: (keyof MenuItem)[] = [
    "name",
    "description",
    "price",
    "category",
    "session",
    "restaurant",
  ];
  for (const field of requiredFields) {
    const value = editedItem[field];
    if (typeof value === "string" && value.trim() === "") {
      return field;
    }
    if (value == null) {
      return field;
    }
  }
  if (!editedItem.image) {
    return "image";
  }
  return null;
};


const handleSave = async () => {
  const missingField = validateEditedItem();
  if (missingField) {
    toast.error(
      missingField === "image"
        ? "Please upload an image."
        : `Please fill the "${missingField}" field.`
    );
    return;
  }

  setIsAdding(true);

  if (editingId) {
    // Update flow
    try {
      const updatedData = { ...editedItem };
      delete updatedData._id;

      const resultAction = await dispatch(updateMenuItemAction({
        id: editingId,
        data: updatedData,
      }));

      if (updateMenuItemAction.fulfilled.match(resultAction)) {
        toast.success("MenuItem updated successfully!");
        setEditingId(null);
        setEditedItem({});
        setIsModalOpen(false);
        dispatch(fetchMenuItemsAction());
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error((resultAction.payload as string) || "Failed to update item");
      }
    } catch (error) {
      toast.error("Failed to update item");
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  } else {
    // Add flow
    try {
      const newItem = { ...editedItem };
      delete newItem._id;

      const resultAction = await dispatch(addMenuItemAction(newItem as MenuItem));
      if (addMenuItemAction.fulfilled.match(resultAction)) {
        toast.success("MenuItem added successfully!");
        setIsModalOpen(false);
        setEditedItem({
          name: "",
          description: "",
          price: "",
          category: "",
          session: "",
          restaurant: "",
          image: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        dispatch(fetchMenuItemsAction());
      } else {
        toast.error((resultAction.payload as string) || "Failed to add item");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsAdding(false);
    }
  }
};

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = menuItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          <div className="space-x-3">
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add MenuItem
          </button>

            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Upload CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "S.NO",
                  "MenuItem Name",
                  "MenuItem Description",
                  "Price",
                  "MenuItem Category",
                  "Session Type",
                  "Restaurant Name",
                  "Image",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    <div className="flex justify-center items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      <span className="text-blue-600 font-medium">Loading menu items...</span>
                    </div>
                  </td>
                </tr>

              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">No menu items found.</td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{indexOfFirst + index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.description}</td>
                    <td className="px-4 py-2">{item.price}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.session}</td>
                    <td className="px-4 py-2">{item.restaurant}</td>
                    <td className="px-4 py-2">
                      <div className="relative w-20 h-12">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="object-cover h-full w-full rounded border" />
                        ) : (
                          <div className="bg-gray-100 w-full h-full flex items-center justify-center text-sm text-gray-500 border rounded">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                    <button
                        onClick={() => openEditModal(item)}
                      >
                        <Pencil className="w-5 h-5 text-blue-500" />
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

       {/* Modal for Adding MenuItem */}
       {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-2xl relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}
              >
                <X />
              </button>
              <h3 className="text-xl font-semibold mb-4">
                {editingId ? "Edit MenuItem" : "Add New MenuItem"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {["name", "description", "price", "category"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    required
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    value={editedItem[field as keyof MenuItem] ?? ""}
                    onChange={(e) => handleEditChange(field as keyof MenuItem, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ))}

                <select
                  className="w-full p-2 border rounded"
                  value={editedItem.session ?? ""}
                  onChange={(e) => handleEditChange("session", e.target.value)}
                >
                  <option value="">Select Session</option>
                  {sessionOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  className="w-full p-2 border rounded"
                  value={editedItem.restaurant ?? ""}
                  onChange={(e) => handleEditChange("restaurant", e.target.value)}
                >
                  <option value="">Select Restaurant</option>
                  {restaurantOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setEditedItem((prev) => ({
                        ...prev,
                        image: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full mb-3 p-2 border rounded"
              />

              {editedItem.image && (
                <div className="mb-4 text-center">
                  <img
                    src={editedItem.image}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded mb-2"
                  />
                  <button
                    onClick={() => {
                      setEditedItem((prev) => ({ ...prev, image: "" }));
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-red-600 text-sm underline hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              )}

              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex justify-center items-center disabled:opacity-60"
                onClick={handleSave}
                disabled={isAdding}
              >
                {isAdding ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : editingId ? "Save Changes" : "Add MenuItem"}
              </button>

            </div>
          </div>
        )}

    </div>
  );
}