import React from "react";
import "./serviceCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import i18n from "../locals/i18n";

export default function ServiceCard({ item }) {
  let locale = i18n.language === "en" ? "en" : "ar";

  return (
    <div
      className="service-card-container card"
      onClick={() => {
        window.open(item.link, "_blank");
      }}
    >
      <FontAwesomeIcon icon={faGear} style={{ color: "#0f2941" }} />

      <div style={{ color: "#ad6b46" }}>
        {locale === "en" ? item.title.en : item.title.ar}
      </div>
    </div>
  );
}
