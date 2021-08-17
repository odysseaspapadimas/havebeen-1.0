import { Icon } from "@iconify/react";
import { useEffect } from "react";
import format from "date-fns/format";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { useToast } from "@chakra-ui/toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Place = ({
  docId,
  name,
  place,
  desc,
  date,
  coords,
  seeOnMap,
  setSelectedPlace,
  userUid,
}) => {
  const [formattedDate, setFormattedDate] = useState("1/1/1970");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!date) return;
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(date.seconds);
    const formatted = format(t, "dd/MM/yyyy");
    setFormattedDate(formatted);
  }, [date]);

  const handleDelete = async (docId) => {
    await db
      .collection("users")
      .doc(userUid)
      .collection("places")
      .doc(docId)
      .delete()
      .then((res) =>
        toast({
          title: "Deleted place.",
          description: "Succesfully deleted place.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      )
      .catch((e) => console.log("error", e));
  };

  return (
    <>
      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="text-black">
          <ModalHeader className="text-black">Delete place?</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-black">
            Are you sure you want to delete this place? This action is
            irreversible.
          </ModalBody>

          <ModalFooter className="text-black space-x-2">
            <button
              className="bg-gray-800 p-2 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={async () => {
                handleDelete(docId);
              }}
            >
              Delete
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="flex flex-col justify-between items-center bg-gray-800 p-2 rounded-md text-lg relative">
        <span className="self-start border-b border-white">
          {formattedDate}
        </span>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center mx-4 w-full">
            <div className="self-start">
              {name}
              {place && <span>, {place}</span>}
            </div>
          </div>

          <p style={{ maxWidth: "45vw" }}>{desc}</p>
        </div>

        <div className="self-end space-x-2">
          <button
            onClick={() => setSelectedPlace(docId)}
            className="bg-red-500 text-white p-2 rounded-md mt-2 self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            onClick={() => seeOnMap(coords)}
            className="bg-red-500 text-white p-2 rounded-md mt-2 self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </button>
          <button
            onClick={onOpen}
            className="bg-white text-red-500 p-2 rounded-md mt-2 self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Place;
