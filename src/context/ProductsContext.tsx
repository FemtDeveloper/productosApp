/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {createContext, useEffect, useState} from 'react';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

type ProductContexProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductContexProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await cafeApi.get<ProductsResponse>('/productos?limit=50');
    setProducts([...res.data.productos]);
  };
  const addProduct = async (categoryId: string, productName: string) => {};
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};
  const deleteProduct = async (id: string) => {};
  const loadProductById = async (id: string) => {
    throw new Error('not implemented yet');
  };
  const uploadImage = async (data: any, id: string) => {};
  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
