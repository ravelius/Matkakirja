# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 18.10.2026 klo 19.3x; omistaja 19.27: "tee siirtoprompti, vaihdan toiseen tiliin, se aukeaa jo klo 4 aamulla")

Vanha tili: viikko 99 %, nollautuu 19.10. klo 10.00. Uusi tili: gmail (viikko nollautuu ma 19.10. klo 03.59), Asemataulu
R6VQFTUNq629zSzah719Uy (osoitteet scratchpad/asemataulu/osoitteet.md). Tarkka tila: tämä tiedosto + PT:n uusin luovutus
docs/raportit/viesti-fable-luovutus-20261018-iltapaiva.md (14.2x; sen jälkeen tapahtunut kohdassa 3). Mallina -20261018.

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja avaa uudella tilillä session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium) ja liittää:

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)".
> Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. Lue CLAUDE.md, docs/raportit/viesti-fable-siirtoprompti-20261019.md
> KOKONAAN ja docs/raportit/viesti-fable-luovutus-20261018-iltapaiva.md KOKONAAN sekä muistin MEMORY.md (pt-kuvan-tarkistus-taysikokoisena,
> julkaisu-vasta-omistajan-pyynnosta, yksi-juna-kerrallaan, testaus-vain-automaattiset, huomisen-tyot-vasta-huomenna).
> Ensin set_remote_control self true. HETI sen jälkeen luo KESKUSTELUKANAVA (Opus, max, kansio Matkakirja-fable, start_session,
> irrotettuna) aloitusviestillä "Olet KESKUSTELUKANAVA (Opus, max). Lue
> /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan."
> Omistaja puhuu vain KK:lle. Ota roolisessiot käyttöön kohdan 2 mukaan (aloitusviesti kullekin; jos sessiota ei ole, luo se),
> kytke Remote Control kaikille, päivitä /Users/Shared/Claude/osoitekirja.md uusilla id:illä, käynnistä odottajavahti ja
> Codex-postivahti (kohta 4) ja käytä tämän tilin Asemataulua R6VQFTUNq629zSzah719Uy. EI jonokierros-cronia (Postivahti herättää).
> Jatka kohdasta 3. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit

EI uusia luovutuksia (viikko 99 %): roolit jatkavat viimeisimmästä luovutuksestaan + oman haaransa git logista. Keskeneräinen
työ on commitoitu ja pushattu omaan haaraansa yhdellä Postivahdin kierroksella ennen pysäytystä.
Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Aja ensin git fetch origin, lue CLAUDE.md, Raamatun Ydinajatus kohta 2,
oma uusin luovutuksesi (MEMORY.md, Rooli-tilaraportit) ja oman haarasi git log 18.10. iltapäivän jälkeen, ja jatka.
Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, medium). Jos sait vanhoja PT:n viestejä, ne on jo tehty."
Checkoutit ja mallit: /Users/Shared/Claude/osoitekirja.md (ennallaan).

19.10. erät (haarat valmiina, juna 204; vain omistajan "huomiselle"-pyynnöt, ks. kohta 3):
| Rooli | Haara / sha | Mitä |
|---|---|---|
| Pelikoodari | pelikoodari/iss-nopeus-204 7c3448de0 | B6 nipistys + B7 nopeussäädin −1000…0…1000 (koodattu, ei simua); kysymys: iPadin vipu fyysisesti pidemmäksi? → KK |
| Natiivi-UI | natiivi-ui/iss-otsikot-204 ae7f66b52 | B3 vieritys + B4 otsikkorivi (PT hyväksyi pohjat: LIVE/NIMET-napit, PYSÄYTYSKUVA, KokoRuutu); simu + kuvat; B2 Codex-tilaus (1 kuva, lupa 16.14) |
| Valoseppä | linssiseppa2/iss-nostot-204 | B5: lista proto-3d/_tyo/linssiseppa2/B5-iss-nostot-lista.md; hurrikaani + vanat ensin; Codex-havainnekuvat 11 (supistettu 7) → KK:n kortti |
| Sisältökirjuri | main c0cf5354b (luettelo 1 190 kohdetta), c8930b6b6 (näyte 10) | B1: PT katsoo näytteen ja rajat (aloitus ≤45, luonne ≤110, arvo ≤24) → erät: alueet+vuoristot, 164 vanhaa uuteen rakenteeseen, kaupungit väkiluvun mukaan |
| Linnanrakentaja | (main) | v11b kehysveisto (pehmennys + pidempi jakso) → pari v10/v11b PT:lle |
| Linssiseppä | linssiseppa/… (luovutus 69246f0f8) | Mona Lisan keskikävelyn ~3 m hyppy, kameraloki 1d9d29c76 |
| Natiiviseppä | — | juna 204 -runko PT:n kuittauksella (TF 203 fe492a7ff pohjana) |
| Julkaisija, Postivahti, Asemataulu, Karttaseppä, Siirtoseppä, Äänittäjä, Laitetestaaja | — | levossa / normaali kierros |

## 3. Tila 18.10. klo 19.3x

- TF 202 testaajilla (sisäiset 14.50, ulkoiset 15.28, Mac 14.49; aloituslogo heti, NUI 2b944e920).
- TF 203 testaajilla (sisäiset ja Mac 16.55, ulkoiset 16.56; BUILD fe492a7ff, runko 215c516a6, M 0124eedea): ISS A1–A8
  (kaasuvipu, EXTEND pallon yläpuolella, minipallo hitaammin, kupola peilikuvaksi ja hitaammin, zoom hidastaa, valinnan feidaus,
  TULOSSA 4 ilmiöllä) + Louvren GG-penkit ja kattoikkunan ruudukko (LR c8895c85a, kehykset v10).
  Huomio: valinnan musta kesti 8 s (latausraja ei täyttynyt) → C2 korjaa.
- OMISTAJAN PÄÄTÖKSET: 16.10 "voit käyttää koko 100%" (Raamattu + loki #4879 mergetty); 16.15 "ÄLÄ TEE HUOMISEN TÖITÄ" (muisti
  huomisen-tyot-vasta-huomenna); 16.19 "älä tee mitään … ei jutella enempää ellei pakko".
- 19.10. TYÖT = /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/omistajan-pyynnot-20261018-1602.md kohdat
  B1–B7 (juna 204) + C1–C6 (omistaja 17.55; KK välittää sanatarkasti uudella tilillä). Asemataululla rivi "Juna 204 (huomenna)".

## 4. Ajastukset uudessa sessiossa

- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, uudelleen joka vanhenemisella.
- Monitor "/Users/Shared/Claude/hooks/codex-posti-vahti.sh", timeout_ms 1800000, uudelleen.
- EI jonokierros-cronia.
