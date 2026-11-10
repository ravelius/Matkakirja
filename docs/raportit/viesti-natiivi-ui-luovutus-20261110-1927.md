# Natiivi-UI: luovutus 10.11.2026 klo 19.27 (kontekstivahti 25 %; korvaa -1711:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Natiivin haarat natiivi-backup-remotessa, worktree /Users/Shared/Claude/wt/proto-nui-nimizoom
(nyt haaralla natiivi-ui/tapit-samalle-korkeudelle, puhdas). Unity: `sh Peli-testit/unity-tarkistus.sh`, testit `sh Peli-testit/kaanna.sh`.
Mac-esikatselu AINA ESIKATSELU_PISTEKERROIN=0.465 + `ui kamerasuhde laite` + `komento maasto siirtyma 5 0 30` (19.1x unohtui kerran).
Edellinen: `git show origin/natiivi-ui/luovutus-20261110-1711:docs/raportit/viesti-natiivi-ui-luovutus-20261110-1711.md`.

## 1. JÄTTINIMET (PT KIIREELLINEN 18.5x) — KESKEN, ODOTTAA JU:N PYSTYAJOA
- Omistajan kuva 18.53 pieni iPad (11", 1668×2420) PYSTY: /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261110/
  omistaja-1853-pariisi-jattinimet.png. Piirrosnimet jättikokoisina ja päällekkäin; kuvassa näkyvät tasojen 11–13 nimet (Panthéon,
  Luxembourgin palatsi) lähinäkymässä, 3D-talot puuttuvat (KS selvittää puuttuvat mallit). Lisäksi kirja-kuvake ja Liiku-teksti haaleita (ei vielä katsottu).
- PT:lle sanottu: ei nimizoom/kuvakyltti (kuvakyltti vain poistaa nimiä tähden luota; nimizoom vain napautuksesta). Hypoteesi: nimitaso
  (Nimikerros.JatkuvaTaso / Taso) jää liian matalaksi kameran korkeuteen nähden → tason 11–13 nimet maailman mitoissa lähellä kameraa.
  Jättikokoraja (ElavaHaipyyPt 34 / ElavaPoisPt 44, Nimikerros ~rivi 815) koskee vain elava && !katto && !suurkaupunki.
- Toisto sk /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-jattinimet-pysty-1.txt (juna 224 04a986a1b; Latinalaiskortteli kallistus 60,
  nimet etsi, kiinteä ladonta pois -pari). Tulokset:
  - pysty-1 (pistekerroin 1, EI PÄDE) ja vaaka-1 (0.465, lokit/nui-jattinimet-vaaka-1-04a986a1b): EI toistu, taso 15/16, Panthéon syy
    kyltti, Luxembourg syy taso, nimet normaalikokoisia.
  - JONOSSA JU:lla: pysty-1-u (0.465) → lokit/nui-jattinimet-pysty-1-u-04a986a1b. Tee: katso, nimet etsi -rivit (taso!).
- Jos pystykään ei toista: Mac-batch valitsee osan 640×480:sta; ero laitteeseen voi olla piirroslinssi (3D-mallit puuttuvat → piirros
  lähinäkymässä, PalloKierto.PiirrosLinssi, linssiK, LogiikanFov) tai drone (LiikeTappi, DroneSyvyys 5). Seuraava askel silloin: iPad-ajo
  PT:n luvalla tai koodista nimitason laskenta piirroslinssissä. Syy + korjaus PT:lle 1–3 rivillä.

## 2. KARTAN TAPIT SAMALLE KORKEUDELLE (omistaja 18.57 PT:n kautta) — TEHTY, PARI JU:N JONOSSA
- c3e1e6741 natiivi-ui/tapit-samalle-korkeudelle (juna 224 04a986a1b + 1): KameraTappi nousee kartussin yli samalla kaavalla kuin
  LiikeTappi (LiikeTappi.KartussinYlaraja), tilarivillä "kartussinosto kyllä/ei". 898/898, unity 0.
- JU ajaa sk-tapit-korkeus-1.txt pienen iPadin koolla: pysty 1668,2420,0,40,1668,2332,2,1 → lokit/nui-tapit-korkeus-1-pysty-c3e1e6741,
  vaaka 2420,1668,0,40,2420,1580,2,1 → …-vaaka-c3e1e6741 (0.465). Tee: katso (tapit samalla korkeudella, vasen kartussin yllä, oikea
  Pulun vasemmalla ei päällä) → pari PT:lle → valmis-rivi + pt-ok-pyyntö.

## 3. TAVOITEPALKKI — VALMIS, JUNASSA ODOTTAA PT-OK:TA
- 308cd1d16 natiivi-ui/juoksu-tavoitepalkki (sis. PK 93a4f77f2 TasoAika; lause omistaja 17.52 "Pakene vartijoita, kunnes palkki täyttyy ja
  portti aukeaa."; loppu kirkastuu, portille lasipohja, lause tummalla pohjalla elämäpalkin alla). iPad-kuvat lokit/nui-juoksu-tavoitepalkki-3-ipad-3dac2574c.
- PT 19.2x: "luettava, hyvä"; opastekaistan haaleus = häivytysvaihe (vastattu). PT-OK-pyyntö lähetetty. JU: MR29 → 224.39. Tee: versionumero KK:lle.
- PK osa 11 aae0ab729: lähtölause pois kehotekaistalta (ei tuplana); vain voimat tieto-ohjeina.

## 4. JUNASSA JO
- 224.31 effce09e2 nimen napautus (Pariisi), 224.33 796969586 nimizoom kaikki, 224.34 5ce11c0c5 kuvakyltti (versio KK:lle lähetetty 17.5x).

## JONO
Kohdat 1 ja 2, sitten rivi PT:lle "JONO TYHJÄ: natiivi-ui". Avoin (vain pyydettäessä): kuvakyltin reunarajaus (Bastilji ruudun alareunassa).
