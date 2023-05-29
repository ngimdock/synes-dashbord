import { Button } from "@roketid/windmill-react-ui";
import { AddIcon } from "icons";
import { Colors } from "utils";
import PageTitle from "../Typography/PageTitle";
import { Tab as TabBar } from "@headlessui/react";
import { Tabs } from "../../../constants";
import Link from "next/link";
import { useActions } from "@dilane3/gx";
import { ModalType } from "gx/signals/modal";

type TabProps = {
  children: React.ReactNode;
  tabname: Tabs;
};

export default function Tab({ children, tabname }: TabProps) {
  "use client";

  const { openModal } = useActions("modal");

  const handleOpenModal = () => {
    const payload = {
      modalStatus: true,
      type: ModalType.COMMUNIQUE,
      payload: null,
    };

    openModal(payload);
  };

  const handleOpenModalContribution = () => {
    const payload = {
      modalStatus: true,
      type: ModalType.CONTRIBUTION,
      payload: null,
    };

    openModal(payload);
  };

  const tabs = [
    {
      name: Tabs.Communique,
      href: "/rooms/general/communique",
    },
    {
      name: Tabs.Events,
      href: "/rooms/general/events",
    },
    {
      name: Tabs.Sanctions,
      href: "/rooms/general/sanctions",
    },
    {
      name: Tabs.Contributions,
      href: "/rooms/general/contributions",
    },
  ];

  const generateButton = (tabname: Tabs) => {
    switch (tabname) {
      case Tabs.Communique:
        return (
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            onClick={handleOpenModal}
          >
            Nouveau communiqué
          </Button>
        );
      case Tabs.Events:
        return (
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
          >
            Nouveau evenement
          </Button>
        );
      case Tabs.Sanctions:
        return "Nouvelle sanction";
      case Tabs.Contributions:
        return (
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            onClick={handleOpenModalContribution}
          >
            Nouvelle contribution
          </Button>
        );
      default:
        return "Nouveau communiqué";
    }
  };

  return (
    <section className="w-full px-2 py-2 flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <PageTitle>Salon général</PageTitle>

        <div className="">{generateButton(tabname)}</div>
      </div>

      <TabBar.Group
        onChange={(index) => {
          console.log("Changed selected tab to:", index);
        }}
        selectedIndex={tabs.findIndex((tab) => tab.name === tabname) || 0}
      >
        <TabBar.List className="flex flex-row justify-start items-center mt-2">
          {tabs.map((tab, index) => (
            <TabBar className="mr-10" key={index}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <Link href={tab.href}>
                  <span
                    className={selected ? "text-white" : "bg-white text-black"}
                    style={{
                      backgroundColor: selected ? Colors.primary : Colors.white,
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {tab.name}
                  </span>
                </Link>
              )}
            </TabBar>
          ))}
        </TabBar.List>

        <hr className="mt-3" />

        <TabBar.Panels className="mt-3">
          {tabs.map((tab, index) => {
            if (tab.name === tabname)
              return <TabBar.Panel key={index}>{children}</TabBar.Panel>;

            return <TabBar.Panel key={index}></TabBar.Panel>;
          })}
        </TabBar.Panels>
      </TabBar.Group>
    </section>
  );
}
