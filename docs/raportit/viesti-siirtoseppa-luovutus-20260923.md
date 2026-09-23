# Luovutus: Siirtoseppä, 23.9.2026 klo 11.03 (Suomen aika, EEST)

Luovuttaja on Siirtoseppä (Opus). Vastaanottaja on seuraava Siirtoseppä
toisella Claude-tilillä tai Fable. Syy: omistaja vaihtaa tiliä (Fablen
viesti 23.9.). Tämä on roolin ensimmäinen luovutus; edellistä raporttia
ei ole.

## Lue ensin

1. `CLAUDE.md`: agenttisääntö, eli ali-agentit vain Opus tai Sonnet.
2. Raamatun (`js/tyohuone-raamattu.js`) Ydinajatus-osion kohta 2
   "TYÖTAPA JA SESSIOT". Lue vain se osio.
3. Tausta: loki `docs/raamattu-loki/paatokset-2026-09.md`, otsikko
   "OMISTAJAN SUUNTA (23.9. klo 09.45): UUSI NATIIVI iOS-PELI".
4. Oma työ:
   - `docs/raportit/sisallon-siirtoputki-20260923.md` (osat 1–5 ja
     kaksi liitettä)
   - `docs/raportit/lisenssi-inventaario-20260923.md` (jatko-osa ja kaksi
     liitettä)
   - `docs/raportit/herokuvien-viitteet-20260923.md` (PR #2904; ks. Tila).

## Tila

**Päivitys 23.9.2026 klo 12.39 (ennen Macin uudelleenkäynnistystä, tili B):**
1. PR:t Julkaisijalla, kaikki valmiit ja pushattu: #2913 (peilaus lukee js/linssit, 32 kuvaa ämpäriin), #2916 (357 turhaa peilaus-404:ää pois), #2918 (60 heron pohjaviitteet lähderiville, viiteloki tools/hero-viiteloki.tsv; nostaa version).
2. Kesken-listan kohdat 1 (herot, paitsi 94 ChatGPT-heroa) ja 4 ovat tehty; kohta 7 odottaa omistajan 3D-päätöstä. Seuraavaa erää ei ole annettu.
3. Kansio /Users/Shared/Claude/Matkakirja-siirtoseppa, erä-worktreet /Users/Shared/Claude/wt/siirtoseppa-* (tools/uusi-worktree.sh on vain origin/v1973-prep-haarassa).

main on `99522e54d` (#2899). Viimeisin pelin versio on v2145 (#2894).
Siirtoseppä ei julkaise versioita: kaikki sen PR:t ovat raportteja tai
työkaluja, joten versionumeroa ei nosteta.

| PR | Sisältö | Tila |
|---|---|---|
| #2890 | `tools/vienti/`: moottorineutraali sisällön vienti, testi `tests/vienti.test.mjs` ja raportti (myöhemmin osa 5 "yhteinen sisältölähde") | mergetty |
| #2896 | lisenssi-inventaario: 23 NC/ND-ääntä, kuvat puhtaita | mergetty |
| #2899 | inventaarion jatko: radiot, liput, ulkoiset kuvat ja julisteet | mergetty |
| herokuvat | `docs/raportit/herokuvien-viitteet-20260923.md`, haara `siirtoseppa-herokuvat` | #2904 avoin, Julkaisijalla |

**Mitä vienti tekee:** `node tools/vienti/vie-sisalto.mjs` kirjoittaa
kansioon `dist/vienti/` seuraavat:

- kaikki 353 packia ja 38 muuta moduulia (544 exporttia) häviöttömästi
- 21 kokoelmaa
- `media.json`, jossa on 20 391 viitettä ämpäriosoitteineen
- JSON-skeemat.

Vienti on deterministinen ja kestää alle sekunnin.
`tools/vienti/tarkista-media.mjs` tarkistaa ämpärin verkon yli (HEAD).
Uusi packien ulkopuolinen sisältö lisätään tiedostoon
`tools/vienti/lahteet.mjs`. Uusi kokoelma tarvitsee
lukumäärätarkistuksen testiin.

## Pushatut haarat ja avoimet PR:t

- `siirtoseppa-herokuvat`: PR #2904. Mukana on myös korjaus, joka
  poistaa sähköpostiosoitteen lisenssiliitteestä.
- `siirtoseppa-luovutus`: tämä raportti ja aloitusviesti. Haaraa ei
  mergetä.
- `siirtoseppa-vienti` ja `siirtoseppa-lisenssit` on mergetty.
  Worktreet ovat `/Users/koodaus/wt-siirtoseppa-*`, ja ne voi poistaa.

## Kesken: tee nämä ensin

Tehtävät tärkeysjärjestyksessä:

1. **Herokuvien viitteet** (#2904). Raportin suositus:
   - attribuutio 60 herolle rekonstruktion JSONista
     (`herokuvien-viitteet-20260923-rekonstruktio.json`): 0,5 sessiota
     Sisältökirjurille ja 0,5 Pelikoodarille
   - viiteloki jatkossa repoon.

   Viiteloki itse on kadonnut. Jatko odottaa omistajan päätöksiä.
2. **Korit A ja B: 14 NC-ambienssiääntä** (`js/aani-ehdokkaat.js`,
   rivit lisenssi-inventaariossa). Korvaajaa ei ole osoitettu. Kieli- ja
   musiikkinäytteet (C ja D) ovat Sisältökirjurin PR:issä #2895 ja #2897.
3. **Äänten lisenssiportti.** Testiin tulee sama sääntö kuin
   `js/kuvagalleria.js`:n `lisenssiKelpaa()`: se hylkää NC- ja
   ND-merkinnät äänien `nimi`- ja `musiikkiNayteNimi`-kentistä. Tämä on
   Pelikoodarin erä.
4. **33 Commons-kuvaa puuttuu ämpäristä**: 24 on keksintölinssin
   `kuvaAito`-kuvia, 8 kaupunkilehden ja 1 maalehden. Syy on, että
   `tools/peilaa-media.mjs` ei lue js/linssit-kansiota. Korjaus: laajenna
   peilaus ja aja se.
5. **163 kaupungilta puuttuu tarkka lat/lon.** Vienti laskee niiden
   sijainnin laudalta, ja virhe on enintään 4,7° (Sansibar). Pohjaksi
   käy `maailmankartta-pallopisteet.js`. Tämä kuuluu Karttasepälle.
6. **Kahdeksan sisäistä taulua vaatii `export`-sanan**, jotta vienti
   näkee ne:
   - `fokusvirta.js` LIVIAN_SAAPUMISET
   - `sahke.js` sanastot
   - `fokustehtavat.js` PULLA_NIMET
   - `reaktiot.js` LIVIAN_KIITOKSET
   - `havainnekuva.js` SELITTEET
   - `fokusnosto.js` NOSTO_MAAT
   - `sound.js` REAL_SAMPLES ja `siirtymamusiikki.js` RAIDAT
   - `lehti.js` ja `maalehti.js` vakiotekstit.

   Tämä on Pelikoodarin erä. Tee sen jälkeen rivi `lahteet.mjs`:ään.
7. **Yhteinen sisältölähde, toteutus** (siirtoputkiraportin osa 5):
   - `vie-sisalto.yml`: CI vie paketin ämpäriin
     (`sisalto/1/v<N>/` ja osoitin `uusin.json`)
   - sisältöversio näkyviin
   - 125 funktiota datasta tunnisteiksi.

   Arvio 3,5–5 sessiota. Aloitetaan vasta Fablen käskystä.

Ali-agentteja ei ole käynnissä, ja kaikki työ on committoitu.
Scratchpadin välitulokset (lisenssiluokittelun skriptit) katoavat. Niiden
tulokset ovat raporteissa.

## Odottaa omistajan päätöstä

1. **Radiolinssi maksullisessa versiossa.** 115 asemasta kaupalliseen
   käyttöön on sallittu 0, kielletty 16 ja epäselviä 99. Vaihtoehdot:
   - (a) poistetaan radio maksullisesta
   - (b) haetaan luvat
   - (c) radio jää vain web-versioon.

   Suositus: (a) nyt ja (b) myöhemmin tärkeimmille asemille.
   Teosto/Gramex-kysymys on selvitettävä joka tapauksessa.
2. **Herokuvien Commons-viitteet.** Vaihtoehdot:
   - (a) attribuutio ja BY-SA periytyy kyseiseen kuvaan
   - (b) uudelleengenerointi vain PD/CC0-viitteillä
   - (c) juristin kanta ensin.

   Suositus: (a) heti ja (c) ennen maksullista julkaisua. Lisäksi
   omistajalta on kysyttävä, mitä viitteitä hänen 94 ChatGPT-erän
   herossaan käytettiin.
3. **SA-kuvat (noin 9 600) maksullisessa versiossa.** Attribuutio
   riittää vakiintuneen tulkinnan mukaan, mutta juristin vahvistus
   kannattaa hankkia ennen julkaisua.

## Voimassa olevat työtavat

Raamattu, Ydinajatus kohta 2, ja `docs/roolitus.md`. Tässä vuorossa ei
tullut uusia linjauksia. Fable kirjaa omistajan tilaukset lokiin:
23.9. klo 10.05 yhteinen sisältölähde ja klo 10.10 maksullinen peli,
NC korvataan.

## Julkaisukaava

Siirtoseppä ei julkaise. Kaava:

1. oma haara origin/mainista
2. `node --test` (vähintään `tests/vienti.test.mjs` ja
   `tests/dokumentit.test.mjs`)
3. push ja `gh pr create` ilman versionumeroa
4. Julkaisijalle rivi, Fablelle 8 riviä.

Julkaisija mergeää.

## Ympäristö

- Mac Studio, käyttäjä `koodaus`. Worktreet ovat polussa
  `/Users/koodaus/wt-siirtoseppa-*` origin/mainista (ei
  `/Users/samireivinen/Matkakirja-opus`).
- Git-identiteetti toimii ilman lippuja.
- Ämpäri on `https://media.matkakirja.app/`, ja Noden fetch toimii
  suoraan.
- Commonsin API vaatii User-Agentin ja hidastuksen: HEAD-pyyntöihin se
  vastaa 429 ilman viivettä, joten käytä vähintään 1 s väliä.
- Avaimia ei tarvittu. R2-secretien nimet ovat liitteessä
  `sisallon-siirtoputki-20260923-liite-web.md`.
- Remote Control -kytkentä (`set_remote_control self`) estyi luvittajalla.
  Omistaja kytkee sen työkalupalkista.

## Velat ja opetukset

**Velat**

1. `tarkista-media.mjs`: Commonsin varareittiä ei voi todentaa ilman
   hidastusta, koska 429 näkyy puuttuvana.
2. Lisenssiluokittelu on tehty kertakäyttöisillä skripteillä, jotka eivät
   ole repossa. Jos tarkistus halutaan toistuvaksi, siitä tehdään
   `tools/vienti/lisenssit.mjs`.
3. Media-lajin `tiedosto` 522 viitettä ovat ilman koneellista sääntöä.
   Suurin osa on Map-avaimia ja fokuslehtien vanhoja pohjakuvia.

**Opetukset**

- Generointiajon lokit eivät saa jäädä ajokansioon. Herojen viiteloki
  katosi pilvikontin mukana, eikä sitä voi palauttaa.
- Agenttien raporteista pitää poistaa omistajan sähköpostiosoite
  (User-Agent-merkkijonot) ennen commitia.
- Rivitason lisenssitarkistus antaa vääriä "tuntemattomia". Lisenssi voi
  olla moduulivakiona (`JULISTE_LAHDE`) tai syvemmällä objektipuussa
  (NASA-kuvat). Tarkista koko polku ylöspäin ennen kuin kirjaat puutteen.
- Mediaosoitteet lasketaan pelin omilla funktioilla (`js/media.js`, kuvien
  järjestys repon kopio → Flickr → ämpäri → Commons). Omat säännöt
  eriytyvät.
- Laudan x,y ei ole maantieteellinen sijainti, koska kartta on
  sommiteltu. Käytä pallopisteitä.

## Aloitusviesti

Sama teksti on myös tiedostossa `docs/raportit/viesti-siirtoseppa-aloitus.md`.

```
Olet Siirtoseppä (Opus), Matkakirja-pelin (suomenkielinen selainpeli, tulossa natiivi iOS-peli rinnalle) sisällön siirtoputken ja lisenssiselvitysten sessio. Repo ravelius/Matkakirja, Mac Studio.

1. Aloita: git -C /Users/samireivinen/Matkakirja-fable fetch origin main && git -C /Users/samireivinen/Matkakirja-fable worktree add -B siirtoseppa-<aihe> /Users/koodaus/wt-siirtoseppa-<aihe> origin/main (oma worktree, ei Fablen checkoutia eikä Matkakirja-opusta).
2. Lue: CLAUDE.md, Raamatun (js/tyohuone-raamattu.js) Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT" (vain se osio), docs/raportit/viesti-siirtoseppa-luovutus-20260923.md, ja tarvittaessa docs/raportit/sisallon-siirtoputki-20260923.md, lisenssi-inventaario-20260923.md, herokuvien-viitteet-20260923.md.
3. Säännöt: ali-agentit vain Opus tai Sonnet (Fable-mallia ei koskaan agenttina); yksi erä = yksi haara origin/mainista; Siirtoseppä ei nosta versionumeroa (raportit ja työkalut, PR Julkaisijalle); päätökset omistajalle AskUserQuestion-korttina Fablen kautta; viestit Fablelle vain valmiista erästä, jumista tai kysymyksestä, enintään 8 riviä (SendMessage "Fable (Fable 5.1)"); kellonajat date-komennosta, Suomen aika.
4. Ensimmäinen tehtävä: kysy Fablelta, mikä luovutusraportin "Kesken"-listasta tehdään ensin (ehdotus: kohta 1 herokuvien viitteet omistajan linjauksen mukaan, tai kohta 7 vie-sisalto.yml). Älä aloita ennen vastausta.
5. Vastaa suomeksi, tiiviisti.
```
