# Pelikoodari: luovutus 4.11.2026 klo 03.34 – be5632bdb iPad-sarjaan ja peiton mittaus JU:lla, palvelijat v12 JU:lla

Edellinen: -20261104-0252 (9d06e10df), korvattu tässä kamera- ja palvelijaosilta; muu ennallaan. Syy: pehmeä raja 30 % (7.37). Ei omia taustaketjuja. Kuvat PT:lle, PT vie KK:lle.
Tulokset: proto-3d/lokit/pk-muistipiikki-219/TULOS.md (osiot "Kamera-be56 ajettu" ja "PT 03.1x").

## Kamera be5632bdb: PT 03.1x päätti
Sellaisenaan iPad-sarjaan Pariisin jälkeen, ei oviaukon alitusta (2.177 pysyy), **ei 8/8-julistusta**. b1-4s ja taivas korjattu; b8-4s auki (kamera seinän kohdalla 3,5 m:ssä, Puyi 4 m edellä ulkona, sama hetki 3,49 s kuin vanhassa); b6-2s on oven ylipalkki, ei tästä muutoksesta. Vuoroa ei pyydetä ennen Pariisia.
- **JU:lla odottamassa (viesti 03.2x):**
  1. Mac L1: `_tyo/pelikoodari/peitto-be56/aja.zsh 1`, runko **de60baf01** (pelikoodari/tallenne-be56, wt/proto-pelikoodari-tallenne-be56; be5632bdb + Esikatselu.cs ja tallenne-video.sh rungosta 67fdba66c; EI junaan). ys 12 kierrosta, xf (juhlasali) 6. Lopussa rivi "PEITTO AJETTU".
  2. iPad: `_tyo/pelikoodari/kamera-219-be56/pk-be56-laite.zsh` (käännös L2, sali 1+2, juhlasali xf, uudestaan 40 x); lopussa "BE56 AJETTU". JU tarkistaa RUNKO:n (oletus 693cf437f).
- **Riski:** unity-tarkistus ei käännä Editor-kansiota; Esikatselu.cs de60baf01:ssä nähdään vasta ajossa. Lisätyt rivit käyttävät vain Unityn rajapintoja. Jos ei käänny: JU ilmoittaa.
- **Kun PEITTO AJETTU, tee:**
  1. Lue `peitto-be56/kesto-ys.txt` ja `kesto-xf.txt`. Luvut ovat koneellisia: **katso rajakuvat `kesto-*-NN.jpg` silmällä ennen lukua.** Tunnistus (kesto.py) on viitan keltainen tiheimmässä 16 px:n ruudussa: b8-4s 11 = ei näy, näkyvät ≥ 51. Tunnettu virhe: a7-4s (Puyi pöydän kohdalla, pää näkyy) sanoo ei näy. Keskialueen ulkopuolella olevaa Puyia ei lasketa.
  2. Erota ovi (juoksuaika noin 0,4–1,3 s) ja ylitys ulos (noin 3,3–4,2 s).
  3. Juhlasali: `loki-xf.txt` "salin katto ... kamera y" oltava noin 3,85 m; kuvat xf.mp4:stä, ettei huonontunut.
  4. Kirjaa kesto TULOS.md:hen ja rivi PT:lle; **tuomio kestosta KK:lle PT:n kautta.**
  5. Sen jälkeen tallennekansiot lokit/esikatselu-*/ys ja /xf voi unohtaa; ei poistoja ilman tarvetta.
- **Kun BE56 AJETTU:** lokit/pk-muistipiikki-219/sali-be5632bdb-{1,2,1-xf}/ ja uudestaan-be5632bdb-1/: muistihuippu (peitto, roskienkeruu kuvan alla), peiton kesto iPadilla, kuvat sali-sisa-N ja -N-b (b = noin 4 s myöhemmin). Rivi PT:lle.
- Arvio noin 0,4 s (TULOS.md) on laskettu, ei mitattu; älä välitä sitä tuloksena.

## Palvelijat
- **v11 b4a516989 katsottu 03.3x:** HUOMIOT.md `_tyo/pelikoodari/palvelijat-v11/`. **Lätäkkö valmis**, PT:llä KK:lle (vesi-090, lahikuva-lammikko-vesi-160).
- **Sirpaleet v11 hylätty itse:** kuvio katosi valkoiseksi. **v12 98be1d821** (pelikoodari/arkihahmot-218), kuvarunko **dd76930df** (palvelijat-kuva-218): ruutu 60 → 22, viivat paksummat, oksa 4 ruudussa 5:stä. Ei ajettu. **JU:lla:** `_tyo/pelikoodari/palvelijat-v12/aja.zsh 1` (vain malja).
- **Kun v12 ajettu:** sama rajaus kuin vertailussa v10/v11: sirpaleet malja1-090 ja malja2-060 (paikka vaihtelee ajoittain; rajaa sen mukaan, missä ne ovat). Pitää näkyä pieniä sinisiä oksia valkoisella, myös juoksuetäisyydellä hieman; ei välkkymistä (liikettä ei pysäytyksistä todisteta). Vertaa ehjään maljakkoon. Kuvat PT:lle.
- **Avoin, syy auki:** malja2-120 v11: vaalea palikkakuvio lattiassa Puyin ympärillä ja palikkareunainen tumma alue muurissa. 1/19, ei v10:ssä. Kerrottu PT:lle; toistuvuus v12-ajosta (pyydetty JU:lta). Ei selitystä; älä sano varjoksi ilman todistetta.
- **Palvelijatar v2:** kuvat edestä ja takaa KK:lle ennen kytkentää, kun Pariisi on päästänyt ajovuoron (tarkistukset -0003 kohta 4). Ennallaan.
- Kengän rosoinen yläreuna listalla (KK: saa jäädä). Viirut eivät näy v11:ssä, reikää verkossa ei suljettu pois.

## Muut
TF 217: rivi PT:llä, koodin mukaan sama palkistovika, ei mitattu. Komento: Peli-testit/unity-tarkistus.sh (sh), Peli-testit/kaanna.sh (bash). Muut ennallaan -0205 ja -0142.

Tila: odottaa JU:n ajoja peitto-be56, pk-be56-laite ja palvelijat-v12.

## Lisäys 03.37: KK 03.35 (korvaa ristiriidassa olevat kohdat)
- **Lätäkkö HYVÄKSYTTY** v11:llä (KK; Mac). Listalla: kengän rosoinen yläreuna.
- **Kuvat palvelijoista suoraan KK:lle, PT tiedoksi** (KK 03.35; koskee tätä palvelijaerää).
- **vesi-090 selvitetty ja vastattu KK:lle ja PT:lle:** ruskea pallo = mätä omena 1,8 m:ssä (LuoOmena), varjo sen auringonvarjo (laskettu paikka täsmää, ei varjokoetta). Ei poistettu; KK päättää, jos korkeus tai varjo pitää muuttaa (koskee kaikkia omenoita).
- **Palikkakuvio malja2-120:** KK: toistuvuus v12:sta; **jos toistuu, syy ennen junaa.** Sirpaleet odottavat v12:ta.
- **v13 63845cda6** (arkihahmot-218), kuvarunko **cfd520f2e**: KK:n "varjo katkeaa lätäkön reunaan, korjaa jos helppo, ei ehto". JuoksuMarka: multi_compile ja JuoksuVarjo; varjossa pinta × 0,65 (arvio kiven suhteesta, ei mitattu), kiilto × varjo. Valossa väri ennallaan koodin mukaan. Ei ajettu, varjostinkääntö ei todistettu. **JU:lla v12:n jälkeen:** `_tyo/pelikoodari/palvelijat-v13/aja.zsh 1` (vain vesi).
- **Kun v13 ajettu:** vesi-160 sama rajaus kuin lahikuva-lammikko-vesi-160: varjo jatkuu reunan yli eikä näytä tummalta tarralta; mittaa valossa väri yhä noin 150/185/225 (hyväksytty), varjon tummuus vs kiven varjo (säädä 0,65). Jos väri muuttuu valossa tai varjo näyttää huonolta: 63845cda6 pois, koska se ei ole ehto. Hyväksytty lätäkkö ei saa huonontua.
- v12 ajossa 03.33 alkaen, v13 sen perään.

## Lisäys 03.39: KK mätä omena (seuraava oma työ SIRPALEIDEN JÄLKEEN; ei ole aloitettu)
Oikaisu: kirjoitin KK:lle ja PT:lle "väistettävä". **Väärin: mätä omena on kerättävä** (omistaja 19.10. "kaksi eri kerättävää asiaa", KK:n viite JuoksuV4.cs:112). Varjo ok (KK).
1. Korjaa JuoksuV4Maailma.Hehku.cs:n kommentti "sitä väistetään".
2. JuoksuV4Maailma.cs LuoOmena: `if (!om.Mata) Hehku(...)` → pieni hehku myös mädälle omassa hillityssä sävyssä, ei kulta (omistaja 20.10. 17.17: kerättävien ympärille hehku, jotta ne tunnistaa heti).
3. Malli omena-mata ei tunnistu omenaksi: herkkuomenan muoto + mätä pinta, **koko ennallaan** (0,22). KerattavaMallit (JuoksuV4Maailma.cs noin 3440). Codex-tilaus, jos koodilla ei tule omenan näköistä (Codex = grafiikka; tilaus postilaatikko-haaraan). **Ei kärpäsparvea.**
4. Kuva KK:lle ennen junaa, PT tiedoksi.
