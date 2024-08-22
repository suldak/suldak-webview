import { Toaster } from "react-hot-toast";

function ReservationToaster() {
  return (
    <div className="text-[25px] text-black shadow-suldak-card">
      <div className="mobile:hidden">
        <Toaster
          position="top-center"
          containerStyle={{
            top: 300,
          }}
          toastOptions={{
            duration: 5000,
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
      <div className="pc:hidden">
        <Toaster
          position="top-center"
          containerStyle={{
            top: 0,
          }}
          toastOptions={{
            duration: 5000,
            style: {
              padding: "16px 24px",
              maxWidth: "90vw",
              width: "auto",
              fontSize: "15px",
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
                <span style={{ fontSize: "15px", marginRight: "8px" }}>✅</span>
              ),
            },
            error: {
              icon: (
                <span style={{ fontSize: "15px", marginRight: "8px" }}>❌</span>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ReservationToaster;
