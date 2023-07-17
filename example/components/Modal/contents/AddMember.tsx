import {
  Button,
  Input,
  Label,
  Select,
  Textarea,
} from "@roketid/windmill-react-ui";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useActions, useSignal } from "@dilane3/gx";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/communique.module.css";
import style2 from "styles/service.module.css";
import { Colors, formatDateForInput } from "utils";
import { string, number, object, date } from "yup";
import { upload } from "api/uploads";
import { createUser } from "api/users";
import { CreateUserDto, Sexe } from "api/users/dto";
import Loader from "example/components/Loader/Loader";
import { toast } from "react-toastify";
import User from "../../../../entities/users/User";
import School from "entities/schools/School";
import FilepdfPost from "example/components/Posts/FilepdfPost";

const formSchema = object({
  name: string().required("Le nom est obligatoire"),
  email: string()
    .email("L'email est invalide")
    .required("L'email est obligatoire"),
  phone: number(),
  specialization: string().required("La specialisation est obligatoire"),
  sexe: string().required("Le sexe est obligatoire"),
  memberAt: date().required("La date d'adhésion est obligatoire"),
  schoolId: string().required("L'ID de l'école est obligatoire"),
});

const AddMember = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global actions
  const { closeModal } = useActions("modal");
  const { addUser } = useActions("users");

  // Global state
  const schools = useSignal<School[]>("schools");

  // Local state
  const [file, setFile] = useState<File | null>(null);
  const [image, setPath] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [sexe, setSexe] = useState<Sexe>(Sexe.Male);
  const [memberAt, setMemberAt] = useState<Date | null>(null);
  const [schoolId, setSchoolId] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  // Use Effect
  React.useEffect(() => {
    const verify = async () => {
      await verifyForm();
    };

    verify();
  }, [name, email, phone, specialization, sexe, memberAt, schoolId]);

  const cancelCreationMember = () => {
    closeModal();
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    target: string
  ) => {
    switch (target) {
      case "name":
        setName(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      case "phone":
        setPhone(e.target.value);
        break;

      case "schoolId":
        setSchoolId(e.target.value);
        break;

      case "specialization":
        setSpecialization(e.target.value);
        break;

      case "sexe":
        setSexe(e.target.value as Sexe);
        break;

      case "memberAt":
        setMemberAt(new Date(e.target.value));
        break;

      case "avatar": {
        const event = e as ChangeEvent<HTMLInputElement>;

        if (event.target.files) {
          setFile(event.target.files[0]);

          if (event.target.files) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setPath(imageUrl);
          }
        }

        break;
      }

      default:
        break;
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleAddMember = async () => {
    setLoading(true);

    let avatar = "";

    if (file) {
      // Upload file
      const formData = new FormData();

      formData.append("file", file);

      const { data } = await upload(formData);

      if (data) {
        avatar = data.fileName;

        const payload = {
          name,
          email,
          phone,
          specialization,
          sexe,
          avatar,
          memberAt,
          establishmentId: schoolId,
        } as CreateUserDto;

        // Create member
        const { data: response, error } = await createUser(payload);

        if (error) {
          toast.error("Oups! Une erreur est survenue");
        } else {
          toast.success("Membre ajouté avec succès");

          // Add member to store
          const user = new User(response);

          addUser(user);

          closeModal();
        }

        setLoading(false);
      }

      return;
    }

    const payload = {
      name,
      email,
      phone,
      specialization,
      sexe,
      avatar,
      memberAt,
      establishmentId: schoolId,
    } as CreateUserDto;

    // Create member
    const { data: response, error } = await createUser(payload);

    if (error) {
      toast.error("Oups! Une erreur est survenue");
    } else {
      toast.success("Membre ajouté avec succès");

      // Add member to store
      const user = new User(response);

      addUser(user);

      closeModal();
    }

    setLoading(false);
  };

  const verifyForm = async () => {
    try {
      await formSchema.validate({
        name,
        email,
        phone,
        specialization,
        sexe,
        memberAt,
        schoolId,
      });

      setVerified(true);
    } catch (error) {
      console.log(error);

      setVerified(false);
    }
  };

  return (
    <div className={style.coms_modals}>
      <div
        className={`${style.coms_modals_first_part} ${style2.formSection} flex flex-col pr-2`}
      >
        <p className="mb-8 text-xl font-semibold dark:text-gray-300  self-start">
          Ajouter un membre
        </p>

        <Label className="mt-4">
          <span>Nom</span>
          <Input
            className="mt-1"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => handleOnChange(e, "name")}
          />
        </Label>

        <Label className="mt-4">
          <span>Email</span>
          <Input
            className="mt-1"
            placeholder="exemple@gmail.com"
            value={email}
            onChange={(e) => handleOnChange(e, "email")}
          />
        </Label>

        <Label className="mt-4">
          <span>Téléphone</span>
          <Input
            className="mt-1"
            placeholder="657487623"
            value={phone}
            onChange={(e) => handleOnChange(e, "phone")}
          />
        </Label>

        <Label className="mt-4">
          <span>Université</span>
          <Select
            className="mt-1"
            value={schoolId}
            onChange={(e) => handleOnChange(e, "schoolId")}
          >
            <option value="">#</option>

            {schools.map((school) => (
              <option value={school.id}>{school.name}</option>
            ))}
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Specialisation</span>
          <Input
            className="mt-1"
            placeholder="Informatique"
            value={specialization}
            onChange={(e) => handleOnChange(e, "specialization")}
          />
        </Label>

        <Label className="mt-4">
          <span>Sexe</span>
          <Select
            className="mt-1"
            value={sexe}
            onChange={(e) => handleOnChange(e, "sexe")}
          >
            <option value="male">Masculin</option>
            <option value="female">Feminin</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Date d'adhésion</span>
          <Input
            className="mt-1"
            type="date"
            placeholder="Date d'adhésion"
            value={formatDateForInput(memberAt)}
            onChange={(e) => handleOnChange(e, "memberAt")}
          />
        </Label>

        <div className="flex justify-between mt-8 ">
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{
              backgroundColor: Colors.lightGray,
              fill: "#000",
              color: "#000",
            }}
            onClick={cancelCreationMember}
          >
            Annuler
          </Button>
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            onClick={handleAddMember}
            disabled={!verified}
          >
            Ajouter
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <p className="mb-8 text-xl font-semibold dark:text-gray-300">
          Photo de profil
        </p>

        {file !== null ? (
          <div className={style.files_section}>
            <Button
              icon={AddIcon}
              size="regular"
              style={{
                backgroundColor: Colors.primary,
                fill: "#fff",
                borderRadius: "120px",
                right: "0px",
                position: "relative",
                left: "34vh",
                top: "-20px",
              }}
              onClick={handleUploadClick}
            ></Button>
            <div className={style.files_display}>
              <input
                className={`${style.default_file_input} `}
                type="file"
                accept="image/*"
                onChange={(e) => handleOnChange(e, "avatar")}
                ref={inputRef}
                name="file"
              />

              <div
                style={{
                  borderBottom: "2px gray",
                  // height: "80px",
                }}
              >
                <Button
                  icon={AiOutlineClose}
                  size="small"
                  style={{
                    backgroundColor: Colors.red,
                    fill: "#fff",
                    fontWeight: "bold",
                    borderRadius: "120px",
                    left: "210px",
                    top: "34px",
                    position: "relative",
                  }}
                  onClick={() => handleRemoveFile()}
                ></Button>

                {file.type === "application/pdf" ? (
                  <FilepdfPost file={file} />
                ) : (
                  <Image
                    priority
                    // src={"/assets/img" + `${item[0].name}`}
                    src={image}
                    height={100}
                    width={200}
                    alt="Click to upload your file"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${style.upload_section}`}
            onClick={handleUploadClick}
          >
            <Image
              className={style.upload_image_illustration}
              priority
              src="/assets/img/Uploading.png"
              height={200}
              width={200}
              alt="Click to upload your images"
            />
            <input
              className={`${style.default_file_input} `}
              type="file"
              accept="image/*"
              onChange={(e) => handleOnChange(e, "avatar")}
              ref={inputRef}
              name="file"
            />
          </div>
        )}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default AddMember;
