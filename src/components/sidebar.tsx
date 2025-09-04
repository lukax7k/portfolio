import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ModalLogin } from "./loginModal";
import { ModalRegister } from "./registerModal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import UserAccount from './accountImobiliaria';


type LoginFormData = {
  name: string;
  password: string;
};

type RegisterFormData = {
  name: string;
  password: string;
  endereco?: string;
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const navigate = useNavigate();

  const abrirLogin = () => setIsLoginOpen(true);
  const fecharLogin = () => setIsLoginOpen(false);

  const abrirRegistro = () => setIsRegisterOpen(true);
  const fecharRegistro = () => setIsRegisterOpen(false);

  const formLogin = useForm<LoginFormData>();
  const formRegister = useForm<RegisterFormData>();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  };

  const handleLogin = async (data: LoginFormData) => {
    toast.promise(
      axios.post('https://api-users-1tzc.onrender.com/imobiliaria/login', data),
      {
        loading: 'Logando...',
        success: (res) => {
          localStorage.setItem('userId', res.data.user.id);
          setIsLoginOpen(false);
          return 'Login realizado com sucesso!';
        },
        error: (err) => {
          const mensagemErro = err.response?.data?.error || 'Erro ao logar. Tente novamente.';
          return mensagemErro;
        }
      }
    );
  };

  const handleRegister = async (data: RegisterFormData) => {
    toast.promise(
      axios.post('https://api-users-1tzc.onrender.com/imobiliaria/users', data),
      {
        loading: 'Registrando...',
        success: (res) => {
          localStorage.setItem('userId', res.data.id);
          setIsRegisterOpen(false);
          return 'Cadastro realizado com sucesso!';
        },
        error: (err) => {
          const mensagemErro = err.response?.data?.error || 'Erro ao registrar. Tente novamente.';
          return mensagemErro;
        }
      }
    );
  };
  const abrirConta = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsAccountOpen(true);  // abre modal da conta
    } else {
      abrirLogin();            // se não tiver userId, abre o login
    }
    setIsOpen(false); // fecha a sidebar
  };


  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 70, // ou maior que o wrapper do modal
          },
        }}
      />
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 text-3xl text-white bg-blue-600 rounded-full p-3 shadow-md hover:bg-blue-700 transition z-50"
        aria-label="Abrir menu"
      >
        <FaBars />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-xl font-extrabold text-blue-600 tracking-wide">ImobiFácil</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-red-600 text-xl"
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4 text-gray-800 text-lg font-medium">
          <button
            onClick={() => {
              navigate("/projeto/1");
              toggleSidebar();
            }}
            className="hover:text-blue-600 transition text-left"
          >
            Início
          </button>

          <button
            onClick={abrirConta}
            className="hover:text-blue-600 transition text-left"
          >
            Conta
          </button>

          <button
            onClick={scrollToBottom}
            className="hover:text-blue-600 transition text-left"
          >
            Fale conosco
          </button>
        </nav>
      </aside>

      {/* Modal de Login */}
      <ModalLogin
        isOpen={isLoginOpen}
        onClose={fecharLogin}
        abrirModal={abrirRegistro}
        form={formLogin}
        onSubmit={handleLogin}
        title="Login"
        submitText="Entrar"
        styleWrapper={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          overflowY: 'auto',
          zIndex: 60,
        }}

        styleContent={{
          background: '#fff',
          borderRadius: '12px',
          padding: '24px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          fontFamily: 'Arial, sans-serif',
          margin: '0 auto',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        styleTitle={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: '24px',
          textAlign: 'center',
        }}
        styleButtonSubmit={{
          background: '#1e40af',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
        styleButtonCancel={{
          background: '#e5e5e5',
          color: '#333',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        <input
          {...formLogin.register("name", { required: "Nome é obrigatório" })}
          type="text"
          placeholder="Nome"
          style={inputStyle}
        />
        <input
          {...formLogin.register("password", { required: "Senha é obrigatória" })}
          type="password"
          placeholder="Senha"
          style={inputStyle}
        />
      </ModalLogin>

      {/* Modal de Registro */}
      <ModalRegister
        isOpen={isRegisterOpen}
        onClose={fecharRegistro}
        abrirLModal={abrirLogin}
        form={formRegister}
        onSubmit={handleRegister}
        title="Cadastrar Conta"
        submitText="Registrar"
        styleWrapper={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          overflowY: 'auto',
          zIndex: 60,
        }}

        styleContent={{
          background: '#fff',
          borderRadius: '12px',
          padding: '24px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          fontFamily: 'Arial, sans-serif',
          margin: '0 auto',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        styleTitle={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: '24px',
          textAlign: 'center',
        }}
        styleButtonSubmit={{
          background: '#1e40af',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
        styleButtonCancel={{
          background: '#e5e5e5',
          color: '#333',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        <input
          {...formRegister.register("name", { required: "Nome é obrigatório" })}
          type="text"
          placeholder="Nome"
          style={inputStyle}
        />
        <input
          {...formRegister.register("password", { required: "Senha é obrigatória" })}
          type="password"
          placeholder="Senha"
          style={inputStyle}
        />

      </ModalRegister>
      <UserAccount
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

    </>
  );
};

// Estilo comum dos inputs
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '16px',
  boxSizing: 'border-box',
};

export default Sidebar;
