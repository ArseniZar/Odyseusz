import imgTrip from "../../../assets/icons8-evacuation-96.png";
import { Header }from "@/components/Header";

import img2 from "../../../assets/icons8-cross-30.png";
import iconOpen from "../../../assets/icons8-arrow-64.png";
import iconClose from "../../../assets/icons8-down-64.png";

const canDelete = true;
const showModal = false;

export default function EvacuationAllPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-(--main-text-color)">
        <section className="h-full flex flex-col">
          <h1 className="px-10 text-5xl"> Wszystkie ewakuacje </h1>
          <div className="mt-5 flex-1 flex flex-col gap-1 overflow-hidden">
            <section className="px-10 w-full font-light flex flex-row   text-lg justify-between rounded-2xl">
              <div className="flex flex-row">
                <button className="border bg-black/90 text-white  mb-2 border-black/10 rounded-2xl shadow-xl h-auto self-end px-3">
                  Dodaj ewakuację
                </button>
              </div>
              <div className="flex flex-row gap-10">
                <button className="border bg-black/90 text-white  mb-2 border-black/10 rounded-2xl shadow-xl h-auto self-end px-3">
                  {" "}
                  Usuń filtry{" "}
                </button>
                <Input label="Szukaj" placeholder="search"></Input>
                <div className="flex flex-col gap-2">
                  <label className="ml-2 text-lg tracking-wide">Status</label>
                  <select
                    className="py-2 px-3  border border-black/10 shadow-xl rounded-2xl"
                    id="status"
                    name="podroz"
                  >
                    <option value="wdsw">Wszystkie</option>
                    <option value="wdsw">Nie aktywna</option>
                    <option value="activ">Aktywna</option>
                  </select>
                </div>
              </div>
            </section>
            <section className="w-full p-10 pt-5 flex flex-col gap-5 text-lg rounded-2xl overflow-y-auto">
              <div className="p-5 flex flex-col gap-5 border border-black/10 shadow-xl rounded-2xl">
                <div className="flex flex-row gap-5 justify-between  ">
                  <img
                    className="w-20 h-20 self-center"
                    src={imgTrip}
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      Status:{" "}
                      <span className="text-blue-600"> Nie aktywna </span>
                    </h1>
                    <h1 className="font-light">Nazwa: Alfa2</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-01-01
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600">Edytuj</h1>
                        <h1 className="font-light text-red-600">Aktywuj</h1>
                        <h1 className="font-light text-red-600">Usuń</h1>
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
                        <h1 className="font-normal text-xl "> Powód: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1> powodzi</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Wszyscy mieszkańcy zagrożonych regionów powinni
                            natychmiast opuścić swoje domy i kierować się do
                            wyznaczonych punktów ewakuacyjnych. Należy zabrać
                            dokumenty, leki i podstawowe potrzeby.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-row gap-5 ">
                      <h1 className="font-normal text-xl ">
                        {" "}
                        Powierzchnia terenu:{" "}
                      </h1>
                      <div className="flex flex-col font-light text-lg">
                        <h1> 2000 km^2</h1>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 1{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Pola</h1>
                          <h1>
                            Opis: Duży teren zielony, łatwo dostępny z głównych
                            ulic. Może pomieścić do 200 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 2{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Plac Centralny</h1>
                          <h1>
                            Opis: Duży plac w centrum miasta, z łatwym dojazdem
                            komunikacją miejską. Może pomieścić do 300 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Pomocnik 1: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">Imię: Anna Nowak</h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 08:00 - 16:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Mail: anna.nowak@example.com
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-lig text-xl "> Pomocnik 2: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Imię: Katarzyna Lewandowska
                          </h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 10:00 - 18:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 777 888 999
                          </h1>
                          <h1 className="font text-lg">
                            Mail: katarzyna.lewandowska@example.com
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
                    src={imgTrip}
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      Status: <span className="text-green-600"> Aktywna </span>
                    </h1>
                    <h1 className="font-light">Nazwa: Alfa1</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-04-30
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600 opacity-15">
                          Edytuj
                        </h1>
                        <h1 className="font-light text-red-600 ">Dezaktywuj</h1>
                        <h1 className="font-light text-red-600 opacity-15">
                          Usuń
                        </h1>
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
                        <h1 className="font-normal text-xl "> Powód: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1> powodzi</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Wszyscy mieszkańcy zagrożonych regionów powinni
                            natychmiast opuścić swoje domy i kierować się do
                            wyznaczonych punktów ewakuacyjnych. Należy zabrać
                            dokumenty, leki i podstawowe potrzeby.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-row gap-5 ">
                      <h1 className="font-normal text-xl ">
                        {" "}
                        Powierzchnia terenu:{" "}
                      </h1>
                      <div className="flex flex-col font-light text-lg">
                        <h1> 2000 km^2</h1>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 1{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Pola</h1>
                          <h1>
                            Opis: Duży teren zielony, łatwo dostępny z głównych
                            ulic. Może pomieścić do 200 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 2{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Plac Centralny</h1>
                          <h1>
                            Opis: Duży plac w centrum miasta, z łatwym dojazdem
                            komunikacją miejską. Może pomieścić do 300 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Pomocnik 1: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">Imię: Anna Nowak</h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 08:00 - 16:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Mail: anna.nowak@example.com
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-lig text-xl "> Pomocnik 2: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Imię: Katarzyna Lewandowska
                          </h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 10:00 - 18:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 777 888 999
                          </h1>
                          <h1 className="font text-lg">
                            Mail: katarzyna.lewandowska@example.com
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
                    src={imgTrip}
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      Status: <span className="text-green-600"> Aktywna </span>
                    </h1>
                    <h1 className="font-light">Nazwa: Alfa3</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-08-20
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600 opacity-15">
                          Edytuj
                        </h1>
                        <h1 className="font-light text-red-600 ">Dezaktywuj</h1>
                        <h1 className="font-light text-red-600 opacity-15">
                          Usuń
                        </h1>
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
                        <h1 className="font-normal text-xl "> Powód: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1> powodzi</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Wszyscy mieszkańcy zagrożonych regionów powinni
                            natychmiast opuścić swoje domy i kierować się do
                            wyznaczonych punktów ewakuacyjnych. Należy zabrać
                            dokumenty, leki i podstawowe potrzeby.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-row gap-5 ">
                      <h1 className="font-normal text-xl ">
                        {" "}
                        Powierzchnia terenu:{" "}
                      </h1>
                      <div className="flex flex-col font-light text-lg">
                        <h1> 2000 km^2</h1>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 1{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Pola</h1>
                          <h1>
                            Opis: Duży teren zielony, łatwo dostępny z głównych
                            ulic. Może pomieścić do 200 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 2{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Plac Centralny</h1>
                          <h1>
                            Opis: Duży plac w centrum miasta, z łatwym dojazdem
                            komunikacją miejską. Może pomieścić do 300 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Pomocnik 1: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">Imię: Anna Nowak</h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 08:00 - 16:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Mail: anna.nowak@example.com
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-lig text-xl "> Pomocnik 2: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Imię: Katarzyna Lewandowska
                          </h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 10:00 - 18:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 777 888 999
                          </h1>
                          <h1 className="font text-lg">
                            Mail: katarzyna.lewandowska@example.com
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
                    src={imgTrip}
                    alt="trip"
                  />
                  <div className="flex-1 flex flex-col text-lg">
                    <h1 className="font-bolt">
                      Status:{" "}
                      <span className="text-blue-600"> Nie aktywna </span>
                    </h1>
                    <h1 className="font-light">Nazwa: Alfa4</h1>
                    <h1 className="font-light">
                      Data ostatniej modyfikacji: 2025-10-31
                    </h1>
                  </div>
                  <div className="flex flex-row  items-center justify-between">
                    <div className="px-6 py-4 flex flex-row gap-5 items-center">
                      <div className="flex flex-row gap-2 ">
                        <h1 className="font-light text-blue-600">Edytuj</h1>
                        <h1 className="font-light text-red-600">Aktywuj</h1>
                        <h1 className="font-light text-red-600">Usuń</h1>
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
                        <h1 className="font-normal text-xl "> Powód: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1> powodzi</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Opis: </h1>
                        <div className="flex flex-col font-light text-lg text-justify ">
                          <h1>
                            {" "}
                            Wszyscy mieszkańcy zagrożonych regionów powinni
                            natychmiast opuścić swoje domy i kierować się do
                            wyznaczonych punktów ewakuacyjnych. Należy zabrać
                            dokumenty, leki i podstawowe potrzeby.
                          </h1>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-row gap-5 ">
                      <h1 className="font-normal text-xl ">
                        {" "}
                        Powierzchnia terenu:{" "}
                      </h1>
                      <div className="flex flex-col font-light text-lg">
                        <h1> 2000 km^2</h1>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 1{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Pola</h1>
                          <h1>
                            Opis: Duży teren zielony, łatwo dostępny z głównych
                            ulic. Może pomieścić do 200 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl ">
                          {" "}
                          Miejsca zbiórki 2{" "}
                        </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1>Nazwa: Plac Centralny</h1>
                          <h1>
                            Opis: Duży plac w centrum miasta, z łatwym dojazdem
                            komunikacją miejską. Może pomieścić do 300 osób.
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-normal text-xl "> Pomocnik 1: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">Imię: Anna Nowak</h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 08:00 - 16:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 111 222 333
                          </h1>
                          <h1 className="font text-lg">
                            Mail: anna.nowak@example.com
                          </h1>
                        </div>
                      </div>

                      <hr />

                      <div className="flex flex-row gap-5 ">
                        <h1 className="font-lig text-xl "> Pomocnik 2: </h1>
                        <div className="flex flex-col font-light text-lg">
                          <h1 className="font text-lg">
                            Imię: Katarzyna Lewandowska
                          </h1>
                          <h1 className="font text-lg">
                            Godziny pracy: 10:00 - 18:00
                          </h1>
                          <h1 className="font text-lg">
                            Telefon: +48 777 888 999
                          </h1>
                          <h1 className="font text-lg">
                            Mail: katarzyna.lewandowska@example.com
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
