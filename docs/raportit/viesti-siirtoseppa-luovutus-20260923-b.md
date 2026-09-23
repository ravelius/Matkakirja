# Luovutus: Siirtoseppä, 23.9.2026 klo 14.42 (EEST), B

Luovuttaja on Siirtoseppä (tili B). Syy: konteksti on 70 %, ja Fable
nollaa session. Tämä luovutus korvaa iltapäivän luovutuksen
`viesti-siirtoseppa-luovutus-20260923-ilta.md`. Siinä kuvatut PR:t ja opit
ovat yhä voimassa, ja niihin viitataan tässä.

## Lue ensin

1. `CLAUDE.md` ja Raamatun Ydinajatus kohta 2 (vain se osio).
2. Tämä raportti. Taustaksi `viesti-siirtoseppa-luovutus-20260923-ilta.md`:
   PR-taulukko, velat ja opit.
3. `docs/raportit/sisallon-siirtoputki-20260923.md`, osat 5.3 ja 5.4
   (skeeman versiointi, funktiot tunnisteiksi).

## Tila

Sisältöpaketti v1 on tuotannossa (`https://media.matkakirja.app/sisalto/1/uusin.json`).
**3D-selvittäjä on lukenut sen protossa:** Unityn JsonUtility lukee sen
sellaisenaan, ja 266 kaupunkia näkyy pallolla sekä simulaattorissa että
iPhone 17 Prolla.

Avoimet PR:t (kaikki Julkaisijalla, 14.42):

| PR | Sisältö | Huomio |
|---|---|---|
| #2913 | peilaus lukee js/linssit, 8 nimeä korjattu | OPEN aamusta, 32 ämpärin aukkoa odottaa tätä |
| #2916 | peilausajon turhat 404:t pois | OPEN |
| #2918 | herojen pohjaviitteet + varmistus | OPEN, nostaa version |
| #2932 | `tools/vienti/lisenssit.mjs`, yksi NC/ND-laskuri (**9 nimettyä**) | pinottu #2898:n päälle (d97959a9a); merge **#2898:n jälkeen** |
| #2933 | ämpärin aukot viikoittain issueen | OPEN |
| #2927 | Sisältökirjuri: 266/266 pallopistettä | OPEN; mergen jälkeen seuraava paketti antaa kaikille `sijaintiLahde: pallopiste` |
| #2935 | Sisältökirjuri: 5 lisenssitöntä viitettä täydennetty (Trevi, Lindesnes, topografia) | OPEN; tarkistin näyttää tuntemattomia 0 |

## Kesken: tee nämä ensin

1. **Skeema 1.2 (Fablen päätös 14.35), aloitettu mutta ei commitoitu.**
   Worktree `/Users/Shared/Claude/wt/siirtoseppa-skeema12` on luotu
   origin/mainista, eikä siinä ole muutoksia. Tehtävät:
   - **Kaupungeille `tarkeys` 0–3.** 3 = pääkaupunki tai aloituskaupunki
     (`start: true`, 19 kpl). Muut portaat lasketaan laudan reittimäärästä
     (`edges` + `airRoutes`, kaupungin molemmat päät) ja
     lentokenttäliputuksesta. Reittimäärien jakauma 266 kaupungille:
     1:4, 2:57, 3:110, 4:37, 5:18, 6:12, 7:18, 8:7, 9:2, 12:1
     (mediaani 3, q90 7). Ehdotus: 2 = lentokenttä tai vähintään 6 reittiä,
     1 = vähintään 4 reittiä, 0 = muut.
   - **Pääkaupungit Wikidatasta** staattiseksi tauluksi
     `tools/vienti/paakaupungit.mjs` (lähde kirjattuna, kuten
     `iso2.mjs`). Kysely `?maa wdt:P36 ?kaupunki ; wdt:P297 ?iso` fi-wikin
     nimien kautta **aikakatkaistiin kahdesti koko 266 nimen erällä**. Aja
     50 nimen erissä tai hae ensin pallopisteiden QID:t ja kysy niillä.
   - **Manifestiin `tavuja`** kokoelmille (`kokoelmat[]`) ja medialle.
     Moduuleilla se on jo.
   - **Skeemaan merkintä** `kaupunki.schema.json` → `data`: laudan
     raakaolio (x, y, la, lx, ly), johon natiivi ei nojaa.
   - Nosta `SKEEMAVERSIO_TARKKA` arvoon '1.2' ja lisää historiaan rivi
     (`tools/vienti/vie-sisalto.mjs`). Päivitä
     `tests/sisaltopaketti.test.mjs` (tarkeys 0–3, pääkaupungit 3) ja
     raportin osa 5.3.
   - Kerro valmistumisesta 3D-selvittäjälle.
2. **Osa 2 pilkottuna (Fablen päätös):** ensimmäinen PR käsittelee **vain
   kaupunki-packien funktiot**: ne muutetaan tunnisteiksi, ja vartija
   estää uudet funktiot kaupunkidatassa. Ei koko 391 moduulia kerralla.
   Vienti laskee 125 funktiota (`manifest.laskennat.funktioita`); valitse
   niistä kaupunkeihin liittyvät. Pelikoodari toteuttaa pelin puolen, joten
   sovi hänen kanssaan.
3. **#2932 → #2898:n jälkeen.** Jos NC/ND-ääniä korvataan välissä,
   tarkistin ilmoittaa ne "korvattuina". Poista ne silloin tiedostosta
   `tools/vienti/lisenssit-tunnetut.json`.
4. **Kun #2913 ja #2916 on mergetty,** aja
   `node tools/vienti/tarkista-media.mjs --kaikki`. Tuloksen pitää olla 0
   aukkoa (viikkoajo #2933 tekee saman maanantaisin).

## 3D-selvittäjän palaute (14.29), tiivistettynä

1. Tärkeys: nimiöiden harvennus. **Skeema 1.2.**
2. Sijainti: 163 laudalta laskettua. **Korjautuu #2927:llä.**
3. Eheys: tiivisteet ovat jo manifestissa, koot puuttuvat. **Skeema 1.2.**
   Osoittimen sha256 on selitetty 3D:lle.
4. `data`-kentät: merkintä skeemaan. **Skeema 1.2.**

Natiivi tarvitsee seuraavaksi reitit ja kohteet. Ne ovat paketissa jo
kokoelmina (`reitit`, `nahtavyydet`, `paikallisaarteet`…), ja 3D:lle on
kerrottu tästä.

## Odottaa omistajan päätöstä

Ei mitään.

## Työtavat, julkaisukaava ja ympäristö

Kuten luovutuksessa `-ilta.md`. Tärkeimmät: erä-worktree komennolla
`git show origin/main:tools/uusi-worktree.sh > <tmp> && sh <tmp>
siirtoseppa <aihe>`; ei versionumeroa; Julkaisija mergeää; Fablelle
enintään 8 riviä; ämpäriin kirjoittavat työnkulut ajetaan ubuntulla.

## Opetukset tästä vuorosta (lisäys)

- Wikidatan SPARQL aikakatkaistaan, jos VALUES-listassa on 266 fi-nimeä
  ja lisäksi raskas liitos (P31/P279*). Käytä 50 nimen eriä.
- Pinottu PR (#2932 → #2898) vanhenee, jos pohja jää jälkeen mainista:
  perustaso laskettiin v2145:n datalla (23), ja mainissa oli jo 9. Laske
  perustaso aina mainin tasalla olevalla pohjalla.
