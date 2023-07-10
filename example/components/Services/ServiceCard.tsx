type ServiceCardProps = {
  service: {
    id: number;
    name: string;
    members: number;
    color: string;
  };
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="w-300 rounded-xl relative mx-1" style={styles.card}>
      <div className="bg-gray-100" style={styles.header}></div>

      <div
        className="flex justify-center align-center rounded-lg absolute"
        style={{ ...styles.avatar, backgroundColor: service.color }}
      >
        <p className="text-xl text-white text-medium">
          {service.name[0].toUpperCase()}
        </p>
      </div>

      <div className="p-5">
        <p className="mt-1 text-lg text-medium">{service.name}</p>
        {/* <p className="text-sm text-light" style={styles.members}>
          {service.members} membres
        </p> */}
      </div>
    </div>
  );
}

const styles = {
  card: {
    marginTop: 20,
    width: 252,
    height: "auto",
    border: "1px solid #eee",
  },

  header: {
    width: 250,
    height: 40,
    borderRadius: "10px 10px 0 0",
    borderBottom: "1px solid #eee",
  },

  avatar: {
    width: 40,
    height: 40,
    border: "2px solid #fff",
    top: 20,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  members: {
    fontSize: 12,
    color: "#aaa",
    fontWeight: 300,
  },
};
