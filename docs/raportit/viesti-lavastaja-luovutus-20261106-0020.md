# Lavastajan luovutus 6.11.2026 00.2x (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (6.11. 00.1x ja 00.2x). Ei vientejä, ei junaan. Lattia25:n vientiehto (KORJAUS 5.11. 22.3x) pysyy; ks. -2230.

## Seuraajan järjestys (PT 00.2x, sitova)
1) a1:n tumman pinnan syy, 2) 7 aukkoa, 3) lisäysten kohdetarkistus. Ei vientiä.

## Tehtävä ja rajaus
KK 5.11. 22.1x: aukot suljetaan, ulkoa näkyy umpinainen rakennus; viesti vain oikean oven kohdalla.
Uusin rajaus (KK PK:n kautta 6.11.): **29 aukkoa pois** (portit, keskiakselin päärakennukset, Yanxigong), rajaviesti jää niihin. PT:n viesti "kaikki 41" on tätä vanhempi; eron kerroin PT:lle, kuittausta ei ole tullut.
Suljettavia 33 aukkoa + enintään 27 lisäysten aukkoa. Lista: /Users/Shared/Claude/Matkakirja-pelikoodari/docs/raportit/viesti-pelikoodari-aukot-20261105.md (kohdat "Lisäys 6.11.", ryhmä "Aukko", "321 talon pohjalla / Siirtyvät"). Kaikki kohdat .json-tiedostoissa samassa kansiossa.
Lisäykset kohde kohteelta ennen seinää: portti, päärakennus tai raunio ei saa seinää; epäselvä: älä sulje, kerro KK:lle.
EI saa sulkea: kaistaleet (−147,7; 244,3), (−186,5; 497,6). Eivät listalla: (−162,9; 337,5), (121,6; 408,3). Katso mallista: (−108,1; 396,1), (108,3; 473,1), (−166,0; 431,6); jos viimeinen on oviaukko, kerro PK:lle. Sali (1,5; 0,9) on oikean talon pohjalla: katso ensin.
Vienti: PK ajaa kartan ja rajat uudelleen, kerro versio.

## Tila
- `koejuuri-aukot` (katot-v125/) = koejuuri-lattia25 + 26 täytettä, ajettu kahdesti L2:lla, 35140432d. Ei viety.
- 7 aukkoa puuttuu, koska kartta ei sulkeudu: (−251,8; −126,9), (−155,6; 283,2), (−151,5; 289,4), (−142,2; 232,3), (−131,3; 352,4), (154,5; 427,8), (325,1; 564,0). Tarkistus laskee rajaruutuja 4 m säteellä, joten osa voi olla naapuriraja: selvittämättä.
- Kuvat kuvat-koe2. Katsottu: a1 ja a5 pienennettynä. a2, a3, a4 toisesta ajosta katsomatta. KK:lle ei ole lähetetty paria.

## Avoimet viat
1. **a1 tumma pinta:** oikealla tasainen tumma pinta noin x −189,0, z 416,6–418,2, yläreuna arviolta y 2,65. Peittää muurin ja sokkelin, jotka näkyvät ennen-kuvassa (lokit/esikatselu-20261105-220320/x1-kuja-pohjoisesta.png, sama kamera). Syy auki; tausta 1-3:ssa ei ole kolmiota siinä (tumma.py, vain muunnoksettomat solmut), rakennuksia ei haettu. Ajoilla on eri juuri (lattia25, rakennukset-v126) ja ennen-ajossa ovikoe. Seuraava askel: sama sk koejuuri-lattia25:llä ilman täytteitä. Älä vie paria KK:lle ilman tätä; älä leikkaa pois.
2. **a5 friisi:** täytteestä puuttuu friisi, ero näkyy talon seinään. Täyte jatkuu lattiaan jalustan ohi.
3. **Ovet:** a3:ssa (−142,2; 420,1) näkyy parioven näköinen ovi, täyte sen takana. ovet.json:ssa lähin ovi 20 m. Saman rivin 8 kohtaa viety PK:lle, PK:n seuraaja vastaa. Täytteet pysyvät koejuuressa.
4. Ovi alle 3 m täytteestä: (−133,0; 383,6) 1,7 m ja (−188,8; 416,0) 2,6 m; ei tarkistettu, jääkö alle.
5. Korjaus on toistaiseksi kuvattu vain 5 kohdasta 26:sta. Lod1/2-täytteitä ei ole katsottu.

## Työkalut (A/)
suunnittele.py (POISTETUT = 29, suunnitelma.json + .png, sulkeutumistarkistus; kirjoittaa jaa_yhdessa), rakenna.py (lukee jaa_yhdessa == 0; poistaa ei: kieltäytyy, jos juuri on jo olemassa), tee_sk.py, aja-aukot.zsh (`<linja> <sha>`, JU:n vuorolla; kuvat kuvat-koe2, vaihda kansio ennen uutta ajoa), luokittele.py, tumma.py.
HUOM: suunnittele.py kirjoittaa suunnitelma.json:n uudelleen ja jaa_yhdessa lasketaan silloin uudelleen; 26 tiedot: koejuuri-aukot-taytteet.json.
Kujan syy: talon länsiseinä x −189,4 on 1,5 m ulkona (kulmat x −187,9), kiinni kujan muurissa. Samaa näyttää a4/a5:ssä (päätelty kuvasta, ei mitattu).

## Jonossa, ei aloitettu
Kuten -2230 (git show 0dbc2225a:docs/raportit/viesti-lavastaja-luovutus-20261105-2230.md).
