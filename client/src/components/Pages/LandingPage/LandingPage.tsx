import {
  Flex,
  Container,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  List,
  ListIcon,
  ListItem,
  Box,
} from "@chakra-ui/react";
import featuresImage from "../../../assets/img/features.svg";
import signImage from "../../../assets/img/signDocument.svg";
import checkImage from "../../../assets/img/check.svg";
import sendImage from "../../../assets/img/check.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Illustration } from "./Illustration";
import { LockIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
export const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Text
          data-aos="fade-down-right"
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"100%"}
          as={"span"}
        >
          {" "}
          Digital signing of documents{" "}
        </Text>

        <Text
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"100%"}
          data-aos="fade-up-left"
          as={"span"}
          color={"orange.400"}
        >
          made easy
        </Text>

        <Text
          fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
          color={"gray.500"}
          maxW={"3xl"}
        >
          Signing documents has never been so easy. From now on, you can share
          the documents you have signed with institutions or employers without
          leaving your home. Check it out !
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Link to="/dashboard">
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
            >
              Get started
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button rounded={"full"} px={6}>
              Log in
            </Button>
          </Link>
        </Stack>

        {/*
         ------------------------------
         SECTION CREATE ACCOUNT 
         ------------------------------
         */}
        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          px={8}
          mb={2}
        >
          <Stack
            spacing={4}
            w={{ base: "80%", md: "40%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color={"primary.400"}
              textAlign={["center", "center", "left", "left"]}
            >
              Creating account
            </Heading>
            <Text
              textAlign={["left"]}
              fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
              color={"gray.500"}
              maxW={"3xl"}
            >
              Signing documents has never been so easy. From now on, you can
              share the documents you have signed with institutions or employers
              without leaving your home. Check it out !
            </Text>
            <Link to="/dashboard">
              <Button
                rounded={"full"}
                px={6}
                colorScheme={"orange"}
                bg={"orange.400"}
                _hover={{ bg: "orange.500" }}
              >
                Contact our consultant
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                rounded={"full"}
                px={6}
                colorScheme={"orange"}
                bg={"orange.400"}
                _hover={{ bg: "orange.500" }}
              >
                Read more
              </Button>
            </Link>
          </Stack>
          <Box
            w={{ base: "100%", sm: "70%", md: "80%" }}
            mb={{ base: 12, md: 0 }}
          >
            {/* TODO: Make this change every X secs */}
            <Illustration
              height={{ sm: "24rem", lg: "28rem" }}
              mt={{ base: 12, sm: 16 }}
            />
          </Box>
        </Flex>
        {/*
          ------------------------------
          SECTION FEATURES
          ------------------------------
        */}

        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          px={8}
          mb={2}
        >
          <Box
            w={{ base: "80%", sm: "60%", md: "70%" }}
            mb={{ base: 12, md: 0 }}
            mr={20}
          >
            {/* TODO: Make this change every X secs */}
            <Image src={featuresImage}></Image>
          </Box>
          <Stack
            spacing={4}
            w={{ base: "80%", md: "40%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color={"primary.400"}
              textAlign={["center", "center", "left", "left"]}
            >
              Features
            </Heading>

            <List spacing={3}>
              <ListItem
                textAlign={["left"]}
                fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
                color={"gray.500"}
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />A quick way
                to authorize a signature without leaving your home
              </ListItem>
              <ListItem
                textAlign={["left"]}
                fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
                color={"gray.500"}
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Simple and intuitive layout
              </ListItem>
              <ListItem
                textAlign={["left"]}
                fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
                color={"gray.500"}
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Supported images and pdf files
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem
                textAlign={["left"]}
                fontSize={{ base: "1xl", sm: "2xl", md: "2xl" }}
                color={"gray.500"}
              >
                <ListIcon as={LockIcon} color="green.500" />
                Secure
              </ListItem>
            </List>
          </Stack>
        </Flex>

        {/*
          ------------------------------
          SECTION HOW IT WORKS
          ------------------------------
        */}
        <Flex
          w="100%"
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "column" }}
          px={8}
          mb={2}
        >
          <Text
            data-aos="zoom-in"
            data-aos-offset="200"
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "3xl", md: "4xl" }}
            lineHeight={"110%"}
            as={"span"}
          >
            {" "}
            How it works?{" "}
          </Text>
        </Flex>

        {/* STEP 1 */}

        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          px={8}
          mb={2}
        >
          <Box
            w={{ base: "80%", sm: "60%", md: "70%" }}
            mb={{ base: 12, md: 0 }}
            mr={20}
          >
            <Image src={sendImage}></Image>
          </Box>
          <Stack
            spacing={4}
            w={{ base: "80%", md: "60%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            <Heading
              data-aos="zoom-in"
              data-aos-offset="200"
              as="span"
              size="lg"
              fontWeight="normal"
              color={"primary.400"}
              textAlign={["center", "center", "left", "left"]}
            >
              After account registration, send document to our signing authority
            </Heading>
          </Stack>
        </Flex>

        {/** Step 2 signing */}

        {/* STEP 1 */}

        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          px={8}
          mb={6}
        >
          <Box
            w={{ base: "80%", sm: "60%", md: "70%" }}
            mb={{ base: 12, md: 0 }}
            mr={20}
          >
            <Image src={signImage}></Image>
          </Box>
          <Stack
            spacing={4}
            w={{ base: "80%", md: "70%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            <Heading
              data-aos="zoom-in"
              data-aos-offset="200"
              as="span"
              size="lg"
              fontWeight="normal"
              color={"primary.400"}
              textAlign={["center", "center", "left", "left"]}
            >
              Our signing system will sign the document based on your
              credentials created in registering process. Document will be send
              back to you.
            </Heading>
          </Stack>
        </Flex>

        {/** VERYFY LABEL */}
        <Flex
          w="100%"
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "column" }}
          px={8}
          mb={6}
        >
          <Text
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "3xl", md: "3xl" }}
            lineHeight={"110%"}
            as={"span"}
          >
            {" "}
            Having received signed document, you can share it via email to
            target institution that have registered your as user{" "}
          </Text>
        </Flex>

        {/**  Veryfy step */}

        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          px={8}
          mb={2}
        >
          <Box
            w={{ base: "80%", sm: "60%", md: "70%" }}
            mb={{ base: 12, md: 0 }}
            mr={20}
          >
            <Image src={checkImage}></Image>
          </Box>
          <Stack
            spacing={4}
            w={{ base: "80%", md: "40%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            <Heading
              data-aos="zoom-in"
              data-aos-offset="200"
              as="span"
              size="lg"
              fontWeight="normal"
              color={"primary.400"}
              textAlign={["center", "center", "left", "left"]}
            >
              Now target institution can veryfy via app, that you have signed
              the document and content can be trusted.
            </Heading>
          </Stack>
        </Flex>

        {/** VERYFY LABEL */}
        <Flex
          w="100%"
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "column" }}
          px={8}
          mb={6}
        >
          <Text
            data-aos="fade-up"
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "3xl", md: "3xl" }}
            lineHeight={"110%"}
            as={"span"}
          >
            {" "}
            And that's it !!! Enjoy the app and make your decuments and
            decisions trusted without leaving home.
          </Text>
        </Flex>
      </Stack>
    </Container>
  );
};
