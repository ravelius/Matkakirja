# Siirtoprompti: päätoimittajasessio 24.8.2026

Tehty kun edellisen session tokenit loppuivat. Kaikki alla mainittu on
pushattu haaralle `claude/matkakirja-julisteet-finish-h235w7`
(HEAD `9a3d7be9`). Julkaisematta — nämä ovat docs- ja tools-tiedostoja,
eivät pelaajalle näkyviä muutoksia, joten ne kulkevat seuraavan
version mukana.

## Missä mennään

Julkaistu tässä sessiossa v1073–v1087, kaikki todennettu Pagesissa.

Valmiina haaralla, EI vielä julkaistu:
- `tools/hero-tyolista-22.mjs` (São Paulo, Toronto, Lima, Quito — 12 kohtaa)
- `tools/hero-tyolista-23.mjs` (Los Angeles, Montevideo, Havanna, Mexico City — 12)
- `tools/hero-tyolista-24.mjs` (New Orleans, Bogotá, Valparaíso, Adelaide — 12)
- `tools/hero-tyolista-25.mjs` (Hobart, Darwin, Port Moresby — 9)
- faktapohjat: Asunción, Porto Alegre, Suva, Dunedin
- riippumattomat tarkistukset: Caracas, Manaus, Salvador, Christchurch
- merkintä odottavista epäilyttävistä herokuvista (`docs/tyolista-opukselle.md`, O9 kohta 6)

Ämpärissä: herokierros 24:n neljä ensimmäistä kuvaa
(`herokoe/hero-neworleans-{aamu,keskipaiva,ilta}.png`,
`herokoe/hero-bogota-aamu.png`) — viety `vie-julisteet.yml`:llä.

## Tee seuraavaksi, tässä järjestyksessä

### 1. Neljä kaupunkilehteä (KIIREELLISIN)
Caracas, Manaus, Salvador ja Christchurch: faktapohja JA riippumaton
tarkistus ovat valmiit, mutta **opus-kirjoittajat kaatuivat kaikki
529 Overloaded -virheeseen** — mitään ei menetetty, ne eivät ehtineet
committoida. Käynnistä uudelleen.

Brieffiin PAKKO listata tarkistuksen pakolliset korjaukset nimeltä.
Tarkistus VOITTAA faktapohjan aina. Tiivistelmät:

- **Christchurch** (3 korjausta, kaikki nostossa H2): järistyksen kesto
  ~10 s ei 13 s; episentrumi 6,7 km kaakkoon keskustasta ei keskustan
  alla; 1 240 purkua EI ole "historiallisia rakennuksia" vaan Neljän
  Avenuen alueen kaikki purut. 15.3.2019 moskeija-isku pois kokonaan.
- **Salvador** (3): orjakaupan lakkautus **1850**, ei 1851; Liberdade
  "yksi suurimmista" ei "enemmän kuin missään muualla";
  `Category:Historic Centre of Salvador de Bahia` EI OLE OLEMASSA,
  oikea on `Category:Historic center of Salvador (Bahia)`.
- **Manaus** (5): **Grande Seca on 1877–1878, EI vuoden 1873 ankkuri**
  (tämä on kriittisin); etäisyys mereen 1 500 km ei 1 000 km; sivujen
  A ja B johdannot mukailevat visan faktakenttiä liian läheltä;
  tullitalon englantilaisille tiilille KEKSITTY materiaalipulasyy —
  lähde puhuu Lontoon tyylin jäljittelystä; "Mindún" → **Mindu**.
- **Caracas** (4): K2 toistaa visakysymystä 1 lähes sanatarkasti JA
  etäisyys mereen on ~15 km ei "reilun kymmenen"; L1:n luvut väärin
  molempiin suuntiin (yli 100 perhoslajia, n. 1 800 kasvilajia);
  Teleféricon "2002" ei esiinny lähteessä; H4:n "15 vuoden kausi" on
  kolme eri kautta yhteenlaskettuna eikä sovi 1873-ankkuriin
  (Guzmán Blancon 1. kausi 1870–1877). Lisää myös puuttuvat pilari 3:n
  esimerkit: El Sistema, Simón Bolívar -orkesteri, Ávila.
  **Ei nykypolitiikkaa — Chávez ja Maduro eivät esiinny.**

### 2. Herokuvat, kierrokset 22–25 (45 kuvaa, 4 tehty)
```
S=/tmp/claude-0/.../scratchpad
set -a; . $S/.env-koodit; set +a
NODE_USE_ENV_PROXY=1 node tools/hero-ajuri.mjs 24 4 99 $S/hero24
```
Ajuri ohittaa valmiit tiedostot. **Aja taustalla** — 10 minuutin
aikakatkaisu tappoi edellisen ajon neljän kuvan jälkeen; yksi kuva vie
noin 2 minuuttia. Katso jokainen kuva itse ja vertaa kahteen aitoon
Commons-kuvaan ennen julkaisua. Portin pysäyttämä kohta on tulos, ei vika.

Vienti ämpäriin: kopioi PNG:t `/tmp/vienti/julisteet/herokoe/`,
committoi ja pushaa haaralle `claude/julisteet-vienti`, aja sitten
`vie-julisteet.yml` (input `haara` = sama haara). Rebase ennen pushia,
haara elää rinnakkain.

Kytkentä peliin: `avauskuvat`-taulukon kärkeen,
`ampari: 'herokoe/hero-<id>-<aika>.png'`.

### 3. Neljä uutta faktapohjaa tarkistukseen
Asunción, Porto Alegre, Suva, Dunedin — käynnistä RIIPPUMATON tarkistus
ERI agentilla (sonnet). Kunkin koostaja nosti itse esiin sen, mihin
tarkistajan pitää katsoa:
- **Asunción**: kolmoisliiton sodan väestötappioarviot (7 %…70 %,
  kiistanalainen) — varmista ettei ole poimittu yhtä lukua konsensukseksi.
  Koostaja kertoi myös korjanneensa Christchurch-kontaminaation
  jaksosta 3 — tarkista ettei muuta ole valunut läpi.
- **Porto Alegre**: saksalaissiirtolaisuus 1824 vs. italialainen 1875 —
  Wikipedian sisäinen ristiriita, ja koko 1873-kehys kaatuu jos väärin.
  Myös 2024 tulvien uhriluku (181 vs. 169 samassa artikkelissa).
- **Suva**: vuoden 1873 löydös on poikkeuksellisen terävä — Suvaa ei
  ollut olemassa, pääkaupunki oli Levuka, Fidži itsenäinen Cakobaun
  alaisuudessa. Tarkista ketju. Koostaja merkitsi Kai Colo -sodat
  1873 erillisellä KÄSITTELYOHJE-merkinnällä ikäsopivuuden takia —
  **tämä vaatii Fablen/omistajan päätöksen.**
- **Dunedin**: koordinaattien N/S-suunnat (koostaja löysi omasta
  skriptistään etumerkkivirheen ja korjasi — pistokoe kartalta).
  `Category:Dunedin Sound` ja `Category:Flying Nun Records` ovat TYHJIÄ.

### 4. Uudet faktapohjat, kun jono tyhjenee
119 kaupunkia on ilman lehteä. Selkeitä seuraavia: Cairns, Panama
(HUOM: Panama on sekä northamerica- että southamerica-laudalla —
kysy omistajalta kumpi, sama Borneo-tyyppinen kysymys kuin ennenkin).

## Työtapa (älä poikkea)

- Ketju: faktapohja (sonnet) → RIIPPUMATON tarkistus ERI agentilla
  (sonnet) → kirjoittaja (opus) → päätoimittajan pistokoe → julkaisu.
- **Tarkista aina worktreen commitit ennen kuin epäilet agenttia
  kuolleeksi**, ja anna sille 60 minuuttia. Kontin kaatuminen tuotti
  kerran viisi kaksoislehteä juuri tämän laiminlyönnin takia.
- **Poista valmiit worktreet heti** (`git worktree remove --force`) —
  84 valmista worktreetä täytti levyn kerran. Commitit säilyvät `.git`:ssä.
  ÄLÄ poista lukittuja.
- Lohkojen poiminta: `tools/poimi-lohko.mjs` (sulkulaskenta).
  `kulttuuri-kategoriat.js` on 70 000 riviä ja cherry-pick konfliktoi aina.
- **EI git stashia koskaan** (jaettu worktreiden kesken, todistetusti
  vaarallinen). **EI malli-ID:itä committeihin eikä PR:iin.**
- Visasääntö: lautakysymysten vastausten **PITÄÄ löytyä** lehden
  teksteistä — sääntö ei ole "älä vuoda vastauksia" vaan "älä toista
  visan omaa faktakenttää sanatarkasti". Minitehtävä ei saa toistaa
  visaa, ja sen oma vastaus on samalla sivulla. Annoin tämän aiemmin
  väärin päin noin kymmeneen brieffiin; Quitoon jäi siitä aukko.
- Kategorianimiä EI ARVATA. `Category:Oodi`, `Category:Citadel of
  Damascus`, `Category:Royal Tombs (Petra)`, `Category:St. Louis
  Cemetery No. 1`, `Category:El Capitolio` ja `Category:Fijians` ovat
  kaikki tyhjiä tai olemattomia, vaikka kohteista on satoja kuvia.
  Reitti on en-Wikipedia → Wikidata (P373 / commonswiki-sitelink).

## Julkaisukaava

`git fetch origin main` → `node tools/uusi-versio.mjs "<rivi alle 60 mrk>"`
→ portit (`node --test tests/*.test.mjs`, `tarkista-kaksoisavaimet`,
`tarkista-niputus`, `tarkista-savukkeet`, `build-standalone` +
`savuke-dist`) → commit → push → PR → CI → squash-merge
`vNNNN: … (#PR)` → `git checkout -B <haara> origin/main` → Pages-poll
`ravelius.github.io/Matkakirja/sw.js`.

## Omistajalle kysyttävää

1. Suvan Kai Colo -sodat 1873: mukaan vai pois (ikäsopivuus).
2. Panaman lauta: northamerica vai southamerica.
3. Afrikka (paketti O7) odottaa yhä aloituslupaa.
4. `OPENAI_ADMIN_KEY` ja kolme `GOOGLE_BILLING_*`-asetusta puuttuvat
   workerista — v1087:n kulutuspalkit ovat siihen asti tyhjät.
5. Seitsemän epäilyttävää herokuvaa odottavat päätöstä (O9 kohta 6).
