interface ModalProps {
  shouldShow: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}
export const Modal = ({ shouldShow, onRequestClose, children }: ModalProps) => {
  return shouldShow ? (
    <div
      className="fixed flex items-center justify-center z-[1] h-full w-full bg-black/40 overflow-auto top-0 left-0"
      onClick={onRequestClose}
    >
      <div
        className="w-3/4 p-5 bg-slate-300 rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="text-xl" onClick={onRequestClose}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
};
