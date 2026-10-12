# Karttasepän luovutus 12.10.2026 ilta (tilinvaihto)

Kaikki alla oleva on tilaa ja keskeneräistä. Linjaukset ovat Raamatussa ja Karttasepän muistissa
(`karttaseppa-tila-20261010-ilta.md`, jossa on rivi jokaisesta päivän vaiheesta).

## Avoimet PR:t: juna 184 (Julkaisija mergeää PT:n käskystä)

| PR | Sisältö | Haara | Huom |
|---|---|---|---|
| #4486 | Budapest + Bukarest: reunus 1,6, kainalot ydinalaan | karttaseppa-reunus-budapest-bukarest | head d431113e5, MERGEABLE |
| #4487 | tools/maasto: `--mapterhorn`, `--vanhempi` (parentUrl), `--laatat`, `--virhekerroin` | karttaseppa-maasto-mapterhorn | vain työkaluja |
| #4520 | Kohdekartta Sisilia (Palermo) | karttaseppa-aarrekartat-sisilia-islanti | aarre-erä 3 |
| #4527 | Islanti: `KAUPUNKIKARTAT.islanti` ja `NAHTAVYYSJUTUT.islanti` = reykjavik; Koirapäivien kuninkaan nosto laudan pisteeseen | karttaseppa-islanti-kartta | SK:n jutut ovat reykjavik-avaimella |
| #4528 | Kohdekartta Lappi (Rovaniemi) | karttaseppa-aarrekartat-lappi | aarre-erä 4 |

Jos jokin muuttuu CONFLICTINGiksi, päivitä merge-commitilla origin/mainin päälle (ei pakkopushia) ja ilmoita Julkaisijalle uusi head.
Ainoa worktree on `/Users/Shared/Claude/wt/karttaseppa-linssiaineistot` (npm ci tehty). Poista se, kun #4520, #4527 ja #4528 on mergetty.

## Odottaa muita

- **LS2:** pilotti-3:n pelikuvat (vuoristokerroksen mekanismin todennus: esi-isät z0–12 ja LS2:n varapolku b68bd567b), PT:lle ja minulle.
  Koko vuoristopoltto (515 058 laattaa, ~10 Gt) EI tehdä nyt (PT): z13+ ei näy missään nykyisessä näkymässä.
  Kaikki on ajovalmiina: T7 `vuoristo-mapterhorn/aja-vuoristo.sh` (nice 15, `VIRHEKERROIN`, vaiheet 4a esi-isät ja 4b laattaportti), suunnitelma `suunnitelma/`, vienti 16 osana.
- **LS1:** pallokierros v2 (`opas/pallokierros-v2/{praha,lontoo}.json`, silma_m Josefov 35–50 ja Trafalgar 40–55) → uusintasimu. Tukholman maa-v2 simu (lataaja haarassa linssiseppa/maa-v2-184).
- **PT:** vastaus kaupunkien puista. Pariisi, Tukholma ja Peking ovat ämpärissä `kartta/puut/v1/` 10.10. alkaen; Lontoo ja Praha 404. Mitä puuttuu: kytkentä vai uudet kaupungit?
- **Codex:** pääkaupunkierät e04–e14. 53 kohdekarttaa (Afrikan 6 + Aasia, Amerikat, Oseania) odottaa sisältöä. Aja erän tultua `node tools/paakaupungit/kohdekartat.mjs <pilvi> <erä> --piirra` (ohje `docs/raportit/paakaupungit-lauta-e04-e14-20261011.md` luku 4).
  Pääkaupungit, perustiedot ja rajat ovat 195/195; puuttuu vain ISR:n pääkaupunki (päätös) ja alueet GRL, HKG ja SHN.

## Tänään valmistunut (viety tai mergetty)

- #4484 (yhtenäisyys: reunus 39 kartalle, maanalaiset vedet pois 34 kaupungista, Helsinki/Tromssa meriHaku) ja #4485 (Granada ja Moskova samaan sääntöön) on mergetty. #4495 GeoLibre-raportti on mergetty.
- Ämpäriin (vie-paketti.sh) viety:
  - `kartta/korkeus/v1/maa-tukholma-v2*` (Mapterhorn = Lantmäteriet; katupisteistä vanha maa oli 62 % yli 2 m)
  - `opas/pallokierros-v1` ja `-v2`
  - `julisteet/maasto/2026-10-12-vuoristo-pilotti{,-2,-3}`
- Mapterhorn on Euroopan maan korkeuslähde (PT). Lähteet ja krediitit: `proto-3d/_lahteet/mapterhorn/` (LAHTEET.md, krediitit.py).
- Andøyan z13-kehä on haettu kansioon `proto-3d/_tyo/raketti-andoya-mapterhorn/z13-keha/` (LS2 tekee siitä v3:n junaan 184).

## Opitut ansat (tekniset)

- **.terrain gzip:** vie-paketti asettaa nyt `Content-Encoding: gzip` (Julkaisija). Ilman sitä Cesium piirtää laatan litteänä.
- **cesium-native 1.25.1 + parentUrl:** lapsen layer.json tarvitsee esi-isät z0–(minz−1) ja ei-tyhjän available-listan jokaiselle tasolle. Työkalu: T7 `vesimaski/maasto-esi-isat.py`. Portti `tarkista-maastolaatat.py` tarkistaa tämän.
- **Ämpäri on muuttumaton:** korjaus menee aina uuteen polkuun (v2, pilotti-2 …). Älä curlaa vielä viemätöntä polkua, koska CDN välimuistittaa 404:n.
- **Wikidatan SPARQL on kielletty robots.txt:ssä.** fi.wikipedian /w/ ja /api/ myös; artikkelin olemassaolon voi tarkistaa /wiki/-sivulla.
- **Skandaalit vaativat lat/lon:** jos nosto ei saa kohdekartan pistettä, piste on laudan oma piste (`maailmankartta-pallopisteet.js`).

## Työkalut (T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/`)

| Työkalu | Mitä |
|---|---|
| `mapterhorn-raa.py` | pmtiles → raakalaatat, `--qm`-listalla, `OSA=i/n` |
| `vuoristo-suunnitelma.py` | z13/14/15-valinta korkeuserolla ja kohokohdista |
| `vuoristo-arvio.py` | koko- ja aika-arvio |
| `maasto-esi-isat.py` | esi-isälaatat z0–12 |
| `tarkista-maastolaatat.py` | laattaportti |
| `maa-mapterhornista.py` | maa-<id>-lahi uudesta lähteestä |
| `mapterhorn-viisto.py`, `mapterhorn-vertaa.py` | vertailukuvat |
| `pallokierros-esittely.py` | pallokierroksen esittely-JSON (LS1:n kentät) |
| `poista-maanalaiset.py`, `maanalaiset-vedet.mjs` | 3D-vesi |
