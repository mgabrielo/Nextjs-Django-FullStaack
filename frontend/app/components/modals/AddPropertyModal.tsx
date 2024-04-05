"use client";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../buttons/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { apiService } from "@/app/service/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
  const router = useRouter();
  const addPropertyModal = useAddPropertyModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState(" ");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataBedRooms, setDataBedRooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSetCategory = (data: string) => {
    setDataCategory(data);
  };

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageData = e.target.files[0];
      setDataImage(imageData);
    }
  };

  const submitFormData = async () => {
    if (
      dataTitle &&
      dataDescription &&
      dataCategory &&
      dataCountry &&
      dataBedRooms &&
      dataPrice &&
      dataGuests &&
      dataImage
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedRooms);
      formData.append("bathrooms", dataBathrooms);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("image", dataImage);

      const response = await apiService.postWithToken(
        `/api/properties/create/`,
        formData
      );

      if (response.success) {
        // console.log("success");
        router.push("/");
        addPropertyModal.close();
      } else {
        const errorData: string[] = Object.values(response).map((err: any) => {
          return err;
        });
        setErrors(errorData);
      }
    }
  };
  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-3 text-xl">Choose Category</h2>
          <Categories
            dataCategory={dataCategory}
            setDatacategory={(category) => handleSetCategory(category)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-3 text-xl">Describe Your Place</h2>
          <div className="py-3 space-y-3">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-500 rounded-lg"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
              />
              <textarea
                rows={6}
                className="w-full py-4 px-2 border border-gray-500 rounded-lg"
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <span className="flex gap-2">
            <CustomButton
              label="Previous"
              className="bg-gray-800"
              onClick={() => setCurrentStep(currentStep - 1)}
            />
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </span>
        </>
      ) : currentStep == 3 ? (
        <>
          <h2 className="mb-3 text-xl">Details</h2>
          <div className="flex flex-col space-y-2">
            <label>Price</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-500 rounded-lg"
              value={dataPrice}
              onChange={(e) => setDataPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>BedRooms</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-500 rounded-lg"
              value={dataBedRooms}
              onChange={(e) => setDataBedRooms(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>BathRooms</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-500 rounded-lg"
              value={dataBathrooms}
              onChange={(e) => setDataBathrooms(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Maximum Number of Guests</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-500 rounded-lg"
              value={dataGuests}
              onChange={(e) => setDataGuests(e.target.value)}
            />
          </div>
          <span className="flex gap-2 pt-3">
            <CustomButton
              label="Previous"
              className="bg-gray-800"
              onClick={() => setCurrentStep(currentStep - 1)}
            />
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </span>
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-3 text-xl">Location</h2>
          <div className="py-3 space-y-3">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>
          <span className="flex gap-2 pt-3">
            <CustomButton
              label="Previous"
              className="bg-gray-800"
              onClick={() => setCurrentStep(currentStep - 1)}
            />
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </span>
        </>
      ) : (
        currentStep == 5 && (
          <>
            <h2 className="mb-3 text-xl">Images</h2>
            <div className="flex flex-col space-y-2">
              <div className="py-2 px-4 bg-gray-600 text-white rounded-lg space-y-3">
                <input type="file" accept="image/*" onChange={handleSetImage} />
                {dataImage && (
                  <div className="w-[200px] h-[150px] relative object-cover">
                    <Image
                      src={URL.createObjectURL(dataImage)}
                      fill
                      alt="img-upload"
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <div
                  key={index}
                  className="p-4 my-2 bg-airbnb text-white rounded-lg opacity-80"
                >
                  {error}
                </div>
              ))}
            <span className="flex gap-2 pt-3">
              <CustomButton
                label="Previous"
                className="bg-gray-800"
                onClick={() => setCurrentStep(currentStep - 1)}
              />
              <CustomButton label="Submit" onClick={submitFormData} />
            </span>
          </>
        )
      )}
    </>
  );
  return (
    <>
      <Modal
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="Add Property"
        content={content}
      />
    </>
  );
};

export default AddPropertyModal;
