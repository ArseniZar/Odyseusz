import { MapPicker } from "../../components/MapPicker/MapPicker";
import { Input } from "../../components/Input/Input";
import {  Title } from "../../components/Title/Title";
import  { Header } from "../../components/Header/Header";
import img from "../../../assets/icons8-evacuation-96.png";
import iconTrash from "../../../assets/icons8-trash-64.png";
import iconOpen from "../../../assets/icons8-arrow-64.png";
import iconClose from "../../../assets/icons8-down-64.png";
import { useState } from "react";

export default function EvacuationCreatePage() {
    const [is, set] = useState(4);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden  bg-(--main-bg-color) font-geologica font-medium text-(--main-text-color)">
        <div className="h-full flex flex-col">
          <h1 className="text-5xl"> Nowa ewakuacja </h1>
          <div className="mt-7 flex-1 flex flex-row gap-5 justify-between overflow-hidden">
            <section className="h-full w-1/3 flex flex-col">
              <div className="h-full flex flex-col gap-6 ">
                <Title title={"Informacje o nowej ewakuacji"} />
                <div className="flex-1 flex flex-col p-5 border border-black/10 gap-4 rounded-xl shadow-2xl overflow-y-auto">
                  <div className="flex flex-row gap-3 items-center">
                    <img className="w-20 h-20" src={img} alt="" />
                    <div className="flex flex-col gap-1 text-xl font-light">
                      <h1>
                        {" "}
                        <span className="font-normal">Nazwa:</span> Alfa{" "}
                      </h1>
                    </div>
                  </div>
                  <hr />
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
                      <h1 className="font-normal text-xl w-20">
                        {" "}
                        Miejsca zbiórki 2{" "}
                      </h1>
                      <div className="flex flex-col font-light text-lg">
                        <h1>Nazwa:</h1>
                        <h1>
                          Opis: 
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

                    <hr />
                  </div>
                </div>
                <div className="flex flex-col gap-3 mb-5">
                  <button className="border border-black/10 bg-black/90 text-white shadow-2xl rounded-2xl p-3 text-lg">
                    Anulować
                  </button>
                  <button className="border border-black/10 shadow-2xl rounded-2xl p-3 text-lg bg-white">
                    Zarejestruj ewakuację
                  </button>
                </div>
              </div>
            </section>

            {is === 1 && (
              <section className="w-1/2 flex flex-col ">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row  gap-2 ">
                    <button className="flex flex-col gap-1" onClick={()=> {set(1)}}>
                      <h1 className="opacity-100">
                        <Title title={"Dane ewakuacji"} />
                      </h1>
                      <hr className=""></hr>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(2)}}>
                      <h1 className="opacity-15">
                        <Title title={"Obszar ewakuacji"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(3)}}>
                      <h1 className="opacity-15">
                        <Title title={"Miejsca zbiórki"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(4)}}>
                      <h1 className="opacity-15">
                        <Title title={"Pomocnicy ewakuacji"} />
                      </h1>
                    </button>
                  </div>
                  <div className="flex flex-col p-5 border border-black/10 gap-4 rounded-xl shadow-2xl ">
                    <Input
                      className="font-light text-xl"
                      value="Alfa"
                      classInput="text-md"
                      label={"Nazwa"}
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="font-light text-xl"> Powód </h1>
                      <textarea className="p-3 h-20 border font-light border-black/10 gap-4 text-sm rounded-xl shadow-2xl">
                        powodzi
                      </textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-light text-xl"> Opis </h1>
                      <textarea className="p-3 h-20 border font-light border-black/10 gap-4  text-sm rounded-xl shadow-2xl">
                        Wszyscy mieszkańcy zagrożonych regionów powinni
                        natychmiast opuścić swoje domy i kierować się do
                        wyznaczonych punktów ewakuacyjnych. Należy zabrać
                        dokumenty, leki i podstawowe potrzeby.
                      </textarea>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                      <h1 className="font-light text-xl">
                        {" "}
                        Aktywuj od razu po utworzeniu?{" "}
                      </h1>
                      <Input classInput="w-6 h-6" label={""} type="checkbox" />
                    </div>
                  </div>
                </div>
              </section>
            )}
            {is === 4 && (
              <section className="h-full w-1/2 flex flex-col">
                <div className="h-full flex flex-col gap-6">
                  <div className="flex flex-row  gap-2 ">
                    <button className="flex flex-col gap-1" onClick={()=> {set(1)}}>
                      <h1 className="opacity-15">
                        <Title title={"Dane ewakuacji"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(2)}}>
                      <h1 className="opacity-15">
                        <Title title={"Obszar ewakuacji"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(3)}}>
                      <h1 className="opacity-15">
                        <Title title={"Miejsca zbiórki"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(4)}}>
                      <h1 className="opacity-100">
                        <Title title={"Pomocnicy ewakuacji"} />
                      </h1>
                      <hr className=""></hr>

                    </button>
                  </div>
                  <div className="flex-1 font-light flex mb-5 flex-col p-5 border border-black/10 gap-4 rounded-xl shadow-2xl overflow-y-auto">
                    <div className="flex flex-row p-5 border border-black/10 gap-1 rounded-xl shadow-2xl">
                      <div className="flex flex-col">
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
                      <div className="flex-1 flex flex-col justify-center items-end">
                        <Input
                          classInput="h-6"
                          label={"Dodaj"}
                          type="checkbox"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row p-5 border border-black/10 gap-1 rounded-xl shadow-xl">
                      <div className="flex flex-col">
                        <h1 className="font text-lg">Imię: Piotr Wiśniewski</h1>
                        <h1 className="font text-lg">
                          Godziny pracy: 09:00 - 17:00
                        </h1>
                        <h1 className="font text-lg">
                          Telefon: +48 444 555 666
                        </h1>
                        <h1 className="font text-lg">
                          Mail: piotr.wisniewski@example.com
                        </h1>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-end">
                        <Input
                          classInput="h-6 "
                          label={"Dodaj"}
                          type="checkbox"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row p-5 border border-black/10 gap-1 rounded-xl shadow-xl">
                      <div className="flex flex-col">
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
                      <div className="flex-1 flex flex-col justify-center items-end">
                        <Input
                          classInput="h-6 "
                          label={"Dodaj"}
                          type="checkbox"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row p-5 border border-black/10 gap-1 rounded-xl shadow-xl">
                      <div className="flex flex-col">
                        <h1 className="font text-lg">Imię: Tomasz Zieliński</h1>
                        <h1 className="font text-lg">
                          Godziny pracy: 07:30 - 15:30
                        </h1>
                        <h1 className="font text-lg">
                          Telefon: +48 222 333 444
                        </h1>
                        <h1 className="font text-lg">
                          Mail: tomasz.zielinski@example.com
                        </h1>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-end">
                        <Input
                          classInput="h-6 "
                          label={"Dodaj"}
                          type="checkbox"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row p-5 border border-black/10 gap-1 rounded-xl shadow-xl">
                      <div className="flex flex-col">
                        <h1 className="font text-lg">Imię: Monika Kaczmarek</h1>
                        <h1 className="font text-lg">
                          Godziny pracy: 11:00 - 19:00
                        </h1>
                        <h1 className="font text-lg">
                          Telefon: +48 555 666 777
                        </h1>
                        <h1 className="font text-lg">
                          Mail: monika.kaczmarek@example.com
                        </h1>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-end">
                        <Input
                          classInput="h-6 "
                          label={"Dodaj"}
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {is === 2 && (
              <section className="w-1/2 flex flex-col">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row  gap-2 ">
                    <button className="flex flex-col gap-1" onClick={()=> {set(1)}}>
                      <h1 className="opacity-15">
                        <Title title={"Dane ewakuacji"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(2)}}>
                      <h1 className="opacity-100">
                        <Title title={"Obszar ewakuacji"} />
                      </h1>
                      <hr className=""></hr>

                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(3)}}>
                      <h1 className="opacity-15">
                        <Title title={"Miejsca zbiórki"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(4)}}>
                      <h1 className="opacity-15">
                        <Title title={"Pomocnicy ewakuacji"} />
                      </h1>
                    </button>
                  </div>
                  
                  <div className="flex flex-col p-5 border border-black/10 gap-4 rounded-xl shadow-2xl ">
                    <div className="flex flex-row gap-5">
                      <Input
                        className="flex-1"
                        type="text"
                        label="Szerokość geograficzna"
                        placeholder="Wpisz szerokość geograficzną"
                      />
                      <Input
                        className="flex-1"
                        type="text"
                        label="Długość geograficzna"
                        placeholder="Wpisz długość geograficzną"
                      />
                    </div>

                    <div className="z-1">
                      <MapPicker value={{
                                              latitude: null,
                                              longitude: null
                                          }} onChange={function (val: { latitude: number | null; longitude: number | null; }): void {
                                              throw new Error("Function not implemented.");
                                          } } label={""} />
                    </div>
                    <Input
                      classInput="w-1/9"
                      label="Promień (km)"
                      type="number"
                    />
                  </div>
                </div>
              </section>
            )}
            {is === 3 && (
              <section className="h-full w-1/2 flex flex-col">
                <div className="h-full flex flex-col gap-6">
                  <div className="flex flex-row  gap-2 ">
                    <button className="flex flex-col gap-1" onClick={()=> {set(1)}}>
                      <h1 className="opacity-15">
                        <Title title={"Dane ewakuacji"} />
                      </h1>
                      
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(2)}}>
                      <h1 className="opacity-15">
                        <Title title={"Obszar ewakuacji"} />
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(3)}}>
                      <h1 className="opacity-100">
                        <Title title={"Miejsca zbiórki"} />
                        <hr className=""></hr>
                      </h1>
                    </button>
                    <button className="flex flex-col gap-1" onClick={()=> {set(4)}}>
                      <h1 className="opacity-15">
                        <Title title={"Pomocnicy ewakuacji"} />
                      </h1>
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col mb-5 p-5 border border-black/10 gap-4 rounded-2xl shadow-2xl overflow-y-auto">
                    <div className="flex flex-col  p-5 border border-black/10 gap-4 rounded-2xl shadow-xl ">
                      <div className="flex flex-row  items-center justify-between">
                        <button className="flex-1  px-6 py-4 flex flex-row">
                          <h3 className="text-xl font-light">
                            {" "}
                            Miejsca zbiórki 1{" "}
                          </h3>
                        </button>
                        <div className="px-6 py-4 flex flex-row gap-5">
                          <img
                            className="w-5 h-5 opacity-90"
                            src={iconTrash}
                            alt="del"
                          />
                          <img
                            className="w-5 h-5 opacity-60"
                            src={false ? iconOpen : iconClose}
                            alt=""
                          />
                        </div>
                      </div>

                      {/* <Input
                      className="font-light text-xl"
                      type="text"
                      label="Nazwa"
                      placeholder=""
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="pl-3 font-light text-xl"> Opis </h1>
                      <textarea className="p-3 h-20 border border-black/10 gap-4  text-sm rounded-xl shadow-2xl"></textarea>
                    </div>
                    <div className="flex flex-row gap-5">
                      <Input
                        className="flex-1"
                        type="text"
                        label="Szerokość geograficzna"
                        placeholder="Wpisz szerokość geograficzną"
                      />
                      <Input
                        className="flex-1"
                        type="text"
                        label="Długość geograficzna"
                        placeholder="Wpisz długość geograficzną"
                      />
                    </div>

                    <div className="z-1">
                      <MapBlock />
                    </div> */}
                    </div>

                    <div className="flex flex-col  p-5 border border-black/10 gap-4 rounded-2xl shadow-xl ">
                      <div className="flex flex-row  items-center justify-between">
                        <button className="flex-1  px-6 py-4 flex flex-row">
                          <h3 className="text-xl font-light">
                            {" "}
                            Miejsca zbiórki 2{" "}
                          </h3>
                        </button>
                        <div className="px-6 py-4 flex flex-row gap-5">
                          <img
                            className="w-5 h-5 opacity-90"
                            src={iconTrash}
                            alt="del"
                          />
                          <img
                            className="w-5 h-5 opacity-60"
                            src={true ? iconOpen : iconClose}
                            alt=""
                          />
                        </div>
                      </div>

                      <Input
                        className="font-light text-xl"
                        type="text"
                        label="Nazwa"
                        placeholder=""
                      />
                      <div className="flex flex-col gap-2">
                        <h1 className="pl-3 font-light text-xl"> Opis </h1>
                        <textarea className="p-3 h-20 border border-black/10 gap-4  text-sm rounded-xl shadow-2xl"></textarea>
                      </div>
                      <div className="flex flex-row gap-5">
                        <Input
                          className="flex-1"
                          type="text"
                          label="Szerokość geograficzna"
                          placeholder="Wpisz szerokość geograficzną"
                        />
                        <Input
                          className="flex-1"
                          type="text"
                          label="Długość geograficzna"
                          placeholder="Wpisz długość geograficzną"
                        />
                      </div>

                      <div className="z-1">
                        <MapPicker value={{
                                                  latitude: null,
                                                  longitude: null
                                              }} onChange={function (val: { latitude: number | null; longitude: number | null; }): void {
                                                  throw new Error("Function not implemented.");
                                              } } label={""} />
                      </div>
                    </div>
                    <button className="border border-black/10 shadow-xl rounded-2xl p-3 text-lg bg-white">
                      Dodaj miejsce zbiórki
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
