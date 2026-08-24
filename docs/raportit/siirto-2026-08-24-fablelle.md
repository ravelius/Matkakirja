# Siirtoprompti Fablelle 24.8.2026

Opus-päätoimittajasessio päättyy tähän omistajan ohjeella. Kaikki
alla mainittu on mainissa (v1088) tai ämpärissä, ei mitään roikkumassa
paikallisessa työpuussa.

## Mitä valmistui

**v1073–v1088 julkaistu ja todennettu Pagesissa.** v1088 sisältää:

- **Neljä uutta kaupunkilehteä**: Caracas, Manaus, Salvador,
  Christchurch. Jokainen kirjoitettiin ketjulla faktapohja (sonnet) →
  RIIPPUMATON tarkistus eri agentilla (sonnet) → kirjoittaja (opus),
  ja kirjoittajalle annettiin tarkistuksen pakolliset korjaukset
  nimeltä lueteltuina. Lehtiä on nyt 146.
- **Oranssi laatta maailmankartalla kehittäjätilassa**: kaupunki, jonka
  herokuvat on ankkuroitu kohteen omiin Commons-valokuviin. Täysi
  oranssi = koko erä, haalea = osa. Lista on jaetussa moduulissa
  `js/viitekuva-herot.js`, jota lukevat sekä kartta (`js/ui.js`) että
  MANTEREET-taulukko (`js/tyohuone-tilastot.js`).
- **Vastaustyyliksi `Concise`** (`.claude/settings.json`). Koskee
  kaikkia kolmea sessiota.
- **Googlen laskutusasetukset** julkaisuputkeen
  (`.github/workflows/pollo-julkaisu.yml`).

**Herokuvat**: kierrokset 22, 23, 24 ja 25 KAIKKI VALMIIT — 45 kuvaa,
kaikki viety ämpäriin `herokoe/`-kansioon. Yksikään ei kaatunut
generointiporttiin. Kaksi kuvaa generoitiin ilman viitteitä, koska ne
ovat työlistoissa tarkoituksella yleisnäkymiä (Mexico City / Xochimilco
ja Port Moresby / Boroko).

**Pöllö-worker julkaistu uudelleen**, joten `OPENAI_ADMIN_KEY` on nyt
workerin käytössä.

## KESKEN — tee nämä ensin

1. **Kuvien kytkentä peliin.** 45 valmista kuvaa on ämpärissä mutta
   **EI VIELÄ KYTKETTY** lehtiin. Tämä on session tärkein keskeneräinen
   asia. Kytkentä:
   `avauskuvat`-taulukon kärkeen, `ampari: 'herokoe/hero-<id>-<aika>.png'`.
   Kaupungit (15, kolme kuvaa kussakin): São Paulo, Toronto, Lima,
   Quito, Los Angeles, Montevideo, Havanna, Mexico City, New Orleans,
   Bogotá, Valparaíso, Adelaide, Hobart, Darwin, Port Moresby.
   **SAMASSA VERSIOSSA on lisättävä ne `js/viitekuva-herot.js`-listaan**,
   muuten oranssi merkintä ja kuvat eriytyvät. Se on koko moduulin
   olemassaolon syy.
   Vienti: kopioi PNG:t `/tmp/vienti/julisteet/herokoe/`, **rebase ennen
   pushia**, pushaa `claude/julisteet-vienti`, aja `vie-julisteet.yml`.

2. **Katso kierrosten 22–25 kuvat läpi.** Ehdin katsoa vain Valparaíson
   Ascensor Concepciónin (kelpaa varauksin: hammastangot oikein, mutta
   vaunuja kolme kahden sijaan ja värit vaihtaneet paikkaa). Loput 44
   ovat katsomatta. Omistajan sääntö: vertaa kahteen aitoon
   Commons-kuvaan ja tarkista, ettei kohde näytä epäilyttävän isolta.

## ODOTTAA SINUN PÄÄTÖSTÄSI

- **Suvan Kai Colo -sodat 1873.** Faktapohjan koostaja löysi, että
  isoisän matkan vuosi osuu suoraan näihin rankaisuretkiin, ja lähdeteksti
  on raakaa (joukkomurhat, orjuutus). Hän kirjoitti tarkoituksella
  lievennetyn version ja merkitsi sen KÄSITTELYOHJE-huomiolla sinun
  ikäsopivuusarviotasi varten sen sijaan että olisi päättänyt yksin.
  Tämä on session ainoa aidosti avoin sisältökysymys.
- **`SOUTHAMERICA_FACTS`-rivillä on virhe**: Caracasin etäisyys mereen
  on 10 km, oikea on 15 km. Kirjoittaja ei korjannut, koska visarivien
  korjaus ei kuulunut tilaukseen.
- **Panaman lauta**: se on sekä `northamerica`- että
  `southamerica`-taulussa. Sama Borneo-tyyppinen kysymys.
- **Afrikka (paketti O7)** odottaa yhä aloituslupaa.
- **Seitsemän epäilyttävää herokuvaa** (`docs/tyolista-opukselle.md`
  O9 kohta 6) — omistaja: "jätetään myöhemmäksi, kirjataan muistiin".

## VALMIINA MUTTA KESKEN JÄTETTY (omistajan ohje: ei uusia kaupunkeja)

Neljä faktapohjaa on mainissa **ilman riippumatonta tarkistusta**:
Asunción, Porto Alegre, Suva, Dunedin. Kunkin koostaja nimesi itse
kohdan, joka tarkistajan on katsottava:

- **Asunción**: kolmoisliiton sodan väestötappioarviot (7 %…70 %,
  kiistanalainen) — varmista ettei yhtä lukua esitetä konsensuksena.
  Koostaja kertoi korjanneensa Christchurch-kontaminaation jaksosta 3;
  tarkista ettei muuta valunut läpi.
- **Porto Alegre**: saksalaissiirtolaisuus 1824 vs. italialainen 1875.
  Wikipedian sisäinen ristiriita, ja koko 1873-kehys kaatuu jos väärin.
  Myös 2024 tulvien uhriluku (181 vs. 169 samassa artikkelissa).
- **Suva**: vuoden 1873 ketju (Suvaa ei ollut, pääkaupunki Levuka,
  luovutus Britannialle 1874).
- **Dunedin**: koordinaattien N/S-suunnat — koostaja löysi omasta
  skriptistään etumerkkivirheen ja korjasi sen, mutta pistokoe
  kartalta kannattaa.

## KAKSI OPETUSTA, JOTKA MAKSOIVAT AIKAA

1. **Uusi jaettu js-moduuli pitää rekisteröidä kahteen listaan**:
   `sw.js` SHELL-lista ja `tools/build-standalone.mjs` MODULES-lista —
   ja MODULES-listalla **ennen** tuojaansa. Portit nappaavat molemmat,
   mutta vasta CI:ssä jos ajaa portteja valikoiden.
2. **Älä putkita porttiskriptiä `tail`iin.** Exit-koodi tulee silloin
   tailista, ja kaatuminen näyttää onnistumiselta. Tämä tuotti minulle
   yhden turhan CI-kierroksen ja väärän raportin omistajalle. Aja
   `out=$(cmd 2>&1); echo "[$?]"`.

## VOIMASSA OLEVAT SÄÄNNÖT

- Lohkojen poiminta: `tools/poimi-lohko.mjs <sha> <tiedosto> <OLIO>
  <avain>` (sulkulaskenta). `kulttuuri-kategoriat.js` on 70 000 riviä ja
  cherry-pick konfliktoi aina.
- **EI git stashia koskaan** (jaettu worktreiden kesken).
  **EI malli-ID:itä committeihin eikä PR:iin.**
- Visasääntö: vastausten **PITÄÄ löytyä** lehden teksteistä; sääntö ei
  ole "älä vuoda" vaan "älä toista visan faktakenttää sanatarkasti".
- Kategorianimiä ei arvata: reitti on en-Wikipedia → Wikidata (P373 /
  commonswiki-sitelink). Kaatuneet arvaukset tähän mennessä:
  `Category:Oodi`, `Category:Citadel of Damascus`,
  `Category:Royal Tombs (Petra)`, `Category:St. Louis Cemetery No. 1`,
  `Category:El Capitolio`, `Category:Fijians`, `Category:Kaingang`,
  `Category:Rewa River`, MONA, `Category:Fannie Bay Gaol`
  (Commonsin oma kirjoitusvirhe "Goal").
- Valmiit agenttiworktreet poistetaan heti (`git worktree remove
  --force`) — 84 kertynyttä täytti levyn kerran.

## GOOGLEN KULUPALKKI

Kolme secretiä puuttuu yhä (`GOOGLE_BILLING_TOKEN`, `_PROJECT`,
`_TAULU`), ja **Googlella ei ole rajapintaa toteutuneelle kulutukselle**
— ainoa reitti on laskutuksen BigQuery-vienti, joka pitää kytkeä Google
Cloud Consolesta. Vienti ei kerää dataa takautuvasti.

OpenAI-palkki: avain on workerissa ja rajapinta vastaa, mutta elokuun
summa oli 0 dollaria. Joko kulurajapinta laahaa päivän tai kuvat
laskutetaan projektille, jota admin-avain ei kata. Jos luku on yhä
nolla, syy on jälkimmäinen.

## AGENTTIVAHTI SAMMUTETTU

Tuntivälein toistuva `Agenttivahti`-ajastus on kytketty pois päältä
(ei poistettu), koska työ siirtyi sinulle eikä sen pidä herätellä
päättynyttä sessiota. Se on palautettavissa /routines-näkymästä.
