import { NotificationDrawer } from "socket-notify"; // ⬅️ Lib sendo usada

export default function App() {
  return (
    <div style={{ padding: "2rem", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      <h1>📬 Playground de Notificações</h1>
       <NotificationDrawer />
    </div>
  );
}
