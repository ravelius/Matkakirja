# Karttasepän luovutus 16.10.2026 klo 00.3x (Postivahti: kova raja 35 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261015-ilta5.md` (15ce9c579).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261016-yo.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1 (maaston vienti).

## 1. AVOIN, TEE ENSIN: maailman maasto 2026-10-16-maailma → vienti Julkaisijalle (PT hyväksyi 00.2x)

Syy omistajan "peruskartassa näkyy edelleen neliöt" (15.10. 23.56, TF 195, Afrikka): OMA maasto 2026-09-24-maailma. Pistenormaalit
laskettiin laatan omista kolmioista → naapurilaattojen yhteisillä reunakärjillä eri normaali (0,8–2,3°) → valaistus porrastuu
maastolaattojen rajoilla (z5: 5,625°; ruudukon rajat 22,5/16,875/11,25° N = maantieteellinen tiilitys, ei Mercator). Pohja, kerma
ja Metal tarkistettu: eivät syy. Korjaus: SAMA AJO (geometria tavulleen sama, tarkistettu CDN:stä) + `--dem-normaalit`, koko z0–12,
layer.json samaa muotoa ILMAN parentUrl:ia (Cesium for Unity 1.25.1 + parentUrl vaatisi natiivin kehityslipun Laattapalvelin.MaastoLapsi).

- Ajo käynnissä (nohup, nice 15, 16 prosessia): `T7 Matkakirja-karttaseppa/maasto-20261016-normaalit/` — `aja.sh` z0–9 (osa-*.log),
  `aja-syva.sh` z10–12 (syva-*.log) ja LOPUKSI layer.json 0–12 ilman --vanhempi (`luettelo-0-12.log`). Valmis kun `aja-syva.out`:ssa
  "kaikki valmis". Tila 00.31: 290 644 / 2 263 883 laattaa, ei virheitä. HUOM aja.sh kirjoittaa ensin parentUrl-layer.jsonin; aja-syva.sh
  korvaa sen (odottaa aja.sh:n loppua). Tarkista lopuksi: layer.jsonissa EI parentUrl, maxzoom 12, available-määrät tasoittain =
  vanha (2,8,32,128,512,2048,8192,15442,57710,222483,872786,218044,866496), tiles `?v=2026-10-16-maailma`.
- Tarkistukset ennen vientiä: laattamäärä tasoittain; muutama satunnainen laatta: geometria = CDN:n vanha (u,v,h,kolmiot), reunanormaalit
  naapurin kanssa 0,00° (`_tyo/karttaseppa/neliot-20261016/`: qmesh.py, reuna.py, vertaa-koe.py; CDN-laatat curl --compressed).
- Paketti: `mv` sarja → `T7 koodaus/proto-3d/_valmiit/maasto-2026-10-16-maailma-vienti-20261016/julisteet/maasto/2026-10-16-maailma`
  (sama levy, LAHTEET.md valmiina; täydennä laattamäärä ja koko) + SHA256SUMS. Otsakkeet: .terrain application/vnd.quantized-mesh +
  Content-Encoding gzip + immutable; layer.json application/json max-age 300. Sitten viesti Julkaisijalle (vienti) ja PT:lle.
- Natiivi osoitevaihto VALMIS: `karttaseppa/maasto-normaalit-196` b8167585d (peili/proto/karttaseppa/maasto-normaalit-196): Rakennus.MaastoUrl
  + Pallo.unity ×2. PT: NS yhdistää junaan 196 VASTA viennin jälkeen. Laattapaketin maastosarja (vanha etuliite) NS kokoaa uudelleen.
- Kuva (PT hyväksynyt): `_tyo/karttaseppa/neliot-20261016/neliot-ennen-jalkeen-matala.jpg` (kuva-valaistus-matala.py).
- Worktree `/Users/Shared/Claude/wt/karttaseppa-maasto-normaalit` (detached origin/main, ajo käyttää sen tools/maasto) — poista vasta ajon jälkeen.

## 2. Tämän vuoron valmiit (kuitattu PT:lle)

| Erä | Toimitus |
|---|---|
| Kierrosten heikoin pysähdys (PT, omistajan 16.02 linja) | Akropolis ja Propylaia: aluemuodon korkeus_m tyhjä → valokaista +12 m, tasanne pimeä (12 %). Natiivi `karttaseppa/korostus-196` 4f8de7ea8: Akropolis 42, Kallimarmaro 18, Tower Bridge 55 → 100 %. PT kuittasi junaan 196. Koodiehdotus (DTM-pohja aluemuodolle, ääriviiva maasta) PT → Linssiseppä. `_tyo/karttaseppa/kierrostarkistus-20261015-yo/` |
| Sijainnit, nimet, katsekulmat (3 kierrosta) | Kaikki kunnossa (sijainnit.py, katse.py; Wikidata Special:EntityData sallittu robots.txt:ssä) |
| PK:n Marokko-lohko (ISS → Lissabon) | EI Karttasepän: Rabat/Fes z8 S2 404, lohko on Blue Marble -Cesium-laatta ISS-pallon päällä ilman liukumaa → lataus/sekoitus (PT:lle rivi) |

## Muistiinpanot

- Paikalliset pohjalaatat (ruudukko-20261015/pohja) ovat XYZ-numeroituja; Cesiumin `{reverseY}` = XYZ. Kerma `_maailma` XYZ webp.
- Maastolaatta-tiedostot ämpärissä gzip; `curl --compressed` purkaa. qmesh.py purkaa otsikon, kärjet ja oktaedrinormaalit.
