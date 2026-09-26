# Savukierros: build 18 (juna/b13 541092d9, käännös e85255cd), iPhone + iPad

26.9.2026 04.4x–05.0x, lyhyt kierros. PASS-commit ehdotus: **541092d9** (juna/b13; käännös e85255cd).
Kuvat PNG, `docs/raportit/kaappaukset/savukierros-b18-20260926/` (+ 143b: savukierros-b18-143b.md).
Pelikoodarin `verkko raja` jätetty pois (ei käännöksessä).

## PASS
- **S1 Lepopiirto (iPhone, 105 s levossa Ateenassa):** `paikallaan` > 0 alkaen ~40 s; syvässä levossa
  piirretty **2–3 / 150** kehystä (kaikki 3 mittausjaksoa), fps 30; ~25 s välein lyhyt pulssi (lepo 22–82).
  `ruutu`: "tila Lepo (ui)" (UI ei rauhassa -ehto ks. Natiiviseppä). b17: 150/150 → korjaantunut.
- **S2 143/143b (iPad):** "BOSNIA JA / HERTSEGOVINA" 2 riville, sana ei katkea (savukierros-b18-143b.md); pienennys ≈ 26 % (hyväksytty).
- **S3 132 + 150:** nostokortin napautus → kokoruutu: kuva kokoruudussa ilman kuvatekstiä, sumea tausta (kuva 6).
- **S5 Ihmisen matka II (`linssi ihmisen-matka-2`):** käynnistyy, soitin ⏮ ⏸ ⏭ palkissa, kartan
  reitit + kamerasiirtymät (globe ↔ lähikuva) sujuvat kontaktilehdellä (kuva 9), aika etenee; 148/151/152
  vaikutelma hyvä stillistä — pehmeys ei liikkeenä todistettavissa ilman videota.
- **S6 Esilataus:** `linssi topografia`: laatat joutilas astronautti **150/150, 1,0 s**, auki heti (raja ≤ 2 s).
- **S7 Perussavuke:** kylmä käynnistys → aloitusnäyttö; lento ~12 s + Ohita + kone kuvassa; saapuminen (Ateena-verho → esittely);
  nosto aukeaa HETI napautuksesta (Patras, iso kuva, ei (x)); äänet: `aani mittaa` II:ssa rms 0,092, soivia 3, Speaker.
- **Vartija `nostokuvat GRC 60`:** RAJA nostokuva näkyy: **PASS (60/60)** (Kreikan puuttuvat kuvat korjattu).
- **Vartija `vieritys`:** herätys päällä, 29 seurattua, muutoksia 0, hitaita askelia 0 (`vieritys koe`: "ei vieritettävää ScrollViewtä näkyvissä" kartalla — ajettava avoimella vieritettävällä sisällöllä).

## Avoinna / huomiot
1. **144 lipun aaltoilu:** ei todennettavissa still-kuvista (kuvaviive ~1,5 s > animaatio); lippu on levossa suora ja kuva
   stabiili 8 peräkkäisessä kuvassa (asettuu levossa ✓). Aaltoilu vaatii videon Natiivi-UI:lta.
2. **Löydös: laajennettu nostokortti jää auki linssin avauksen yli** (Patras-kortti oli Ihmisen matka II:n päällä eikä `linssi pois`
   sulkenut sitä; sulkeutuu vain kortin ulkopuolelle napautuksella). Kortin sulku linssiä avattaessa?
3. `vieritys koe` vaatii vieritettävän ScrollView'n näkyviin (esim. laajennettu nosto) — ei ajettu sillä.

## Ei ajettu
iPad: II/CC-kytkin, soitin (iPhonella todettu). `verkko raja` (ei käännöksessä).

Simulaattorit sammutettu.
