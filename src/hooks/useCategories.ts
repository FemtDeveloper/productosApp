import {useState, useEffect} from 'react';
import cafeApi from '../api/cafeApi';
import {Categoria, CategoriasResponse} from '../interfaces/appInterfaces';

export const useCategories = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    const resp = await cafeApi.get<CategoriasResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    isLoading,
  };
};
