"use client";
import { Button } from "@/components/ui/button";
import Category, { ICategory } from "@/lib/database/models/category.model";
import Image from "next/image";
import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  createCategory,
  getAllCategories,
} from "@/lib/database/actions/category.action";
import { createEvent } from "@/lib/database/actions/event.actions";
import { Cookies } from "react-cookie";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";

// type EventFormProps = {
//   userId: string
//   type: "Create" | "Update"
//   event?: IEvent,
//   eventId?: string
// }

const page = () => {
  const [categories, setCategories] = useState<ICategory[]>([
    // {_id: '01', name:'tech'},
    // {_id: '02', name:'foood'},
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [eventId, setEventId] = useState("");
  const [catId, setCatId] = useState("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState("");
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [hasCreated, setHasCreated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [files, setFiles] = useState<File[]>([]);

  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const [selectedValue, setSelectedValue] = useState("chose a category");
  const imageUrl = "/assets/images/event21.jpg";
  const event = {
    imageUrl: imageUrl,
    title: title,
    description: description,
    startDateTime: startDate,
    endDateTime: endDate,
    price: price,
    location: location,
  };

  const handleCreateEvent = async () => {
    setIsCreatingEvent(true);
    const newEvent = await createEvent({
      event: { ...event },
      userId: userId,
      catId: catId,
    });
    setEventId(newEvent._id);
    setHasCreated(true);
  };

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory,
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();

      categories && setCategories(categories as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <>
      {hasCreated ? (
        <section
          style={{
            backgroundImage: `url(https://media.istockphoto.com/id/1410053593/vector/abstract-black-with-wavy-line-dimension-overlap-background-eps10-vector.jpg?s=612x612&w=0&k=20&c=hIxfFVp9eRtxmEPNmij5f65CufUh6yRiIU0SfSS446A=)`,
          }}
          className="bg-cover bg-center w-full fixed flex justify-center h-screen bg-purple-200 blend-overlay flex-center"
        >
          <div className="lg:w-[50%] m-auto w-full h-[75vh] fixed flex justify-center blend-overlay flex-center">
            <div className="capitalize items-center flex flex-col w-full mx-5 bg-white shadow-xl p-5 rounded-2xl">
              <h1 className="h3-bold mt-5 mb-3 text-center">successful</h1>

              <p className="mb-5 text-purple-400 lowercase">
                you have created an event
              </p>

              <Button className="bg-purple-500 w-full">
                <Link href={`/events/${eventId}/`}>ok</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="capitalize  ">
          <div className="p-7 bg-slate-100 flex flex-center">
            <h1 className="h3-bold"> create events</h1>
          </div>

          {/* form */}
          <div className="lg:w-[95%] m-auto lg:py-10  p-5 lg:grid grid-cols-2 gap-3">
            {/* title */}
            <input
              name="title"
              // value="title"
              placeholder="Title "
              className="p-5 bg-slate-100  w-full h-[3rem] rounded-2xl mb-3 mt-5"
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* category */}
            <div
              className=" cursor-pointer"
              onClick={() => setOpenDropDown(!openDropDown)}
            >
              {/* top */}
              <div className=" flex justify-between p-5 bg-slate-100  w-full h-[3rem] rounded-2xl  mt-5 ">
                <h1 className="mb-3 text-gray-500">{selectedValue}</h1>
                <span onClick={() => setOpenDropDown(!openDropDown)}>
                  <RiArrowDropDownLine />
                </span>
              </div>

              {/* dropdown */}
              {openDropDown && (
                <div className="absolute top-32 lg:top-[9rem] w-[90%] shadow-md border-2 rounded-md lg:w-[45%]">
                  <div className="bg-white capitalize p-3 flex flex-col flex-center ">
                    <span onClick={() => setOpenDropDown(!openDropDown)}>
                      <Image
                        src="/assets/icons/cancel.png"
                        width={15}
                        height={15}
                        alt="image"
                        className=""
                      />
                    </span>
                    {categories.length > 0 &&
                      categories.map((category) => {
                        // () => setCatId(category._id);
                        return (
                          <div
                            className="w-full my-1 text-2xl "
                            key={category._id}
                            onClick={() => {
                              setSelectedValue(category.name);
                              setCatId(category._id);
                              setOpenDropDown(false);
                            }}
                          >
                            <span className="text-center">{category.name}</span>
                          </div>
                        );
                      })}

                    {/* alert dialog */}
                  </div>
                  {/* <AlertDialog>
                    <AlertDialogTrigger className=" w-full bg-white p-3 rounded-xl hover:bg-slate-200 text-center">
                      Add a category
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white absolute top-32 lg:top-[9rem] w-[90%] shadow-md border-2 rounded-md lg:w-[45%]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>New Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          <input
                            placeholder="Category name"
                            className="p-5 bg-slate-100 w-full h-[3rem] rounded-2xl mb-3 my-3"
                            onChange={(e) => setNewCategory(e.target.value)}
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-800 text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="border-2"
                          onClick={() => startTransition(handleAddCategory)}
                        >
                          Add
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                </div>
              )}
            </div>

            {/* description */}
            <Textarea
              placeholder="Description"
              // value="Description"
              className="p-5 bg-slate-100  w-full h-[13rem] rounded-2xl mb-3 mt-5"
              onChange={(e) => setDescription(e.target.value)}
            ></Textarea>

            {/* upload */}
            <div className="capitalize p-5 flex-col bg-slate-100 flex flex-center  w-full h-[13rem] rounded-2xl mb-3 mt-5">
              <Image
                src="/assets/icons/file-upload.svg"
                width={74}
                height={74}
                alt="image"
                className="rounded-full object-cover"
              />
              <p className="text-gray-400 mb-3 font-extralight">
                drop photo here
              </p>
              <small className="text-gray-400">svg, png, jpeg</small>
              <Button className="capitalize my-5 rounded-full bg-purple-700">
                select from device
              </Button>
            </div>

            {/* location */}
            <div className="flex p-3 bg-slate-100  w-full gap-3 rounded-2xl mb-3 my-3">
              <Image
                src="/assets/icons/location-grey.svg"
                width={30}
                height={30}
                alt="image"
                className=" rounded-full object-cover"
              />
              <input
                name="location"
                placeholder=" Event Location"
                className=" bg-slate-100   "
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* start date */}
            <div className="flex bg-slate-100 items-center gap-10 w-full  p-5 h-[3rem] rounded-2xl mb-3 my-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  width={30}
                  height={30}
                  alt="image"
                  className=" rounded-full object-cover"
                />
                <p className=" min-w-full text-gray-400">start date</p>
              </div>
              <DatePicker
                className="text-gray-500 p-5 w-[10rem]  text-center h-[3rem] rounded-md mb-3 my-3"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                timeInputLabel="Time:"
                wrapperClassName="datePicker"
              />
            </div>

            {/* end date */}
            <div className="flex bg-slate-100 items-center gap-10 w-full  p-5 h-[3rem] rounded-2xl mb-3 my-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  width={30}
                  height={30}
                  alt="image"
                  className=" rounded-full object-cover"
                />
                <p className=" min-w-full text-gray-400">end date</p>
              </div>
              <DatePicker
                className="p-5 w-[10rem]  text-center h-[3rem] rounded-md mb-3 my-3 text-gray-500"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                timeInputLabel="Time:"
                wrapperClassName="datePicker"
              />
            </div>

            {/* price */}
            <div className="flex p-3 bg-slate-100  w-full gap-3 rounded-2xl mb-3 my-3">
              <Image
                src="/assets/icons/dollar.svg"
                width={30}
                height={30}
                alt="image"
                className=" rounded-full object-cover"
              />
              <input
                name="price"
                placeholder="Price"
                className=" bg-slate-100   "
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* url */}

            <div className="flex p-3 bg-slate-100  w-full gap-3 rounded-2xl mb-3 my-3">
              <Image
                src="/assets/icons/link.svg"
                width={30}
                height={30}
                alt="image"
                className=" rounded-full object-cover"
              />
              <input
                name="location"
                placeholder=" url"
                className=" bg-slate-100   "
              />
            </div>

            {/* button */}
            <Button
              // type="submit"
              onClick={handleCreateEvent}
              disabled={isCreatingEvent === true}
              className="w-full my-5 p-5 bg-purple-700 rounded-full"
            >
              {isCreatingEvent ? "submitting..." : "Create Event"}
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
