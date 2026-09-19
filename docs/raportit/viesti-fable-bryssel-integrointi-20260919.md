# Opus → Fable: Bryssel-pilotin integrointi ja Maltan rekisteröinti (19.9.2026)

Erä `opus-local-bryssel`, Matkakirja Opus local (Mac Studio), 21.55–22.15 Suomen aikaa.
Pohja `origin/v1968-prep` (cd8a6f5e).

## 1. Bryssel: `agent-bryssel-sisalto` (b038ad7b) mergetty

Merge meni puhtaasti ilman konflikteja. Reseptin koodikohdat tarkistettu
(`docs/raportit/viesti-fable-kaupunkiresepti-20260919.md`):

| Kohta | Tila |
| --- | --- |
| Laudan piste (maailmankartta) | 5978,4 / 1353,0, nimikyltti `la: 'end', lx: -20, ly: 5` |
| Pallopiste | ei tarvita: Bryssel on todellisella paikallaan. `pallonOmatPisteet().pisteet` (103 korjausriviä) ei sisällä sitä, joten piste lasketaan kaavalla |
| Reitit | Pariisi–Bryssel 2 ja Bryssel–Amsterdam 2; vanha Pariisi–Amsterdam 3 poistettu, eli ketju kulkee Brysselin kautta. **Köln ei ole pelikaupunki**, joten sinne ei ole reittiä |
| europe-countries, CITY_COUNTRY | `bryssel: 'BEL'` molemmissa |
| Laatat | pieniAarre 29 → 30 (europe), 165 → 166 (maailmankartta) |
| Nostot-kartalla-räikkä | **Tervuren jää nostoksi**, räikkä 48 → 49 (agentin vaihtoehto 3, perustelu testissä). Kohdekartan tultua Tervuren siirtyy sinne ja räikkä palaa |
| Avoimet poikkeukset (luentakuva, Horatio-otto, Livian kupla) | jätetty agentin nimeäminä |

## 2. Maltan rekisteröinti

- `git mv tools/odottavat-paketit/hahmotelma-mlt.js js/packs/`
- import ja `KOHDE_MAAT.MLT` (js/fokuskohteet.js)
- `sw.js` SHELL ja `tools/build-standalone.mjs`
- tiedoston tilaotsikko päivitetty

Nimiölimitystesti meni läpi ilman nimio-kenttiä.

## Mittaukset

- `node --test tests/*.test.mjs`: **pass 3704, fail 0** (sekä ennen että jälkeen Maltan).
- `tarkista-niputus`: kunnossa (424 moduulia).
- savuke-reittihelmet: 18/18.

## Jäi tekemättä

- Pyydettyjä savukkeita `savuke-reitti` ja `savuke-pallo-reitit` ei ole repossa. Ajoin
  lähimmän vastineen, reittihelmet.
- Saapumisteksti (fokusvirta-bryssel LUONNOS) jää Fablelle, kuten sovittiin.
