import img from "../assets/react.svg";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="py-5 px-10 bg-(--header-bg-color)">
        <nav className="flex flex-row sm:gap-2 lg:gap-5 justify-between items-center  text-lg font-geologica font-medium text-(--header-text-color)">
          <div className="">
            <img src={img} alt="logo" />
          </div>
          <ul className="flex-1 flex flex-row sm:gap-4 lg:gap-8">
            <li>
              <label>
                <input type="radio" name="tab" className="hidden peer" />
                <p className="peer-checked:scale-115  transition-all duration-300 ">
                  Hello
                </p>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="tab" className="hidden peer" />
                <p className="peer-checked:scale-115 transition-all duration-300 ">
                  Hello
                </p>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="tab" className="hidden peer" />
                <p className="peer-checked:scale-115 transition-all duration-300 ">
                  Hello
                </p>
              </label>
            </li>
          </ul>
          <ul className="flex felx-row sm:gap-4 lg:gap-8">
            <li>
              <label>
                <input type="radio" name="tab" className="hidden peer" />
                <p className="peer-checked:scale-115  transition-all duration-300 ">
                  Polski
                </p>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="tab" className="hidden peer" />
                <p className="peer-checked:scale-115  transition-all duration-300 ">
                  Profile
                </p>
              </label>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 pt-15 px-30 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-(--main-text-color)">
        <section className="h-full flex flex-col">
          <h1 className="text-5xl"> Moje podróże </h1>
          <div className="mt-5 flex-1 flex flex-row gap-10 justify-between overflow-hidden">
            <ul className="pt-10 flex flex-col gap-10 text-xl">
              <li>
                Filtry
                <ul className="flex flex-col gap-5">
                  <li className=""> filtr-1 </li>
                  <li> filtr-2</li>
                </ul>
              </li>

              <li>Archiwum podrózy</li>
              <li>Statystyki moich podróży</li>
            </ul>
            <ul className="flex-1 p-10 md:max-w-170 3xl:max-w-220 4xl:max-w-300  flex flex-col gap-10 text-lg rounded-2xl overflow-y-auto scrollbar-none ">
              <li className="p-5 flex flex-row  gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img className="rounded-2xl" src={img} alt="logo" />
                <ul className="flex-1 flex flex-col text-lg">
                  <li className="text-2xl">Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
              <li className="p-5 flex flex-row gap-5 justify-between  border-(--main-text-color) shadow-2xl rounded-2xl">
                <img src={img} alt="logo" />
                <ul className="flex-1 flex flex-col">
                  <li>Paryz</li>
                  <li>18-25 Lis 2025r</li>
                  <li>2 osoby</li>
                </ul>
                <ul className="flex flex-col justify-between items-end">
                  <li>Edytuj</li>
                  <li>Sprawdź zagrożenie</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
