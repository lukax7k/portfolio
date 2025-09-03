import React from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

type ModalLoginProps<T extends FieldValues> = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: T) => Promise<void>; // opcional para customizar o submit
  form: UseFormReturn<T>;
  apiRoute?: string; // rota padrão para login, se não passar onSubmit
  children: React.ReactNode;
  title?: string;
  
  abrirModal: () => void;
  submitText?: string;
  styleWrapper?: React.CSSProperties;
  styleContent?: React.CSSProperties;
  styleTitle?: React.CSSProperties;
  styleButtonCancel?: React.CSSProperties;
  styleButtonSubmit?: React.CSSProperties;
};

export function ModalLogin<T extends FieldValues>({
  isOpen,
  onClose,
  onSubmit,

  abrirModal,
  form,
  apiRoute = '/login',
  children,
  title = 'Login',
  submitText = 'Entrar',
  styleWrapper,
  styleContent,
  styleTitle,
  styleButtonCancel,
  styleButtonSubmit
}: ModalLoginProps<T>) {
  const { handleSubmit } = form;

  // Função padrão para submit se onSubmit não for passado
  async function defaultSubmit(data: T) {
    try {
      const res = await fetch(apiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        alert(json.error || 'Erro no login');
        return;
      }

      const user = await res.json();
      localStorage.setItem('userId', user._id);
      alert('Login realizado com sucesso!');
      onClose();
    } catch (error) {
      alert('Erro na comunicação com o servidor.');
    }
  }

  if (!isOpen) return null;

  return (
    <div style={{ ...defaultWrapperStyle, ...styleWrapper }}>
      <div style={{ ...defaultContentStyle, ...styleContent }}>
        <h2 style={{ ...defaultTitleStyle, ...styleTitle }}>{title}</h2>

        <form onSubmit={handleSubmit(onSubmit ?? defaultSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {children}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <span style={{ fontSize: '14px', color: '#555' }}>
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                 abrirModal();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  color: '#c30000',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Registre-se
              </button>
            </span>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{ ...defaultButtonSubmit, ...styleButtonSubmit }}>
                {submitText}
              </button>

              <button type="button" onClick={onClose} style={{ ...defaultButtonCancel, ...styleButtonCancel }}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Mesmos estilos do modal de registro, para manter consistência
const defaultWrapperStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999
};

const defaultContentStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '10px',
  padding: '30px',
  width: '90%',
  maxWidth: '480px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 0 15px rgba(0,0,0,0.3)',
  fontFamily: 'Arial, sans-serif',
  boxSizing: 'border-box',
};

const defaultTitleStyle: React.CSSProperties = {
  marginBottom: 20,
  fontSize: '24px',
  color: '#222'
};

const defaultButtonCancel: React.CSSProperties = {
  padding: '10px 16px',
  background: '#ddd',
  color: '#333',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginRight: 10
};

const defaultButtonSubmit: React.CSSProperties = {
  padding: '10px 16px',
  background: '#c30000',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
