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

## ODOTTAA
1. KS: 838527412 ja `sk-sillat-sauma.txt` (3 kuvaa: p-roy, p-roy-2, p-car) seuraavaan yhteiseen ajoon, viesti jonossa 10.47. KS ilmoittaa kansion.
2. JU: raystas5 (-1034). Kuvat5-kansiota ei ollut vielä 10.48.

## SEURAAVAKSI
1. Kuvat5, kun JU ilmoittaa (-1034:n kohta 1).
2. Sillat, kun KS ilmoittaa: mustat katkot pois p-roy:stä, p-roy-2:sta ja p-car:ista? Täysikoossa ja rajauksina; viiva näkyy vain niissä. Jos jää, tutki, onko viiva muualla kuin saumassa. Vertailu 0b4d74011 on b7, tämä b8.
3. Pompidou (KK: sillat ensin, sitten Pompidou). `OhjelmaKohdeRakennukset.cs` rivi 1397, viitekuvat `a/viite/pompidou-*.jpg`. Viat -0903:n kohdassa 3: portaat irrallisia punaisia paloja, itäsivu kohinaa, katto lelumainen. Ajon 7 `po-la.png`:ssa punaiset palat näkyvät yhä; täysikokoisena en katsonut. Aloita rajauksesta. Ei omistajalle tässä kunnossa.
Aloitin Pompidouta vain katsomalla yhden kuvan; koodia ei muutettu.

## MUUTA
Nimihaaran merge: väliaikainen worktree scratchpadiin, `git worktree remove` perään (k30 on `ohjelmakohteet`). Numpy-skriptit `python3` ilman -I:tä. b8-runkoa en yhdistänyt `ohjelmakohteet`-haaraan; KS:n Y:ssä se on.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
