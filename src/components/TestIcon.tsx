import HomeIcon from '@mui/icons-material/Home';

export default function TestIcon() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "20px" }}>
      <HomeIcon style={{ fontSize: 40, color: "#0CB2D4" }} />
      <span style={{ fontSize: "18px" }}>Accueil</span>
    </div>
  );
}