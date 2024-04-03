"use server";

import { handleError } from "@/lib/utils";
import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "..";
import Category from "../models/category.model";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const allCategories = await Category.find();
    return JSON.parse(JSON.stringify(allCategories));
  } catch (error) {
    handleError(error);
  }
};
