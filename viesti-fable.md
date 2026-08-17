# Fable max → päätoimittaja: M1 valmis katselmoitavaksi

17.8.2026, haara `claude/fable-max-m1` (nollattu tuoreen mainin
päälle omistajan ohjeen mukaan). Kiitos M0b:n mergestä (#1209).

## M1 (v813): sisältötaulut omaksi moduulikseen

Suunnitelman M1 sanatarkkana siirtona (malli A — ei
käytösmuutoksia):

- UUSI js/sisaltotaulut.js (515 riviä): lautojen yhdistetyt
  sisältötaulut (SAAPUMISTEKSTIT, KULTTUURIT, VALOKUVAT, KIELET,
  MAATIEDOT, ARTIKKELIT, EI_VALOKUVAKYSYMYKSEEN), luentajoukot
  (SAAPUMISLUENNAT, HAVAINTOLUENNAT, KOHTAAMISLUENNAT,
  luentaLauta), LAUTA_TUNNUSLUVUT ja OMAT_GALLERIAT.
- js/ui.js: 19 167 → 18 669 riviä; 20 pakkatuontia siirtyi uuteen
  tiedostoon. Kehittäjätila ja wiki-välimuistit jäivät ui.js:ään
  (palveluita, eivät sisältödataa).
- Tuojakartoituksen (docs/raportit/) mukaiset päivitykset samassa
  commitissa: sw.js SHELL, build-standalonen MODULES
  (järjestyssääntö pitää, vartija vihreä), tests/rules.test.mjs:n
  sisältötaulutesti lukee nyt uutta tiedostoa,
  tools/peilaa-media.mjs ja tools/fetch-photos.mjs skannaavat
  uuden tiedoston (OMAT_GALLERIAT-kuvien peilaus ei katkea), ja
  viisi kommenttipolkua osoittaa oikeaan paikkaan.
- Versio: alun perin v811, mutta main ehti ottaa sen (#1211) —
  renumeroitu työkalulla v813:ksi.

## Portit

739/739 testiä (pass/fail-rivit luettu) · ei kaksoisavaimia ·
niputusvartija vihreä (100 moduulia, ei törmäyksiä) · standalone
kokoontuu ja käynnistyy selaimessa (savuke 5/6 — ainoa FAIL on
mainissa ennestään oleva pöllötesti, johon en koske).

## Katselmointivinkit

- Diffi on iso mutta mekaaninen: poistot ui.js:stä ja lisäykset
  sisaltotaulut.js:ään vastaavat toisiaan sanatarkasti — helpoin
  tarkistaa vertaamalla lohko lohkoon.
- Ainoat sisällölliset rivit ovat uuden tiedoston otsake, 22
  import-riviä ja export-etuliitteet 14 nimelle.

## Seuraavaksi

M2 (apurit, ikonit ja kehysmatematiikka omaan tiedostoonsa) on
valmis aloitettavaksi heti kun M1 on mainissa — tönäisy riittää.
Muistathan poistaa tämän tiedoston haaralta ennen squashia.
