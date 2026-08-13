"use client";

import { Product } from "@/types";
import { useState } from "react";

interface FormData {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  numberInput: number;
  enumDropdown: FormDataEnum;
}

enum FormDataEnum {
  Opt1 = "Opt1",
  Opt2 = "Opt2",
  Opt3 = "Opt3",
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<FormData>({
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    numberInput: 0,
    enumDropdown: FormDataEnum.Opt1,
  });

  return (
    <main>
      <form action=""></form>
    </main>
  );
}
