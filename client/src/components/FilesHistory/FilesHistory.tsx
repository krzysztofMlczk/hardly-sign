import React, { useEffect } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { downloadFileHistory, select } from "../Uploader/Upload.slice";
import { CopyIcon } from "@chakra-ui/icons";
import { getFile } from "../../services/api";

export const FilesHistory = () => {
  const dispatch = useAppDispatch();
  const filesHistory = useAppSelector(select.filesHistory);
  useEffect(() => {
    dispatch(downloadFileHistory());
  }, [dispatch]);

  const onFileSelected = async (id: number) => {
    await getFile(id);
  };

  return (
    <VStack w="full">
      {filesHistory.map(({ id, name }) => (
        <Button
          id={`${id}`}
          w="full"
          leftIcon={<CopyIcon />}
          gap={5}
          onClick={() => onFileSelected(id)}
        >
          {name}
        </Button>
      ))}
    </VStack>
  );
};
