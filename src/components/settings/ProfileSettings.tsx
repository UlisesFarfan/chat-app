import { BsPencil } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import InputSettings from "../Inputs/InputSettings";
import { AiOutlineSend } from "react-icons/ai";
import { useSettingsProfile } from "../../hooks/useValidFormik";
import { useEffect, useState } from "react";
import InputSettingsTextArea from "../Inputs/InputSettingsTextArea";
import { upDateInfo } from "../../redux/async/authAsync";
import { toast } from "react-hot-toast";

export default function ProfileSettings() {
  const dispatch = useAppDispatch()
  const { authUser, accessToken } = useAppSelector(state => state.auth)
  interface upDateInterface {
    name: boolean;
    description: boolean;
    tag: boolean;
  };
  const [upDate, setUpDate] = useState<upDateInterface>({
    name: false,
    description: false,
    tag: false
  });

  const {
    values,
    handleBlur,
    handleChange,
    setValues,
    errors
  } = useSettingsProfile({
    name: "",
    description: "",
    tag: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(upDateInfo({
      token: accessToken,
      body: {
        name: values.name,
        description: values.description,
        tag: values.tag,
        userId: authUser._id
      }
    }));
  };

  useEffect(() => {
    setValues({
      name: authUser.name,
      description: authUser.description,
      tag: authUser.tag
    })
  }, [authUser])

  return (
    <div className="bg-slate-50 w-2/3 flex flex-col gap-4 p-3">
      {upDate.name ?
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            handleSubmit(e)
            setUpDate({ ...upDate, name: false })
          }}
          onKeyDownCapture={(e) => {
            if (e.code === "Escape") {
              setUpDate({ ...upDate, name: false })
              setValues({
                name: authUser.name,
                description: authUser.description,
                tag: authUser.tag
              })
            }
          }}
        >
          <InputSettings
            id="name"
            onChange={(e) => {
              if (e.target.value.length > 20) return;
              setValues({ ...values, name: e.target.value });
            }}
            initialValue={values.name}
          />
          <div className="flex justify-end">
            <span className="bg-indigo-500 text-slate-50 px-1 border-2 border-indigo-500 justify-center rounded-bl-md flex">
              {values.name.length}/20
            </span>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-slate-50 w-10 border-2 border-indigo-500 justify-center rounded-br-md flex items-center">
              <AiOutlineSend className="h-4 w-4" />
            </button>
          </div>
        </form>
        :
        <div className="w-full flex justify-between">
          <h3 className="text-slate-900 text-2xl">
            {authUser.name}
          </h3>
          <button className="h-8 min-w-[2rem] w-[2rem] p-2 hover:outline outline-1 outline-slate-300 rounded-md flex jusfity-center items-center"
            onClick={() => setUpDate({ ...upDate, name: true })}
          >
            <BsPencil className="h-5 w-5" />
          </button>
        </div>
      }
      <div
        onKeyDownCapture={(e) => {
          if (e.code === "Escape") {
            setUpDate({ ...upDate, description: false })
            setValues({
              name: authUser.name,
              description: authUser.description,
              tag: authUser.tag
            })
          }
        }}
      >
        <h4 className="text-sm text-slate-600">
          Description
        </h4>
        {upDate.description ?
          <form className="flex flex-col"
            onSubmit={(e) => {
              handleSubmit(e)
              setUpDate({ ...upDate, description: false })
            }}>
            <InputSettingsTextArea
              id="description"
              onChange={(e) => {
                if (e.target.value.length > 140) return;
                setValues({ ...values, description: e.target.value });
              }}
              initialValue={values.description}
            />
            <div className="flex justify-end">
              <span className="bg-indigo-500 text-slate-50 px-1 border-2 border-indigo-500 justify-center rounded-bl-md flex">
                {values.description.length}/140
              </span>
              <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-slate-50 w-10 border-2 border-indigo-500 justify-center rounded-br-md flex items-center">
                <AiOutlineSend className="h-4 w-4" />
              </button>
            </div>
          </form>
          :

          <div className="w-full flex justify-between">
            <span className="flex break-all text-slate-900 text-base pt-1">
              {authUser.description}
            </span>
            <button className="h-8 min-w-[2rem] w-[2rem] p-2 hover:outline outline-1 outline-slate-300 rounded-md flex jusfity-center items-center"
              onClick={() => setUpDate({ ...upDate, description: true })}
            >
              <BsPencil className="h-5 w-5" />
            </button>
          </div>
        }
      </div>
      <div
        onKeyDownCapture={(e) => {
          if (e.code === "Escape") {
            setUpDate({ ...upDate, tag: false })
            setValues({
              name: authUser.name,
              description: authUser.description,
              tag: authUser.tag
            })
          }
        }}
      >
        <h4 className="text-sm text-slate-600">
          Tag
        </h4>
        {upDate.tag ?
          <form className="flex flex-col"
            onSubmit={(e) => {
              handleSubmit(e)
              setUpDate({ ...upDate, tag: false })
            }}
          >
            <InputSettings
              id="tag"
              onChange={(e) => {
                if (e.target.value.length > 15) return;
                setValues({ ...values, tag: e.target.value });
              }}
              initialValue={values.tag}
            />
            <div className="flex justify-end">
              <span className="bg-indigo-500 text-slate-50 px-1 border-2 border-indigo-500 justify-center rounded-bl-md flex">
                {values.tag.length}/15
              </span>
              <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-slate-50 w-10 border-2 border-indigo-500 justify-center rounded-br-md flex items-center">
                <AiOutlineSend className="h-4 w-4" />
              </button>
            </div>
          </form>
          :
          < div className="w-full flex justify-between">
            <span className="flex break-all text-slate-900 text-base pt-1">
              {authUser.tag}
            </span>
            <button className="h-8 min-w-[2rem] w-[2rem] p-2 hover:outline outline-1 outline-slate-300 rounded-md flex jusfity-center items-center"
              onClick={() => setUpDate({ ...upDate, tag: true })}
            >
              <BsPencil className="h-5 w-5" />
            </button>
          </div>
        }
      </div>
    </div >
  )
}