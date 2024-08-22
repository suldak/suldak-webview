import { Toaster } from "react-hot-toast";

function ReservationToaster() {
  return (
    <div className="text-[25px] text-black shadow-suldak-card">
      <Toaster
        position="top-center"
        containerStyle={{
          top: 300,
        }}
        toastOptions={{
          duration: 10000,
          style: {
            padding: "16px 24px",
            maxWidth: "90vw",
            width: "auto",
            fontSize: "25px",
            lineHeight: "1.5",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "white",
            color: "black",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
          success: {
            icon: (
              <span style={{ fontSize: "30px", marginRight: "8px" }}>✅</span>
            ),
          },
          error: {
            icon: (
              <span style={{ fontSize: "30px", marginRight: "8px" }}>❌</span>
            ),
          },
        }}
      />
    </div>
  );
}

export default ReservationToaster;
