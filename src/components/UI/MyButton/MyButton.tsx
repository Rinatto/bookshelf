import cl from './MyButton.module.css'


interface MyButtonProps {
    label: string;
    onClick: () => void;
  }
  
  export const MyButton: React.FC<MyButtonProps> = ({ label, onClick }) => {
    return (
      <button className={cl.myBtn} onClick={onClick}>
        {label}
      </button>
    );
  };