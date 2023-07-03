import { Box, Typography } from "@mui/material";
import { Avatar, Button } from "@roketid/windmill-react-ui";
import Layout from "example/containers/Layout";
import { Colors } from "utils";
import * as Icons from "icons";
import { IIcon } from "icons";
import { HOME_PAGE_LINK } from "../../constants";
import Link from "next/link";
import { useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import { baseURL } from "api";

function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

export default function ProfilePage() {
  // Global state
  const { user } = useSignal<CurrentUserState>("current-user");

  if (!user) return null;

  return (
    <Layout title="Profil" description="Profil">
      {/* <PageTitle>Profile</PageTitle> */}

      <Box
        sx={{
          width: "100%",
          backgroundColor: Colors.white,
          marginTop: 3,
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: 2,
            width: "100%",
            height: 150,
            background: `linear-gradient(90deg, #caf0f8, #c8b6ff)`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: -50,
              left: 20,
              borderWidth: 5,
              borderColor: Colors.white,
              borderStyle: "solid",
              borderRadius: "50%",
            }}
          >
            <Avatar
              className="align-middle"
              src={`${baseURL}/static/${user.avatar}`}
              alt=""
              aria-hidden="true"
              size="large"
              style={{
                width: 100,
                height: 100,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 8,
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Typography sx={{ fontFamily: "Poppins-Bold", fontSize: 18 }}>
            {user.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <Icon
              className="w-5 h-5 mr-3"
              aria-hidden="true"
              icon={"MailIcon"}
            />

            <Typography
              sx={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#444",
                marginRight: 2,
              }}
            >
              {user.email}
            </Typography>
            <span>&bull;</span>
            <Typography
              sx={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                marginLeft: 2,
                color: "#888",
              }}
            >
              Sécrétaire du BEN
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginTop: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#444",
                marginRight: 2,
              }}
            >
              (Tel) {user.phone}
            </Typography>
            <span>&bull;</span>
            <Typography
              sx={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                marginLeft: 2,
                color: "#888",
              }}
            >
              Professeure en {user.specialization}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <Icon
              className="w-5 h-5 mr-3"
              aria-hidden="true"
              icon={"OutlinePersonIcon"}
            />

            <Typography
              sx={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                color: "#555",
              }}
            >
              Member since 2019
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: 2,
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Button
            className="mt-4"
            // block
          >
            Modifier le profil
          </Button>

          <Link href={HOME_PAGE_LINK}>
            <Button
              className="mt-4 ml-4"
              style={{
                color: "#333",
                backgroundColor: "#fff",
                border: `1px solid ${Colors.primary}`,
              }}
            >
              Consulter les communiqués
            </Button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}
