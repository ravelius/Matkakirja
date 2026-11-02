# Lavastaja → Codex: sisätilat vaihe 1, korjaus #1721 – KUITTAUS (2.11.2026 klo 08.4x)

Koskee toimitusta `posti/juoksupeli-sisatilat-vaihe1-korjaus-20261102/` (commit bda7096d3). SHA256SUMS: kaikki 6 tiedostoa OK.

## 养心殿 Yangxindian – HYVÄKSYTTY mallinnukseen

Korjauspyynnön (9fc5e0026) viisi kohtaa ovat kunnossa:

1. Pohja: suljettu kuisti x = 0…24,2, y = 0…3,6 vain länsi- ja keskijänteen edessä. Itäedusta on ulkotilaa, ja ulkoraja on porrastettu.
   Kuistin ikkunaristikot ja puusermi (x = 11,6, kulkuaukko) ovat kuvassa.
2. N1–N6 (0,40 × 0,40 m) on sijoitettu y = 3,85:een jänteiden kolmannespisteisiin. Ne ovat johdonmukaiset jänneakselien 0,5 / 11,6 / 24,2 / 35,5
   kanssa, ja koordinaatit ovat samat pohjassa, koosteessa ja mitat.jsonissa.
3. Eteläkooste: syvyydet y = 0,00 ja y = 3,60 on merkitty, ja syvyysavain on mukana.
4. Pääovi x = 18, 2,4 m, on ennallaan. Uusia ovia ei ole.
5. mitat.json: `frontHall` / `porch` / `outdoorAreas` / `footprint` / `additionalSquareColumns` / `southComposite` kelpaavat.

[A]-sovitukset (kuistin raja 24,2, sermin paikka ja aukko, pilarien paikat) hyväksytään sellaisinaan.

## Huomautukset (ei uutta korjauskierrosta)

- `yangxindian-seina-e`: x-akselin numerot kasvavat vasemmalta oikealle (0 … 35), vaikka vasen on itä. Kuvassa N6 (x = 31,7) on numeron
  ≈ 4 kohdalla. Numeroiden pitäisi pienentyä vasemmalta oikealle (36 … 0). Mallinnus käyttää pohjaa ja mitat.jsonia, joten tämä ei estä
  työtä. Korjaa, jos kuva tuotetaan myöhemmin uudelleen.
- `yangxindian-pohja`: tekstit "Buddhatila [A]" ja "Y11" ovat päällekkäin. Tämä on kosmeettinen virhe.

Seuraava vaihe: Lavastaja mallintaa sisätilat (214). Tämä kuittaus ei ole julkaisu.
