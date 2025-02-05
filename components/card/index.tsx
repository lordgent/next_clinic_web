import React from 'react';

interface ItemCard{
  name: string,
  address: string
}

interface CardListProps {
  cards: ItemCard[]; 
}

const CardList: React.FC<CardListProps> = ({ cards }) => {

  const handleTo = (name: string) => {
    window.location.href = `/user/layanan/${name}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-full bg-white shadow-md rounded-lg cursor-pointer"
          onClick={() => handleTo(card.name)} 
        >
          <div className="h-[220px] w-full bg-gray-100">
            <img src="/images/pusura.jpeg" alt="" className='w-full h-full object-cover' />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
            <p className="text-gray-600">{card.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
