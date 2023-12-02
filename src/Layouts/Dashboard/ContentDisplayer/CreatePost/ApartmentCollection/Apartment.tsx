import { Button, Grid, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import MultipleSelectChip from "../../../../../Components/Common/Inputs/MultipleSelectChip";
import RichTextEditor from "../../../../../Components/Common/Inputs/RichTextEditor";
import { RoomType } from "../../../../../Models/PostDetail";
import Amenities from "../Amenities/Amenities";
import { ApartmentDTO, ApartmentsAmenitiesDTO } from "../CreatePost";
import { Image } from "../PostImages/PostImages";
import ApartmentImages from "./AddImages";
import "./Apartment.scss";
import Swal from "sweetalert2";

export interface IApartment {
  id: string;
  name: string;
  description: string;
  images: Image[];
  quantity: number;
  maxOccupant: number;
  area: number;
  price: string | number;
  apartmentBedTypes: string[];
  amenitiesIDs: number[];
  completed: boolean;
}
interface IProps {
  apartment: ApartmentDTO;
  apartmentState: [
    ApartmentDTO,
    (value: ApartmentDTO | ((prev: ApartmentDTO) => ApartmentDTO)) => void
  ];
  onChange: Function;
}
function Apartment(props: IProps) {
  const [apartments, setApartments] = props?.apartmentState;
  const [apartment, setApartment] = useState<ApartmentDTO>(props.apartment);
  // @ts-ignore
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  useEffect(() => {
    setApartment({
      ...apartment,
      amenities: (
        props.apartment?.["apartmentsAmenities"] as ApartmentsAmenitiesDTO[]
      )?.map((amen) => amen.amenityId),
    });
  }, []);
  function handleAmenitiesChange(inputValue: number[]) {
    console.log(...inputValue);
    // @ts-ignore
    setApartment({
      ...(apartment ?? []),
      apartmentsAmenities: inputValue.map(
        (am) => ({ amenityId: am } as ApartmentsAmenitiesDTO)
      ),
      amenities: inputValue,
    });
  }
  async function handleAdd() {
    let imageIdsAxiosRes;
    if (apartment?.images?.filter((image) => !image?.["url"]).length > 0) {
      const form = new FormData();
      apartment?.images?.forEach((image) => {
        if (!image?.["url"]) form.append(`file`, image.data ?? "");
      });
      imageIdsAxiosRes = await axios.post(`/api/publication/add-images`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setApartment({
        ...apartment,
        apartmentPublications: imageIdsAxiosRes?.data?.map((imgId) => ({
          mediaId: imgId,
          accommodationId: apartment.id,
        })),
      });
    }
    if (apartment.id) {
      axios
        .post("/api/apartment/update", {
          ...apartment,
          apartmentPublications: imageIdsAxiosRes?.data?.map((imgId) => ({
            mediaId: imgId,
            accommodationId: apartment.id,
          })),
        })
        .then((response) => {
          Swal.fire("Success", "Update successfully!", "success");
        })
        .catch((error) => {
          Swal.fire("Error", error.response.data.message, "error");
          console.log("/api/apartment/update", error);
        });
    } else {
      axios
        .post("/api/apartment/add", {
          ...apartment,
          apartmentBedTypes: apartment.apartmentBedTypes?.map((apb) => ({
            ...apb,
            id: null,
          })),
          apartmentPublications: imageIdsAxiosRes?.data?.map((imgId) => ({
            mediaId: imgId,
            accommodationId: apartment.id,
          })),
        })
        .then((response: AxiosResponse<ApartmentDTO>) => {
          setApartments([...apartments, { id: response.data.id }]);
          Swal.fire("Success", "Add new apartment successfully!", "success");
        })
        .catch((error) => {
          Swal.fire("Error", error.response.data.message, "error");
        });
    }
  }
  console.log("apartment", apartment);
  // @ts-ignore
  return (
    <>
      {
        <Grid
          border="1px solid var(--light-font-color)"
          borderRadius={".5em"}
          width="100%"
          padding="100px"
        >
          <div className={"apartment-container"}>
            <Grid
              item
              display="flex"
              flexDirection="column"
              gap="30px"
              height={"max-content"}
              width={"100%"}
              maxWidth={"100%"}
            >
              <Grid item>
                <label htmlFor="Name">Name</label>
                <TextBox
                  id={"Name"}
                  value={apartment?.name}
                  setValue={(value: string) => {
                    setApartment({ ...apartment, name: value });
                  }}
                />
              </Grid>
              <Grid item display="flex" flexDirection="column" flexGrow="1">
                <label htmlFor="Description">Description</label>
                <RichTextEditor
                  value={apartment?.description ?? ""}
                  onBlur={(value) =>
                    setApartment((prev) => ({ ...prev, description: value }))
                  }
                />
              </Grid>
            </Grid>
            <div className={"row-2"}>
              <Grid item>
                <ApartmentImages
                  apartmentState={[apartment, setApartment]}
                  display={"apartment"}
                />
                {/*<PopupImageUpload postImages = { apartment?.images ?? [] } setPostImages = { handleFieldChange } />*/}
              </Grid>
              <Grid item>
                <label htmlFor="Area">Area</label>
                <div style={{ display: "flex", width: "100px" }}>
                  <TextBox
                    id={"Area"}
                    type={"number"}
                    setValue={(value: string) => {
                      setApartment({ ...apartment, area: value as number });
                    }}
                    value={apartment?.area as string}
                    // id = "Area" size = "small" variant = "standard" fullWidth
                    inputProps={{
                      min: 0,
                      step: 0.1,
                    }}
                  />
                  <span>m</span>
                  <sup>2</sup>
                </div>
              </Grid>
              <Grid item>
                <label htmlFor="TypeOfBed">Type of Bed</label>
                <MultipleSelectChip
                  value={apartment?.apartmentBedTypes ?? []}
                  options={Array(9)
                    .fill({} as RoomType)
                    .map((value, index: number) => ({
                      id: index + 1,
                      type: index + 1,
                    }))}
                  onChange={(value) => {
                    setApartment({ ...apartment, apartmentBedTypes: value });
                  }}
                />
              </Grid>
            </div>
            <Grid item xs={6}>
              <Amenities
                selectedIDs={apartment?.amenities}
                setSelectedAmenitiesIDs={handleAmenitiesChange}
              />
            </Grid>
          </div>
          <Grid
            container
            gap="20px"
            display="flex"
            marginTop="10px"
            alignItems="center"
          >
            <div></div>
            <Typography
              variant="button"
              visibility={showErrorMessage ? "visible" : "hidden"}
            >
              <strong>
                You must filled all of the field before continue to save
              </strong>
            </Typography>
            <div></div>
            <div
              className={
                "base-border-radius red-button border-light-color button"
              }
              onClick={handleAdd}
            >
              Save
            </div>
          </Grid>
        </Grid>
      }
    </>
  );
}
export default Apartment;
export function ChoosingRoomeType() {
  const [rooms, setRooms] = useState<RoomType[]>();
  return <div className={classNames("room-types")}></div>;
}
export function CollapsedApartment({
  apartment,
  setCollapsed,
  index,
}: {
  index: number;
  apartment: ApartmentDTO;
  setCollapsed: (apartmentIndex: number) => void;
}) {
  // @ts-ignore
  return (
    <Grid
      container
      border="3px solid black"
      width="100%"
      padding="5px 10px"
      alignItems={"center"}
    >
      <Grid item xs={3}>
        <Typography variant="h5">{apartment.name}</Typography>
      </Grid>
      <Grid item xs>
        <Typography
          variant="subtitle2"
          dangerouslySetInnerHTML={{ __html: apartment.description }}
        ></Typography>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          onClick={() => {
            setCollapsed(index);
          }}
        >
          Open
        </Button>
      </Grid>
    </Grid>
  );
}
export function TextBox({
  setValue,
  type,
  value,
  inputProps,
  id,
  className,
}: {
  className?: string;
  setValue: (value: number | string) => void;
  type?: string;
  value?: number | string;
  inputProps?: object;
  id?: string;
}) {
  const [text, setText] = useState<string | number>(value ?? "");
  return (
    <TextField
      className={className}
      value={text}
      onChange={(evt) => {
        if (
          type === "int-number" &&
          !(
            evt?.currentTarget?.value.match(/^\d+$/) ||
            evt?.currentTarget?.value === ""
          )
        )
          return;
        setText(evt?.currentTarget?.value);
      }}
      onBlur={() => {
        if (type === "number") {
          setValue(isNaN(parseFloat(text + "")) ? 0 : parseFloat(text + ""));
          setText(isNaN(parseFloat(text + "")) ? 0 : parseFloat(text + ""));
        } else if (type === "int-number") {
          setValue(isNaN(parseInt(text + "")) ? 0 : parseInt(text + ""));
          setText(isNaN(parseInt(text + "")) ? 0 : parseInt(text + ""));
        } else {
          setValue(text);
        }
      }}
      id={id}
      fullWidth
      variant="standard"
      type={type === "int-number" ? "number" : type ?? "text"}
      inputProps={inputProps}
    />
  );
}
