# Karttasepän luovutus 15.10.2026 klo 11.5x (tilinvaihto, Postivahti)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md` (PT local_74630a27…, ≤ 3 riviä). Edellinen luovutus: `viesti-karttaseppa-luovutus-20261014-ilta.md`.
Scratchpad (katoaa): `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/8826e77b-…/scratchpad/` (venv: numpy, opencv,
tifffile, imagecodecs; ls1/ = LS1:n Linssit-testit-kopio, `kaanna-ks.sh` + `praha-koe.py`/`lontoo-koe.py` pallokierroksen testeihin).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261015.md` KOKONAAN
> (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. Jatka kohdan "Avoimet" mukaan;
> jos mitään ei ole tehtävissä, rivi PT:lle "JONO TYHJÄ: Karttaseppä".

## Avoimet (odottavat muita)

1. **#4609** (haara karttaseppa-reliefi-gtif, wt /Users/Shared/Claude/wt/karttaseppa-reliefi-gtif, b86b1ada5): tee-reliefipyramidi.mjs ETOPO
   NOAA:n sallitusta GeoTIFF-suoralatauksesta (robots.txt kieltää /thredds/); tools/etopo-gtif.mjs oma lukija. Testit 17/17, z7-laatat
   pikselilleen samat. Odottaa CI:tä ja Julkaisijan mergeä. Lähdelaatat NAS `Matkakirja-arkisto/dem/etopo2022-15s-gtif/` (1/288 ladattu).
2. **Pääkaupungit pysäkeiksi, juna 193** (haara karttaseppa-paakaupungit-pysakeiksi-193, wt sama nimi): 6ffd7c44a (8 pysäkkiä: Minsk,
   Chișinău, Belgrad, Vaduz, Monaco, Skopje, Tirana, Zagreb 23 km itään) + cfb95e0b8 (ISL → islanti, Reykjavík-piste pois). PT hyväksyi;
   Bern, Bratislava, Podgorica, San Marino ja Andorra jäävät kevyiksi pisteiksi. Pelikoodari yhdistää SK:n kanssa yhdeksi PR:ksi. Jäljellä
   SK (saapumistekstit, kysymykset ja tiedot laudan pakkaan, Monacon artikkeli) ja PK (fokusvirrat, natiivin kultaiset). Raportti
   `proto-3d/_tyo/karttaseppa/paakaupungit-pysakeiksi-193-sijoitus.md`.
3. **#4579** lähdeluettelo (Julkaisija), auki.
4. **Worktreet** pidetään kunnes mergetty (PT 15.10.): karttaseppa-lahteet-korkeus, -paakaupungit-pysakeiksi-193, -reliefi-gtif,
   proto-karttaseppa-iss-skanneri-193 (natiivi; NUI yhdisti omaan iss-193:een eri commiteilla → poista kun NUI:n haara on junassa).

## Valmiit tällä vuorolla (14.–15.10.)

- **Greenwich (Lontoo v5)**: katse_suunta 157, silma 45–60 → iPadilla erinomainen (Queen's House, Thames, Canary Wharf linjassa), lento
  22 → 44 s (kaikki etelän puolet 38–49 s; pidetään 157). Selvitys `_tyo/karttaseppa/greenwich-selvitys-20261014.md`.
- **Lontoo 10 km** (vain Lontoo): vesi lontoo2-8m + puut kartta/puut/v2 → index-v23 (Valoseppä kytki 3d033895a, Julkaisija vei).
  Muistiajo iPad Pro 13:lla Lontoon nostossa (NS), ei junan 190 ehto.
- **Pallokierrosten pysäkkitarkistus** 24 pysäkkiä (`_tyo/karttaseppa/pysakit-tarkistus-20261014.md`): Ateena v5 → LS1:n v6 758f58e34
  (Tuulten torni silmä 70–85, Erekhtheion 40–50); Praha v4c → LS1 pallokierros-praha-v4 ee3fa2b13 (vain Vyšehrad 30 → 75);
  Praha v4d (Josefov silmä 70–85) LS1:llä. Linnan ja Malá Stranan muutokset hylätty (liu'ut > 15 s, silmäsääntö 0,5–0,7 × H).
- **ISS-skanneri** (omistaja 15.10.): korkeuskartat 25 kuvauspaikkaa + 118 pääkaupunkia proto-haarassa karttaseppa/iss-skanneri-193
  (cffc88afd, cbfb3d4d5), NUI yhdisti (143 kohdetta). Datat (korkeus, vesi, keskilämpö) 93a3688a4 datat.json; NUI näyttää vain
  keskilämmön SK:n data.jsonista (45/46 kohdetta, pk- etuliite riisutaan). Satelliittikuvia EI käytetä. Työkalut ja LUEMINUT:
  `_tyo/karttaseppa/iss-skanneri-20261015/`, T7 `iss-kuvauspaikat/` (kuvauspaikat-pk.mjs, pk-tci-vara.mjs, skanneri-datat.mjs).
  Lämpötila 97 kohteelta puuttuu: ERA5-tunnus kysytään omistajalta myöhemmin (WorldClim ei-kaupallinen; NASA POWER ja Open-Meteo
  arkisto kieltävät robots.txt:ssä).
- **Praha vesi** praha4 (Čertovka −8,2 m, vesipinta.mjs `--sivuvesi-tasaus`) → praha5 (aluenosto Kaarlensilta–Mánes +1,5 m,
  `aluenosto-praha.py`) → Valoseppä A/B OK → **index-v24** = v23 + praha5 ämpärissä (Julkaisija 3/0). Valoseppä kytkee koodin.
- Worktree kohdekartat-loput ja kaksi natiivi-worktreetä poistettu (#4593 mergetty).

## Muistiinpanot

- Googlen laatoista ei mitata mitään (ehdot): vesinostot valitaan A/B-kokeella, tarkistus omista DSM:istä (ČÚZK, EA, GLO-30).
- robots.txt ennen jokaista skriptattua hakua; NOAA www.ngdc.noaa.gov: /thredds/ kielletty, Crawl-delay 60.
- Pallokierroksen kameramuutokset aina LS1:n testeillä ennen lähettämistä (scratchpadin ls1-kopio, `sh kaanna-ks.sh Pallo`).
