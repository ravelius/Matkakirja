# Ranskan Louvre-pariteetti: SK:n osuus (17.10.2026, PT:n erä; LS:n lista `docs/raportit/linssiseppa-louvre-pariteetti-20261017.md`)

Kaikki tiedostot ovat valmiita yhdistettäviksi protoon (Linssiseppä tai Siirtoseppä); proto-gitiin ei kirjoitettu.

| Tiedosto | Sisältö | Minne protossa |
|---|---|---|
| `teokset-lisat.json` | 51 teokselle: `kuvateksti_fi` (41 tarkistuksessa korjattu, 10 OK), `krediitti`, `lahde_url`, `kuva_tiedot` (commons_tiedosto, tekija_kuvalle, commons_sha1, alkuperainen_px…), `tekija_wikidata`; louvre-inv-4935 `tekniikka` = "öljy kankaalle" | `ranska/teokset.json` teokset[id] (lisää kentät; ei muuta nimiä/mittoja) |
| `huoneet-lisat.json` | 4 salin `selite_fi` ja `teksti_fi` (LS:n luonnosten tilalle; faktat tarkistettu) | `ranska/huoneet.json` huoneet[id] |
| `veistokset-lahteet-lisa.json` | Nike (CC BY 4.0, nimeäminen pakollinen) ja Milon Venus (CC0) | `ranska/veistokset.json` lahteet[] |
| `rodin-veistokset.json` | Rodinin 8 veistoksen nimitiedot (vuosi, materiaali, mitat, lyhyt_fi, kuvateksti_fi) ja kertojan tekstit (`kertojan_teksti`, `puhuttu` + `puhuttu_merkkeja`), riippumattomasti tarkistettu | veistosten nimitiedot (ranska/veistokset.json + sali.json teos) / ÄÄ äänittää kertojan tekstit pysyvällä luvalla |

## Huomiot
- `kuvateksti_fi` lähti Linnanrakentajan 13.10. lähdetiedostosta (`taidemuseo-ranska-teokset-v2-vienti-20261013/…/teokset.v2.json`), jossa kenttä oli 51/51; riippumaton tarkistus (3 Sonnet-agenttia, omat haut) korjasi 41 (sääntörikkomukset: tekijän/koon toisto, "alasti", ympyröiden toisto; faktat: Mona Lisa, Poppies, Degas ym.). Orsayn sivut 403 → hakutiivistelmät. Géricaultin ensimmäinen Salonki-esiintyminen vain Wikipedia.
- `krediitti`/`lahde_url`/`kuva_tiedot` samat kuin v2-lähteessä; Commonsin tiedostoversio (sha1) on vaihtunut paketoinnin jälkeen 4 kuvalla (louvre-inv-71, louvre-inv-4885, orsay-rf-2739, orsay-rf-1972): `kuva_tiedot.commons_sha1` on paketoidun version, ei Commonsin nykyisen.
- `tekija_wikidata`: Q-tunnukset haettu Wikidatasta (louvre-inv-71: Tiziano Q47551 + Giorgione Q8459).
- **louvre-inv-777 (riskiluokka D, gallerix.ru):** Commonsista ei löytynyt parempaa vapaata, korkearesoluutioista kuvaa museolähteellä (vaihtoehdot: Art Resource -pohjainen 1192×1948, WGA 760×1196, kirjaskannaukset). Teos on 1480-luvulta eli vapaa (PD-Art; EU:n tekijänoikeusdirektiivin art. 14); riski on lähteen laatu ja alkuperä, ei oikeudellinen. PT päättää: pidä (suositus, krediitti Louvre) tai poista teos.
- Riskiluokat C ja R1 (kävijän salikuvat, Google Art -kopiot): Commons-lisenssit PD, tekijänoikeudellisesti vapaita; krediitti merkitty.
