"use client";

import Image from "next/image";
import { useFormSection } from "./useFormSection";
import { skinTones } from "./constants";

import Step1ChildInfo from "./steps/Step1ChildInfo";
import Step2PhotoUpload from "./steps/Step2PhotoUpload";
import Step3Crop from "./steps/Step3Crop";
import Step4Contact from "./steps/Step4Contact";
import Step5Pix from "./steps/Step5Pix";
import Step6Success from "./steps/Step6Success";

const FormSection = () => {
  const {
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
    validatePhotoFile,
    step1Errors,
    step4Errors,
    touched,
    setFieldTouched,
    couponCode,
    setCouponCode,
  } = useFormSection();

  const getShadowAnimationClass = () => {
    if (!formData.childGender) {
      return "animate-shadow-pulse-gradient";
    }
    if (formData.childGender === "girl") {
      return "animate-shadow-pulse-pink";
    }
    if (formData.childGender === "boy") {
      return "animate-shadow-pulse-blue";
    }
    return "animate-shadow-pulse-gradient";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden" id="criar-historia">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Star" width={100} height={100} className="w-12 h-12 opacity-30" />
        </div>
        <div className="absolute bottom-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart-2.png" alt="Heart" width={100} height={100} className="w-10 h-10 opacity-30" />
        </div>
        <div className="absolute top-1/2 right-10 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Star" width={100} height={100} className="w-8 h-8 opacity-30" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            Crie agora a história{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
              do seu pequeno herói
            </span>!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" data-aos="fade-up">
            Em apenas alguns cliques, você criará uma lembrança que durará para sempre. Vamos começar?
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div 
            className={`bg-white rounded-3xl overflow-hidden ${getShadowAnimationClass()}`}
          >
            {/* Progress bar */}
            <div className="bg-gray-300 h-3">
              <div
                className="bg-gradient-to-r from-pink-main  to-blue-main h-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <Step1ChildInfo
                  formData={formData}
                  handleInputChange={handleInputChange}
                  skinTones={skinTones}
                  nextStep={nextStep}
                  isValid={isStep1Valid}
                  errors={step1Errors}
                  onBlurField={setFieldTouched}
                  touched={touched}
                />
              )}

              {step === 2 && (
                <Step2PhotoUpload
                  formData={formData}
                  handlePhotoChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files && e.target.files[0];
                    handlePhotoChange(e, { setPhotoPreviewUrl, setCroppedPreviewUrl });
                    if (file) {
                      if (validatePhotoFile(file)) {
                        nextStep();
                      } else {
                        alert("Foto inválida. Envie JPG/PNG/WEBP até 5MB.");
                      }
                    }
                  }}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  isValid={isStep2Valid}
                />
              )}

              {step === 3 && (
                <Step3Crop
                  photoPreviewUrl={photoPreviewUrl}
                  croppedPreviewUrl={croppedPreviewUrl}
                  setCroppedPreviewUrl={setCroppedPreviewUrl}
                  onCropDone={(file: File, previewUrl: string) => {
                    setPhotoFile(file);
                    setCroppedPreviewUrl(previewUrl);
                    nextStep();
                  }}
                  prevStep={prevStep}
                />
              )}

              {step === 4 && (
                <Step4Contact
                  formData={formData}
                  handleInputChange={handleInputChange}
                  isSubmitting={isSubmitting}
                  skinTones={skinTones}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                  isValid={isStep4Valid}
                  errors={step4Errors}
                  onBlurField={setFieldTouched}
                  touched={touched}
                  photoPreviewUrl={photoPreviewUrl}
                  croppedPreviewUrl={croppedPreviewUrl}
                  price={bookPrice}
                  isLoadingPrice={isLoadingBookDetails}
                  orderId={orderId}
                  bookId={bookId}
                  onUpdatePrice={(p) => setBookPrice(p)}
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  originalPrice={originalBookPrice}
                />
              )}

              {step === 5 && (
                <Step5Pix
                  orderId={orderId}
                  isLoadingPix={isLoadingPix}
                  qrCodeImage={qrCodeImage}
                  pixCode={pixCode}
                  price={bookPrice}
                  onBack={() => prevStep()}
                />
              )}

              {step === 6 && (
                <Step6Success />
              )}
            </div>
          </div>

          {/* Security badges */}
          <div className="text-center mt-8" data-aos="fade-left">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">🔒</span>
                Pagamento Seguro
              </div>
              <div className="flex items-center">
                <span className="text-blue-main mr-1">📧</span>
                Entrega Garantida
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">⭐</span>
                Satisfação 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;


