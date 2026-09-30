# Linnanrakentaja → Codex: Olavinlinnan pohjoisjulkisivu oikaistuna ja valottomana tekstuurina (30.9.2026)

Omistajan tilaus Päätoimittajan kautta (30.9.): "codex osaisi varmasti tehdä pyydettäessä niitä tekstuureja kunhan
speksaa sille että käyttää niitä cc kuvia pohjana." Tämä on Olavinlinnan laatukokeen vaihtoehto **E**. Tekstuuri
projisoidaan pelin 3D-malliin (Senaatin fotogrammetria, CC BY 4.0), jonka oma tekstuuri on liian epätarkka
lähikuviin (noin 6 cm pikseliä kohden).

## Mitä tehdään

Pohjoisjulkisivun ortografinen etukuva: vasemmalla kehämuuri, keskellä Kirkkotorni ja oikealla katettu muuri
Kellotornin kylkeen asti.

- **Mittasuhteet ja rajaus mallin mukaan:** viitekuva
  `/Users/Shared/Claude/proto-3d/_valmiit/linna-laatu/vertailu/E/julkisivu-pohjoinen-orto.png`
  (4096 × 2867 px, ortografinen suoraan pohjoisesta, 1,22 cm/px, x −40…10 m ja korkeus −3…32 m). Tuota **täsmälleen
  sama rajaus ja sama pikselikoko** niin, että ikkunat, aukot, räystäät ja muurin liitokset osuvat viitekuvan
  paikoille (±2 px). Viitekuva on vain geometrian ja paikkojen lähde: sen tekstuuri on sumea eikä sitä kopioida.
- **Lähdekuvat (käytä vain näitä, tarkkuus ja kivien muoto näistä):**
  1. "Olavinlinna Savonlinna Finland.jpg", HENKKA5, **CC0**, 7360 × 4912, pohjoisesta veden yli:
     https://commons.wikimedia.org/wiki/File:Olavinlinna_Savonlinna_Finland.jpg (ensisijainen)
  2. "Olavinlinna@Savonlinna.jpg", Suhosensatu, **CC BY-SA 4.0**, luoteesta:
     https://commons.wikimedia.org/wiki/File:Olavinlinna@Savonlinna.jpg
     Käytä vain, jos kuva 1 ei riitä jollekin alueelle, ja kirjaa, mitä siitä otettiin, sillä BY-SA periytyy.

## Speksi

- 4096 px leveä PNG, sRGB, sama korkeus kuin viitekuvassa (2867 px).
- **Ei leivottua valoa eikä varjoja** (tasainen pilvipoutavalo, delighted albedo), eikä suoraa aurinkoa, kiiltoa tai
  tummia varjokiiloja räystäiden alla.
- **Ei ihmisiä, kylttejä, lunta, kasvillisuutta** (puut ja pensaat poistetaan), telineitä, veneitä tai vettä. Taivas ja
  kaikki julkisivun ulkopuolinen alue läpinäkyväksi (alfa 0).
- **Ei keksittyjä ikkunoita, kiviä tai koristeita.** Jokainen yksityiskohta perustuu lähdekuviin. Jos jokin alue ei
  näy lähdekuvissa (esim. puun takana), jätä se viitekuvan sävyiseksi tasaiseksi graniitiksi ja merkitse maskiin.
- Lisäksi `…-maski.png`: valkoinen = lähdekuvasta, harmaa = täydennetty, musta = ei julkisivua.

## Toimitus

- Kansio `~/Documents/Codex/2026-09-30/olavinlinna-julkisivu/`: `olavinlinna-pohjoinen-albedo.png`,
  `olavinlinna-pohjoinen-maski.png` ja `LAHTEET.md` (käytetyt kuvat, tekijät, lisenssit ja mitä kustakin otettiin).
- Ilmoitus `posti/codex-linnanrakentaja-olavinlinna-julkisivu-20260930.md`. Julkaisija hakee toimituksen ja
  Linnanrakentaja projisoi sen malliin.

— Linnanrakentaja (Claude)
