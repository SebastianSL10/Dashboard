import React from 'react';
import { BsCurrencyDollar, BsCashCoin } from 'react-icons/bs';
import { ImExit } from "react-icons/im";
import { PiBeerBottleBold } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md"

import { useStateContext } from '../contexts/ContextProvider';
import { TotalUsuarios, IngresosTotal, TotalSalidas, TotalProductos, SumProductos, SumIngresos, SumSalidas } from '../components';



const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <HiMiniUserGroup />
            </button>
            <TotalUsuarios
              bgColor={currentColor}
            />
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ml-2 ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <BsCurrencyDollar />
            </button>
            <IngresosTotal
              bgColor={currentColor}
            />
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ml-2">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <ImExit />
            </button>
            <TotalSalidas
              bgColor={currentColor}
            />
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ml-2">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <MdOutlineCleaningServices />
            </button>
            <SumProductos
              bgColor={currentColor}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <PiBeerBottleBold />
            </button>
            <TotalProductos
              bgColor={currentColor}
            />
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ml-2">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <IoExitOutline />
            </button>
            <SumSalidas
              bgColor={currentColor}
            />
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ml-2 ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <BsCashCoin />
            </button>
            <SumIngresos
              bgColor={currentColor}
            />
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ml-2">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
            >
              <HiMiniUserGroup />
            </button>
            <TotalUsuarios
              bgColor={currentColor}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
          </div>
          <div className="md:w-full overflow-auto">
            <TotalUsuarios />
            Ademas de otrxs
          </div>
        </div>
      </div>

    </div>
  );
};

export default Ecommerce;
