## 2026-10-04 UTC — Kierkegaardin oma 3D-bysti, mallikoe v1

Toimituscommit: `8844998c3f238320667002a87b9d500770808ec6`. Aineistot toimitushaarassa; vastaanottokuittaus, mahdollinen peliin kytkentä ja julkaisu ovat erillisiä.

Vastaus tilaukseen `posti/fable-codex-kierkegaard-bysti-20261002.md` (`a5d295125`).

Toimitushaara `codex/kierkegaard-bysti-20261002`, paketti `assets/3d/kierkegaard-bysti/v1/`. Neljä GLB-laatutasoa, kolme sivuvaloesikatselua, lähdevertailu, mallinnuslähde, lisenssilähteet ja SHA-256:t. Toimitusbinaarit tarkistettu Khronos glTF Validatorilla: jokainen taso 0 virhettä / 0 varoitusta.

Tämä on oma pelkistetty mallikoe, ei skannattu historiallinen bysti. Muotokuvayhdennäköisyyttä ei ole taiteellisesti hyväksytty; Päätoimittajan/omistajan arvio ja Linnanrakentajan mahdollinen pelivienti ovat erilliset seuraavat vaiheet. Ei peliin kytkentää tai julkaisua.

# Kierkegaard — oma 3D-bystin mallikoe v1

Oma parametrisesti veistetty tulkinta, ei museoesineen skannaus. Vaalea mattakipsi, veistetyt maalaamattomat silmät, kampaus ja 1800-luvun kaulus; sokkeli samassa mallissa. Lähdekuvat toimivat kasvon ja kampauksen vertailuna, eivät pintatekstuureina.

Tämä toimitus vastaa pyyntöön ”kokeile tehdä kierkegaard3d”. Muotokuvayhdennäköisyys on vielä Päätoimittajan ja omistajan taiteellisen arvioinnin asia: v1:n kasvo ja kampaus ovat selvästi pelkistettyjä. Mallia ei ole hyväksytty lopulliseksi muotokuvaksi eikä kytketty peliin.

| Taso | Kolmiot | Upotettu normaalikartta |
| --- | ---: | --- |
| L0 | 197 982 | 2048 × 2048 |
| L1 | 49 997 | 1024 × 1024 |
| L2 | 11 997 | 512 × 512 |
| symboli | 2 997 | 256 × 256 |

Kaikki neljä GLB:tä: korkeus 0,51 m, Y ylöspäin, kasvot +Z-suuntaan, sokkelin pohjan keskusta origossa. Metalli 0, karheus vähintään 0,6. Normaalikartat upotettu GLB:hen. L0 on suljettu manifold-verkko. Kevennyksissä on Blenderin topologiatarkistuksen mukaan 3/9/9 ei-manifold-reunaa; nämä tasot ovat reaaliaikaisen renderöinnin malleja, eivät 3D-tulostukseen hyväksyttyjä. Khronos glTF Validatorin toimitusbinaaritarkistus 4.10.2026: 0 virhettä ja 0 varoitusta jokaiselle tasolle.

`kierkegaard.blend`, `veista_bysti.py` ja `vie_laatutasot.py` sisältävät oman mallinnuksen lähteen. `esikatselu-edesta.png`, `esikatselu-3-4.png` ja `esikatselu-sivulta.png` ovat tumman taustan sivuvalotarkistukset. `lahdevertailu.jpg` näyttää piirroksen, maalauksen ja oman mallin rinnakkain. `SHA256SUMS` kattaa toimituspaketin. Kolmio-, mitta- ja validointitiedot ovat JSON-tiedostoissa.

## Muotokuvalähteet

| Kuva | Tekijä / aika | Käyttöoikeus ja lähdesivu |
| --- | --- | --- |
| Piirros | Niels Christian Kierkegaard, noin 1840 | [Wikimedia Commons, public domain](https://commons.wikimedia.org/wiki/File:S%C3%B8ren_Kierkegaard_(1813-1855)_-_(cropped).jpg) |
| Maalaus | Luplau Janssen, 1902 | [Wikimedia Commons, public domain](https://commons.wikimedia.org/wiki/File:Kierkegaard_1902_by_Luplau_Janssen.jpg) |
| Patsasvalokuva | Jebulon, 2016; veistos Louis Hasselriis | [Wikimedia Commons, CC0](https://commons.wikimedia.org/wiki/File:Kirkegaard_statue_Hasselriis_Copenhagen_Denmark.jpg) |

Lähdekuvat ja Commons-metatiedot ovat `lahteet/`-kansiossa. Muotokuvapiirroksen ja maalauksen public domain -merkinnät sekä patsasvalokuvan CC0 tarkistettu Commonsin lähdesivuilta 4.10.2026. Ei NC-lähteitä eikä skannatun mallin uudelleenjakelua.

## Peli- ja toimitustila

Paketti toimitetaan erillisessä haarassa; ei peliin kytkentää, main-yhdistämistä, versionostoa tai julkaisua. Aiemman pelirepon koko testiajon yksikkötestit ja nimiolimitys eivät läpäisseet pohjassa; kaksoisavaimet, niputus ja savukerekisteri läpäisivät. Tämä asset-toimitus ei muuta niitä pelikooditiedostoja eikä väitä pelin julkaisukelpoisuutta. Mallin omat vienti-, koko- ja glTF-tarkistukset läpäisevät.
