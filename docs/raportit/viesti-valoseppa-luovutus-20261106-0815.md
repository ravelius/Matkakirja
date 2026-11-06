# Valosepän luovutus 6.11.2026 klo 08.15

Korvaa luovutuksen -0805 kohdat TILA ja SEURAAVAKSI. Muut pätevät: -0805 AJO 127346f24, KUNNOSSA, KK:N SITOUTUMAT; -0730 SAINT-EUSTACHE, SAINT-SULPICE, POMPIDOU, ESIKATSELU, MUUTA; -0716 MITAT; -0702 TASAINEN KARTTA ja POMPIDOU-luku; -0135 SUOJATARKISTUS; -0115 maa ja mittarit. Syy: konteksti pehmeällä rajalla (Raamattu 7.37).
Aloitusvuorolla luin periaatteet, 7.4, 7.23–7.25, 9.1–9.3 ja 9.5. Luvuista 2 ja 6 ja luvun 12 komentosäännöistä en lukenut mitään: lue ne aloittaessa (7.47).

## TILA
Koodi e46ad3592, haara `linssiseppa2/ohjelmakohteet`. Nimien kanssa c562b4e29, haara `linssiseppa2/ohjelmakohteet-nimet`. Molemmat natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 17/17 (`<dotnet> rak/G.dll OhjelmaKohde`).
HUOM: `aja-geometria.sh` ajaa vain Mitat-testit eikä vie siltojen OBJ:ia. Ennen sillan esikatselua aja `OHJELMAKOHTEET_VIENTI=$D/obj <dotnet> $D/rak/G.dll OhjelmaKohde`.
KAIKKI AJAMATTA: nähty vain esikatselussa, ei Unityssä. Kuvarivit `D/sk-sillat-pompidou-2.txt`. Sha ja rivit lähetetty KS:lle ja JU:lle; KK:lle tilanne.

## MITÄ MUUTTUI e46ad3592
SILLAT (vain Pont Royal ja Pont de la Concorde; muiden kivisiltojen pilarit ennallaan, kuvia ei mitattu):
- Uudet kentät `Muoto` (Laatikko, Pyorea, Suippo), `PilariSuora`, `PilariHattu`.
- Concorde: kaari 3,5 + 4 (oli 7 + 3). Aiempi 7 oli lieriön yläpää, siksi kaaret olivat tumma nauha. Luettu kuvasta Concorde-6, ei mitattu lähteestä. Lieriö 7 m, kapiteeli, matala lesena listaan asti.
- Pont Royal: nousu 5,5 (oli 6; luin kuvasta huipun noin 9,6–10). Runko 6 m, tylppä nokka, tumma suippohattu 10 m:iin (SiltaKivi × 0,42, väri arvio).
MUSTAT PISTEET JA KATKOVIIVA (`OhjelmaKohde.shader`, koskee KAIKKIA ohjelmakohteita): kamerasta poispäin olevat pinnat 3 m kauemmas syvyydessä.
- Mitattu: pisteet 40,30,18, lähes laskettu holvin alapinnan väri (normaali alas). Katkoviiva 137,120,94.
- PÄÄTELTY, ei todistettu: katkoviiva on etäisen kaiteen ulkopinnan takapuoli; molemmat voittivat syvyysvertailun yhteisellä reunalla. Metalliset ohuet ribit voivat kadota yhdeltä puolelta, jos takana on pinta alle 3 m:n päässä. Katso kuvista.
POMPIDOU: lasi 0x4E5C6A ja nauha 0,5 m (mustat raidat), X-jäykisteet 0,8 m joka jänteellä ja kerroksella (paksumpi kuin oikea, tiheys kuvasta arvio), portaissa punainen ulkolevy 3,2 m ja putki R 1,6, yläpää x −48, katto: harmaa pohja, vaaleansiniset kanavat, valkoiset polvet, 4 isoa lieriötä itäpuolella etelässä, 3 pientä kupua, punaiset laatikot, sininen putki eteläpäässä, itäputket katon alle. Paikat ja korkeudet arvioita kuvista -0 ja -mini. Lieriön huippu 50,2 m; testi muutettu. 8 684 kolmiota (oli 5 734). Pelin mittakaavassa (noin 1,45 px/m) ristikko voi näkyä kohinana: katso liikkeessä, jos KK pyytää.
KATOT: `Liuske` 0x4F5155. Palais Bourbonilla ja Saint-Eustachella `Pelti` ja `Sinkki` vaihdettu Hv-arvoihin, `Sauma = HvSinkki`. Yhteiset `Pelti` ja `Sinkki` ennallaan (Madeleine, Pont Alexandre III käyttävät niitä).

## SEURAAVAKSI
1. KS:n seuraava yhteinen ajo. Katso täysikoossa p-roy, p-con, p-roy-2, p-con-2, po-la, pb-etu, se-et ja ainakin yksi metallisilta. Ei omaa ajoa. Kuvat ensin itse, viat KK:lle; omistajalle vasta korjatusta.
2. Kerro tuloksessa KK:n sitoumukset (-0805): Pompidoun laatikko paloissa, X-jäykisteet, Hôtel de Villen kirkkaus.
3. Jos KK:n sana muuttaa järjestystä, se voittaa. KK:n sanaa suositukseen 08.0x ei ollut tätä kirjoittaessa (katsottu list_eventsillä noin 08.06); se tuli Postivahdin viestistä vain muodossa "KK:n sanan mukaan".
4. Hôtel de Villen valkoiset pisteet reunalla: ei tutkittu. Syy voi olla sama kuin mustissa pisteissä tai ei.

Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
