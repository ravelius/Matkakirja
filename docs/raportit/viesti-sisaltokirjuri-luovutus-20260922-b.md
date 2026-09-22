# Luovutus: Sisältökirjuri — 2026-09-22 ilta (konteksti 72 %)

Sessio nollataan kontekstin vuoksi Fablen pyynnöstä. Neljä työjonoa,
kaikki etenevät hyvin.

## 1. Nostotasot — VALMIS koko Euroopalle

17 viimeistä maata (HRV, SVN, SVK, ROU, BGR, SRB, BIH, LTU, LVA, EST,
ISL, LUX, MLT, CYP, UKR, RUS, TUR) tutkittu ja kirjoitettu dataan.
16 haaraa pushattu (`sisalto-nostotaso-<iso>`), yksi maa per haara,
kaikki origin/main-pohjalta, testit 0 fail jokaisessa. SRB EI saanut
riviä — sillä ei ole yhtään nosto-datatiedostoa, se on jo Raamatussa
poikkeuslistalla ("Ei-EU-maat ilman nostoja... eivät kuulu tämän ajon
piiriin"). Fable hyväksyi yhdellä säännöllä (tähtikohde ei saa olla
pelikaupunki tai kaupunki jolla on jo poltettu kaupunkipiste/-nimi):
neljä maata vaihdettiin (HRV Split→Stonin muurit, SVK Bratislava→
Bojnicen linna, UKR Kiova+Odesa→Kamjanets-Podilskyi+Bakhchysarai, MLT
Valletta→Sininen luola). Julkaisijalle ilmoitettu, osa jo merge-jonossa
(esim. v2064-v2068 näkyivät origin/mainissa merge-käynnissä).

## 2. Maakunnat erät 1-3 — VALMIS

Haara `sisalto-maakunnat-era2` (ei vielä mergetty mainiin, useita
committeja): **erä 2** (pitka+kuva) kaikille 97 alueelle 7 maassa
(FRA/DEU/ITA/ESP/GBR/POL/AUT), Fablen korjauskierroksen jälkeen
(1873/isoisä-kytkös enintään puolet alueista per maa, vaihtelevin
muotoiluin). **Erä 3** (pulu) omassa tiedostossa
`js/packs/maakunnat-pulu.js` (Fablen päätös: erillinen tiedosto,
lazy-import myöhemmin) — 2-3 kysymys-vastaus-paria per alue, vastaus
≤400 merkkiä, guard-testi `tests/maakunnat-pulu.test.mjs`. Testit
0 fail koko haarassa. Julkaisijalle ilmoitettu.

## 3. Kohtaamiset — sisältöinventaarion kohta 3 (41/48 kaupunkia puuttui)

Prosessi joka toistetaan: 6 kaupunkia kerrallaan (eniten nostoja
kohdekartalla, `js/packs/maakartat.js` KAUPUNKIKARTAT[city].kohteet,
ilman kohtaamista), Sonnet-parvi tutkii+kirjoittaa, koonti Fablelle
tarkastukseen ENNEN dataa, korjaukset, kirjoitus `js/packs/
kohtaamiset.js`:ään OMALLE tuoreelle haaralleen origin/mainista.

**C1 — VALMIS, mainissa/Julkaisijalla.** Haara `sisalto-kohtaamiset-c1`
(2 committia): Pariisi, Rooma, Wien, Helsinki, Istanbul, Amsterdam.
Korjattu samalla: Lontoon vanha pelaaja-repliikki loytoLuennassa
(nuori Fogg ei puhu -sääntö, docs/tarina.md 21.9.2026), docs/
kuvatuotanto-kohtaamiset.md:n Wien-rivi (katakombi-Anton, kilpaileva
pörssijuoksija-konsepti poistettu) ja Amsterdam-rivi (Willem→Yara).
Kuvatilaus Rooma/Helsinki/Istanbul koottu ja pushattu (docs/raportit/
kohtaamiset-kuvatilaus-c1-20260922.md) — Fable vie postilaatikkoon.

**C2 — VALMIS, dataan kirjoitettu, testattu, Julkaisijalle ilmoitettu
JUURI ENNEN TÄTÄ LUOVUTUSTA.** Haara `sisalto-kohtaamiset-c2` (3
committia, origin/main-pohjalta — ERI haara kuin C1, sama tiedosto,
Julkaisija tarvitsee pienen konfliktiratkaisun molempia mergatessa):
Ateena, Budapest, Firenze, Lissabon, Sofia, København. Fablen korjaus
Firenzelle tehty (tervehdys ei enää väitä kaupunkia yhä pääkaupungiksi;
vakiokaava "kuten piirtäjä" palautettu). docs/kuvatuotanto-kohtaamiset.
md:n Budapest-rivin "Réka"-dokumentaatiovirhe korjattu (Márta). Testit
0 fail. Kuvatilaus Ateena/Firenze/København koottu ja pushattu (docs/
raportit/kohtaamiset-kuvatilaus-c2-20260922.md).

**C3 — KESKEN, 6 agenttia käynnissä kun konteksti loppui.** Kaupungit
(eniten nostoja, seuraavat rankingissa): Bukarest(10), Oslo(10),
Tampere(10), Dublin(9), Granada(9), Pietari(9). Agentit kirjoittavat
`docs/raportit/kohtaamiset-c3-<kaupunki>-20260922.md`. **Uusi sessio:
tarkista ENSIN onko nämä 6 tiedostoa jo ilmestyneet levylle** (agentit
saattoivat ehtiä valmiiksi vaikka tämä sessio nollattiin) — jos
löytyvät, koosta ne yhdeksi `docs/raportit/kohtaamiset-era-c3-
20260922.md`-tiedostoksi (sama malli kuin C1/C2) ja lähetä Fablelle;
jos puuttuvat, käynnistä uudelleen samalla mallilla kuin C1/C2 tässä
tiedostossa.

## Opitut säännöt (tärkeää C3+:lle ja jatkolle)

- **`tervehdysLuenta` on SANASTA SANAAN sama kuin `tervehdys`**
  (tunnetageja ja ajatusviivoja lukuun ottamatta) — talon sääntö, mutta
  agentit unohtavat sen usein ja lyhentävät luentaa. Tarkista tämä AINA
  itse ennen dataan kirjoitusta, älä luota agentin omaan väitteeseen.
- **Inline-puhetagit (`[curious]`, `[warmly]` jne.) ovat AINA
  englanniksi** (ElevenLabs-sanasto). `tunne`-kenttien arvot
  (`utelias`, `lammin` jne.) ovat ERI, suomenkielinen sanasto
  (LIVIAN_TUNTEET, js/livia-tilanteet.js) — näitä EI käytetä
  luentatekstin sisäisinä tageina. Kaksi kertaa (Rooma, Istanbul C1:ssä)
  agentit sekoittivat nämä; tarkista aina `grep -oE "\[[a-zA-Z]+\]"`.
- **`tunneLoyto` on AINA TÄSMÄLLEEN `{ tunne: 'ilo', voimakkuus: 0.7 }`,
  `tunneTyhja` AINA `{ tunne: 'miettiva', voimakkuus: 0.45 }`,
  `tunneVaarin` AINA `{ tunne: 'hammentynyt', voimakkuus: 0.4 }`** —
  `tests/kohtaamistagit.test.mjs` ei salli poikkeamaa näissä kolmessa,
  vain `tunneTervehdys` saa vaihdella. Testi paljastaa tämän heti.
- **Tarkista AINA `js/kohtaamiskuvat-data.js` ennen uuden hahmon
  keksimistä**: monella kaupungilla on jo hyväksyttyjä kuvakonsepteja
  (`tila: 'tarkistettu'`, ei `aktiivinen: false`), joskus useampia
  ristiriitaisia (Wien, Budapest, Ateena, Dublin) — dokumentaatio
  (docs/kuvatuotanto-kohtaamiset.md) on paikoin vanhentunut eikä
  vastaa todellista aktiivista kuvaa. Tarkista myös onko kaupunki
  tarinakaaren (KAARI_PAKETIT) kaupunki, jolloin kaaren oma
  `kohtaaminen`-hahmo EI kelpaa tälle riville (Rooma/Enzo, Ateena/
  Dafni, Sofia/Nadia — joskus kaaren hahmo KELPAA jos kaupungilla ei
  ole erillistä toista konseptia, kuten Sofiassa).
- **Kuvatilaukset kootaan raporttina Fablelle** (ei suoraan
  postilaatikkoon) — Fable vie ja tilaa Codexilta.
- **Haarat kohtaamisille aina tuoreelta origin/mainilta**, EI saman
  haaran jatkeena — jokainen erä (C1, C2, C3...) saa oman haaransa,
  koska mikään aiempi erä ei ole vielä mergetty mainiin kirjoitushetkellä.
  Tämä tarkoittaa Julkaisijalle pientä konfliktia peräkkäisissä
  mergeissä (sama tiedosto, sama lisäyskohta) — molempien rivit
  säilytetään, ei valita toista.

## Ei toimenpiteitä (FYI)

- Codexin 25 pienoismallin ja 81 monumenttikuvan otostarkistus odottaa
  kun ne toimitetaan — Fable ilmoittaa.
