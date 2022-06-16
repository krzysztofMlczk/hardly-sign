import Dropzone from "react-dropzone-uploader";
import { useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import "./styles.css";
import "./borderAnimation.css";
import { Spinner, Button } from "@chakra-ui/react";
import approveImage from "../../assets/img/approve.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { signFiles, verifyFiles, select } from "./Upload.slice";

export const Uploader = ({ variant }) => {
  const ownerValue = useAppSelector(select.ownerValue);
  const dispatch = useAppDispatch();

  const handleSubmit = async (files, allFiles) => {
    if (files.length) {
      const formData = new FormData();
      formData.append("file", files[0].file, "file");
      console.log(formData.getAll);
      switch (variant) {
        case "sign":
          dispatch(signFiles(formData));
          return;
        case "verify":
          formData.append("user_email", ownerValue, "user_email");
          dispatch(verifyFiles(formData));
          return;
      }
    }
  };

  const getUploadParams = ({ meta }) => {
    const url = "https://httpbin.org/post";
    const fileUrl = `${url}/${encodeURIComponent(meta.name)}`;
    return { url, meta: { fileUrl } };
  };

  const handleChangeStatus = ({ xhr }) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          console.log(result);
        }
      };
    }
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      {!loading && !success && (
        <div className="dropzone-wrapper">
          <div className="animated-box in">
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              maxFiles={3}
              inputContent={
                <div>
                  <img
                    alt="altImage"
                    className="customIcon"
                    style={{
                      color: "#14bf96",
                      fontSize: "50px",
                      height: "100px",
                      width: "auto",
                    }}
                    src="https://clippingpathgreat.com/wp-content/uploads/2021/04/upload-files.jpg"
                  />
                  <p className="dropText">Click to upload or drop files</p>
                </div>
              }
              styles={{
                dropzone: {
                  overflow: "auto",
                  border: "1px solid #c4c4c4",
                },
                inputLabelWithFiles: { margin: "20px 3%" },
              }}
              // TODO ? spec types ?
              // accept="image/*,audio/*,video/*"
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="loader-section">
          <Spinner size="xl" />
        </div>
      )}
      {!loading && success && (
        <div className="success-section">
          <h1>File uploaded succesfully</h1>
          <img
            data-aos="fade-down"
            data-aos-offset="500"
            className="approve-icon"
            src={approveImage}
          />
          <Button onClick={() => setSuccess(false)} colorScheme="blue">
            Sign more documents
          </Button>
          <Button onClick={() => setSuccess(false)} colorScheme="blue">
            Open documents history
          </Button>
        </div>
      )}
    </div>
  );
};
