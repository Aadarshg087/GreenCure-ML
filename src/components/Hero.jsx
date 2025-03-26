import React, { useEffect, useState } from "react";

const Hero = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState();

  useEffect(() => {
    setLoading(true);
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);

      const fetchResult = async () => {
        const formData = new FormData();
        formData.append("file", image);
        try {
          const url = "http://44.218.112.240:8000/predict";
          console.log(formData);
          const res = await fetch(url, { method: "POST", body: formData });
          const result = await res.json();
          setPrediction(result);
          console.log("Success", result);
        } catch (error) {
          setPrediction({ prediction: "Error in getting the results" });
        }
      };

      fetchResult();
    } else {
      setPreview(null);
    }
    setLoading(false);
  }, [image]);

  const handleImageInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="w-full p-20 bg-red-400 text-white text-center">
            <h1 className="font-bold text-xl">Hang On! Loading...</h1>
          </div>
        </>
      ) : (
        <div className="p-10 font-winky bg-[url('./assets/image3.jpg')] bg-cover bg-center h-full">
          {!image ? (
            <div className="flex flex-col gap-5 items-center m-30">
              <h2 className="text-4xl font-bold text-center mb-8">
                Enter an image :
              </h2>
              <label className="border cursor-pointer flex items-center justify-center h-[200px] w-[500px] text-gray-800 outline-2 rounded-sm bg-amber-50">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageInput}
                />
                <span>Browse the file or Drop the file here</span>
              </label>
            </div>
          ) : (
            <>
              <div className="flex justify-around  mt-10 mb-5">
                <img src={preview} className="h-[300px] " alt="Image Preview" />
              </div>
              {prediction ? (
                <h2 className="font-bold font-winky text-2xl text-center mb-30 ">
                  Prediction: {prediction.prediction}
                </h2>
              ) : (
                <div className="w-full p-10 text-black text-center">
                  <h1 className="font-bold text-xl">Hang On! Loading...</h1>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Hero;
