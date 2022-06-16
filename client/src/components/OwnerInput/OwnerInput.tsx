import { Input } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setOwnerValue } from "../Uploader/Upload.slice";
import { select } from "../Uploader/Upload.slice";

export const OwnerInput = () => {
  const value = useAppSelector(select.ownerValue);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setOwnerValue(event.target.value));

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="File owner's e-mail"
      />
    </>
  );
};
