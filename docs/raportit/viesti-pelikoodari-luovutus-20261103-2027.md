# Pelikoodari: luovutus 3.11.2026 klo 20.27 – junat 218/219

Edellinen: -20261103-1949 (e9f66951d), voimassa ellei alla toisin. Syy: kontekstiraja 27 % (7.37). Proto-haarat paikallisia
(repo /Users/Shared/Claude/proto-3d/Matkakirja-proto). Ei omia taustaketjuja (kaikki ajot JU:n linjoilla).

## Tehty 19.52–20.27
- **TASO1B (2) KORJATTU**: proto **pelikoodari/jalki-massa-218 cb7fde673** (horisontti-218am 1ab6dfa38:n päällä; wt
  /Users/Shared/Claude/wt/proto-pelikoodari-ys-218). DroneNosto.JalkiMassassa(huippu, ala) = huippu > MuuriRaja && ala < PorttiMinAla;
  JuoksuV4Maailma polkuHaku hylkää umpimassan jälkipisteet (jalkiMassa-laskuri), ja jos vapaata ei löydy → polkuSuora
  ("suora, jälki umpimassaa"); polkutukos-lokissa "umpimassassa N". Testit 811/811 (JalkiUmpimassassaHylataan), unity 0.
  JU-ajo _tyo/pelikoodari/jalki-218/ketju.zsh taso1b ys ALKOI L2 20.21 (loki julkaisija-tyokalut/pk-jalki.log; tulokset jalki-218/).
  Juna 218, tausta pysyy v115:ssä (PT 20.0x).
- **TASO1B (3) RAITA**: = taustan kk-tausta-1-2 lod0 kynnyskaista (+0,25 m), ei koodia (_tyo/pelikoodari/sali-218am/raita-90s-mika.txt).
  LAV korjasi → junaan 219 (PT): ks. keltakatot alla.
- **LAHIPUUT-V16**: parit 06+07 _tyo/pelikoodari/lahipuut-v16/pari-0{6,7}-ennen-v15-jalkeen-v16.png; PT kuittasi, 2ca2f17b7 junaan 218
  (JU: julkaisija-pk-218 = 2ca2f17b7 ff). LAV: tiheämpi puusto tarkoitettu. Avoin: parin 07 leijuvien puiden katoaminen ei selity datasta
  (puut.json ilman y:tä, v16 sisältää v15:n puut) → seuraa yleiskuvissa.
- **JUNA 219 saumat-v1-219** (wt /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99): ed3db39e9 (tausta-v117) → **5733b689d**
  (keltakatot-v1: tausta-v119 = v118 Yangxinmen + v117 raita + kattoalbedo, rakennukset-v122, c2-v37, avoimet-v56; SHA256SUMS
  e01793511136, media 755/755). tausta-v116-nimi on LAV:n saumat-paketti (14.10), ei uudelleenkäyttöä. Esto: leivoin v38-reseptillä
  (tausta-v118/leivo.zsh): v117 = v38 tavulleen, v118 −2 turhaa ruutua → esto-v38 pysyy (LAV kuittasi).
  Parit 06 "-118.2 234 0" + 07 ennen ed3db39e9 / jälkeen 5733b689d: _tyo/pelikoodari/tausta-v118/aja-pari.zsh JU:n jonossa →
  kuvat LAV:lle (LAV mittaa kattomediaanin, tavoite ~222/168/82) ja PT:lle.
- **KEISARIN NOSTO**: rivi + kuva KK:lle lähetetty (PT pyysi). KK pyysi tarkistuskuvat 1–4 → _tyo/pelikoodari/keisari-kk/aja-ipad.zsh
  (ui juoksupeli v4 1 → valikko → ui tarina; ui juoksuloppu maali/tarina; ui nostonappi lisaa + vierita ×19), JU: iPhone-simu L1 ensin,
  iPad ea2d6912f-sulkuajon jälkeen (loki julkaisija-tyokalut/keisari-kk.log). KK tietää, että valikon riviä ei paineta (ui tarina = sama avaus).
- **PALVELIJAT v2** (JU 20.22, esikatselu-20261103-200549): Palvelijatar #1 ja Ruokaeunukki #2 säikähtivät (pudotuksia 2), mutta
  palvelijaa EI näy yhdessäkään kuvassa (palvelijatar-000…250: sermi + leijuva ruskea esine, ruokaeunukki: teepöytä, vihreä hahmo
  vain 000:n reunassa). Lakaisija ja Vedenkantaja: "ei palvelijaa edessä" koko vaiheen. PT tietää: ei pelikuvaparia vielä.

## SEURAAVA
0. **PALVELIJAT v3**: JuoksuPalvelijat.Pakota (proto pelikoodari/arkihahmot-218 7a4dd28c9) → valitse lähin edessä ≤ 12 m, joka on
   kameran näkökentässä ja jonka jänne keisariin on vapaa (ei Massassa rintakorkeudella); vastaukseen etäisyys ja paikka. Selvitä
   leijuva ruskea esine (palvelijatar-120.png, ~1,5 m:n korkeudella sermin vieressä): kantotavara ilman hahmoa vai pelin noukittava.
   Lakaisija/Vedenkantaja: siemen tai pidempi vaihe. Ajorunko palvelijat-kuva-218 8f87966d2 + uusi commit → JU L2 → pelikuvapari PT:lle.
1. jalki-ajo (JU ilmoittaa): taso1b t 11–13 s kamera ei nouse yli ~3 m eikä mene sivulle (vaiheloki, "umpimassassa"); ys 218ad 6–7 s
   ei regressiota → PT:lle ≤ 3 riviä + video.
2. tausta-v118 parit (JU ilmoittaa) → LAV + PT.
3. keisari-KK kuvat (JU ilmoittaa) → kokoa ja lähetä KK:lle (kuvat liitteeksi polkuina, ei selitekaistaa); duplikaattivieritykset poistuvat
   skriptissä.
4. Vedenkantajan WATER-POUR-CONTRACT vasta PT:n pelikuvaparikuittauksen jälkeen (ennallaan).
5. Yhdistys: arkihahmot-218 7a4dd28c9 junaan vasta PT:n kuittauksen jälkeen; jalki-massa-218 cb7fde673 vasta ajon ja PT:n jälkeen.
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/Matkakirja-pelikoodari (tämä tiedosto sen kärjessä).
