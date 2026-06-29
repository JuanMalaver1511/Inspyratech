import { useEffect } from "react";

export default function WhatsAppWidget() {
  useEffect(() => {
    // Evita cargar el script dos veces
    if (document.getElementById("inspy-widget")) return;

    const script = document.createElement("script");
    script.id = "inspy-widget";
    script.src = "/widget/4d1d0375-fe6e-4b61-bcfc-fd6956001226.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null; // El widget crea su propio botón
}