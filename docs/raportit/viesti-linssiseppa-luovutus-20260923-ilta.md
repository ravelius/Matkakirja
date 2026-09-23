# Linssisepän luovutus 23.9.2026 ilta

*Linssiseppä (Opus) porttaa web-linssit natiiviin (Unity 6.3 + Cesium). Jatkaja lukee tämän,
sitten tarvittaessa docs/raportit/natiivi-linssit-inventaario-20260923.md ja
linssit-kontaktiarkki-20260923.md. Edellinen luovutus: viesti-linssiseppa-luovutus-20260923.md.*

## Työtilat

- Proto: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (master = Natiiviseppä, vain hän kääntää ja mergeää).
- Oma proto-worktree: `/Users/Shared/Claude/wt/proto-linssiseppa` (nyt haarassa linssiseppa/keksinnot-kaynnistys = masterissa).
  Uusi erä: `git checkout -b linssiseppa/<aihe> master`.
- Pelin repo: `/Users/Shared/Claude/Matkakirja-linssiseppa`, haara `linssiseppa-tyo-20260923` (raportit, pushattu).
  Webin mainin lukuun worktree `/Users/Shared/Claude/wt/linssiseppa-webmain` (älä aja `git checkout origin/main -- js` omassa checkoutissa).
- Testit: `Linssit-testit/kaanna.sh` (172/172), `Linssit-testit/unity-tarkistus.sh` (0 virhettä),
  kultaiset webistä `Linssit-testit/kultaiset/tee-*.mjs`.
- Laitetesti ilman käännöstä: `Linssit-testit/laitetesti.sh sisalto|portti|astronautti|keksinnot|maat|kontakti`
  (devicectl; koepaketin tiedostot laitteen koekansioon Documents/sisalto-koe/; iPad-vuoro aina
  Natiivisepältä, lopuksi viesti "iPad pois"). Kontaktiarkki: `node Linssit-testit/kontaktiarkki.mjs`.

## Haarat (kaikki masterissa d29971b)

| Haara | Sisältö |
|---|---|
| maat, maat-kytkenta | Vertailu ja maatiedot (MaatAineisto ISO3, MaaOsuma, MaatilaLinssi), Natiivisepän Maatila |
| luennat | Keksintöjen pysäkkiluennat (KeksintoLuennat, LuentaSoitin), testikomennot |
| astro-korjaus, kaukoraja | Pilvikuori (SetPixelData), tähdet (PalloKierto.KaukorajaVahintaan) |
| ui-koukut | Sovittimet julkisia (Linssi-ominaisuus), IhmisenMatkaKerros.EsittelyUIssa |
| esitys-aani | Esitys ei jumitu äänen kelaukseen, Levantti-kamera hypyssä, keksintöjen Tummennus |
| astro-avaruus | Avaruuden tausta (KarttaKerrokset.Taustavari), ilmakehän hehku, kylläisyyskytkin (pallo-k08) |
| koekansio | LinssiSisalto lukee Documents/sisalto-koe ensin; laitetesti.sh sinne |
| omistus | Kynnykset (400/800/1400 radio+topografia/2200), Linssirekisteri.Omistaa + Kehittajatila (sisäinen build päällä, MATKAKIRJA_APPSTORE pois) |
| radio, radiokytkenta | Maailmanradio (RadioAineisto, RadioLinssi, MatkakirjaRadio.mm AVPlayer, RadioVirta, RadioViritin), PeliOhjain.NapautusSallittu/LuentaSallittu/PelaajanKaupunki |
| keksinnot-kaynnistys | KeksinnotLinssi.Kaynnistetty, radion portitus |

## Radio: tila

- Ydin, AVPlayer-liitännäinen ja Unity-sovitin ovat masterissa; Natiiviseppä on kääntänyt .mm:n ja ATS-korjauksen
  (NSAllowsArbitraryLoadsForMedia). **Laitteella ei ole vielä kuultu yhtään lähetystä**: v16:ssa kaikki 115 asemaa
  ovat luokassa linkki.
- **Luokkasääntö toteutettu** (linssiseppa/radioluokat, mergetty masteriin 9fd0c07; TestFlight 3 = d29971b sisältää vielä tiukemman "vain sallittu" -säännön, uusi sääntö tulee seuraavaan laitekäännökseen): omistajan päätös
  23.9. klo 21.1x — "sallittu" ja "epaselva" soivat, "kielletty" (ja v16:n vanha "linkki") avaa aseman sivun,
  ilman sivua ei mitään; luokaton ei soi eikä näy asteikolla, ei edes kehittäjätilassa. Korvaavat asemat 16 maalle:
  docs/raportit/radio-korvaavat-asemat-20260923.md (Siirtoseppä päivittää kokoelman). **Seuraavaksi:** laitetesti,
  kun kokoelmassa on soivia asemia (`linssi radio`, `radio <ISO3>`, `radio tila`).
- Siirtosepältä pyydetty yksi sallittu testiasema koekansioon (voi olla tarpeeton päätöksen jälkeen).
- Natiivi-UI tekee kotelon, pistenäytön ja kartuscha-merkin myöhemmin (rajapinta: RadioLinssi.TilaMuuttui,
  Asemat, MaanAsema, Viritä, SoitaKaupunki, Keskeyta, Taajuus; RadioAineisto.PistefontinMerkit).

## Kynnykset ja omistus

- Linssirekisteri.Avauskynnykset: ihmisen matka 400, keksinnöt 800, radio ja topografia 1400, astronautti 2200;
  Kynnys(omistetut, ennen, jälkeen) webin säännöllä. Pelikoodari kytki Omistaa-koukun (passi ∪ pelikerta,
  peninkulma avaa kaikki) ja kynnyssäännön.
- Kehittäjätila: sisäinen TestFlight päällä (KOKEET-kytkin "kynnykset päällä", Natiivi-UI), App Store aina pois.

## Avoimet

1. Ensimmäinen kuultu radiolähetys iPadilla (luokkasääntö on tehty).
2. Kontaktiarkin erot (docs/raportit/linssit-kontaktiarkki-20260923.md): UI linssin päällä tarkistettava
   Natiivi-UI:n koukkujen jälkeen; astronautin sumu (Natiivi-UI korjasi, vertaa); vesistöjen webkuva
   (Laitetestaaja, linssi ajaa oman kameransa); keksintöjen tummennuksen reiän kulku hypyssä (web siirraReikaMatkalla).
3. Isoisän linssi 1873: odottaa Karttasepän web-erää 1 (haara karttaseppa-isoisan-linssi); GPL-rajat striimataan.
4. Ihmisen matkan tutkimusvaihe ja muisti (web ihmisen-matka-tutkimus.js, -muisti.js) ovat porttaamatta.
5. B18: maakäyrien data pakettiin (Siirtoseppä), tiedeliite Natiivi-UI.
6. Reliefisarjan päivämäärärajan paikka (Karttaseppä): vaihda Topografia.ReliefiSarja ja AstronauttiLinssi.VaimeaSarja.
