import React, { useState } from "react";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import { Loader2 } from "lucide-react";

const EditProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(
    "https://tse1.mm.bing.net/th/id/OIP.PkFenohHn8RbSMjB8E4SZwHaHa?pid=Api&P=0&h=180"
  );

  const [input, setInput] = useState({
    name: "",
  });
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.type === "file") {
      const selectedFile = e.target.files && e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      }
    } else {
      setInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", (input.name).trim());

    try {
      const res = await instance.put("/user/profile-picture", formData);

      if (res.data?.success) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Edit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Update Profile Picture
        </h2>

        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Choose a new picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full file-input-sm"
          />

          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Enter your name"
            onChange={handleImageChange}
            className="input input-bordered w-full input-sm"
          />

          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Save Picture...
              </>
            ) : (
              "Save Picture"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePicture;
