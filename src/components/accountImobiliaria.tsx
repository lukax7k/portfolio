import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  name: string;
  favoritos?: [];
}

interface UserAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAccount: React.FC<UserAccountProps> = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
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
        const response = await axios.get(`https://api-users-1tzc.onrender.com/imobiliaria/users/${userId}`);
        setUserData({
          name: response.data.name,
          favoritos: response.data.favoritos,
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
    } else {
      // Resetar dados quando fechar modal
      setUserData(null);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  // 🔴 Botão de desconectar
  const handleLogout = () => {
    localStorage.removeItem('userId');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-50" onClick={onClose} />

      {/* Modal container */}
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-2xl font-bold"
            aria-label="Fechar"
          >
            &times;
          </button>

          {/* Conteúdo */}
          {loading ? (
            <p className="text-center text-gray-600">Carregando dados...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : userData ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Olá, <span className="text-blue-800">{userData.name}</span>!
              </h2>

              {/* Espaço para o carrossel dos favoritos */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Seus imóveis favoritos</h3>
                <div className="border border-gray-300 rounded-md h-40 flex items-center justify-center text-gray-400">
                  {/* Aqui implementaremos o carrossel dos imóveis depois */}
                  Carrossel dos imóveis favoritos em breve...
                </div>
              </div>

              {/* 🔴 Botão Desconectar */}
              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
              >
                Desconectar
              </button>
            </>
          ) : (
            <p className="text-center text-gray-600">Nenhum dado disponível.</p>
          )}

        </div>
      </div>
    </>
  );
};

export default UserAccount;
