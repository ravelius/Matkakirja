# Sisältökirjuri → Fable: luovutus (2026-09-21, 09:24 EEST)

Konteksti 72 % — Julkaisija pyysi luovutuksen kesken olevan erän
päätyttyä. Tämä on ensimmäinen luovutukseni; ei aiempaa
siirtoraporttia jatkettavaksi.

## 1. Lue ensin

1. `CLAUDE.md` (juuri)
2. `docs/roolitus.md` — vanha kolmen session työnjako, korvattu
   Raamatun kuuden roolin mallilla (ks. seuraava)
3. Raamattu (`js/tyohuone-raamattu.js`), Ydinajatus-osion kohta 2
   "TYÖTAPA JA SESSIOT" — kuusi roolisessiota (Fable, Julkaisija,
   Karttaseppä, Pelikoodari, Sisältökirjuri, Laitetestaaja), worktreet,
   viestisäännöt Fablelle (vain valmis erä, jumi tai kysymys, enintään
   8 riviä)
4. Raamattu, osio "AGENTIT VAIN OPUS JA SONNET" — sitova, koskee myös
   taustasessioita/parvia joita käytin tässä vuorossa

## 2. Tila

Työkansio: `/Users/samireivinen/Matkakirja-nostot` (git worktree, EI
`/Users/samireivinen/Matkakirja-fable` — sitä ei koskaan kosketa).
En tiedä nykyistä `main`/`v1973-prep`-versionumeroa varmasti — se on
Julkaisijan/Fablen aluetta. Viimeisin `origin/v1973-prep`-commit jonka
näin: `a47c017b` ("Loki: sumu-prototyyppi, kontekstit, jonot
kaynnistetty").

### Tässä vuorossa pushatut haarat (kaikki `origin`-nimisiä):

| Haara | Sisältö | Tila |
| --- | --- | --- |
| `sisalto-astro-palkit` | 12 astronauttikuvan (24 tiedostoa) siirto NASAn CDN:stä omaan ämpäriin, satelliitti-data.js + poikkeuslista | Pushattu; ei näy `origin/v1973-prep`:n esivanhempana viimeisimmässä haussa |
| `sisalto-kartuscha-vajaat-maat` | BGR/EST/ROU/LTU/LVA 5 aiheeseen (52 uutta nostoa) | Pushattu, 5 committia; ei näy esivanhempana |
| `sisalto-nimisto-1873` | Ranskan 1873-nimistö (pohja) | Pushattu; sisältyy alla oleviin |
| `sisalto-nimisto-taso-deu`/`-ita`/`-esp` | DEU/ITA/ESP:n 1873-nimistö + taso:1-nostot | Pushattu jokainen; **KARTTASEPPÄ VAHVISTI 21.9.2026 mergen ja nimiötason poltton onnistuneeksi** oman haaransa `sisalto-nimisto-aika` kautta — nämä kolme voitaneen sulkea erillisinä, sisältö on jo aika-haarassa |
| `sisalto-nimisto-aika` | Yhdistää DEU/ITA/ESP + lisää `aika: 'pysyva'\|'1873'` kaikkiin 121 riviin, Latium→Lazio, Kantabria pois. Löysin ja korjasin matkalla myös nimisto-1873.js:n kaksoisrekisteröinnin sw.js:ssä/build-standalone.mjs:ssä | Pushattu; **Karttaseppä vahvisti mergen ja poltton onnistuneeksi** — kaksi koordinaattisiirtoa jonossa (ks. Velat) |
| `iso-ajo-fra-kuvat-1` | Iso ajon vaihe 1 (koko pelin 8 kuvatonta nostoa, Codex-lista) + vaiheen 2 osa (FRA:n 19 muuta→oikea tyyppi) | **Pushattu, käynnissä — tämä on nykyinen työhaara** |

Yhdenkään haaran en itse tee squash-mergeä `v1973-prep`:iin — se on
Julkaisijan/Karttasepän työ.

## 3. Kesken — tee nämä ensin

1. **Iso ajo, vaihe 2 loppuun (FRA:n siivous), haara
   `iso-ajo-fra-kuvat-1`.** Tehty: 19 "muut"-nostoa oikeisiin
   tyyppeihin (0 jäljellä). JÄLJELLÄ: (a) 18 maalehtinostot-fra.js-
   korttia lainaa yhä tekstinsä `lunastus: [lahde.teksti]`-mekanismilla
   `MAA_KATEGORIAT.FRA`:sta — pitää kirjoittaa jokaiselle oma
   itsenäinen teksti (440–660 merkkiä, kartuscha-resepti) ja muuttaa
   `korttiLehdesta()` suosimaan `rivi.teksti`:ä jos se on asetettu;
   (b) FRA:n visaosuus on 16/64 = 25 %, pitää nostaa ≥33 %:iin (n. 6
   uutta visaa). Molemmat ovat kirjoitustyötä — sopivat taustasessioille
   maittain/aiheittain kuten kartuschassa.
2. **Fablen Codex-tilaus** (docs/raportit/havainnekuvat-codexille-
   20260921.md) odottaa Fablen tarkastusta ja tilausta. En ole
   muokannut yhdenkään 8 kohteen `ihme`-kenttää itse — se on
   Codex/generointiputken (`.github/workflows/generoi-ihmeet.yml`)
   työtä Fablen hyväksynnän jälkeen. Kahdelle (Halikarnassoksen
   mausoleumi, Konstantinopolin hippodromi) ehdotin AITOA
   Commons-kuvaa Codex-tilauksen SIJASTA — Fable päättää.
3. **Vaiheet 3–7** (BEL/SVK/SVN/CYP/MLT laajennus, muu Eurooppa
   30:een, visat ≥1/3 kaikkialla, taso 3 kaikkiin maihin, 1–3
   kadonnutta/maa) — EI ALOITETTU. Ks. docs/raportit/
   iso-ajo-20260921.md kokonaisuudessaan.
4. **Keskeytyneet agentit:** yksi taustasessio (kuvatutkimus 8
   kohteelle) valmistui ja tulokset on kirjattu Codex-listaan — ei
   keskeneräisiä agentteja juuri nyt.

## 4. Odottaa omistajan/Fablen päätöstä

1. **Rodoksen kolossi:** ei aitoa kuvausta ole koskaan ollut olemassa.
   Suosittelen suoraa AI-tilausta Codexilta. Vaihtoehto: Maarten van
   Heemskerckin 1500-luvun fantasiakaiverrus (CC0) esitettynä
   selvästi "miten 1500-luvulla kuviteltiin" -kuvana — EI nykyisen
   ihme-linjauksen mukainen fotorealistinen rekonstruktio.
2. **Halikarnassoksen mausoleumi ja Konstantinopolin hippodromi:**
   suosittelen "rappeutunut" (kadonnut: false) -luokkaa AIDOLLA
   Commons-valokuvalla ilman Codex-tilausta lainkaan (rauniot/aukio
   ovat yhä olemassa ja valokuvattavissa). Säästäisi kaksi
   AI-generointia. Fable päättää, koska tämä poikkeaa alkuperäisestä
   ohjeesta ("kaikki 8 ovat ihme-tapauksia").
3. **"Parikuva"-skeema:** Fable pyysi Tuileries/Bastilji/Crystal
   Palace/Pergamon-alttarille aidon Commons-kuvan JA AI-havainnekuvan
   PARINA. En löytänyt olemassa olevaa skeematukea kahdelle kuvalle
   `ihme`-kentän rinnalla (js/packs/fokuskohteet-grc.js:n "MATKAKIRJAN
   IHME" -dokumentti kuvaa vain yhden `ihme`-kentän, ei paria). Tämä
   vaatinee pienen skeemapäätöksen Karttasepältä/Pelikoodarilta ennen
   kuin aitoja kuvia voi liittää — en tehnyt koodimuutosta itse.

## 5. Voimassa olevat työtavat

Ks. Raamattu, "TYÖTAPA JA SESSIOT" ja `docs/roolitus.md`. Ei muutoksia
näihin tässä vuorossa. Tässä vuorossa vahvistunut käytäntö: taustasessiot
(Sonnet) toimivat hyvin volyymisisällön tutkimukseen (kartuscha,
nimistöt, kuvahaku) — itse teen aina pistokokeet ja koodimuutokset.

## 6. Julkaisukaava

En julkaissut mitään itse (ei versionumeroa, ei build-standalone-ajoa)
— viittaan `docs/roolitus.md`:n "Julkaisusäännöt"-osioon, se on
Julkaisijan aluetta.

## 7. Ympäristö ja infra

- Työkansio: `/Users/samireivinen/Matkakirja-nostot` (worktree).
- R2-ämpäri (`matkakirja`): 48 uutta tiedostoa
  `linssit/astronautin-kamera/`-polussa (astro-palkit-työstä) —
  ei muita muutoksia ämpäriin tässä vuorossa. Avaimet `~/.zshrc`:ssä,
  EI ladattu automaattisesti Bash-työkalun oletusympäristöön — jokainen
  komento tarvitsee `source ~/.zshrc` ennen `aws s3`-komentoja.
- Ei omia ajastuksia/rutiineja perustettu tässä vuorossa.

## 8. Avoimet velat ja opetukset

**Velat:**

1. `tools/nostoinventaario.mjs`:n `kuvaTiedot()`-funktiossa oli bugi
   (ei tarkistanut `kuva.tiedosto`-kenttää) — KORJATTU tässä vuorossa,
   mutta korjaus on vasta `iso-ajo-fra-kuvat-1`-haarassa, ei vielä
   mainlinessa. Ilman tätä korjausta työkalu näyttää edelleen satoja
   vääriä "kuvaton"-lukuja muille maille kunnes haara mergetään.
2. Karttaseppä ilmoitti kaksi koordinaattisiirtoa seuraavaan
   nimistöerään: SCHLESWIG-HOLSTEIN n. 0,5° itään, WÜRTTEMBERG/BADEN
   erilleen (ahtaat z5:llä). En ole itse tehnyt näitä — Karttasepän
   oma poltto hoitanee ne.
3. `sisalto-nimisto-taso-deu`/`-ita`/`-esp` -haarat ovat teknisesti
   yhä olemassa erillisinä vaikka niiden sisältö on jo
   `sisalto-nimisto-aika`:ssa — voi sulkea/poistaa kun joku vahvistaa
   ettei niitä enää tarvita erikseen.
4. Iso ajon alkuperäiset lukumäärät (198 kuvatonta, FRA 90 nostoa/38
   muuta) olivat merkittävästi väärät saman tyyppisen bugin takia —
   TARKISTA aina `tools/nostoinventaario.mjs`:n tuore ajo ennen kuin
   luotat mihinkään aiempaan lukuun, myös omiini.

**Opetukset:**

1. **Kuvakenttäkonventioita on VÄHINTÄÄN kolme rinnakkaista** samassa
   pelissä: `kuva.tiedosto` (paljas Commons-tiedostonimi,
   maa-kategoriat.js ja siitä johdetut kortit), `kuva.osoite` (valmis
   R2-URL, maastokohteet-fra.js), top-level `tiedosto` (fokuskohteet-/
   hahmotelma-tyyliset kohteet). Tarkista AINA suoralla
   `JSON.stringify(oikeaObjekti)`-tulosteella ennen kuin luotat mihinkään
   "kuvaton"-listaan — pelkkä kenttänimen arvaus johtaa vääriin
   tuloksiin molempiin suuntiin (näin kävi minulle kahdesti peräkkäin
   samassa istunnossa).
2. **`korttiLehdesta()`-tyyppiset läpivientifunktiot eivät koskaan
   kopioi tuntemattomia kenttiä oletuksena** — jokainen uusi kenttä
   (`taso`, nyt `tyyppi`) pitää lisätä sekä JAKO-riville että
   funktion paluuarvoon erikseen. Tarkista aina onko maalla
   maalehtinostot-<iso>.js-tiedostoa ennen kuin oletat kentän
   kulkevan perille.
3. **`fokuskohteet-<iso>.js`:n "kokonaan kadonnut" -kohteilla on
   pelin OMA `ihme`-arkkitehtuuri** (AI-generoitu, GitHub Actions
   -putki), joka on ERI asia kuin tavallinen Commons-`kuva`. Älä liitä
   Commons-valokuvaa suoraan tällaiseen kohteeseen ilman että
   tarkistat ensin tiedoston oman "MATKAKIRJAN IHME" -dokumenttilohkon
   (esim. js/packs/fokuskohteet-grc.js:n alussa).
4. Kun peer-session antaa lukuja ("FRA 39", "198 kuvatonta"), TARKISTA
   ne itse ennen työn aloittamista, jos työkalu on saatavilla — säästi
   tässä vuorossa arviolta useita tunteja turhaa kuvahakua.

## 9. Aloitusviesti seuraavalle Sisältökirjuri-sessiolle

```
Olet Sisältökirjuri (Sonnet) pelille "Matkakirja"
(/Users/samireivinen/Matkakirja-nostot, git worktree — ei koskaan
/Users/samireivinen/Matkakirja-fable).

Ensimmäinen komento:
cd /Users/samireivinen/Matkakirja-nostot && git fetch origin v1973-prep iso-ajo-fra-kuvat-1 && git checkout -B iso-ajo-fra-kuvat-1 origin/iso-ajo-fra-kuvat-1

Lue ennen mitään muuta:
1. CLAUDE.md
2. docs/roolitus.md
3. docs/raportit/viesti-sisaltokirjuri-luovutus-20260921.md (tämä raportti)
4. Raamattu (js/tyohuone-raamattu.js), Ydinajatus kohta 2 "TYÖTAPA JA
   SESSIOT" ja osio "AGENTIT VAIN OPUS JA SONNET"

Sitovat säännöt: agentit/taustasessiot vain Opus tai Sonnet, ei
koskaan Fable-mallia. Yksi haara per erä, testit vihreinä
(`node --test tests/*.test.mjs` ja `node tools/tarkista-kaksoisavaimet.mjs`)
ennen pushia. Fablelle viesti vain kun erä valmistuu tai olet jumissa
tai kysymys, korkeintaan 8 riviä (poikkeus: suuret linjaa muuttavat
löydöt, kuten tässä vuorossa nostoinventaario-bugi, ilmoitetaan heti).
Omistajan sanat kirjataan Raamattuun sanatarkasti ASCII:na, ei koskaan
UTF-8-erikoismerkkejä siellä.

Ensimmäinen tehtävä: Iso ajon vaihe 2 loppuun FRA:lle haarassa
iso-ajo-fra-kuvat-1 — kirjoita 18 maalehtinostot-fra.js-kortille oma
itsenäinen teksti (440-660 merkkiä) korvaamaan lunastus-lainaus
MAA_KATEGORIAT.FRA:sta, ja lisää FRA:lle riittävästi visoja 25%:sta
33%:iin. Ks. tämän raportin kohta 3.1 tarkemmista ohjeista.

Vastaa suomeksi, tiiviisti.
```
