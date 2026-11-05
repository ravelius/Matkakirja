# Sacré-Cœur24k /#2127 — seitsemän kuvan arviointitoimitus

**Kokonais-QA: FAIL.** Kuvat toimitetaan omistajan arvioon muuttamattomina. Parantuneet kohdat: lähes valkoinen kivi, kapeammat suipot kupolit, pohjoisakselin kellotorni, mäki ja eteläportaat sekä itä/länsikuvan eteläjulkisivu reunalta.

8 työkalukutsua:7kuvaa ja1ennen generointia hylätty parametrikutsu (6viitettä, sallittu5). Jokaisesta näkymästä vain yksi natiivikuva. Kaikki7kuvaa PNG/RGB1536×1024. Ei kokouusintoja, ei QA-uusintoja, ei tuotantopikselien muokkausta eikä uutta maapohjaa.

## Mittaukset natiiveista

Pikselikoordinaatit vasemmasta yläkulmasta. Mäen ja kirkon leveydet on erotettu. Kirkon mitasta jätetään etuterassi ja portaat pois, mutta varsinainen sisäänkäynti lasketaan mukaan. Arvioitu mittausepävarmuus±4px; etelän lattiadatum±12px (porraskynnys osin kaiteen takana).

|Näkymä|Mäki leveys px|Kirkko leveys px|Maaviiva y|Näkyvä nurmiharja y|Kirkon lattia y|Kupolin kärki y|Tornin kärki y|
|---|---:|---:|---:|---:|---:|---:|---:|
|etela|1369|517|998|717|679|25|peittynyt|
|pohjoinen|1360|530|997|748|754|peittynyt|17|
|ita|1495|817|974|722|722|76|63|
|lansi|1487|801|974|722|722|70|66|

Tavoitteet:3px/m; maaviiva900,tasanne720,kupoli210. Mäen leveydet S/N600px ja E/W1260px; kirkon leveydet S/N300px ja E/W600px. Vastakkaisten mäkien leveysero: S/N 0.66%, E/W 0.54%. Vastakkaisten kirkkojen leveysero: S/N 2.48%, E/W 1.98%. Nämä parivertailut läpäisevät5%, mutta **suuntien yhteinen mittakaava ei toteudu**.

Korkeinta näkyvää pistettä mitattaessa S:ssä se on kupoli, N/E/W:ssä kellotorni. Tämän erillisen korkeussarjan vaihtelu on 7.64% (raja5%). Pohjoisen kupolin kärki jää nimenomaan peittoon; sen arvo on null eikä tornin kärjestä johdeta kupolin korkeutta.

|Näkymä|Kirkon W/H (lattiasta kupoliin)|Virhe tilauksen50/83 tai96/83-suhteesta|7%|Näkyvä nurminousu px|
|---|---:|---:|---|---:|
|etela|0.7905|+31.23%|False|281|
|pohjoinen|ei mitattavissa|ei mitattavissa|ei varmennettu|249|
|ita|1.2647|+9.34%|False|252|
|lansi|1.2285|+6.22%|True|252|

Mäen nousua ei sekoiteta etuterassin muurin korkeuteen. Eteläkuvassa näkyvä nurmiharja y717 ja porraskynnys/lattia arviolta y679 ovat eri datumit. Idässä ja lännessä nurmiharja ja kirkon lattia osuvat y722:een. Raakapikselit yllä; mäen oman vaakaleveyden mittakaavalla tulkitut korkeudet S/N/E/W ovat 41.1m, 36.6m, 70.8m, 71.2m. Nämä eivät ole todellisia rakennusmittoja vaan paljastavat kuvasarjan mittakaavaristiriidan. Kupolin170m-korkeudella kalibroitu nurminousu S/E/W on 73.0m, 66.3m, 65.7m.

## Samat fyysiset listat

Alalista = suuren keskikupolin alemman kaari-ikkunarummun alalistan alareuna. Ylävertailu = saman rummun yläreunan hammastuslistan alareuna. Ei verrata eri siipien tai apsiksen räystäitä.

|Näkymä|Alalista y|Ylärengas y|
|---|---:|---:|
|etela|437|369|
|pohjoinen|peittynyt|391|
|ita|488|416|
|lansi|488|416|

Pohjoisen alalista on osin sivukattojen ja tornin peitossa: tiukka mitta **null**. Näkyvä fragmentti viittaa noin y450±8:n tasoon, mutta tämä on vain arvio, ei neljän kuvan PASS-mittaus. Ylärengas näkyy pohjoisessa tornin sivulla; sen maasta mitattu korkeushajonta 12.08% ja kirkon lattiasta 17.74%. Alalistan neljän suunnan yhteiskorkeutta ei pystytä varmentamaan.

## Ylä- ja viistokuvat

Yläkuvan lähdebbox[652,294,884,730], toteutunut[518,23,1018,1000]. Siluettiala 4.888x lähteen pinta-ala; 327844px (79.5%) tuotoksen siluetista on annetun jalanjäljen ulkopuolella. Kierto noin89.99° vs maskin85.69°. Muoto on pyöristetty kapseli. Julkisivujen/rumpujen sivut ja terassin kaaret näkyvät:90°-ehto ei täyty.

Lounaan luotettavaa65°mittausta ei väitetä: pyöreä mäki/terassi peittävät pitkät samantasoiset pohjasärmät. Koillisessa kellotornin plintin vierekkäisten reunojen paikallinen mittaproksi (781,699)→(810,754)→(934,731) antaa sin≈0.593 ja kulman≈36.4° (epävarmuus noin±8°, tavoite65°/sin0.9063). Se ei ole koko rakennuksen geodeettinen mittaus. Vastapuoli vaihtuu oikein etelästä pohjoiseen, mutta tarkkaa180°ja samaa mittakaavaa ei varmenneta.

## Muut havainnot

- Yläkuva ei ole90° ja annettu jalanjälki ylittyy; mäki pyöristyy kapseliksi.
- Sivukuvien S/N ja E/W mittakaavat poikkeavat toisistaan; natiiveja ei normalisoida.
- Pohjoisessa kupolin kärki peittyy; tornin kärki ei korvaa kupolimittausta.
- Kupolirummun alalista pohjoisessa osittain peittynyt, tiukka mitta null; y450±8 on vain erillinen arvio.
- Etelän kirkon lattia/porraskynnys on osin kaiteen takana ja datumilla±12px epävarmuus.
- Mäen näkyvä nurmiharja, kirkon lattiataso ja etuterassin tukimuurin alareuna ovat eri asiat.
- Viistokuvissa mäen nousu ei vastaa selvästi sivukuvia; hill contour and church placement vary across projections.
- Itä/länsikuvissa eteläratsastajat piirtyvät kaksi päällekkäin sivuprofiiliin; syvyyspeitto ei ole oikean rakennuksen mukainen.
- Pohjoisessa kirkon sivuilla näkyy pieniä terassimuurin ulokkeita, vaikka muiden sivujen piti olla pelkkää nurmiluiskaa.

96×50m säilyy tilauksen suunnittelusuhteena, ei itsenäisesti varmennettuna ulkomittana. Kuvien170m kirkko ja60m mäki ovat pelimallin mittoja. Lähteet, lisenssit ja ristiriidat LAHTEET.md:ssä.

**Toimitus ei tarkoita omistajan hyväksyntää eikä Tripo-valmiutta.** Ei Tripoa, R2:ta, runtime-integraatiota tai julkaisua.
