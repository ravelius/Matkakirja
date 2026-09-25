# Pluskupla pois, "Näytä puhekuplat" chatin ylärivalle — Opus-agentti 18.9.2026

Omistajan päätös: Raamattu `js/tyohuone-raamattu.js`, osio
"KARTTAUUDISTUKSEN PAATOKSET 34" kohta 20 (a/b/c). Haara
`claude/bold-ride-vow4ki-pluskupla-pois`, pohja `origin/main` = v1942.
Versionumeroa ei nostettu, Raamattuun eikä `sarjat.json`:iin ei koskettu,
PR:ää ei avattu.

## Tila kohdittain

| Kohta | Tila |
| --- | --- |
| a) pluskupla pois näkyvistä | **VALMIS** — elementtiä ei luoda eikä liitetä runkoon; `.pollo-kuplapalautus` 0 kpl DOMissa kaikissa mitatuissa tiloissa. Imeytymisanimaation kohde katoaa → kuplat vain sulkeutuvat (häipyvät paikallaan). |
| b) "Näytä puhekuplat" chatin ylärivillä | **VALMIS** — nappi on `.pollo-ylarivi`-rivillä "Ehdota sisältöä" -napin vasemmalla puolella. Napautus sulkee chatin ja palauttaa saman sisällön, jonka pluskuplan napautus palautti (saman kohdekaupungin viimeisin piilotettu kupla). |
| c) nappi piilossa, kun kuplia ei ole | **VALMIS** — `hidden` (CSS `display: none`), ei disabled-tilaa. Ehto on sama kuin palautuksen portti: muistin pitää olla olemassa JA kuulua nykyiseen kohdekaupunkiin. |

## Muutetut funktiot (js/pollo.js)

Pulun koodi on omistajan täsmennyksen (18.9. klo 18.15) mukaan
kokonaan Fablen; tämä luettelo on Fablelle, ei Codexin kuitattavaksi.

| Funktio / kohta | Muutos |
| --- | --- |
| `rakenna()` | Uusi nappi `.pollo-naytakuplat` ("Näytä puhekuplat") `.pollo-ylarivi`-riville; kenttä `this.kuplaPalautusNappi`. Ei muutoksia teksteihin, eleisiin, ääniin eikä mallikutsuihin. |
| rakentimen kentät | `this.kuplaPalautus` → `this.kuplaPalautusNappi` (pluskuplan sijaan ylärivin nappi). |
| `varmistaPino()` | Pluskuplan luontikutsu poistettu; kommenttiin kirjattu päätös 20 a. |
| `varmistaKuplanPalautus()` | **POISTETTU** kokonaan (oli pluskuplan tehdas). |
| `supistaKuplatPalautukseen()` | Ei enää paljasta eikä mittaa pluskuplaa; `imeKuplatPalautukseen(puheet, null)` → häivytys paikallaan. Muisti (`viimeisinPiilotettuKupla`) talletetaan ennallaan. |
| `imePuhelimenKuplaan()` | Pluskuplan paljastus pois; muisti ja `paivitaKuplanPalautus()` ennallaan. |
| `piilotaPuhekuplat()` | Sama kuin yllä. |
| `palautaViimeisinKupla()` | `this.kuplaPalautus.hidden = true` → ylärivin nappi (null-turvallisesti). Logiikka ja portit ennallaan. |
| `unohdaPiilotettuKupla()` | Piilottaa ylärivin napin pluskuplan sijaan. |
| `paivitaKuplanPalautus()` | Uusi sisältö: näyttää/piilottaa ylärivin napin muistin ja kontekstin perusteella. Vanhat `peittyy`-ehdot (linssi, dialogit, napin piilo) poistuivat tarpeettomina — nappi asuu paneelin sisällä. |
| `naytaPuhekuplatUudelleen()` | **UUSI** — sulkee paneelin ja kutsuu `palautaViimeisinKupla()`. |
| `tuhoaKuplamuisti()` | Pluskuplan `remove()` pois; piilottaa ylärivin napin. |
| `asetaPinonPaikka()` | Pluskuplan asemointi (`nappi.left - 46`, `nappi.top - 46`) poistettu; asemoi enää pinon kehyksen. |
| `avaa()` | **HUOM, ainoa toiminnallinen sivuvaikutus muualle:** chatin avaus ei enää unohda kuplamuistia. Ruudulla olevat `puhe`/`vihje`-repliikit talletetaan muistiin ennen `tyhjennaPino()`:a ja muisti palautetaan sen jälkeen. Ilman tätä ylärivin nappi olisi aina piilossa, koska `tyhjennaPino` → `unohdaPiilotettuKupla`. |

### css/styles.css

- `.pollo-ylarivi` sai `gap: 0.4rem`.
- Uusi `button.pollo-naytakuplat` (+ hover/focus ja `[hidden]`) samalla
  pikkupilleri-ilmeellä kuin `.pollo-ehdota`.
- `.pollo-kuplapalautus`-säännöt JÄTETTIIN paikalleen ja merkittiin
  kommentilla kuolleiksi: `js/ui.js` `PULUN_PIILO_OSAT` ja kaksi
  yksikkötestiä (satelliitti, ihmisen-matka-esitys) vartioivat yhä
  niiden piilotussääntöjä. **Ehdotus Fablelle:** siivotaan sekä CSS
  että `PULUN_PIILO_OSAT` omana pienenä eränään, jottei tämä erä
  kasvaisi jaettuun tyylitiedostoon rinnakkaisten agenttien aikana.

## Mittaus

Kohdemittaus **`tools/savukkeet/savuke-nayta-puhekuplat.mjs`** (uusi;
korvaa `savuke-plus-kupla.mjs`:n, joka vartioi juuri poistettua
pluskuplaa — tiedosto nimettiin uudelleen `git mv`:llä).
Pariisi-tallenne, 390 × 844 ja 844 × 390 puhelin + työpöytävastakoe:

```
16/16 vartiota läpi
```

Mitatut vartiot: pluskuplaa 0 kpl DOMissa alussa, repliikin jälkeen ja
palautuksen jälkeen; repliikki ei jätä kuplaa ruudulle; tyhjänä nappi
`hidden === true` ja `disabled === false`; repliikin jälkeen nappi
näkyy `.pollo-ylarivi`-rivin SISÄLLÄ tekstillä "Näytä puhekuplat";
napautus sulkee chatin ja tuo repliikin tekstin näkyviin; sama myös
saapumisen ohjekuplalle (laji `vihje`). Vastakoe 1400 × 900: kuplat
näkyvät ja pinoutuvat kuten ennenkin.

### Vanhat pluskuplavartiot samassa erässä

| Tiedosto | Muutos |
| --- | --- |
| `tools/savukkeet/savuke-kuplan-imu.mjs` | Pluskuplavartiot → "pluskuplaa ei ole DOMissa" + muistivartio + palautus `naytaPuhekuplatUudelleen`:lla. Ajettu: **13/13**. Samalla korjattiin **vanha piilevä vika**: savuke ajoi 390 px:n ruudulla, jossa kupla aloittaa suljettuna (`tekstitPiilossa`, v1891/15.9.), joten pinoon ei jäänyt kuplaa napautettavaksi — ensimmäinen ajo antoi 10/13. Ruutu vaihdettiin työpöydäksi (1400 × 900), joka on tämän savukkeen oikea mittauspaikka. |
| `tools/savukkeet/savuke-kaiutin-luentakuvat.mjs` | Luennan pulu-vartiot: pluskuplan mitasta → `pluskuplia === 0`, ja palautus chatin ylärivin napista (`.pollo-nappi` → `.pollo-naytakuplat`). EI AJETTU (ajokatto). |
| `tools/savukkeet/savuke-topografialinssi.mjs` | Pluskupla pois odotussilmukan ehdosta (olisi jäänyt odottamaan elementtiä, jota ei enää synny) ja pois "omistajan tila toistui" -vartiosta. EI AJETTU (ajokatto). |
| `tools/savukkeet/savuke-ihmisen-kappaleet.mjs`, `savuke-astro-valokuva.mjs` | Ei muutosta: kumpikin luo tarvittaessa oman koekappaleen samalla luokalla ja lukee CSS-sääntöä, joka jätettiin paikalleen. |
| `tools/savukkeet/README.md` | `savuke-kuplan-imu` -rivi päivitetty ja `savuke-nayta-puhekuplat` lisätty. |

### Yksikkötestit

- `tests/kuplan-imu.test.mjs` — "pluskupla on yhä olemassa" → "pluskuplaa
  ei enää rakenneta" + uusi vartio ylärivin napista ja siitä, ettei
  piilotus ole disabled-tila.
- `tests/pulu-kuplamuisti.test.mjs` — pluskuplan napin ja asemoinnin
  vartiot → ylärivin nappi, `naytaPuhekuplatUudelleen` sulkee paneelin,
  ja uusi vartio siitä, että chatin avaus säilyttää kuplamuistin.

## Portit

- `node --test tests/*.test.mjs` → **3638 testiä, 0 fail** (3625 pass,
  loput skip/todo kuten ennenkin).
- `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa (2042
  ui-viittausta, 409 metodia, 540 kenttää, 31 lehtitilan kenttää).

## Ajokirjanpito

Kolme selainajoa: kohdemittaus 16/16 kerralla, `savuke-kuplan-imu`
10/13 → viewport-korjaus → 13/13. Kolmas ajo otettiin, koska vaihtoehto
olisi ollut jättää tunnetusti kaatuva savuke repoon.

## Ei koskettu

`js/pallolaatat.js`, `js/nahtavyydet.js`, `js/kaupunkinosto.js`,
`js/pallolauta/kamera.js`, Raamattu, `sarjat.json`, versionumero.
Pulun tekstit, eleet, äänet ja mallikutsut ennallaan.
