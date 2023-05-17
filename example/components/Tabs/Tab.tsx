import { Button } from "@roketid/windmill-react-ui";
import { AddIcon } from "icons";
import { Colors } from "utils";
import PageTitle from "../Typography/PageTitle";

export default function Tab() {
  return (
    <section className="w-full px-2 py-2 flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <PageTitle>Salon général</PageTitle>

        <div className="">
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
          >
            Nouveau communiqué
          </Button>
        </div>
      </div>
    </section>
  );
}