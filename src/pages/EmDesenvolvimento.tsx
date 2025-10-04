import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

const EmDesenvolvimento = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-6 rounded-full">
            <Construction className="w-16 h-16 text-yellow-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Em Desenvolvimento
        </h1>

        <p className="text-gray-600 mb-8">
          Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
        </p>

        <button
          onClick={() => navigate('/home')}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o Menu
        </button>
      </div>
    </div>
  );
};

export default EmDesenvolvimento;
