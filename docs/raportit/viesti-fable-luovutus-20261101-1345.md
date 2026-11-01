# PT:n luovutus 1.11.2026 klo 13.45

Edellinen: viesti-fable-luovutus-20261101-1015.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Viestit send_message id:llä
(SendMessage-raja täyttyi 13.3x → mcp__ccd_session_mgmt__send_message). Omistaja hereillä. `date` ennen aikaleimoja (PT:n kello oli
13.2x asti tunnin edellä – KK huomautti).

## OMISTAJAN PÄÄTÖKSET TÄNÄÄN 10.15 JÄLKEEN (lokissa: PR 5839, 5841, 5848)
- 10.2x: Pariisin pääkohteet yhtä liioiteltuja kuin G:ssä kaikilla tasoilla (metreinä G:stä).
- 10.4x: neljä yhteistä simulaattoria, muut 28 poistettu (omistaja ajoi poiston 11.0x, ~383 Gt). Raamattu 12.17/12.19 (PR 5841).
  JU: simu-lukko.sh kaari <rooli> <simu> -- … (PR 5842). Yösiivouksen launchd-rivi KK:lla omistajalle, EI vielä kytketty.
- 12.10: Pariisin laaja v4 hyväksytty ("Ok").
- 13.02: "Minulle voi laittaa myös kuvia valosta ensin" → kuvat ennen tallennetta.
- 13.21: ND-terävyysparista: "notre dame on väärän näköinen verrattuna g:hen. katso itse tarkemmin" → pari oli vertailukelvoton (muistiin).
- 11.37: kysyi, etenevätkö kaikki työt → striimikartan 60 fps oli seissyt; NS jatkaa (alla).
- Omistaja huomasi KK:n Remote Controlin olleen pois → PT kytki päälle; Postivahti tarkistaa joka kierros.

## JUNA 216 (runko aea684c3c NS:llä: v4-leivonta rakennukset-v91, tausta-v90, c2-v31, muurikate-v37 + VS:n räystäskartta/p4)
Ei lukitusta eikä TF:ää ennen omistajan hyväksyntää uudesta Pariisista ja valosta.
1. VALO (VS): v4-pelikuvat 8 kohtaa KK:lla/omistajalla (lokit/havainne-editori-20261101-133524/koonti.png). PT:n ja KK:n havainnot
   VS:lle jonossa: (a) rakennusten heittämät varjot aukioilla ja hallissa puuttuvat/heikot, (b) ilmakuva 07 haalea + valkoinen
   pystyraita taivaalla, (c) kivetys ruskeampi/saumat tummemmat kuin havainne, (d) vaaleat läikät 03/04. VS:ltä odotetaan YKSI rivi
   syystä + ehdotus PT:lle; sitten piha 06 kauko + värimittaus. ÄLÄ keskeytä VS:n ajoja runkotiedotteilla (viivästytti 13.xx).
2. PORTTI (PK): Meridiaaniportin keskioven yllä kuultaa vaalea puolikaari + trapetsi (PK:n tallenne 20261101-131815, arkki rivit 2–4).
   LAV: ei mallissa (havainnot proto-3d/_tyo/linnanrakentaja/leivonta-216/uusinta/meridiaani-kaari/havainnot.md). PK selvittää pelistä
   (tunnelin holvi läpi, doubleSided/renderQueue/LOD/PorttiOvet) → korjaus NS:lle → UUSI tallenne PT:lle → KK. Tallennetta 13.18 EI omistajalle.
3. PARIISI (KS, luovutus 13.43 PR 5850, nollaus Postivahdilla): laaja v4 sävytetty (pariisi-laaja-g-v4-savy.png), välitaso 12/12 hyväksytty.
   Lähitaso ~1 m/px koko kaupungille: 147 palaa 6 erää (SUUNNITELMA.md lahitaso-20261101), erät 1 (8ced1e0e4) ja 2 (17a389d40) Codexilla.
   AVOIN OMISTAJALLE: keskustan tarkkuusalue 0,5 m/px (~54 palaa) vai ~1 m/px. Kysymys odottaa UUTTA paria: KS:n kolmikko
   nd-05m-koepala-20261101/kolmikko-{koko,lahin}.jpg (G | G 2×2 | 0,5 m/px G-tyylissä), kohta 3 odottaa Codexin ND-koepalaa (c240fc87f, 2 palaa).
   PT tarkistaa kolmikon (sama kohde kokonaan, sama rajaus) → KK. PT 12.2x: PorrastettuPelissa true vasta kun koko kaupungin lähitaso valmis
   (lähin zoom ei muutu). Erästä 3 alkaen KS tilaa erä kerrallaan PT:n kuittauksella.
4. 60 FPS (NS): PelinKaupunki-ruutuindeksi kuitattu (haara natiiviseppa/fps-elavat-216 70861ee16, testit ok); iPad-mittaus ennen/jälkeen
   + nimikuvat → PT → junaan erillisellä kuittauksella. Striimikartan rivi päivitetty (omistaja kysyi).

## MUUT
- Levy: sisäinen 124 Gi (10.20). Kartoitus /Users/Shared/Claude/_levy/kartoitus-20261101.md ei ollut valmis 10.20; poistolista
  _levy/poistolista-pt-20261101.md (simuosuus TEHTY). NAS-siirrot ja omistajan poistolista kartoituksen pohjalta.
- KK:n simuraportti _levy/simu-lapikaynti-20261101.md: avoimet 12.12 vs 12.18 (simuja päivällä 1 vs 2) – ei vielä linjattu.
- Postilaatikon monitori: viimeisin 17a389d40. Viritä uudelleen aloituksessa.

## Säännöt, jotka opin
- Omistajan asennusrivi: git -C … fetch + git show origin/main:polku, ei cd && git pull (KK korjasi).
- Pari omistajalle: sama kohde kokonaan kaikissa ruuduissa, ei vanhoja ei-G-piirroksia vertailuna.
- Runkotiedotteet kuvausajossa olevalle roolille vain, jos muutos koskee kuvattavaa.

## LISÄYS 13.5x (VS)
- VS: pelikuvissa ei yhtään elävää heittovarjoa (ei hahmonkaan); elävä aurinko 188°/30° ≠ leivonnan 318°/45°. PT: simukuva 03 yhteinen-iPad13 hyväksytty; VS selvittää LAV:n kanssa leivonta-auringon (PT hyväksyi 30.10. leivonta-aurinko.json 169,97°/30°; 318°/45° = vika). Sitten kivetyksen sävy, läikät, 07. Tiedostot havainne-editori-20261101-133524/{varimittaus,syyt-ja-ehdotukset}.txt.

## LISÄYS 13.5x (omistaja 13.46)
- "hyvä. tärkeintä on ensin saada visuaalisuus kuntoon, tehdään muut vasta sitten" → valon viat ja Pariisi ensin; NS:n 60 fps vasta kun NS ei ole tarpeen valon korjauksissa (lokissa).
- 13.5x VS: VIKA vahvistettu: v4 leivottu 45°/318° (havainneaurinko, leivonta-aurinko-f4df529a6.json), peliaurinko 30°/188° → varjot eri suuntiin. PT päätti: peliaurinko 45°/318° ilman uutta leivontaa (VS:n haara aea684c3c:n päälle) → simukuva 03 + koonnin uusinta → PT → NS.
