# Karttasepän luovutus 13.10.2026 klo 21.3x (tilinvaihto)

Linjaukset: Raamattu + muisti `karttaseppa-tila-20261010-ilta.md` (13.10. rivit 18.4x–21.4x), `hiljainen-tunti-ei-testeja.md`,
`agenttiohje-ei-lupakyselyja.md`, `pitkat-ajot-setsid-irrotus.md`. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261013-ilta.md`.
Kaikki vesityökalut ja tulokset ovat T7:llä (eivät repossa): työkalut `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/`,
kaupunkipaketit `/Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/kaupunki-<id>-20261013/`. Python: venv-kartta `-I`.

## Tämän illan vesityö (LS1:n simutestit vesi187/188/19)

Väriohje LS1:n kuvissa: tumma aaltoileva = MEIDÄN vesi, vaalea sileä = Googlen vesi näkyy läpi.

- **Oslo, Reykjavik, Särkänniemi, Guadalquivirin linssi = Googlen oma pinta** (meidän tasomme tasainen ja ehjä). Ei datakorjausta;
  ei Googlen jahtaamista (LS1 hyväksyi).
- **Lissabon v2 oikein** (lampi 81 m, GLO 84; v1 oli 62 m maan alla).
- **Sofia v3** (`vesi-v3/`): ESA-pala 521,2 = GLO (v2 3,5 m liian korkea).
- **Sevilla v5** (`vesi-v5/`, LS1 HYVÄKSYI, tarjoaa PT:lle v19:ään): OSM:n vanhentunut Cantera El Baño -järvi (pellolla) pois,
  viereinen lampi omalla tasollaan, lampiehto.
- **Tampere v6** (`vesi-v6/`, `ajot/tampere-vesi-v6-20261013.sh`) ODOTTAA LS1:n simua (vesi19c, tiedosto tampere5):
  Näsijärvi +0,6 m (95,6), koskenniskan liukuma, OSM-padot katkaisevat veden (Yläkoski Tampella → allas ~91 m → Keskikoski 61.5003 →
  koski ilman vettä → Alakoski), Pyhäjärvi 78,43. LS1: tamp19b:n "kivikko veden alla" voi olla Googlen pintaa/varjoa (v5:ssä ei vettä
  padon alla) → LS1 vertaa v6:ta v17:n ennen-kuvaan. Tampere EI ole v19:ssä.
- Mikään ei ole viety ämpäriin tänä iltana (LS1 pyytää viennit itse PT:n luvalla).

## vesipinta.mjs uudet säännöt (varmuuskopiot `vesipinta.mjs.ennen-esajarvi-20261013`, `.ennen-lampiehto-20261013`)

OLETUKSENA PÄÄLLÄ (vaikuttavat seuraavaan uusintaan muissakin kaupungeissa, tarkista loki):
- Lampiehto: ESA perii järven tason vain jos järvi ≤ ESA:n GLO-mediaani + 3 m (`--esa-jarvi-tol`), muuten `esa-lampi` oma taso.
- Vanhentunut OSM-järvi pois: osm-water/reservoir, sisäosa (≥ 16 m rannasta) ≥ 5 ha ja ESA-vettä < 5 % (`--osm-vanha-ha 0` = pois).
  Poisto vasta pienten vesien merkinnän jälkeen; viereinen erillinen ESA → oma taso.
- Vähänäytteinen (n < 10) OSM-vesi, jonka naapurit enimmäkseen jokea → osm-river.
VALINNAISET: `--tasolisa "Nimi=m"`, `--joki-liuku <m>` (lähteet meri + järvet n ≥ 200), `--joki-glo-katto`, `--koski-pois <m>`,
`--padot <padot-<id>.json>` (uusi `padot-pbf.mjs`), `--esa-erillinen-oma`, `VESI_DEBUG=1`, `VESI_TASO_PNG=<id>:<png>`.
HYLÄTTY: jokiliukuma kaikkiin kaupunkeihin (`HYLATTY-vesi-v4-kaikki-jokiliuku-raportti-20261013.md`: Berliini, Helsinki, Amsterdam, Madrid huononivat).

## Avoimet

1. Tampere v6: odota LS1:n vesi19c-tulos; korjaa tarvittaessa. Tarkistustyökalut T7 `vesimaski/ajot/apu-20261013/`:
   `vesi_tasokartta.py` (verkon tasokartta, RES-ympäristömuuttuja), `pato_kuva.py` (+ padot), `vesi_muutos.py` (kansiot vesi vs vesi-v2,
   kärkimuutos + GLO-näyte), `vesi_alue.py`, `pala_glo.py`, `vesi_klusterit.py`, `vesi_matalat.py`.
2. VIKA: Tampereen Pyhäjärvi-relaatio (`vesi-tampere-polygonit.json`, vesirelaatiot.mjs) sisältää vain saarirenkaat → "Pyhäjärvi"-taso
   on saarten päällä. Korjaus vesirelaatiot.mjs:n renkaiden kokoamiseen (ulkorengas puuttuu 8 km:n rajauksessa); sitten Tampere uudelleen
   ilman `--osm-vanha-ha 0` ja tarkista Pyhäjärven taso (GLO 76,0; nykyinen 78,43).
3. PR #4560 (pääkaupunkien kohdekartat e04–e14, 7c9474507, CI vihreä): Julkaisija mergeää junan 187 julkaisun mukana.
4. Kööpenhaminan 2 m DTM vain LS2:n pyynnöstä; pääkaupunkikarttojen seuraava erä kun Codexilta tulee uusi erä.
