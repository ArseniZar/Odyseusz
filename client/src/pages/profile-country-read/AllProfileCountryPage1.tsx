import  { Header } from "@/components/Header";

import img2 from "../../assets/icons8-cross-30.png";
import { Input } from "../../components/Input/Input";

import { iconClose,iconOpen } from "@/assets"
const canDelete = true;
const showModal = false;

export const AllProfileCountryPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-(--main-text-color)">
        <section className="h-full flex flex-col">
          <h1 className="px-10 text-5xl"> Wszystkie profile kraju </h1>
          <div className="mt-5 flex-1 flex flex-col gap-1 overflow-hidden">
            <section className="px-10 w-full font-light flex flex-row self-start gap-10 text-lg justify-end rounded-2xl">
              <button className="border bg-black/90 text-white  mb-2 border-black/10 rounded-2xl shadow-xl h-auto self-end px-3">
                {" "}
                Usuń filtry{" "}
              </button>
              <Input label="Szukaj" placeholder="search"></Input>
              <div className="flex flex-col gap-2">
                <label className="ml-2 text-lg tracking-wide">Stopień zagrożenia</label>
                <select
                  className="py-2 px-3  border border-black/10 shadow-xl rounded-2xl"
                  id="status"
                  name="podroz"
                >
                  <option value="wdsw">Wszystkie</option>
                  <option value="wdsw">Niski</option>
                  <option value="activ">Umiarkowany</option>
                  <option value="wdsw">Wysoki</option>
                  <option value="activ">Poważny</option>
                </select>
              </div>
              <Input label="Pokaż tylko edytowalne" classInput="h-5" type="checkbox">
              </Input>
            </section>
            <section className="w-full p-10 pt-5 flex flex-col gap-5 text-lg rounded-2xl overflow-y-auto">
              <div className="p-5 flex flex-col gap-5 border border-black/10 shadow-xl rounded-2xl">
                <div className="flex flex-row gap-5 justify-between  ">
                  <img
                    className="w-20 h-20 self-center"
                    src="https://flagsapi.com/BE/shiny/64.png"
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      <span className=""> Niemcy </span>
                    </h1>
                    <h1 className="font-light">Stopień zagrożenia: Nizka</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-01-01
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600">Edytuj</h1>
                      </div>
                      <img
                        className="w-5 h-5 opacity-60"
                        src={true ? iconOpen : iconClose}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {true && (
                  <>
                    <div className="flex flex-col font-light text-lg">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Germany is a country located in Central Europe. Its
                            capital city is Berlin, and it has a population of
                            approximately 83 million people. Germany is known
                            for its rich history, diverse culture, and strong
                            economy, which is one of the largest in the world.
                            The official language is German, and the currency is
                            the Euro (EUR). The country has a federal
                            parliamentary republic government and is part of the
                            European Union. Germany shares borders with nine
                            countries, including France, Poland, and Austria,
                            and is famous for landmarks such as the Brandenburg
                            Gate, Neuschwanstein Castle, and the Black Forest.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5">
                        <h1 className="font-normal text-xl">Konsulat:</h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Adres: ul. Przykładowa 12, 00-001 Warszawa
                          </h1>
                          <h1 className="font text-lg">
                            Email: kontakt@konsulat.pl
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Strona Internetowa: www.konsulat.pl
                          </h1>
                          <h1 className="font text-lg">
                            Data aktualizacji: 23.12.2025
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5">
                        <h1 className="font-normal text-xl">Konsulat:</h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Adres: ul. Marszałkowska 45, 00-001 Warszawa
                          </h1>
                          <h1 className="font text-lg">
                            Email: info@konsulatexample.com
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 222 333 444
                          </h1>
                          <h1 className="font text-lg">
                            Strona Internetowa: www.konsulatexample.com
                          </h1>
                          <h1 className="font text-lg">
                            Data aktualizacji: 01.01.2025
                          </h1>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>





              <div className="p-5 flex flex-col gap-5 border border-black/10 shadow-xl rounded-2xl">
                <div className="flex flex-row gap-5 justify-between  ">
                  <img
                    className="w-20 h-20 self-center"
                    src="https://flagsapi.com/PL/shiny/64.png"
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      <span className=""> Poland </span>
                    </h1>
                    <h1 className="font-light">Stopień zagrożenia: Nizka</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-01-01
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600">Edytuj</h1>
                      </div>
                      <img
                        className="w-5 h-5 opacity-60"
                        src={false ? iconOpen : iconClose}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {false && (
                  <>
                    <div className="flex flex-col font-light text-lg">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Germany is a country located in Central Europe. Its
                            capital city is Berlin, and it has a population of
                            approximately 83 million people. Germany is known
                            for its rich history, diverse culture, and strong
                            economy, which is one of the largest in the world.
                            The official language is German, and the currency is
                            the Euro (EUR). The country has a federal
                            parliamentary republic government and is part of the
                            European Union. Germany shares borders with nine
                            countries, including France, Poland, and Austria,
                            and is famous for landmarks such as the Brandenburg
                            Gate, Neuschwanstein Castle, and the Black Forest.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5">
                        <h1 className="font-normal text-xl">Konsulat:</h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Adres: ul. Przykładowa 12, 00-001 Warszawa
                          </h1>
                          <h1 className="font text-lg">
                            Email: kontakt@konsulat.pl
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Strona Internetowa: www.konsulat.pl
                          </h1>
                          <h1 className="font text-lg">
                            Data aktualizacji: 23.12.2025
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5">
                        <h1 className="font-normal text-xl">Konsulat:</h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Adres: ul. Marszałkowska 45, 00-001 Warszawa
                          </h1>
                          <h1 className="font text-lg">
                            Email: info@konsulatexample.com
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 222 333 444
                          </h1>
                          <h1 className="font text-lg">
                            Strona Internetowa: www.konsulatexample.com
                          </h1>
                          <h1 className="font text-lg">
                            Data aktualizacji: 01.01.2025
                          </h1>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>




                <div className="p-5 flex flex-col gap-5 border border-black/10 shadow-xl rounded-2xl">
                <div className="flex flex-row gap-5 justify-between  ">
                  <img
                    className="w-20 h-20 self-center"
                    src="https://flagsapi.com/FR/shiny/64.png"
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      <span className=""> Francja </span>
                    </h1>
                    <h1 className="font-light">Stopień zagrożenia: Nizka</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-01-01
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600 opacity-15">Edytuj</h1>
                      </div>
                      <img
                        className="w-5 h-5 opacity-60"
                        src={false ? iconOpen : iconClose}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {false && (
                  <>
                    <div className="flex flex-col font-light text-lg">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Germany is a country located in Central Europe. Its
                            capital city is Berlin, and it has a population of
                            approximately 83 million people. Germany is known
                            for its rich history, diverse culture, and strong
                            economy, which is one of the largest in the world.
                            The official language is German, and the currency is
                            the Euro (EUR). The country has a federal
                            parliamentary republic government and is part of the
                            European Union. Germany shares borders with nine
                            countries, including France, Poland, and Austria,
                            and is famous for landmarks such as the Brandenburg
                            Gate, Neuschwanstein Castle, and the Black Forest.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5">
                        <h1 className="font-normal text-xl">Konsulat:</h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Adres: ul. Przykładowa 12, 00-001 Warszawa
                          </h1>
                          <h1 className="font text-lg">
                            Email: kontakt@konsulat.pl
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Strona Internetowa: www.konsulat.pl
                          </h1>
                          <h1 className="font text-lg">
                            Data aktualizacji: 23.12.2025
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5">
                        <h1 className="font-normal text-xl">Konsulat:</h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Adres: ul. Marszałkowska 45, 00-001 Warszawa
                          </h1>
                          <h1 className="font text-lg">
                            Email: info@konsulatexample.com
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 222 333 444
                          </h1>
                          <h1 className="font text-lg">
                            Strona Internetowa: www.konsulatexample.com
                          </h1>
                          <h1 className="font text-lg">
                            Data aktualizacji: 01.01.2025
                          </h1>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>


            </section>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed w-full h-full backdrop-blur-md flex items-center justify-center">
          {canDelete ? (
            <div className="w-1/4 py-4 px-4 rounded-2xl border border-black/10 shadow-xl flex flex-col gap-5">
              <div className="px-2 flex flex-row items-center relative">
                <h3 className="text-xl font-light flex-1 text-center">
                  Czy na pewno chcesz anulować podróż?
                </h3>
                <img
                  className="w-5 h-5 opacity-60 absolute right-2"
                  src={img2}
                  alt=""
                />
              </div>
              <div className="flex flex-row gap-5">
                <button className="flex-1 py-2 px-3 rounded-2xl border border-black/10 shadow-xl hover:bg-red-600">
                  Tak
                </button>
                <button className="flex-1 py-2 px-3 rounded-2xl border border-black/10 shadow-xl hover:bg-white">
                  Nie
                </button>
              </div>
            </div>
          ) : (
            <div className="w-1/4 py-4 px-4 rounded-2xl border border-black/10 shadow-xl flex flex-col gap-5">
              <div className="px-2 flex flex-row items-center relative">
                <h3 className="text-xl font-light flex-1 text-center">
                  Nie możesz usunąć tej podróży, ponieważ już się rozpoczęła
                </h3>
                <img
                  className="w-5 h-5 opacity-60 absolute right-2"
                  src={img2}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
