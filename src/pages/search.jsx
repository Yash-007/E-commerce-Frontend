import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategories } from '../api calls/products';
import Header from '../components/header';
import { Skeletons } from '../components/loader';
import ProductCard from '../components/productCard';
import { addToCart } from '../redux/cartSlice';
import { getFilteredProductsAsync } from '../redux/productSlice';

function Search() {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const { filteredProducts, totalPage, error, loading } = useSelector((state) => state.products);
  const {user} = useSelector((state)=> state.users);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const GetProductCategories = async () => {
      const data = await getProductCategories();
      if (data?.success)
        setAllCategories(data.categories);
    }
    GetProductCategories();
  },[])

  useEffect(() => {
    dispatch(getFilteredProductsAsync({
      search,
      category,
      price: maxPrice,
      page,
      sort
    }));
  }, [search, category, maxPrice, page, sort])

  if (error) {
    toast.error("Couldn't get filtered Products");
  }

  const addToCartHandler= (cartItem)=>{
    if(cartItem.stock < 1){
      return toast.error("Out of Stock");
    }
    else{
      dispatch(addToCart(cartItem));
      toast.success("Added to Cart");
    }
  }


  return (
    <>
      <div className='font-[poppins]'>
        <Header user={user} />

        <div className='mt-3 p-4 px-6'>
          <h1 className='text-3xl px-8 mb-2 text-center sm:text-left font-[300] tracking-wider'>PRODUCTS</h1>

          <div className='flex justify-center md:justify-end'>
            <div className='flex flex-wrap gap-4 md:gap-[100px] justify-center sm:justify-between w-full md:w-auto'>
              <div className='w-full sm:w-auto'>
                <h5 className='text-md font-bold my-2'>Sort</h5>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select name='display' value={sort} onChange={(e)=>setSort(e.target.value)} className="relative z-20 w-full sm:w-[190px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 text-sm outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">None</option>
                    <option value="asc">Price (Low to High)</option>
                    <option value="dsc">Price (High to Low)</option>
 
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className='w-full sm:w-auto'>
                <h5 className='text-md font-bold my-2'>Max Price: {maxPrice}</h5>
                <input className='mt-3 w-full' type="range" min={100} max={100000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
              </div>

              <div className='w-full sm:w-auto'>
                <h5 className='text-md font-bold my-2'>Category</h5>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select name='display' value={category} onChange={(e)=>setCategory(e.target.value)} className="relative z-20 w-full sm:w-[180px] appearance-none rounded border border-stroke bg-transparent py-3 px-5 text-sm outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">All</option>
                    {allCategories.length>0 && allCategories.map((c)=>(
                      <>
                      <option value={c}>{c}</option>
                      </>
                    ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>


            </div>
          </div>

          <div className='text-center mt-8'>
          <FormControl className='w-full sm:w-[60%]' sx={{ m: 1, textAlign:'center', }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                 sx={{bgcolor:'orange'}}
                  aria-label="search"
                  edge="end"
                >
                   <SearchIcon></SearchIcon>
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>            
          </div>
        </div>

         { loading ? <Skeletons length={30}/> : 
         <>
         <div className='flex flex-wrap justify-center gap-10 mb-10'>
         {filteredProducts.length>0 && filteredProducts.map((prod)=>(
          <ProductCard
            productId={prod._id}
            name={prod.name}
            price={prod.price}
            stock={prod.stock}
            photo={`${import.meta.env.VITE_SERVER_IMG}/${prod.photo}`}
            handler={addToCartHandler}
          />
         ))}
         </div>
         {totalPage && <div className="table-pagination mb-10">
              <button disabled={(page===1)? true : false} onClick={()=> setPage(page-1)}>
                Prev
              </button>
              <span>{`${page} of ${totalPage}`}</span>
              <button disabled={(page===totalPage)? true : false} style={(page===totalPage)? {backgroudColor:'white'}: null} onClick={()=> setPage(page+1)}>
                Next
              </button>
        </div>}
         </>
         }
      </div>
    </>
  )
}
export default Search