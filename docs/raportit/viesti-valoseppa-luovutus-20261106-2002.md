# Valosepän luovutus 6.11.2026 klo 20.02. Itsenäinen: vanhoja ei tarvitse lukea, paitsi kohdan 5 viittaus

Syy: konteksti 28 %, pehmeä raja. Tili vvi@vvi.fi, sessio local_fa464945. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa; käännös JU:n vuorolla. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Ajoja ei ole käynnissä minulta.
Työpuut (enintään 3): `wt/proto-linssiseppa2-k17` varjo-aariviiva, `-k31` saumat-y, `-k32` maalattu-taivas. Mikään ei mene junaan.
PT:n järjestys 19.57 jälkeen: TAIVAS v2 → SAUMAT JA LAIKUT → ÄÄRIVIIVAT → yksi iPad-mittaus (omistajan 19.57 "ei iPad-mittauksia": kysy PT:ltä ennen). Usvakoe on ensin, koska sen kuvat tulevat ajosta 30. Kuvat PT:lle ennen KK:ta; saumoista etenemiskuvat heti KK:lle ja PT:lle, koko kohde.

## 1. AJO 30 (KS ilmoittaa): USVAKOE JA TAIVAAN VÄLIVERSIO
Kuvat `lokit/karttaseppa-yhteinen-30-b8-38ab4d14d/uv-*`, `mt-*`. Kansiota ei vielä ollut 20.02.
Usva: katso `uv-louvre-45-nyt/koe`, `uv-nd-*`, `uv-kaupunki-45-*`, `uv-nd-85-*` (85:n pitää olla sama). PT:lle pari + mitä yläreunassa näkyy: kartan reuna, nimet, kyltit, lisäpiirto. Jos reuna näkyy, kerro, älä piilota. Lataussäde ja rakennusten raja tarkistamatta. Omistajan sanat 18.20: "Minusta tässä kulmassa ei tarvitsisi juuri näkyä usvaa koska horisontti on niin lähellä". Koodi b3bff978f, kytkin `viistousva 0|1`, arvot 1,6 ja 0,7 omiani.
Varjostin Karttataivas ajetaan ensi kertaa: katso Shader error. `mt-*` EI ole taivaan arvio (väliversio), vain koodin todistus: pohjoinen, kääntö, rakennukset edessä, KuvaKerroin.

## 2. TAIVAS v2 #2182: VAIHDETTU, AJOON 31
`9af846cec`, `linssiseppa2/maalattu-taivas`. KK hyväksyi pelikokeeseen 19.4x; SHA 71d13d41 täsmää. Tuontiraja 8192, ASTC 6×6 laskettuna 2,3 Mt, ei mitattu. Sauma tiedostossa sama kuin viereiset sarakkeet (enintään 5/255), toistoa ei mittauksessa.
Lista `_tyo/linssiseppa2/sk-taivas-codex.txt`, kuvat `mc-*`: 85° torni (sama kamera kuin us-eiffel-85b), -292, -092, 75, 65, nd-lähi, sauma pohjoiseen. KS:lle pyydetty 9af846cec; jos ajo oli jo alkanut, ajossa on e36c04c65 (#2181) ja kuva on silloin vain todistus: varmista KS:ltä, kummalla ajo meni.
KK haluaa kuvien mukana vastauksen: näkyykö siveltimenjälki pelissä, kun kuva suurenee noin 1,9-kertaiseksi, ja tuleeko torni usvan läpi oikein. Mittaa myös ruudun väri (tavoite yläreuna #a8bbce, horisontti #e6e2ca), korjaa `KuvaKerroin` tarvittaessa.
Arvion jälkeen: kuittaus Codexille `claude/postilaatikko`-haaraan (#2182) ja rivi PT:lle ja KK:lle. KUITTAUS ON TEKEMÄTTÄ.

## 3. SAUMAT JA LAIKUT (omistaja 19.57): SIIRRETTY, EI AJETTU
Tavoite: "Pariisin kartalla ei näy reunaa tai laikkua, jossa kartan pala selvästi vaihtuu toiseen." Raamattu 2.215.
RAJAT: metsän heikennys ennallaan (jos laikku vaatisi metsää, rivi PT:lle, älä muuta). Mäkien varjostus ei kuulu tähän. Ei iPad-mittauksia. 3D-rakennusten ajot edelle.
`f9fb1893d`, `linssiseppa2/saumat-y`, työkopio k31, Y 9af846cec:n päällä, ElavaKarttaTestit 33/33, unity-tarkistus 0, oletus ennallaan. Portaat ja `pallo pyynnot` otettu haarasta pariisi-tasot. EI otettu: c430bcd40 (metsän alfa) eikä rinnevaloa (f028eb320, 5645d3afc, 8abcf1931). Vain PariisiPaino-funktiot siirretty Karttavalo-tiedostoon. `rel` on `ReliefiOsuus(z)`, joten portaan 10 arvo ei enää vaikuta; luku on taulukossa turhaan, siivoa lukituksessa. `elavakartta portaat` ottaa yhä 11 lukua.
HUOM: portaat 9 tuo maanpeitteen z11:lle; siinä on myös metsän väri. Tarkista ennen lukitusta, ettei se ole metsän muutos.
Lista `_tyo/linssiseppa2/sk-saumat-y.txt`, 12 kuvaa: `se-z12..z16`, `se-45-laaja` = ennen (pyyntöloki päällä), `sf-*` = portaat f (0.18 0.20 0.10 0.55 0.72 0.72 0.8 0.9 0.5 1 1). KS:lle pyydetty listan loppuun, koska säätää maaston siirtymän.
TODENNA ENSIN pystysauman syy paloista: pyyntöloki ja kuvat. Ehdokaspaikat: 2,1095° ja 2,4611° (z10-sarake 518, z13:ssa), 2,2852° ja 2,4609° (z11-sarake 1037, z14:ssä), 2,373° (z12, z15). KS:n 5.11. mittaus: 2,3291° (z13-raja 4149), 45°:ssa hyppy 15–20 px, ylhäältä ei näy, sopii korkeuseroon, ei varmistettu; kysytty KS:ltä. Tausta `pariisi-tyyli/striimi/pariisi-viat/TULOS-tikkaat-a5323cf4e.md`.
Näkyvin vika vanhassa kuvassa `lokit/esikatselu-20261105-211044/sauma-45-laaja.png`: vaakaraja, jonka takana korttelit loppuvat. 5.11. havainto: z13:n keskialue erottuu, koska z12:lla ei ole rakennuksia; seuraavaksi kokeile katot z13 0,5, massa z13 0,12. Jos ei riitä, z12:lle rakennuskuvio z13:n datasta (kysy PT:ltä kulusta).
5.11. läiskien syy oli rinnevalo: se on rajattu pois. Jos jäljelle jäävä laikku on sitä, rivi PT:lle.
Lukitus (arvot oletukseksi, ElavaTyyliVersio uusi, SHA:t KS:lle ENNEN) vain sanalla. KS auttaa kartan tasoissa.

KS 20.0x, pystysauma 2,3291°: maastopalojen reunat eroavat x-rajalla 4149 enintään 9,5 m (kertoimella 19 m), samoin 2,2852° (7 m) ja 2,3730° (9,5 m); mitattu ämpärin 2026-10-29-maailma-paloista. Maaston z12:ssa on 8192 saraketta, siksi raja on sama kuin web-kartan z13. Yhteys kuvaan epävarma (sauma arviolta 2,330, noin 30 px sivussa). Suoraa korjausta ei tehty. Tasainen kartta on oletuksena Y:ssä (1303df5fc: 10 km / 14 km / 90 m), joten reunaeron pitäisi kadota säteen sisällä, mutta samalta kameralta ei ole todistusta. Montmartren reiän liukuvyöhykkeellä (noin 1 km keskipisteestä) se voi yhä näkyä: katso. Sf-/se-45-laaja kertoo tämän. KS kirjasi saumat-y:n listan loppuun seuraavaan ajoon, johon mahtuu.

## 4. KOVAT VARJOT: ÄÄRIVIIVA AJOON 31, KUVAT SEN JÄLKEEN
Omistaja 19.08: kelpaavat kokeena. KK 19.15 antoi luvan ja rajan yli 4 m². `3d6e35696`, `linssiseppa2/varjo-aariviiva`, työkopio k17, 38ab4d14d:n päällä. Testit 11/11, unity-tarkistus 0. VARJOSTINTA EI OLE AJETTU. KS kuittasi ajoon 31.
Lista `sk-varjo-aariviiva.txt`, kuvat `av-*`; parit ajon 28 `kv-*` samalla rajauksella (kv-eiffel, -sacre-coeur, -notre-dame, -sainte-chapelle, -grand-palais). KK haluaa mukaan: kaikkien kohteiden kolmiot 233 265 → 1 467 (mallien varjot, tiedostot 27 kt; puut, pyramidit, ohjelmakohteet yhä ajossa). Eiffel 48 477 → 279, 5,1 kt, 28 aukkoa, 89 % aukkojen alasta. Keskusta on umpinainen jo mallissa.
KK oikaisee omistajalle väitteen, että kevyt muoto vie aukot, kun kuva on tämän nähnyt: kerro kuvan tulos.
Työkalu `_tyo/linssiseppa2/kovat-varjot/tee-aariviivat.py <työpuu> --kuvat <kansio>`; aja uudelleen, jos malli tai varjon vakio muuttuu (peli varoittaa ja laskee vanhalla tavalla).
Sacré-Cœur: kärjet mäen pinnalla, mäki jono 3078, varjo 3079, kirkko 3080, sapluuna Always. Tarkista: kirkon varjo mäellä, ei nimien päällä. Mäen puiden varjot jäävät mäen alle, jos puita on (tarkistamatta).
Aloittamatta (järjestys KK:lta, usvakokeen jälkeen): rosoisuus todennetaan kuvista; Louvren ja Invalidien heikko varjo; mallin valo kääntyy kameran mukana, varjo ei. Lähiympäristö on KS:n. Hinta on yhä arvio: junaan vasta mitatulla luvulla ja omistajan sanalla.

## 5. JONON LOPUSSA
PT 19.1x: syyt ensin, kuvat KS:n ajossa. Tausta `_tyo/karttaseppa/lahialue-20261106/LUOKITUS.md`.
- Kivisiltojen päät haalenevat rantatien päällä: todennäköinen syy `Maa` 0…1 vie kannen värin kohti `KatuKartta`:a (OhjelmaKohdeGeometria.cs), todentamatta.
- Palais Bourbonin harmaa viisto pinta: todennäköisesti harjakatto `Liuske` (OhjelmaKohdeRakennukset.cs:238), todentamatta.
Vanhat: `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6 (lippu, paletti, räystäs, Puu-3, siltakuvat), `us-nd-85`:n tummat merkit.

## TEKNIIKKA
zsh: `"${C}:refs/..."`, `$Y:A` on muokkain. Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `_tyo/venv-rembg/bin/python -I`. `unity-tarkistus.sh` on `Linssit-testit/`:ssä, aja `sh ./unity-tarkistus.sh` siellä. Kartan testit `Kartta-testit/`: `sh ./kaanna.sh <nimi>`. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Tämä luovutus tehtiin ilman haaran vaihtoa, koska kotihaara on jäljessä.
