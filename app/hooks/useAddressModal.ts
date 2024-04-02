import { create } from "zustand";

interface userAddressModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddressModal = create<userAddressModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddressModal;
