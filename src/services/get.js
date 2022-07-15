import axios from "axios";
import env from "react-dotenv";
import { sendos, shopees, tikis } from "./constants";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const API_PATH = env.API_PATH;

const instance = axios.create({
  baseURL: `${API_PATH}`,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export const crawlFromTiki = async () => {
  const products = [];
  try {
    for (const tiki of tikis) {
      const prods = await instance.get(
        `tiki?category=${tiki.category}&urlKey=${tiki.urlKey}`,
        config
      );

      products.push(...prods.data);
    }
    return products;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export const evaluateFromTiki = async (products) => {
  try {
    for (const product of products) {
      const { spid, tiki_id, seller_id, id } = product;
      await instance.get(
        `/tiki/cmt?spid=${spid}&product_id=${tiki_id}&seller_id=${seller_id}&id=${id}`
      );
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crawlFromSendo = async () => {
  const products = [];
  try {
    for (const sendo of sendos) {
      const prods = await instance.get(`sendo?category=${sendo}`);

      products.push(...prods.data);
    }

    return products;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export const evaluateFromSendo = async (products) => {
  try {
    for (const product of products) {
      const { sendo_id, id } = product;
      await instance.get(`sendo/cmt?product_id=${sendo_id}&id=${id}`);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crawlFromShopee = async () => {
  const products = [];
  try {
    for (const shopee of shopees) {
      const prods = await instance.get(`shopee?limit=60&category_id=${shopee}`);

      products.push(...prods.data);
    }

    return products;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export const evaluateFromShopee = async (products) => {
  try {
    for (const product of products) {
      const { shopee_id, shopid, type, id } = product;
      await instance.get(`shopee/cmt?itemid=${shopee_id}&shopid=${shopid}&type=${type}&id=${id}`);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crawlFromTGDD = async () => {
  const products = [];
  try {
    for (const tgdd of tgdds) {
      const { type, typeId, maxPage } = tgdd;
      const prods = await instance.get(`tgdd?type=${type}&typeId=${typeId}&maxPage=${maxPage}`);

      products.push(...prods.data);
    }

    return products;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export const evaluateFromTGDD = async (products) => {
  try {
    for (const product of products) {
      const { link, id } = product;
      await instance.get(`tgdd/cmt?link=${link}&id=${id}`);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
