import React from "react";
import { Colors } from "utils";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Input,
  Pagination,
  Label,
  Select,
} from "@roketid/windmill-react-ui";
import styles from "./addcontributionStyle.module.css";
import { useActions, useSignal } from "@dilane3/gx";
import { UsersState } from "gx/signals/users";
import { baseURL } from "api";
import { string, number, object, array } from "yup";
import { toast } from "react-toastify";
import Contribution, {
  ContributionType,
} from "../../../../entities/contributions/Contribution";
import { createContribution } from "api/contributions";
import Loader from "example/components/Loader/Loader";
import User from "../../../../entities/users/User";

const formSchema = object({
  motif: string().required(),
  amount: number().min(10000).required(),
});

const AddContribution = () => {
  // Local state
  const [motif, setMotif] = React.useState(ContributionType.Year);
  const [amount, setAmount] = React.useState(0);
  const [members, setMembers] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [verified, setVerified] = React.useState(false);

  // Global state
  const { users } = useSignal<UsersState>("users");

  // Global actions
  const { closeModal } = useActions("modal");
  const { addContribution } = useActions("contributions");

  React.useEffect(() => {
    verifyForm();
  }, [motif, amount, members]);

  // Methods

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amountParsed = parseInt(e.target.value);

    if (e.target.value === "") {
      setAmount(0);
      return;
    }

    if (isNaN(amountParsed)) return;

    setAmount(amountParsed);
  };
  
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
      setMotif(e.target.value as ContributionType);
  };

  const handleSelectMember = (userId: string) => {
    if (members.includes(userId)) {
      setMembers(members.filter((id) => id !== userId));
    } else {
      setMembers([...members, userId]);
    }
  };

  const handleSubmit = async () => {
    if (members.length === 0) return;

    setLoading(true);

    try {
      const contributions: Contribution[] = [];

      for (const userId of members) {
        const payload = {
          type: motif,
          amount,
          ownerId: userId,
        };

        // Create contribution
        const { data: contribution, error } = await createContribution(payload);

        if (error) {
          toast.error("Une erreur est survenue");
          return;
        }

        const owner = new User(contribution.owner);
        const newContribution = new Contribution({ ...contribution, owner });

        contributions.push(newContribution);
      }

      toast.success("Contribution ajoutée avec succès");

      contributions.forEach((contribution) => {
        addContribution(contribution);
      });

      closeModal();
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const verifyForm = async () => {
    try {
      await formSchema.validate({ motif, amount });

      setVerified(true);
    } catch (error) {
      console.log(error);
      setVerified(false);
    }
  };

  return (
    <div className={styles.modalContribution}>
      <div className={styles.addMemberCont}>
        <span className="mb-8 text-xl font-semibold dark:text-gray-300 self-start">
          Ajouter une contribution
        </span>

        <Label>
          <span className="mb-2 text-gray-800 dark:text-gray-300">Motif</span>
          <Select value={motif} onChange={handleSelectChange}>
            <option value="MEMBER">Adhésion</option>
            <option value="YEAR">Contribution annuelle</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span className="mb-2 text-gray-800 dark:text-gray-300">Montant</span>
          <Input
            placeholder="Montant"
            value={amount}
            onChange={handleChange}
          />
        </Label>

        <div className="flex justify-between mt-auto">
          <Button
            size="regular"
            style={{
              backgroundColor: Colors.lightGray,
              fill: "#000",
              color: "#000",
              width: 100,
            }}
            onClick={closeModal}
          >
            Annuler
          </Button>
          <Button
            size="regular"
            style={{
              backgroundColor: Colors.primary,
              fill: "#fff",
              width: 150,
            }}
            disabled={!verified || members.length === 0}
            onClick={handleSubmit}
          >
            Publier
          </Button>
        </div>
      </div>
      <div className={styles.selectMember}>
        <span className="mb-8 text-xl font-semibold dark:text-gray-900 self-start">
          Membres
        </span>
        <div className={styles.selectMemberContainer}>
          {users.map((user) => (
            <div key={user.id} className={styles.memberContaint}>
              <Input
                type="checkbox"
                checked={members.includes(user.id)}
                onChange={() => handleSelectMember(user.id)}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <Avatar
                  className="hidden mr-3 md:block"
                  src={user.avatar ? `${baseURL}/static/${user.avatar}` : '/assets/img/user.png'}
                  alt="User avatar"
                />
                <p className={styles.memberName}>{user.name}</p>
              </div>
            </div>
          ))}
        </div>

        {loading && <Loader />}
      </div>
    </div>
  );
};

export default AddContribution;
