# Valosepän luovutus 6.11.2026 klo 10.48

Korvaa luovutuksen -1034 kohdat ODOTTAA 2, SEURAAVAKSI 2–3 ja Concorden tilan. Sen RÄYSTÄSLIUKU: TILA, AUKI, KERRO PT:LLE, ODOTTAA 1, KK 10.1x, SEURAAVAKSI 1 ja MUUTA pätevät; samoin -1003:n CONCORDE ja -0903:n kohta 3 (Pompidou). Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37).
Luin aloituksessa periaatteet ja kohdat 7.4, 7.23–7.25, 9.1–9.3, 9.5, 12.9 (pisimmät katkaistuina 1 500 merkkiin). Luvut 2 ja 6 jäivät lukematta. Lue lukulista 7.47 itse.

## CONCORDE: VALMIS
KS:n ajo 7 (Y 9f5e3e105, b8, e23; sisältää bed1239dd:n). Vesi korjautui: altaat 171,166,134, Seine 170,166,134, mitattu yläkuvasta. Kuva lähetetty KK:lle 10.4x, kopio-rivi PT:lle.
Kaikki: `proto-3d/_tyo/linssiseppa2/ohjelmakohteet/TULOS-yhteinen-7-9f5e3e105.md`. Rajaus `rajaukset-yhteinen-7/co-yla-vesi-seine-2x.png`.
AUKI: Concorden toinen luonti 51,9 ms (unity.log 3336), ensimmäinen 5,0 ms; ajossa 6 (b7) 5,1 ja 4,9 ms. Yksi havainto, syy tuntematon. Katso seuraavasta ajosta, toistuuko. PT ja KS tietävät.
KK:n viesti ja KS:n viesti jäivät jonoon lähetettäessä; en tarkistanut perillemenoa.

## SILLAT: KORJAUS AJAMATTA
Koodi `linssiseppa2/ohjelmakohteet` 61e6bdcfe, nimihaara `linssiseppa2/ohjelmakohteet-nimet` 838527412, molemmat natiivi-backupissa. Unityssä kääntämättä. Geometriatestit 19/19 (ajo -0838:n komennolla, `aja-geometria.sh` antaa yhä 9/10).
Mustat katkot ovat yksi alle pikselin viiva seinän ja listan saumassa, ja väri on holvin selkä; raosta näkyy sillan sisään. Korjaus on kivinen nauha 0,15 m seinän takana. Se peittää raon, ei poista sitä.
TODENNETTU/LASKETTU/PÄÄTELTY erillään TULOS-tiedostossa. Avoimet:
- Syy on päätelty (T-liitos + koordinaattien pyöristys). Origoa en tarkistanut.
- Pont de la Concorden nolla tummaa pikseliä jää selittämättä, vaikka rakenne on sama. Selitys voi olla väärä.
- Nauha näkyisi KiviKeskiMetalli-sillan metalliaukossa: siksi se on vain kivikaarissa ja tuissa. Pont Notre-Damea ei katsottu.
- Testi kattaa vain vakio-z-reunat. Sen pohjana ei ole kuvaa.
Sivulöytö: c0dba45aa jätti Concorden testin punaiseksi, koska testi etsi vanhaa vesiväriä. Korjattu samassa commitissa.
Pont Royalin suippohattu: ei muutettu; 1,6 px/m:llä ei erotu hattuna.

## UUSI TYÖ PT:LTÄ, EI ALOITETTU (pehmeä raja; sanatarkasti)
PT 10.4x: "OMISTAJAN PÄÄTÖS klo 10.40 (KK): tunnistusvärit säilyvät haalistettuina, yksi karttapaletti v2 (suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-karttapaletti.md). KS tekee paletin ja portin. VS: selvitä ilman ajoa, moniko kohde on värjätty koodilla (Erikoismallit, ohjelmakohteet), ja tee niille reitti KS:n rajojen mukaan. Ei erillistä Pompidoun värikorjausta. Määrä minulle yhdellä rivillä. Ei junaan."
PT 10.5x: "OMISTAJAN PÄÄTÖS klo 10.47 (KK): nähtävyydet ja puut samaan usvaan kuin talot = kumoaa 5.11. 21.28:n; kaikki häipyy samalla etäisyydellä, kaukaiset nähtävyydet eivät enää erotu horisontissa; lisäksi loivennus (10.29). VS on tekijä, ajo KS:n seuraajan seuraavaan yhteiseen ajoon, ei omaa, ei junaan. Toteutus: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-horisontti-ja-puusto.md: sama pikseleittäinen syvyysusva mallien varjostimiin (NotreDameKirkko, OhjelmaKohde, jalusta NotreDamePohja, puut), ei koko ruudun kerrosta; häivytys alkaa aiemmin, loppu pysyy. Leijuminen ei kelpaa; taivas ja usvan väri tarkistetaan. Parit nykyinen | uusi KK:lle. Puiden pienennystä ei nyt: odottaa koetta. Paletin selvitys rinnalla. Sha KS:lle ja minulle."
Tehty: määrä PT:lle (ks. alla). Reitti ja usva tekemättä, suunnitelmaa -horisontti-ja-puusto en lukenut kuin alun. Usva on nyt ensimmäinen koodityö; Pompidoun värikorjausta ei tehdä, ja Pompidoun muotoviat odottavat usvan jälkeen KK:n järjestystä, ellei PT sano muuta.
Määrä: 29 ohjelmakohdeverkkoa (18 siltaa + 11, lokista ja listasta) + 21 rekisteröityä erikoismallia (`Rekisteroi("…")`, k30:n koodista) = 50. Haara k30 on 34 committia jäljessä: tarkista erikoismallit ajantasaisesta rungosta. Ohjelmakohteiden värit: `Vari.H` `OhjelmaKohdeGeometria.cs`:ssä, Concorde `concorde-vie.py`:n VARIT + glTF. Erikoismallit: 19 tiedostoa käyttää `ErikoismalliApurit.cs`:n 10 yhteistä värivakiota `Em*` (rivit 16–34; `new Color`-rivejä tiedostoissa 0, sekoituksia kuten `Color.Lerp` en laskenut; akropolis, delfoi ja meteora ovat `Symbolimallit`-tiedostoissa, niitä en katsonut). Reittiehdotus, ei tehty: erikoismalleille rajaus näihin vakioihin, ohjelmakohteille `OhjelmaKohdeGeometria.cs`:n värivakioihin (16 `Vari.H`-riviä) tai `Rakentaja.Valmis`-tasolle; KS:n rajoja ei vielä ole.

## ODOTTAA
1. KS: 838527412 ja `sk-sillat-sauma.txt` (3 kuvaa: p-roy, p-roy-2, p-car) seuraavaan yhteiseen ajoon, viesti jonossa 10.47. KS ilmoittaa kansion.
2. JU: raystas5 35f849838 VALMIS, JU:n viesti 10.5x: exit 0, 236 s, 5 kuvaa `_tyo/linssiseppa2/raystas/kuvat5`, b7, linja 2 (esikatselu-2, b7-Library; ei L1:llä). JU ei katsonut kuvia, en minäkään. Katso ennen usvaa (-1034:n SEURAAVAKSI 1).

## SEURAAVAKSI
1. Kuvat5, kun JU ilmoittaa (-1034:n kohta 1).
2. Sillat, kun KS ilmoittaa: mustat katkot pois p-roy:stä, p-roy-2:sta ja p-car:ista? Täysikoossa ja rajauksina; viiva näkyy vain niissä. Jos jää, tutki, onko viiva muualla kuin saumassa. Vertailu 0b4d74011 on b7, tämä b8.
3. Pompidou (KK: sillat ensin, sitten Pompidou). `OhjelmaKohdeRakennukset.cs` rivi 1397, viitekuvat `a/viite/pompidou-*.jpg`. Viat -0903:n kohdassa 3: portaat irrallisia punaisia paloja, itäsivu kohinaa, katto lelumainen. Ajon 7 `po-la.png`:ssa punaiset palat näkyvät yhä; täysikokoisena en katsonut. Aloita rajauksesta. Ei omistajalle tässä kunnossa.
Aloitin Pompidouta vain katsomalla yhden kuvan; koodia ei muutettu.

## MUUTA
Nimihaaran merge: väliaikainen worktree scratchpadiin, `git worktree remove` perään (k30 on `ohjelmakohteet`). Numpy-skriptit `python3` ilman -I:tä. b8-runkoa en yhdistänyt `ohjelmakohteet`-haaraan; KS:n Y:ssä se on.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
