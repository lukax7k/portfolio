import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  name: string;
  endereco: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Usuário não encontrado no localStorage.');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`https://api-users-1tzc.onrender.com/loja/users/${userId}`);
        setUserData({
          name: response.data.name,
          endereco: response.data.endereco,
        });
        setError(null);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Erro ao buscar dados do usuário.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  // Função para deslogar
  const handleLogout = () => {
    localStorage.removeItem('userId');
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fundo com opacidade separado */}
      <div className="fixed inset-0 bg-black opacity-50 z-50 h-full"  />

      {/* Conteúdo do modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white text-black rounded-lg shadow-2xl w-full max-w-md mx-4 sm:mx-0 p-6 relative transition-all duration-300 ease-in-out">
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black hover:text-red-600 text-xl font-bold"
          >
            ×
          </button>

          {/* Título */}
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#e60000]">
            Minha Conta
          </h2>

          {/* Conteúdo */}
          {loading ? (
            <p className="text-gray-600 text-center">Carregando dados...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : userData ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nome:</p>
                <p className="text-lg font-medium">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Endereço:</p>
                <p className="text-lg font-medium">{userData.endereco}</p>
              </div>

              {/* Botão Ver Histórico */}
              <button
                onClick={() => alert('Abrirá modal de histórico futuramente')}
                className="w-full bg-[#e60000] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Ver Histórico
              </button>

              {/* Botão Deslogar */}
              <button
                onClick={handleLogout}
                className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded transition duration-300 mt-2"
              >
                Deslogar
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AccountModal;
