// import imgTrip from "../../../assets/icons8-trip-94.png";
// import  { Header } from "../../../components/Header/";
// import NavItem from '../../../components/Header/components/NavItem/NavItem';

// import img2 from "../../../assets/icons8-cross-30.png";
// import { Title } from "../../../components/Title/Title";
// import { Link } from "react-router-dom";

// const canDelete = true;
// const showModal = false;

// export default function TripsPage() {
//   return (
//     <div className="h-screen flex flex-col">
//       <Header />
//       <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-(--main-text-color)">
//         <section className="h-full flex flex-col">
//           <h1 className="px-10 text-5xl"> Moje podróże </h1>
//           <div className="mt-5 flex-1 flex flex-row gap-10 justify-between overflow-hidden">
//             <section className="p-10 flex flex-col gap-10 text-xl">
//               <Title title="Zarządzanie podróżami" />
//               <li>
//                 <NavItem title={"Dodaj podróż"} href={"/traveler/add_trip"} />
//               </li>
//               <li>
//                 <NavItem title={"Wszystkie podróże"} href={"/traveler/read_all_trip"} />
//               </li>
//               {/* <li>Filtry</li> */}
//               {/* <li>Archiwum podrózy</li> */}
//               {/* <li>Statystyki moich podróży</li> */}
//             </section>
//             <section className="w-1/2 p-10 flex flex-col gap-10 text-lg rounded-2xl overflow-y-auto scrollbar-none ">
//               <Title title="Ostatnie podróże" />
//               <div className="p-5 flex flex-row gap-5 justify-between   shadow-2xl rounded-2xl">
//                 <img className="w-20 h-20 self-center" src={imgTrip} alt="trip" />
//                 <div className="flex-1 flex flex-col text-lg self-center">
//                   <h1 className="font-bolt">Status: <span className="text-green-600"> Aktywna </span></h1>
//                   <h1 className="font-light">Okres: 14.04.2026 – 20.04.2026</h1>
//                   <h1 className="font-light">Liczba etapów: 2</h1>
//                 </div>
//                 <div className="flex flex-col justify-between">
//                   <h1 className="font-light opacity-25">Edytuj</h1>
//                   <h1 className="font-light">Anuluj</h1>
//                 </div>
//               </div>
              
//               <div className="p-5 flex flex-row gap-5 justify-between   shadow-2xl rounded-2xl">
//                 <img className="w-20 h-20 self-center" src={imgTrip} alt="trip" />
//                 <div className="flex-1 flex flex-col text-lg self-center">
//                   <h1 className="font-bolt">Status: <span className="text-red-600"> Nie Aktywna </span></h1>
//                   <h1 className="font-light">Okres: 24.04.2026 – 25.04.2026</h1>
//                   <h1 className="font-light">Liczba etapów: 1</h1>
//                 </div>
//                 <div className="flex flex-col justify-between">
//                   <Link to={"/traveler/edit_trip/2"} className="font-light">Edytuj</Link>
//                   <h1 className="font-light ">Anuluj</h1>
//                 </div>
//               </div>

//               <div className="p-5 flex flex-row gap-5 justify-between   shadow-2xl rounded-2xl">
//                 <img className="w-20 h-20 self-center" src={imgTrip} alt="trip" />
//                 <div className="flex-1 flex flex-col text-lg self-center">
//                   <h1 className="font-bolt">Status: <span className="text-red-600"> Nie Aktywna </span></h1>
//                   <h1 className="font-light">Okres: 10.06.2026 – 11.06.2026</h1>
//                   <h1 className="font-light">Liczba etapów: 2</h1>
//                 </div>
//                  <div className="flex flex-col justify-between">
//                   <h1 className="font-light ">Edytuj</h1>
//                   <h1 className="font-light ">Anuluj</h1>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </section>
//       </main>

//       {showModal && (
//         <div className="fixed w-full h-full backdrop-blur-md flex items-center justify-center">
//           {canDelete ? (
//             <div className="w-1/4 py-4 px-4 rounded-2xl border border-black/10 shadow-xl flex flex-col gap-5">
//               <div className="px-2 flex flex-row items-center relative">
//                 <h3 className="text-xl font-light flex-1 text-center">
//                   Czy na pewno chcesz anulować podróż?
//                 </h3>
//                 <img
//                   className="w-5 h-5 opacity-60 absolute right-2"
//                   src={img2}
//                   alt=""
//                 />
//               </div>
//               <div className="flex flex-row gap-5">
//                 <button className="flex-1 py-2 px-3 rounded-2xl border border-black/10 shadow-xl hover:bg-red-600">
//                   Tak
//                 </button>
//                 <button className="flex-1 py-2 px-3 rounded-2xl border border-black/10 shadow-xl hover:bg-white">
//                   Nie
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="w-1/4 py-4 px-4 rounded-2xl border border-black/10 shadow-xl flex flex-col gap-5">
//               <div className="px-2 flex flex-row items-center relative">
//                 <h3 className="text-xl font-light flex-1 text-center">
//                   Nie możesz usunąć tej podróży, ponieważ już się rozpoczęła
//                 </h3>
//                 <img
//                   className="w-5 h-5 opacity-60 absolute right-2"
//                   src={img2}
//                   alt=""
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
