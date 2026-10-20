# Työkaluseppä – luovutus 20.10.2026 klo 12.56 (oma nollaus, konteksti 35 %)

Rooli: Työkaluseppä (Opus, high), checkout /Users/Shared/Claude/Matkakirja-tyokaluseppa. Ohje: docs/moduulit/tuotantopohjat/tuotantoputken-tarkistukset.md.

## KÄRKITYÖ KESKEN: Unity-esikatselu Macilla (PT 20.10. 11.3x, omistaja 11.34 ja 11.41 "Onko noita simulaattoreita pakko käyttää?")
Tavoite: korjauskierrokset Macin editorissa iPhonen/iPadin ruutukoossa, simu vain lopputarkistukseen. PT:lle luvattu käyttöön ~13.30.
- Proto-haara `tyokaluseppa/esikatselu` (wt /Users/Shared/Claude/wt/proto-tyokaluseppa-esikatselu), kärki 7b0dc14a8, pohja juna-208 2ac71852f
  + Pelikoodarin esikatselu ac414396f (Editor/Esikatselu.cs, tyokalut/esikatselu.sh). Lisätty: ikkunatila (Game-näkymä lukitaan laitteen
  kokoon heijastuksella → Screen = UI = kamera; 18.10. batchmoden 640×480 oli syy), laitenimet iphone|iphone-vaaka|ipad|ipad-pysty,
  oleta/oleta-uusi regexinä, työkalu kopioidaan ajettavaan haaraan, --vertaa (tyokalut/esikatselu_vertaa.py: kuvaparit + VERTAILU.md,
  ajoaika vs. simu = käännöspalvelun käännös + todistusajo), App Nap -esto (NSProcessInfo.beginActivity), edistymisvahti 10 min,
  katkaistun ajon Temp/__Backupscenes + UnityLockfile pois ennen käynnistystä.
- Testitapaus: palatsi V1–V6, `zsh tyokalut/esikatselu.sh 6856156b1 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/sk-palatsi-208v11.txt iphone --vertaa /Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-palatsi-208v11-iphone-20261020-1139`
  (vaatii JU:n UNITY NYT; käännöslukko). Simun vertailukierros 549 s (käännös 300 + ajo 249, ilman jonoa).
- Ajo 1 (11.48, lokit/esikatselu-20261020-1148): Game-näkymä 1206×2622 OK, Play-tila käynnistyi, mutta pysähtyi 1. ruutuun → App Nap -hypoteesi, korjattu 33b461e8c.
- Ajo 2 (12.27, lokit/esikatselu-20261020-1220): editori jäi käynnistykseen lisensoinnin jälkeen (55 lokiriviä) – todennäköisesti
  ajo 1:n kill -9:n jäänteiden valintaikkuna; korjattu 7b0dc14a8. Ikkunaa EI nähty: omistaja hylkäsi Unityn computer-use-luvan 12.5x.
- SEURAAVA: pyydetty JU:lta 3. vuoro 12.56 → aja yllä oleva komento taustalla, seuraa loki.txt:tä. Jos jumi jatkuu: (a) pyydä
  KK:n kautta omistajalta lupa katsoa Unity-ikkunaa tai (b) Pelikoodarin ARVIO 18.10.:n vaihtoehto b (Ruutu-kerros batchmodelle, ~8 tiedostoa,
  PT:n päätös). Onnistuessa: VERTAILU.md + kuvaparit PT:lle (3 riviä) ja käyttöohje rooleille (komento + laitenimet).

## Muut auki
- Videotallennin (proto tyokaluseppa/videotallennin 924891faa): Valoseppä mergeää ja ajaa simulla; kun hän ilmoittaa UDID + nimen:
  `zsh tyokalut/video-kokoa.sh --simu <UDID> <nimi> --ulos <oma>.mp4 --poista-kuvat`, tarkista suunta/värit, vertailupari PT:lle. Pelissä EI vielä todistettu.
- Proto `tyokaluseppa/tarkistukset-204` kärki 000ebbad6 (ennen-junaa-korjaukset 607e6de5e, 941a05bcf, 83525e25a + +x 000ebbad6): NS:n merge junaan; tarkista.
- PR #4991 (viitekuva) MERGETTY. Projektisepälle viety keittiö 3/4 (Olavinlinna-lista).
