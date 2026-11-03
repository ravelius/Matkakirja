# Pelikoodari: luovutus 3.11.2026 klo 21.06 – junat 218/219

Edellinen: -20261103-2027 (03f1f2531), voimassa ellei alla toisin. Syy: kontekstiraja 25 % (7.37). Proto-haarat paikallisia
(repo /Users/Shared/Claude/proto-3d/Matkakirja-proto). Ei omia taustaketjuja (kaikki ajot JU:n linjoilla).

## Tehty 20.29–21.06
- **PALVELIJAT v3** (proto arkihahmot-218 56f27ac1b, ajo bb05cbdfa, JU 20.35, kansio proto-3d/_tyo/pelikoodari/palvelijat-v3/):
  pakotus vain ≤ 12 m, kameran kuvassa (reuna 10 %) ja vapaalla näkölinjalla keisarin rinnasta (JuoksuV4Maailma.PalvelijaKuvassa);
  vastaukseen etäisyys/paikka, epäonnistuessa lähin + syy (JuoksuPalvelijat.MiksiEi). Tulos: 0 säikähdystä.
  Leijuva ruskea esine v2:n kuvissa = pelin MÄTÄ OMENA (ei hehkua, paikallaan jo ennen irtoamista), ei palvelijan tavara.
- **PALVELIJAT v4** (arkihahmot-218 **86476dd60**, ajorunko palvelijat-kuva-218 **c35e3d150**): (a) palatsin kujat ≤ 3,6 m
  (JuoksuPalatsiVerkko.LeveysMax) → aukiolajit puuttuivat → kapealla kujalla b 0,8–0,9 lakaisija, ≥ 0,9 vedenkantaja (työssä);
  (b) näkölinja palvelijan kujan puoleiseen kylkeen 0,6 m (seinäruutu osui); vastaukseen PalvelijaSyy. Testit 815/815, unity 0.
  AJOPYYNTÖ JU:lle 21.05: zsh proto-3d/_tyo/pelikoodari/palvelijat-v4/aja-v4.zsh 1 (jonossa).
- **JALKI-218 cb7fde673** (JU 20.41): ys ei regressiota (umpimassa-ehto ei lauennut). taso1b (2) EI korjautunut: t 11,3–11,9 kamera
  5,5 m ja 2,8 m sivulle (2,0 m:n jälkipiste (124,1, −820,9) kelpasi, tavoite oikaisi työhuoneen kulman läpi, vaatii 3,9 → tarve 5,4,
  KulmaPito + jousi). → **v2 b72a1b16a** (jalki-massa-218 kärki): jälkipiste hylätään, jos suora kPaikka → piste osuu umpimassaan yli
  1 m jäljestä (DroneNosto.OikaisuMassassa, OikaisuPolkuVara); ei kun kameraTukossa. Loki "umpimassassa N (oikaisu M)". 812/812.
  JU ajaa ketju.zsh taso1b ys L2 alk. 21.00 (loki julkaisija-tyokalut/pk-jalki.log, tulokset jalki-218/).
  RISKI: jos kaikki hylätään, polkuSuora kulkee keisarilta kohti raakaa tavoitetta ja voi osua samaan kulmaan → nosto voi jäädä.
- **TAUSTA-v118 PARIT** (juna 219 keltakatot-v1 5733b689d): parit tausta-v118/parit/pari-0{6,7}-ennen-ed3db39e9-jalkeen-5733b689d.png
  (kokoa-parit.py) → LAV ja PT 21.0x. 06: Yangxinmenin raita poissa; 07 katot keltaisemmat. "≠ rungon" -varoitukset odotettuja (RUNKO
  = ennen). JU:n "07 mittari identtinen" virheellinen (p50 143→154). LAV mittaa kattomediaanin.

## SEURAAVA
0. **PALVELIJAT v4** (JU ilmoittaa): huom-*.txt "säikähdytetty #n Laji X m …", epäonnistuneiden syyt (PalvelijaSyy) → kuvat
   palvelijat-v4/*.png. Jos näkyy: pelikuvapari PT:lle (≤ 3 riviä + polku). Jos edelleen 0: syyjakauma (grep "ei palvelijaa" | sort | uniq -c).
1. **JALKI v2** (JU ilmoittaa): esikatselu-*/unity.log "polkutukos … umpimassassa N (oikaisu M)", "polkukamera alkaa … (suora, jälki
   umpimassaa)", vaiheloki t 11–13 (kamera y ≤ ~3 m, x ≈ Puyi); ys 218ad 4–7 s ei muutosta → PT:lle ≤ 3 riviä + video.
2. keisari-KK kuvat (JU ilmoittaa) → KK:lle polkuina, ei selitekaistaa (kuten edellisessä luovutuksessa kohta 3).
3. Vedenkantajan WATER-POUR-CONTRACT vasta PT:n pelikuvaparikuittauksen jälkeen.
4. Yhdistys: arkihahmot-218 (86476dd60) junaan vasta PT:n kuittauksen jälkeen; jalki-massa-218 vasta ajon ja PT:n jälkeen.
5. POHJAVAHTI-huomio JuoksuAvausJuliste.cs (vari 1 > 0) tulee pohjasta a592f6e28, ei omasta muutoksesta.
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/Matkakirja-pelikoodari (tämä tiedosto sen kärjessä).
