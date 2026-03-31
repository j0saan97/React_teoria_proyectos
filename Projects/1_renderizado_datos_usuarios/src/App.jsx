import "./App.css";

const users = [
  {
    id: 1,
    name: "Hedy Lamarr",
    role: "Inventora y actriz",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Hedy",
    location: "Viena, Austria",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    role: "Primera programadora",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Ada",
    location: "Londres, UK",
  },
  {
    id: 3,
    name: "Marie Curie",
    role: "Física y química",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Marie",
    location: "Varsovia, Polonia",
  },
  {
    id: 4,
    name: "Grace Hopper",
    role: "Pionera de la informática",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Grace",
    location: "Nueva York, EEUU",
  },
];

function UserProfile({ user }) {
  return (
    <user-profile>
      <img src={user.imageUrl} alt={user.name} />
      <div className="info">
        <h2>{user.name}</h2>
        <p>{user.role}</p>
        <span>{user.location}</span>
      </div>
    </user-profile>
  );
}

export default function App() {
  return (
    <div className="container">
      {users.map((user) => (
        <UserProfile key={user.id} user={user} />
      ))}
    </div>
  );
}
