# Savukevartija: lämpöerä (build 16, juna/b13 fb5c2ebf, sis. b37d2b3e)

25.9.2026 19.2x, iPhone 18 Pro -simulaattori 1572C658 (kehittäjätila
`defaults write … matkakirja-kehittaja 1`, kehysajat.jsonl/lampo.jsonl tyhjennetty
ennen ajoa). Simulaattori: `thermal`=0 ja `akku`=-1 / `lataus`=Unknown ovat
odotettuja — oikea lämpö- ja akkutelemetria mitataan vain fyysisellä laitteella
(siirretty Natiivisepälle).

## Vartija: PASS

| Tarkistus | Vaatimus | Mitattu |
|---|---|---|
| Lepo (rivit taysi=0, n=13 / ~100 s) | fps ≤ 30 | fps = 30 kaikilla |
| Lepo | lepo.p50 ≥ 30 ms | 33,3 ms (32,6–33,4) |
| `lampo auto` liikkeessä (satelliittilinssi) | 60 fps, renderScale 0,8 | fps 60, liike.p50 16,7 ms, renderScale 0,8 |
| `lampo kuuma` | 30 fps, renderScale 0,7 | fps 30 liikkeessä (p50 33,3 ms), renderScale 0,7 |
| `lampo kriittinen` | 20 fps | fps 20 liikkeessä (p50 50 ms), renderScale 0,7 |
| `ruutu`-komento | palauttaa tilan | "tila Lepo/Taysi, fps, piirtoväli, lämpö, renderScale" oikein kaikissa tiloissa |
| lampo.jsonl 30 s välein | rivi kirjoittuu | t=31/61/91/121, fps 29,2–32,6, tavoite 30 |

## Ei vielä todennettavissa

- **Lepopiirto (paikallaan > 0 ja piirretty < kehyksia):** `paikallaan` = 0 ja
  `piirretty` = `kehyksia` kaikilla riveillä — PAIKALLAAN-tila tulee
  Natiivi-UI:n rauhakorjauksen mukana (Pelikoodarin ohje: vaadi vasta sitten).
  Lepotilassa piirretään siis yhä joka kehys (30 fps), ei ohiteta kehyksiä.
  Lisätään vartijaan ehdoksi kun rauhakorjaus on junassa.

## Sivuhavainnot

- `ruutu` ja `lampo <tila>` kirjautuvat peli-lokiin sanalla **VIRHE**, vaikka
  onnistuvat (vastausteksti kertoo tilan). Kosmeettinen: statussana väärä
  infovastauksille.
- Levossa esiintyy satunnainen lyhyt täyden piirron purske (t≈80–86 s: taysi
  23→131, lepo.p50 17,5 ms) ilman käyttäjän toimea — luultavasti pulun
  idle-animaatio; ei vaikuta 30 fps -rajaan, mutta se nostaa hetkellisesti
  60 fps:ään.
- `kehittaja 1` ei ole peli-komento (linssi-komento); kehittäjätila vaatii
  `defaults write` sovellus kiinni.
