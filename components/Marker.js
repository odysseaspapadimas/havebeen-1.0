import { Icon } from "@iconify/react";
import { useState } from "react";
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

const Marker = ({ name, place, desc, docId, setSelectedPlace }) => {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      onClick={onOpen}
      style={{
        fontSize: "2rem",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="text-black">
          <ModalHeader className="text-black">
            {name} {place && <p>, {place}</p>}
          </ModalHeader>
          <ModalCloseButton className="text-black" />
          <ModalBody className="text-black">{desc}</ModalBody>

          <ModalFooter className="flex justify-center items-center text-black space-x-2">
            <button
              onClick={() => {
                setSelectedPlace(docId);
              }}
              className="bg-red-500 text-white p-2 rounded-md"
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
              className="bg-gray-800 py-1 px-2 h-9 text-white rounded-md"
              onClick={onClose}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Icon className="text-red-500 z-10" icon="fontisto:map-marker-alt" />
    </div>
  );
};

export default Marker;