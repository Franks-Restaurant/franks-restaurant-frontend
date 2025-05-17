// import React, { useEffect, useState } from "react";
// import { Pencil, X } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { AppDispatch, RootState } from "@/store";
// import {
//   fetchOffersAction,
//   updateOfferAction,
//   addOfferAction, // <- make sure you have this action in your store
// } from "@/store/actions/offer.action";
// import { toast } from "sonner";

// type Offer = {
//   id: string | number;
//   description: string;
//   startDate: string;
//   endDate: string;
//   status: string;
// };

// export default function Offers() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items: offers, loading } = useSelector(
//     (state: RootState) => state.offer
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editedOffer, setEditedOffer] = useState<Partial<Offer>>({
//     description: "",
//     startDate: "",
//     endDate: "",
//     status: "Open",
//   });
//   const [isSaving, setIsSaving] = useState(false);

//   const itemsPerPage = 2;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     dispatch(fetchOffersAction());
//   }, [dispatch]);

//   // Open modal to add a new offer (empty fields)
//   const openAddModal = () => {
//     setEditingId(null);
//     setEditedOffer({
//       description: "",
//       startDate: "",
//       endDate: "",
//       status: "Open",
//     });
//     setIsModalOpen(true);
//   };

//   // Open modal and load offer data for editing
//   const openEditModal = (offerId: number) => {
//     const offer = offers.find((o) => o.id === offerId);
//     if (!offer) return;

//     setEditingId(offerId);
//     setEditedOffer({
//       description: offer.description,
//       startDate: offer.startDate,
//       endDate: offer.endDate,
//       status: offer.status,
//     });
//     setIsModalOpen(true);
//   };

//   const handleEditChange = (key: keyof Offer, value: string) => {
//     setEditedOffer((prev) => ({ ...prev, [key]: value }));
//   };

//   const validateOffer = () => {
//     if (!editedOffer.description?.trim()) return "description";
//     if (!editedOffer.startDate) return "startDate";
//     if (!editedOffer.endDate) return "endDate";
//     if (!editedOffer.status) return "status";
//     return null;
//   };

//   const handleSave = async () => {
//     const missingField = validateOffer();
//     if (missingField) {
//       toast.error(`Please fill the "${missingField}" field.`);
//       return;
//     }
  
//     setIsSaving(true);
  
//     try {
//       let resultAction;
  
//       if (editingId !== null) {
//         console.log("Updating offer id:", editingId, "with data:", editedOffer);
//         // Update existing offer
//         resultAction = await dispatch(
//           updateOfferAction({ id: editingId, data: editedOffer as Offer })
//         );
//         if (updateOfferAction.fulfilled.match(resultAction)) {
//           toast.success("Offer updated successfully!");
//         } else {
//           toast.error(
//             (resultAction.payload as string) || "Failed to update offer"
//           );
//           setIsSaving(false);
//           return;
//         }
//       } else {
//         // Add new offer
//         resultAction = await dispatch(addOfferAction(editedOffer as Offer));
//         if (addOfferAction.fulfilled.match(resultAction)) {
//           toast.success("Offer added successfully!");
//         } else {
//           toast.error(
//             (resultAction.payload as string) || "Failed to add offer"
//           );
//           setIsSaving(false);
//           return;
//         }
//       }
  
//       setIsModalOpen(false);
//       setEditingId(null);
//       setEditedOffer({
//         description: "",
//         startDate: "",
//         endDate: "",
//         status: "Open",
//       });
  
//       dispatch(fetchOffersAction());
//     } catch (error) {
//       toast.error("Failed to save offer");
//       console.error(error);
//     } finally {
//       setIsSaving(false);
//     }
//   };
  

//   // Pagination
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentItems = offers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(offers.length / itemsPerPage);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Offers</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={openAddModal} // <-- Added onClick handler here
//         >
//           Add Offer
//         </button>
//       </div>

//       {loading ? (
//         <div>Loading offers...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border rounded">
//             <thead className="bg-gray-100">
//               <tr>
//                 {[
//                   "S.NO",
//                   "Offer Description",
//                   "Start Date",
//                   "End Date",
//                   "Status",
//                   "Actions",
//                 ].map((h) => (
//                   <th
//                     key={h}
//                     className="px-4 py-3 text-left font-semibold text-gray-700"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((offer, index) => (
//                 <tr key={offer.id} className="border-t">
//                   <td className="px-4 py-2">{indexOfFirst + index + 1}</td>
//                   <td className="px-4 py-2">{offer.description}</td>
//                   <td className="px-4 py-2">{offer.startDate}</td>
//                   <td className="px-4 py-2">{offer.endDate}</td>
//                   <td className="px-4 py-2">{offer.status}</td>
//                   <td className="px-4 py-2">
//                    <button onClick={() => openEditModal(offer.id)}>
//                       <Pencil className="w-5 h-5 text-blue-500" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-end items-center mt-4 space-x-2">
//         <button
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Prev
//         </button>
//         <span className="text-sm font-medium text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//               onClick={() => setIsModalOpen(false)}
//               aria-label="Close modal"
//             >
//               <X />
//             </button>
//             <h3 className="text-xl font-semibold mb-4">
//               {editingId ? "Edit Offer" : "Add Offer"}
//             </h3>

//             <div className="grid grid-cols-1 gap-4 mb-4">
//               <input
//                 type="text"
//                 required
//                 placeholder="Offer Description"
//                 value={editedOffer.description || ""}
//                 onChange={(e) => handleEditChange("description", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="date"
//                 required
//                 value={editedOffer.startDate || ""}
//                 onChange={(e) => handleEditChange("startDate", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="date"
//                 required
//                 value={editedOffer.endDate || ""}
//                 onChange={(e) => handleEditChange("endDate", e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <select
//                 className="w-full p-2 border rounded"
//                 value={editedOffer.status || "Open"}
//                 onChange={(e) => handleEditChange("status", e.target.value)}
//               >
//                 <option value="Open">Open</option>
//                 <option value="Expired">Expired</option>
//               </select>
//             </div>

//             <button
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex justify-center items-center disabled:opacity-60"
//               onClick={handleSave}
//               disabled={isSaving}
//             >
//               {isSaving ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin h-5 w-5 mr-2 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8H4z"
//                     ></path>
//                   </svg>
//                   Saving...
//                 </span>
//               ) : editingId ? (
//                 "Save Changes"
//               ) : (
//                 "Add Offer"
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchOffersAction,
  updateOfferAction,
  addOfferAction,
} from "@/store/actions/offer.action";
import { toast } from "sonner";

type Offer = {
  id: string | number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function Offers() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: offers, loading } = useSelector(
    (state: RootState) => state.offer
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedOffer, setEditedOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Open",
  });
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingId(null);
    setEditedOffer({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Open",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (offerId: number) => {
    const offer = offers.find((o) => o.id === offerId);
    if (!offer) return;

    setEditingId(offerId);
    setEditedOffer({
      title: offer.title,
      description: offer.description,
      startDate: offer.startDate,
      endDate: offer.endDate,
      status: offer.status,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (key: keyof Offer, value: string) => {
    setEditedOffer((prev) => ({ ...prev, [key]: value }));
  };

  const validateOffer = () => {
    if (!editedOffer.title?.trim()) return "title";
    if (!editedOffer.description?.trim()) return "description";
    if (!editedOffer.startDate) return "startDate";
    if (!editedOffer.endDate) return "endDate";
    if (!editedOffer.status) return "status";
    return null;
  };

  const handleSave = async () => {
    const missingField = validateOffer();
    if (missingField) {
      toast.error(`Please fill the "${missingField}" field.`);
      return;
    }

    setIsSaving(true);

    try {
      let resultAction;

      if (editingId !== null) {
        resultAction = await dispatch(
          updateOfferAction({ id: editingId, data: editedOffer as Offer })
        );
        if (updateOfferAction.fulfilled.match(resultAction)) {
          toast.success("Offer updated successfully!");
        } else {
          toast.error(
            (resultAction.payload as string) || "Failed to update offer"
          );
          setIsSaving(false);
          return;
        }
      } else {
        resultAction = await dispatch(addOfferAction(editedOffer as Offer));
        if (addOfferAction.fulfilled.match(resultAction)) {
          toast.success("Offer added successfully!");
        } else {
          toast.error(
            (resultAction.payload as string) || "Failed to add offer"
          );
          setIsSaving(false);
          return;
        }
      }

      setIsModalOpen(false);
      setEditingId(null);
      setEditedOffer({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Open",
      });

      dispatch(fetchOffersAction());
    } catch (error) {
      toast.error("Failed to save offer");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = offers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(offers.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Offers</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={openAddModal}
        >
          Add Offer
        </button>
      </div>

      {loading ? (
        <div>Loading offers...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "S.NO",
                  "Title",
                  "Description",
                  "Start Date",
                  "End Date",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold text-gray-700"
                  >
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
                  <td colSpan={9} className="text-center py-4 text-gray-500">No offers found.</td>
                </tr>
              ) : (currentItems.map((offer, index) => (
                  <tr key={offer.id} className="border-t">
                    <td className="px-4 py-2">{indexOfFirst + index + 1}</td>
                    <td className="px-4 py-2">{offer.title}</td>
                    <td className="px-4 py-2">{offer.description}</td>
                    <td className="px-4 py-2">{offer.startDate}</td>
                    <td className="px-4 py-2">{offer.endDate}</td>
                    <td className="px-4 py-2">{offer.status}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => openEditModal(offer.id)}>
                        <Pencil className="w-5 h-5 text-blue-500" />
                      </button>
                    </td>
                  </tr>
                )) )}
            </tbody>
          </table>
        </div>
      )}

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Offer" : "Add Offer"}
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                required
                placeholder="Offer Title"
                value={editedOffer.title || ""}
                onChange={(e) => handleEditChange("title", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Offer Description"
                value={editedOffer.description || ""}
                onChange={(e) =>
                  handleEditChange("description", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                required
                value={editedOffer.startDate || ""}
                onChange={(e) => handleEditChange("startDate", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                required
                value={editedOffer.endDate || ""}
                onChange={(e) => handleEditChange("endDate", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <select
                className="w-full p-2 border rounded"
                value={editedOffer.status || "Open"}
                onChange={(e) => handleEditChange("status", e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex justify-center items-center disabled:opacity-60"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
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
              ) : editingId ? (
                "Save Changes"
              ) : (
                "Add Offer"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
