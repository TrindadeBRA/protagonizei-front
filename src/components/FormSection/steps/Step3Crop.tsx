"use client";

import Cropper from "react-easy-crop";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { twMerge } from "tailwind-merge";

type Props = {
  photoPreviewUrl: string | null;
  croppedPreviewUrl: string | null;
  setCroppedPreviewUrl: (url: string | null) => void;
  onCropDone: (file: File, previewUrl: string) => void;
  prevStep: () => void;
};

const createImageElement = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = document.createElement("img");
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err: Event) => reject(err));
    image.crossOrigin = "anonymous";
    image.src = url;
  });
};

const getCroppedImageBlob = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<{ blob: Blob; url: string }> => {
  const image = await createImageElement(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(pixelCrop.width);
  canvas.height = Math.round(pixelCrop.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, canvas.width, canvas.height);
  const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.92));
  const url = URL.createObjectURL(blob);
  return { blob, url };
};

const Step3Crop = ({ photoPreviewUrl, croppedPreviewUrl, setCroppedPreviewUrl, onCropDone, prevStep }: Props) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const onCropComplete = useCallback((_: any, area: any) => {
    setCroppedAreaPixels(area);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Ajuste o rosto dentro do guia</h3>
        <p className="text-gray-600">Posicione e ajuste o zoom para que o rosto fique dentro dos traços. Isso melhora a precisão do FaceSwap.</p>
      </div>

      <div ref={editorRef} className="relative w-full h-[250px] bg-black rounded-xl overflow-hidden">
        {photoPreviewUrl && (
          <Cropper
            image={photoPreviewUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={true}
            objectFit="contain"
            zoomSpeed={0.4}
          />
        )}
      </div>

      <div className="px-2">
        <label className="text-sm text-gray-600 block mb-1">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          style={{ "--range-min": 1, "--range-max": 3, "--range-value": zoom } as CSSProperties}
          className="!w-full"
        />
      </div>

      <div className="flex space-x-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold">
          Voltar
        </Button>
        <Button
          onClick={async () => {
            if (!photoPreviewUrl || !croppedAreaPixels) return;
            const { blob, url } = await getCroppedImageBlob(photoPreviewUrl, croppedAreaPixels);
            const fileName = "photo.jpg";
            const croppedFile = new File([blob], fileName.replace(/\.(png|jpg|jpeg|webp)$/i, "") + "_cropped.jpg", { type: "image/jpeg" });
            if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
            setCroppedPreviewUrl(url);
            onCropDone(croppedFile, url);
          }}
          disabled={!croppedAreaPixels}
          className={twMerge(
            "flex-1 bg-gradient-to-r from-purple-500 to-pink-main hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg relative",
            !croppedAreaPixels ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
          )}
        >
          Confirmar recorte
        </Button>
      </div>

      {croppedPreviewUrl && (
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Pré-visualização do recorte</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={croppedPreviewUrl} alt="Pré-visualização do recorte" className="w-32 h-32 rounded-lg mx-auto border" />
        </div>
      )}
    </div>
  );
};

export default Step3Crop;


