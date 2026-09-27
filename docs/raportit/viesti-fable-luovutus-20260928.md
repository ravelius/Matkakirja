# Fablen luovutus 28.9.2026 klo 00.3x (TILINVAIHTO omistajan käskystä)

Sessio local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc ("Fable (Opus, xhigh)"). Edellinen luovutus -20260927-c (lue kohdat 1–5 sieltä,
tämä täydentää). Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md 27.9. klo 23.48 → 28.9. klo 00.13.

## 1. Mitä tehtiin 23.4x–00.3x

- Omistaja 23.58: "tee pelkkä striimiluenta loppuun ja julkaise se. laita muut työt tauolle (paitsi poltto). tehdään tilin
  vaihto sen jälkeen kun olet saanut julkaistua." → TEHTY:
  - **Web:** #3513 puhetagit v2347 tuotannossa 00.02, Pöllö xai 200, APP_VERSION 2026-09-21.2347.
  - **TF 1.0.33** = 202609272009 (BUILD 33 edf03bfd).
  - **TF 1.0.34** = 202609272058 (BUILD 34 17c2928b = 1.0.33 + pelkät puhetagit 9fac9748), sisäisessä ryhmässä.
    Laitetestaaja PASS 1–3; kohdat 4–5 (väliotsikko, Pulun persoonatagi) yksikkötesteissä vihreät, laitteella todentamatta
    (kohta 5 vaatii yhden oikean Pulu-kysymyksen, kuluttaa xAI:ta).
- Kaikki roolit TAUOLLA ja luovutukset pushattu (ks. kohta 2). YÖPOLTTO jatkuu itsenäisesti (vahti v5e PID 85590).
- Omistajan päätökset: historian hetket 1–2 kaikkiin puuttuviin Euroopan maihin (Codex, Sisältökirjuri tarkistaa);
  aloituslento v2 palaute: "kone pitää näkyä paljon pienempänä kun se kuvataan kaukaa. laskeutuessa kamera pitää olla sen
  verran kauempana että töksö laskeutuminen ei näy kun kone näkyy ihan pienenä."; astronautin kamera -toiveet (ISS-kyyti,
  selaus, naapurikohteet, himmeä maapallo taustalla).
- #3426 (5 historian hetkeä) mainissa #3515 v2346.

## 2. Roolit ja luovutukset (tilinvaihdon jälkeen aloitusviestit näistä)

| Rooli | Luovutus | Kärki tauon jälkeen |
|---|---|---|
| Julkaisija | origin/julkaisija-luovutus-20260928: viesti-julkaisija-luovutus-20260928-tilinvaihto.md | juna tyhjä; #3516, #3517, #3514 odottavat |
| Natiiviseppä | origin/selvittaja-3d-luovutus: viesti-natiiviseppa-luovutus-20260928-p.md | ALOITUSLENTO v3 omistajan palautteesta (aloitusviesti Fablen haarassa viesti-natiiviseppa-aloitus.md — päivitä kärki), Kinderdijk 6cecf733 laiteajo, RAE/PATINA, 1.0.35-juna aamulla (1.0.34 = puhetagit, julkaistu) |
| Pelikoodari | pelikoodari-tyo-20260923: viesti-pelikoodari-luovutus-20260927-f.md | #3516 laattavika (juurisyy pallolaatat.js, savuke ennen/jälkeen aamulla), #3517 ihme-nappi pois, astro-selaimen web-osuus |
| Linssiseppä | viesti-linssiseppa-luovutus-20260928-p.md (f34ef775b) | erä 5 laitekuvat, lippu+symbolit kuvaparit, astro-selain c5b073cd kuvapari (Fable hyväksyi galleria jatkuu naapuriin + nimipilleri kirkastuu 1,2 s), sitten ISS-kyyti |
| Natiivi-UI | viesti-natiivi-ui-luovutus-20260927-aa.md (b81a9ba34) | nimet-laskuri 5d79edd9, ihmekuva natiiviin #3517:n speksistä |
| Karttaseppä | origin/karttaseppa-tyo-20260922: viesti-karttaseppa-luovutus-20260928.md (f8c92e5c8) | polton loppu → vienti + osoitin OMISTAJAN KORTILLA; monitori estetty → Postivahti seuraa aja.out:ia |
| Siirtoseppä | origin/siirtoseppa-luovutus: viesti-siirtoseppa-luovutus-20260926.md (cccc4ef9c) | E2E-offline Tanska + Kroatia (F989814A) |
| Laitetestaaja | viesti-laitetestaaja-luovutus-20260928-d.md (69e062ad6) | BUILD 34 kohdat 4–5, simulaattorit sammutettu |
| Sisältökirjuri | Matkakirja-sisaltokirjuri: viesti-sisaltokirjuri-luovutus-20260927-j.md + aloitusviesti (sessio nollattu, EI aloitettu) | LISÄÄ aloitusviestiin Fablen käskyt: 1) ihmeet 14 maahan (AUT, NLD, CHE, DNK, SWE, SRB, BIH, ALB, MKD, MNE, CYP, MLT, MDA, BLR) ja historian hetket 1–2 per puuttuva Euroopan maa (js/packs/historian-hetket.js) → ehdota mielekkäät → Codex-tilaus postilaatikkoon (haara claude/postilaatikko, posti/); 2) Kronborgin nostoankkuri 12.7125 E → 12.62 E; 3) CZE+HRV pitkä-tekstit korjataan Livian nykyaikaääneen (sama kuin ROU #3514); 4) #3514 ROU kuittaus Julkaisijalle; 5) sitten UKR-jono |
| Postivahti | — | kierto 10 min, seuraa polttoa (aja.out "2 koodi 0" → Karttaseppä + Fable); juna-tauko tarkoituksellinen polton loppuun |

## 3. Aamulla

Polton vientikortti omistajalle (Karttaseppä kokoaa), juna-tauon purku (/tmp/matkakirja-juna-tauko) polton jälkeen,
savukkeet ja laitekuvat (Pelikoodari #3516/#3517, Linssiseppä erä 5 + symbolit + astro-selain), aloituslento v3 -video omistajalle,
1.0.35-juna (Natiiviseppä). Viikko: kaikki mallit 91 %, nollautuu ma 28.9. klo 10.00.
