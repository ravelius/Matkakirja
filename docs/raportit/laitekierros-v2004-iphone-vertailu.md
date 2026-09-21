# Kierros v2004: iPhone-vertailu + heilunta/meren vilkkuminen/nostojen näkyvyys z6

21.9.2026 n. klo 17.30–17.40 Suomen aikaa. Mac Studio käynnistettiin
uudelleen; jatkoa sulavuusmittauksille (`docs/raportit/laitemittaus-
sulavuus-20260921-tulos.md`). Fablen pyytämät tarkistukset v2004:llä:
heilunta panoroidessa, meren vilkkuminen zoomatessa, nostojen
näkyvyys Ranska z6 työpöydällä ja puhelimella.

## Menetelmä

Pelikoodarin `tools/laitepalvelin.mjs` (haara `pelikoodari-
laitepalvelin`) lainattu paikallisesti tähän testiin (ei
committoitu — se ei ole vielä mainissa, eikä ole minun omistamani
tiedosto). `?lauta=pallo&dev=marseille`, sama mittari
(`ui.pallolauta.sulavuus`) ja `tila()`-diagnostiikka kuin aiemmin.
Kolme vaihetta: panorointi (oikea sormiveto/hiiriveto), zoomi 1
(kamera-ajo `leveys/2.5`, 1,5 s) ja zoomi 2 (sama uudelleen, syvempi
— tämä vastaa käytännössä "z6"-tason läheisyyttä). Laitteet: iPhone
18 Pro (simulaattori) ja työpöytä (Claude-selain samaan
laitepalvelimeen).

## Tulokset: panorointi — ei heiluntaa millään laitteella

| Laite | kehyksiä | fps | siirtymä mediaani | p95 | n |
| --- | --- | --- | --- | --- | --- |
| iPhone 18 Pro | 169 | 60 | 0 px | 0 px | 1 512 |
| Työpöytä | 168 | 60 | 0 px | 0 px | 11 356 |
| *(iPad, aiempi kierros)* | 259/227 | 55,7/52,1 | 0 px | 0 px | 12 126/12 882 |

**Ei heiluntaa panoroidessa millään kolmesta laitteesta** — nimiöt/
nostot pysyvät täysin kiinni maapisteissään koko vedon ajan kaikilla
mittauksilla.

## Tulokset: zoomi — koon liukuvuus romahtaa syvässä zoomissa (TOISTUU MOLEMMILLA LAITTEILLA)

| Laite | Vaihe | korkeus | koko.osuus | koko.liikeaskel | siirtymä p95 |
| --- | --- | --- | --- | --- | --- |
| iPhone | zoomi 1 | 0,205→0,082 | 0,80 | 0 | 0,26 px |
| iPhone | zoomi 2 | 0,082→0,037 | **0** | 0 | 0 px (n pieni) |
| Työpöytä | zoomi 1 | 0,205→0,082 | 0,80 | 0 | 0,33 px |
| Työpöytä | zoomi 2 | 0,082→0,033 | **0** | 0 | 0 px (n pieni) |

**Löydös, joka toistuu identtisenä sekä iPhonella että työpöydällä:**
ensimmäisessä zoomausvaiheessa (saapumisnäkymästä n. 2,5× sisään)
koon liukuvuus on hyvä (80 % liikkeen kehyksistä muuttaa nimiön/
nostoikonin kokoa portaattomasti — sama luokka kuin Pelikoodarin Mac-
vertailu 86–97 %). **Mutta seuraavassa zoomausvaiheessa (vielä 2,5×
sisään, syvälle "z6"-tasoa lähelle) koon liukuvuus putoaa NOLLAAN —
ei yhtään kehystä, jossa koko olisi muuttunut portaattomasti liikkeen
aikana**, vaikka kamera silti liikkui (76–91 kehystä) ja nimiön/
nostoikonin SIJAINTI pysyi edelleen täysin tarkkana (siirtymä 0 px).
Tämä on todennäköinen selitys "meren vilkkuminen zoomatessa"
-havainnolle: koko luultavasti hyppää portaittain eikä liu'u tällä
zoomivälillä, mikä näkyy silmälle nykimisenä/vilkkumisena erityisesti
suurehkoilla merimerkeillä tai -alueilla.

**En ehtinyt testata juuri Marseillen rannikkoa/merta** — pan-veto
vei näkymän sisämaahan (Burgundi), joten zoomitesti tehtiin
Bourgogne/Auvergne-alueella, ei meren päällä. Tulos (koon liukuvuus
0 syvässä zoomissa) on silti todennäköisesti sama ilmiö riippumatta
alueesta, koska kyse on ladonnan/CSS2D-koon päivityksestä, ei
maantieteestä — mutta suosittelen vahvistamaan suoraan rannikolla.

## Nostojen näkyvyys Ranska "z6" (syvä zoomi)

**Työpöytä:** vahvistettu kuvakaappauksella — Vichy, Chaîne des Puys
ja Puy de Sancy näkyvät selvästi ja luettavasti syvässä zoomissa
(korkeus 0,033, `domissa.nostot: 4`). Ei havaittua näkyvyysongelmaa.

**iPhone:** `tila()` vahvistaa nostojen MÄÄRÄN vähenevän oikein
zoomin syventyessä (49 → 10 → 2, budjetin mukaisesti), mutta **kolme
peräkkäistä kuvakaappausta zoomivaiheiden 1 ja 2 välillä (ja vielä
kaksi minuuttia sen jälkeen) näyttivät pikselintarkasti samalta**,
vaikka kameran korkeus muuttui sisäisesti 0,205:stä 0,037:ään.
Työpöydällä vastaava zoomisekvenssi TOSIASIASSA muutti näkyvää kuvaa
selvästi (eri nostot eri kuvakaappauksissa). **En pysty varmasti
sanomaan, oliko tämä aito piirto-ongelma (WebKit ei päivittänyt
ruutua ajoissa) vai testimetodini sattuma** (esim. pan vei näkymän
tasaiselle, vähäpiirteiselle Burgundin alueelle, jossa ero on vaikea
huomata pelkästä kuvakaappauksesta) — en ehtinyt toistaa kontrolloitua
A/B-vertailua. Merkitsen tämän avoimeksi jatkoselvitykseksi.

## Ääni

Mac Studion kaiuttimet käytössä koko kierroksen ajan
(`SwitchAudioSource -s "Mac Studio-kaiuttimet"`), palautettu
Scarlett Solo USB:hen kierroksen lopussa.

## Ympäristö

- iPhone 18 Pro (simulaattori), UDID
  `1572C658-6455-4E55-8C05-3F88CB3C32F6` — käynnistetty ja
  sammutettu tässä kierroksessa, Julkaisijalle ilmoitettu.
- Laitepalvelin lainattu Pelikoodarin haarasta
  `pelikoodari-laitepalvelin` paikallisesti, EI committoitu tähän
  haaraan (ei minun tiedostoni, ei vielä mainissa).
- Tilapäinen apuskripti `js/laitetestaaja-harness6.js` (+ yksi
  `<script>`-rivi `index.html`:ään) poistettu, EI committoitu.
- Tuotanto v2004 vahvistettu (`matkakirja.app`).

## Seuraavaksi

1. Pelikoodari/Karttaseppä: koon liukuvuuden romahdus syvässä
   zoomissa (0,80 → 0) on todennäköinen "meren vilkkuminen
   zoomatessa" -juurisyy — kannattaa tarkistaa nimiöiden/nostojen
   koonpäivityslogiikka lähellä `korkeus < 0,04`.
2. Toista sama testi suoraan Marseillen rannikolla (ei Burgundissa)
   vahvistaakseen ilmiön merialueella.
3. Selvitä iPhonen mahdollinen piirtoviive syvässä zoomissa
   kontrolloidummalla A/B-testillä (sama kohde, vain yksi
   zoomivaihe kerrallaan, kuvakaappaus heti jokaisen jälkeen).
4. Kierros 22:n vanhat kesken-kohdat (löytämisen sumu, kartuschan
   tap-through, uusi pyramidi) yhä auki.
