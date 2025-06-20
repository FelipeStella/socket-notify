import { NotificationDrawer } from "socket-notify"; // ⬅️ Lib sendo usada

export default function App() {
  const options ={
    socketUrl: "ws://localhost:4000",
    onOpen: () => console.log("🔌 Conectado!"),
    onError: (err: any) => console.error("Erro no socket", err),
  };

  return (
    <div style={{ padding: "2rem", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      <h1>📬 Playground de Notificações</h1>
       <NotificationDrawer optionsSocket={options} />
    </div>
  );
}
