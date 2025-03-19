"use client";

interface ModalProps {
  contact: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address?: string;
    position_name?: string;
    department?: string;
    hire_date?: string;
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ contact, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modalOverlay") {
      onClose();
    }
  };

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 flex items-center justify-center z-20"
      style={{backgroundColor: "rgba(0,0,0,0.5)"}}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-[16px] w-[500px] p-6 shadow-2xl relative transform scale-100 transition-all">
        <button className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
          <img src="xmark.svg" className="w-5 h-5" />
        </button>

        <h2 className="text-[24px] font-bold mb-4">{contact.name}</h2>
        <p><strong>Телефон:</strong> {contact.phone}</p>
        <p><strong>Почта:</strong> {contact.email}</p>
        {contact.hire_date && <p><strong>Дата приема:</strong> {contact.hire_date}</p>}
        {contact.position_name && <p><strong>Должность:</strong> {contact.position_name}</p>}
        {contact.department && <p><strong>Подразделение:</strong> {contact.department}</p>}
        {contact.address && <p><strong>Адрес:</strong> {contact.address}</p>}
      </div>
    </div>
  );
};

export default Modal;
