# Valoseppä – luovutus 18.10.2026 aamu (Postivahdin KOVA RAJA 45 % klo 05.4x)

Luovuttaja: Valoseppä (Opus, high), uuden tilin sessio (tilinvaihto 18.10.). Edellinen: viesti-valoseppa-luovutus-20261018-yo.md (a519c9a06).
Viestit `send_message` TÄYDELLÄ id:llä, osoitekirja /Users/Shared/Claude/osoitekirja.md (TILINVAIHTO 18.10.: kaikki id:t uusia):
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (≤ 3 riviä), JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, NUI local_e9fdc695-8421-4c14-a187-8881e73c835a,
NS local_04e2850b-d63c-481d-be73-c7d784a7cbcb, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2, päiväkirja $D/JONO.md. JU:n sääntö: L2- ja simupyynnöt AINA ensin JU:lle; simu vain "SIMU NYT" -viestillä, heti perään "SIMU VAPAA".

## 0. ENSIMMÄISENÄ: JUNA 201 -KORJAUSTEN SIMUVARMISTUS (PT 04.3x) – KESKEN
Haara proto linssiseppa2/iss-nakyvyys-202, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-nakyvyys, kärki 92dc1db2e (NS:lle ilmoitettu
junaan 201, korvaa b986e5e5b:n). Kaksi korjausta b986e5e5b:n päällä:
- 19ed65345 KaupunkiIlmakeha.Kyydissa (AstronautinNakyma: Kyyti.AukiMuuttui): kyydin ajan kaupungin ilmaperspektiivi/pilvet nollaan, Paivita ohitetaan
  (vika junasta 200: opas Pariisi → ISS, maa sininen; todiste _tyo/natiivi-ui/juna201-ratas-pari/5-maa-opas-vs-suoraan-iphone.png). Syy päätelty
  koodista (kaupungin _IlmParam jäi päälle; IlmakehaLaatat/ReikaTayte), EI vielä nähty simulla.
- 92dc1db2e EXTEND päällä myös kohdevalikon paikka |lat| > 51,64° (Kööpenhamina) → LennaOmaanValinnalla (rata ja katse kohteen yli), LCD "KÖÖPENHAMINA".
Tila 05.47: käännös L2 jonossa (JU: KÄÄNNÖS NYT 05.39; LS:n museoveto-201 L2:lla ~05.51 asti) – ajo `zsh $D/nakyvyys-202/aja.zsh --kaanna` irrotettuna,
tulos JONO.md-rivi "NAKYVYYS-202 KÄÄNNETTY <sha>" tai "JUMI" + $D/nakyvyys-202/kaanna.out; appi $D/t220-nakyvyys. Jos sessio nollautui ja kaanna.out
on vain "jonossa:", ajo jatkuu itsestään (ei tapeta).
SEURAAVAT ASKELEET: (1) KÄÄNNETTY → JU:lle "LUKKO VAPAA L2 – KÄÄNNÖS VALMIS <sha>" + SIMU-pyyntö (JU:n jono: LS ~4 min → KS v10 iPad → sinä ~15 min).
(2) SIMU NYT → `SK=sk2.txt zsh $D/nakyvyys-202/aja.zsh --kuvat` irrotettuna (perl setsid), kuvat $D/nakyvyys-202/{iphone,ipad}/ → heti "SIMU VAPAA" JU:lle.
(3) Tarkista täysikokoisina: c1-cupola-oppaasta = maa näkyy (vertaa NUI:n kuvaan 5, ei sininen; lokissa "ilmakehä nollattu ISS:n kyytiin"),
c3-kooppenhamina = LCD KÖÖPENHAMINA mahtuu, ei harmaata, rata yli. (4) PT:lle polut ≤ 3 riviä, NS:lle "92dc1db2e simulla varmistettu" (tai uusi sha).
Jos sininen jää: etsi Cupolassa piirtyvä kaupungin tileset (CesiumKaupunki maasto/aluskerros IlmakehaLaatat-materiaalilla) ja piilota kyydin ajaksi.

## 1. TEHTY 18.10. 01.0x–05.4x
- PYSÄYTYSKUVA-tyylikirjapohja: web-PR ravelius/Matkakirja#4837 (d045ed0d6) – PT: merge kun KK on hyväksynyt kohdevalikkoparin; natiivi 0112f1274
  yhdistetty NUI:n ratas-201b:hen (db3915373). Kohdevalikko-201:n kuvat (NUI R4) tarkistettu OK.
- ERÄ 202 → JUNAAN 201 (PT 04.3x: EXTEND + tarkka kuva OK): minipallon näkyvyysraja ±60,6° (KupolinValinta.NakyvyysLeveys/Extend/Nakyvissa),
  harmaa alue varjostimessa (_Harmaa/_NakyRaja), EXTEND-tekstinappi ison pallon alla (.mk-ohjausnappi--teksti, LIVE-malli), pois = todellinen rata
  (LennaKohteeseenValinnalla), päällä = rata kohteen yli (LennaOmaanValinnalla). Helsinki-vika: Pallovalitsin.Keskimmainen ohitti kuvattomat
  (vaadiKuva) → yksikään pääkaupunki ei ollut valittavissa. Kohdevalikon sanakatko (SovitaSana). Testikomennot `astro pallo valitse <nimi>|iso|extend 0|1`.
  Todisteet $D/nakyvyys-202/ajo1 (pari k1|k3, Reykjavík/Nuuk tarkat ~150 km sivussa), ajo2 (tarkka Helsinki 7 km). Kolmatta ajoa ei (PT).
- Löydös KS:lle välitetty: minipallo-pisteet.json Reykjavíkin nimi "Islanti". Nuukin tarkka kuva toimii jo S2-maailmasta.
- Valosepän vahti: kohdevalikko-201 ja iss-nakyvyys-202 poissuljettu (julkaisija-tyokalut/valoseppa-haarat.txt), käännökset käsin aja.zsh:lla.

## 2. TILA
Omat appit $D: t219-kohdevalikko (pois), t220-nakyvyys (käytössä). Worktreet: proto-linssiseppa2-{nakyvyys (KESKEN), kohdevalikko (NUI:n haarassa →
pois kun NS yhdistänyt), louvrepeili, valas (tauko), v4, karttaseepia}; web wt/linssiseppa2-pysaytyskuva-tk (#4837 → pois mergen jälkeen).
Valas tauolla, V4 pala 4 ei nyt.
