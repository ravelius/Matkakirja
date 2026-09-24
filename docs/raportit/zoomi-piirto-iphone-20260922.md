# Zoomin piirtokokeet oikealla iPhonella (Laitetestaaja)

22.9.2026 n. klo 07.35–07.46. iPhone 18 Pro -simulaattori (oikea
Safari/Metal), haara `pelikoodari-zoomi-piirto` (1a3cc1ff3, pohja
main v2060). Menetelmä ja tavoite: docs/raportit/zoomi-piirto-20260922.md
"Pyyntö Laitetestaajalle". Osoite
`?lauta=pallo&dev=marseille&kerrokset=porras6[&koe=<nimi>]`, tulos
sivun omasta `window.__kehysprofiili`-mittarista (asentuu automaattisesti
kun `kerrokset` tai `koe` on osoitteessa), luettu kuvakaappauksesta.
Ranska z6, kirjaston zoom-tween (0,2→0,067→0,2, 2×1,5 s), kaksi toistoa
per koe, sama sivulataus.

## Tulokset (p95 / max ms, >50 ms -kehyksiä, pitkien kehysten varattu-osuus)

| koe | toisto 1 | toisto 2 |
| --- | --- | --- |
| perus | p95 100 / max 208, >50:19, varattu 60% | p95 106 / max 224, >50:19, varattu 58% |
| leijuvanha | p95 106 / max 199, >50:23, varattu 72% | p95 49 / max 115, >50:7, varattu 59% |
| eikasvot | p95 124 / max 217, >50:23, varattu 66% | p95 98 / max 172, >50:13, varattu 67% |
| eipollo | p95 107 / max 172, >50:18, varattu 57% | p95 94 / max 185, >50:15, varattu 54% |
| eiliike | p95 128 / max 204, >50:20, varattu 64% | p95 109 / max 123, >50:17, varattu 58% |
| eiblend | p95 151 / max 223, >50:20, varattu 73% | p95 134 / max 161, >50:30, varattu 63% |
| eicss2d | p95 135 / max 229, >50:23, varattu 59% | **p95 67 / max 116, >50:10, varattu 61%** |
| vientilepo | p95 133 / max 226, >50:19, varattu 47% | **p95 39 / max 110, >50:4, varattu 30%** |
| eihaive | p95 138 / max 218, >50:19, varattu 58% | p95 108 / max 196, >50:14, varattu 64% |
| aniso1 | p95 163 / max 217, >50:25, varattu 72% | p95 100 / max 213, >50:16, varattu 60% |

## Havainnot

1. **Yksikään koe ei erottunut selvästi ja johdonmukaisesti kohinasta.**
   Toisto 1 on lähes aina huonompi kuin toisto 2 riippumatta kokeesta
   (perus mukaan lukien) — tämä viittaa lämpenemisilmiöön (ensimmäinen
   zoomi tässä sivulatauksessa lämmittää jotain: shader/JIT/GC/
   laattacache), joka peittää yksittäisten kokeiden vaikutuksen. En
   tehnyt kylmä-vs-lämmin-erottelua erikseen (aikabudjetti) — tätä ei
   pidä lukea "kokeen vaikutuksena" vaan mittauksen rajoitteena.
2. **`eiblend` on ainoa, joka on JOHDONMUKAISESTI huonompi** kuin perus
   molemmilla toistoilla (151/134 vs. 100/106, varattu-osuus 73%/63% —
   korkein molemmista koko taulukossa). Jos mix-blend-mode todella
   pakottaa oman komposiittoripinnan, sen POISTAMISEN pitäisi
   *parantaa*, ei huonontaa — poikkeava suunta viittaa siihen, että
   `eiblend`-koe itsessään käynnistää jonkin ylimääräisen
   uudelleenpiirron (esim. tyylin invalidoinnin), ei ratkaise ongelmaa.
   Kannattaa tarkistaa kokeen toteutus ennen johtopäätöksiä.
3. **`vientilepo` toisto 2 on koko matriisin paras yksittäinen tulos**
   (p95 39 ms, >50: 4, varattu-osuus 30 % — ainoa alle Pelikoodarin
   40 %:n GPU-rajan) mutta toisto 1 samalla kokeella oli lähes yhtä
   huono kuin perus (133 ms) — sama lämpenemisilmiö, mutta poikkeuksel-
   lisen suuri pudotus toistossa 2 (39 vs. perus-toisto2:n 106) viittaa
   silti johonkin aitoon: kun tekstuurien vienti on jo tehty (levossa,
   ei liikkeessä), TOINEN zoomi tässä samassa sivulatauksessa ei enää
   vie yhtään tekstuuria kesken eleen. **Suosittelen uusintaa
   useammalla toistolla (4-6) pelkästään tällä kokeella** ennen
   johtopäätöstä.
4. `eicss2d` toisto 2 (p95 67) on toiseksi paras — sama varaus: yksi
   hyvä toisto kahdesta ei riitä.
5. Kukaan koe ei tuonut varattu-osuutta poikkeuksellisen alas paitsi
   vientilepo/toisto2 (30 %) — muissa 54-73 % väliltä, eli pääsäikeen
   työ (layout/paint/JS), ei pelkkä GPU-odotus, dominoi useimmissa
   pitkissä kehyksissä. Tämä puoltaa Pelikoodarin oletusta väärin
   päin verrattuna alkuperäiseen kysymykseen ("onko p95 pieni JA
   varattu-osuus < 40 %?") — useimmissa tapauksissa EI ole, joten syy
   on todennäköisemmin pääsäikeen työssä (layout/paint) kuin puhtaassa
   komposiitorissa.

## Rajoitteet

- Kaksi toistoa per koe, sama sivulataus — ei riitä erottamaan
  todellista vaikutusta lämpenemiskohinasta luotettavasti minkään
  yksittäisen kokeen kohdalla paitsi `eiblend` (johdonmukaisesti
  huonompi) ja mahdollisesti `vientilepo` (ks. yllä).
- En testannut kylmää tilaa (uusi sivulataus per toisto) ajan
  puutteessa — tämä olisi poistanut lämpenemisvinouman mutta
  kaksinkertaistanut ajomäärän (20 sivulatausta 10 sijaan).
- Simulaattori, ei fyysinen iPhone.

## Ympäristö

iPhone 18 Pro -simulaattori, käynnistetty/sammutettu, Julkaisijalle
ilmoitettu. Mac Studion kaiuttimet käytössä, palautettu Scarlett Solo
USB:hen. Harness (`js/laitetestaaja-ablaatio.js` + index.html-rivi) ja
`tools/laitepalvelin.mjs`: EI committoitu, poistettu. Testihaara
`laitetestaaja-zoomi-piirto` poistettu paikallisesti.
