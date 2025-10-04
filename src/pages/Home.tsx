import React from 'react';
import { Header, MenuCard } from '../components';
import { menuItems } from '../constants/menuItems';

const Home: React.FC = () => {
  const handleCardClick = (title: string) => {
    console.log(`Clicked on: ${title}`);
    // TODO: Implement navigation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        title="Sistema de Gestão"
        subtitle="Bem-vindo ao painel principal"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onClick={() => handleCardClick(item.title)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
