/* eslint-disable no-console */
import { db } from "firebases";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getProducts = async () => {
  try {
    const snapshot = await db.collection("products").get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTikiProducts = async () => {
  const tikis = [];
  try {
    const q = query(collection(db, "products"), where("id_shop", "==", 1));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const tiki = { ...doc.data(), id: doc.id };
      tikis.push(tiki);
    });

    return tikis;
  } catch (error) {
    console.log(error);
    return tikis;
  }
}

export const getSendoProducts = async () => {
  const sendos = [];
  try {
    const q = query(collection(db, "products"), where("id_shop", "==", 2));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const sendo = { ...doc.data(), id: doc.id };
      sendos.push(sendo);
    });

    return sendos;
  } catch (error) {
    console.log(error);
    return sendos;
  }
}

export const getTGDDProducts = async () => {
  const tgdds = [];
  try {
    const q = query(collection(db, "products"), where("id_shop", "==", 4));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const tgdd = { ...doc.data(), id: doc.id };
      tgdds.push(tgdd);
    });

    return tgdds;
  } catch (error) {
    console.log(error);
    return tgdds;
  }
}

export const getShopeeProducts = async () => {
  const shopees = [];
  try {
    const q = query(collection(db, "products"), where("id_shop", "==", 3));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const shopee = { ...doc.data(), id: doc.id };
      shopees.push(shopee);
    });

    return shopees;
  } catch (error) {
    console.log(error);
    return shopees;
  }
}

export const login = async (admin) => {
  try {
    let snapshot = query(collection(db, "users"));
    const querySnapshot = await getDocs(snapshot);
    let checked;
    querySnapshot.forEach((doc) => {
      const { username, password } = doc.data();
      if (username === admin.username && password === admin.password) {
        checked = true;
      }
    });
    return checked;
  } catch (error) {
    console.error(error);
    return false;
  }
};
