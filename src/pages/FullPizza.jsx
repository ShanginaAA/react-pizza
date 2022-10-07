import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62ece332818ab252b604bcff.mockapi.io/items/` + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}
