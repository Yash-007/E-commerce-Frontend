import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newCoupon } from "../../../api calls/coupons";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";

const NewCoupon = () => {
  const { user } = useSelector((state) => state.users);

  const [code, setCode] = useState("");
  const [amount, setAmount] = useState();

  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!code || !amount) return;

    const res = await newCoupon(user?._id, {code,amount});
    if (res.success) {
      toast.success("Coupon created successfully");
      navigate("/admin/coupons");
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

       <div className="py-8">
       <div className="max-w-[320px] mx-auto mt-24 shadow-xl border border-stroke p-4 pb-8 rounded-md">
          <form onSubmit={submitHandler}>
            <h2 className="text-2xl tracking-wider font-[600] text-center mb-4 mt-2">New Coupon</h2>
            <div className="w-full mb-3">
              <label className="mb-1 block text-black">
                Code
              </label>
              <input
                required
                name="code"
                type="text"
                placeholder="Enter Code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="w-full mb-3">
              <label className="mb-1 block text-black">
                Amount
              </label>
              <input
                required
                name="amount"
                type="number"
                placeholder="Enter Amount"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
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

export default NewCoupon;