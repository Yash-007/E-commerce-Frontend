import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../api calls/products";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";

const NewProduct = () => {
  const { user } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPrev, setPhotoPrev] = useState(null);

  const navigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhoto(file);
          setPhotoPrev(reader.result)
        }
      }
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await createProduct({ id: user?._id, formData });
    if (res.success) {
      toast.success("Product created successfully");
      navigate("/admin/products");
    }
    else {
      const err = res?.response?.data?.message;
      toast.error(err);
    }
  };

  return (
    <main className='w-full bg-slate-100 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />

      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins]'>
        <Header user={user} />

       <div className="py-4">
       <div className="max-w-[320px] mx-auto mt-10 shadow-xl border border-stroke p-4 pb-8 rounded-md">
          <form onSubmit={submitHandler}>
            <h2 className="text-2xl tracking-wider font-[600] text-center mb-4 mt-2">New Product</h2>
            <div className="w-full mb-3">
              <label className="mb-1 block text-black">
                Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="Enter Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full mb-3">
              <label className="mb-1 block text-black">
                Price
              </label>
              <input
                required
                name="price"
                type="number"
                placeholder="Enter Price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="w-full mb-3">
              <label className="mb-1 block text-black">
                Stock
              </label>
              <input
                required
                name="stock"
                type="number"
                placeholder="Enter Stock"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div className="w-full mb-3">
              <label className="mb-1 block text-black">
                Category
              </label>
              <input
                required
                name="category"
                type="text"
                placeholder="Enter Category"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className='mb-6.5'>
              <label className="mb-1 block text-black dark:text-white">
                Photo
              </label>
              <input
                required
                name='image'
                type="file"
                onChange={changeImageHandler}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-4 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary "
              />

              {photoPrev && <img className="mt-5 h-20 w-20 mx-auto" src={photoPrev} alt="" />}
            </div>

            <button type='submit' className="mt-6 flex w-full justify-center rounded p-3 bg-[#387ADF] hover:bg-[blue] text-white transition-all  font-medium text-gray">
              Create
            </button>
          </form>
        </div>
       </div>
      </section>
    </main>
  );
};

export default NewProduct;