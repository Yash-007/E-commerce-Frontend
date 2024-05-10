import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, getSingleProduct, updateProduct } from '../../../api calls/products';
import Header from '../../../components/header';
import { Skeletons } from '../../../components/loader';
import Sidebar from '../../../components/sidebar';
import { removeProduct } from '../../../redux/productSlice';

function ProductManagement() {
  const [product, setProduct] = useState({
    name: '', price: 0, stock: 0, category: '', photo: ''
  });
  const [photo, setPhoto] = useState('');
  const [photoPrev, setPhotoPrev] = useState('');
  const [id, setId] = useState('');

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    const GetSingleProduct = async () => {
      const data = await getSingleProduct(params.id);
      if (data.success) {
        setProduct(data.product);
        setId(data.product?._id);
      }
      else
        return navigate('/404');
    }
    GetSingleProduct();
  }, []);

  const deleteHandler = async (productId) => {
    const response = await deleteProduct(productId, user?._id);
    if (response?.success) {
      toast.success(response.message);
      dispatch(removeProduct(productId))
      return navigate('/admin/products')
    }
    else {
      toast.error(response?.response?.data?.message);
    }
  }

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

  const changeProductData = (e) => {
    const { name } = e.target;
    setProduct({ ...product, [name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (product.name) formData.set("name", product.name);
    if (product.price) formData.set("price", product.price.toString());
    if (product.stock) formData.set("stock", product.stock.toString());
    if (product.category) formData.set("category", product.category);
    if (photo) formData.set("photo", photo);

    const res = await updateProduct({ productId: id, userId: user?._id, formData });
    if (res.success) {
      toast.success("Product updated successfully");
      navigate("/search");
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
      {!product.name ? <Skeletons length={30}/> : 
        <div className='flex md:flex-row flex-col gap-2 p-4 pb-16'>
          <div className="max-w-auto mx-auto sm:max-w-[400px] mt-10 shadow-xl border border-stroke p-6 pb-8 rounded-md">
            <div className='flex justify-between'>
              <span><DeleteIcon onClick={() => deleteHandler(product._id)} sx={{ color: 'red', cursor: 'pointer' }} /></span>
              <span className={(product.stock ? 'text-[green]' : 'text-[red]')}>{product?.stock} Available</span>
            </div>

            <div className='mt-9'>
              <span className='text-sm sm:text-lg'>ID - {id}</span>
            </div>

            <img className='mt-14 w-[320px] h-[220px]' src={`${import.meta.env.VITE_SERVER_IMG}/${product.photo}`} alt="" />

            <div className='mt-10 flex flex-col gap-3 text-center'>
              <span>{product.name}</span>
              <span className='font-bold text-lg'>Rs {product.price}</span>
            </div>
          </div>

          <div className="max-w-[320px] mx-auto mt-10 shadow-xl border border-stroke p-4 pb-8 rounded-md">
            <form onSubmit={submitHandler}>
              <h2 className="text-2xl tracking-wider font-[600] text-center mb-4 mt-2">Manage</h2>
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
                  value={product.name}
                  onChange={changeProductData}
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
                  value={product.price}
                  onChange={changeProductData}
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
                  value={product.stock}
                  onChange={changeProductData}
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
                  value={product.category}
                  onChange={changeProductData}
                />
              </div>

              <div className='mb-6.5'>
                <label className="mb-1 block text-black dark:text-white">
                  Photo
                </label>
                <input
                  name='image'
                  type="file"
                  onChange={changeImageHandler}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-4 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary "
                />

                {photoPrev && <img className="mt-5 h-20 w-20 mx-auto" src={photoPrev} alt="" />}

              </div>

              <button type='submit' className="mt-6 flex w-full justify-center rounded p-3 bg-[#387ADF] hover:bg-[blue] font-medium text-gray">
                Update
              </button>
            </form>
          </div>
        </div>
      }
      </section>
    </main>
  )
}

export default ProductManagement