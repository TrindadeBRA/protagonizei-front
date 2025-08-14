"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import customFetch from "@/src/services/custom-fetch";
import { PostOrdersBody } from "@/src/services/model";
import { getGetOrdersOrderIdPaymentStatusUrl, getGetOrdersBookDetailsUrl, getPostOrdersOrderIdPixUrl, getPostOrdersUrl } from "@/src/services/api";
import { childInfoSchema } from "./schemas/childInfo.schema";
import { contactSchema } from "./schemas/contact.schema";
import { photoSchema } from "./schemas/photo.schema";

export type FormDataState = {
  childName: string;
  childAge: string;
  childGender: string;
  skinTone: string;
  parentName: string;
  email: string;
  phone: string;
  photo: File | null;
};

export const useFormSection = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataState>({
    childName: "",
    childAge: "",
    childGender: "",
    skinTone: "",
    parentName: "",
    email: "",
    phone: "",
    photo: null,
  });

  const [orderId, setOrderId] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [isLoadingPix, setIsLoadingPix] = useState<boolean>(false);
  const [isPixGenerated, setIsPixGenerated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const paymentCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Editor de imagem (previews)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);

  // Controle de campos tocados para exibir erros apenas quando necessário
  const [touched, setTouched] = useState<Partial<Record<keyof FormDataState, boolean>>>({});

  // Detalhes do livro
  const [bookId, setBookId] = useState<number | null>(null);
  const [originalBookPrice, setOriginalBookPrice] = useState<number | null>(null);
  const [bookPrice, setBookPrice] = useState<number | null>(null);
  const [isLoadingBookDetails, setIsLoadingBookDetails] = useState<boolean>(false);
  // Cupom (UI)
  const [couponCode, setCouponCode] = useState<string>("");

  const setFieldTouched = (field: keyof FormDataState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const markTouched = (fields: Array<keyof FormDataState>) => {
    setTouched((prev) => {
      const updated = { ...prev };
      fields.forEach((f) => {
        updated[f] = true;
      });
      return updated;
    });
  };

  // Schemas importados por arquivo (zod)

  const step1Validation = useMemo(() => {
    return childInfoSchema.safeParse({
      childName: formData.childName,
      childAge: formData.childAge,
      childGender: formData.childGender,
      skinTone: formData.skinTone,
    });
  }, [formData.childName, formData.childAge, formData.childGender, formData.skinTone]);

  const isStep1Valid = step1Validation.success;

  const step1Errors = useMemo(() => {
    if (step1Validation.success) return {} as Record<string, string[]>;
    return step1Validation.error.flatten().fieldErrors;
  }, [step1Validation]);

  const isStep2Valid = useMemo(() => {
    const result = photoSchema.safeParse({ photo: formData.photo });
    return result.success;
  }, [formData.photo]);

  const isStep4Valid = useMemo(() => {
    const result = contactSchema.safeParse({
      parentName: formData.parentName,
      phone: formData.phone,
      email: formData.email,
    });
    return result.success;
  }, [formData.parentName, formData.phone, formData.email]);

  const step4Errors = useMemo(() => {
    const result = contactSchema.safeParse({
      parentName: formData.parentName,
      phone: formData.phone,
      email: formData.email,
    });
    if (result.success) return {} as Record<string, string[]>;
    return result.error.flatten().fieldErrors;
  }, [formData.parentName, formData.phone, formData.email]);

  const validatePhotoFile = (file: File): boolean => {
    const result = photoSchema.safeParse({ photo: file });
    return result.success;
  };

  const nextStep = () => setStep((s) => (s < 6 ? s + 1 : s));
  const prevStep = () => setStep((s) => (s > 1 ? s - 1 : s));

  const handleInputChange = (field: keyof FormDataState, value: string) => {
    if (field === "phone") {
      const numbers = value.replace(/\D/g, "");
      let maskedValue = "";
      if (numbers.length <= 2) maskedValue = numbers;
      else if (numbers.length <= 7) maskedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      else maskedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      setFormData((prev) => ({ ...prev, [field]: maskedValue }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    opts: { setPhotoPreviewUrl: (url: string | null) => void; setCroppedPreviewUrl: (url: string | null) => void }
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
    const fileSelected = e.target.files[0];
    const objectUrl = URL.createObjectURL(fileSelected);
    opts.setPhotoPreviewUrl(objectUrl);
    opts.setCroppedPreviewUrl(null);
    setFormData((prev) => ({ ...prev, photo: fileSelected }));
  };

  const setPhotoFile = (file: File) => {
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  // Verificação do status do pagamento
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response: any = await customFetch(getGetOrdersOrderIdPaymentStatusUrl(Number(orderId)), { method: "GET" });
        if (response.status === "paid") {
          if (paymentCheckIntervalRef.current) clearInterval(paymentCheckIntervalRef.current);
          setStep(6);
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
      }
    };

    if (orderId && step === 5 && isPixGenerated) {
      const interval = setInterval(checkPaymentStatus, 5000);
      paymentCheckIntervalRef.current = interval;
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [orderId, step, isPixGenerated]);

  const fetchPixData = async (orderIdNum: number) => {
    try {
      setIsLoadingPix(true);
      const response: any = await customFetch(getPostOrdersOrderIdPixUrl(orderIdNum), { method: "POST" });
      if (response.message === "Pix criado com sucesso" && response.qr_code_image) {
        setPixCode(response.qr_code_copypaste || null);
        setQrCodeImage(response.qr_code_image || null);
        // Atualizar o preço se disponível na resposta
        if (response.price !== undefined && response.price !== null) {
          setBookPrice(Number(response.price));
        }
        setIsPixGenerated(true);
      } else {
        throw new Error("Erro ao gerar PIX");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do PIX:", error);
      alert("Erro ao gerar PIX. Por favor, tente novamente.");
    } finally {
      setIsLoadingPix(false);
    }
  };

  // Buscar detalhes do livro ao entrar no passo 4
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setIsLoadingBookDetails(true);
        const response: any = await customFetch(getGetOrdersBookDetailsUrl(), { method: "GET" });
        const id = response?.data?.id ?? null;
        const price = response?.data?.preco ?? response?.data?.price ?? null;
        if (id !== null && id !== undefined) {
          setBookId(Number(id));
        }
        if (price !== null && price !== undefined) {
          if (originalBookPrice === null) {
            setOriginalBookPrice(Number(price));
          }
          setBookPrice(Number(price));
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do livro:", error);
      } finally {
        setIsLoadingBookDetails(false);
      }
    };

    if (step === 4 && bookPrice === null && !isLoadingBookDetails) {
      fetchBookDetails();
    }
  }, [step, bookPrice, isLoadingBookDetails, originalBookPrice]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // validações
      const step1Check = childInfoSchema.safeParse({
        childName: formData.childName,
        childAge: formData.childAge,
        childGender: formData.childGender,
        skinTone: formData.skinTone,
      });
      if (!step1Check.success) throw new Error("Dados da criança inválidos");

      const step2Check = photoSchema.safeParse({ photo: formData.photo });
      if (!step2Check.success) throw new Error("Foto inválida");

      const step4Check = contactSchema.safeParse({
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
      });
      if (!step4Check.success) throw new Error("Dados de contato inválidos");
      const orderData: PostOrdersBody = {
        childName: formData.childName,
        childAge: parseInt(formData.childAge),
        childGender: formData.childGender as PostOrdersBody["childGender"],
        skinTone: formData.skinTone as PostOrdersBody["skinTone"],
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo as File,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("childName", orderData.childName);
      formDataToSend.append("childAge", orderData.childAge.toString());
      formDataToSend.append("childGender", orderData.childGender);
      formDataToSend.append("skinTone", orderData.skinTone);
      formDataToSend.append("parentName", orderData.parentName);
      formDataToSend.append("email", orderData.email);
      formDataToSend.append("phone", orderData.phone);
      formDataToSend.append("photo", orderData.photo);

      const response: any = await customFetch(getPostOrdersUrl(), { method: "POST", body: formDataToSend });

      if (response.status === "created" && response.order_id) {
        setOrderId(response.order_id.toString());
        setStep(5);
        await fetchPixData(Number(response.order_id));
      } else {
        throw new Error("Erro ao criar pedido");
      }
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Ops! Algo deu errado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup URLs em desmontagem
  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
      if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
    };
  }, [photoPreviewUrl, croppedPreviewUrl]);

  return {
    step,
    nextStep,
    prevStep,
    formData,
    handleInputChange,
    handlePhotoChange,
    setPhotoFile,
    orderId,
    pixCode,
    qrCodeImage,
    isLoadingPix,
    isPixGenerated,
    isSubmitting,
    bookId,
    originalBookPrice,
    bookPrice,
    setBookPrice,
    isLoadingBookDetails,
    photoPreviewUrl,
    setPhotoPreviewUrl,
    croppedPreviewUrl,
    setCroppedPreviewUrl,
    handleSubmit,
    isStep1Valid,
    isStep2Valid,
    isStep4Valid,
    step4Errors,
    validatePhotoFile,
    step1Errors,
    touched,
    setFieldTouched,
    markTouched,
    couponCode,
    setCouponCode,
  };
};


