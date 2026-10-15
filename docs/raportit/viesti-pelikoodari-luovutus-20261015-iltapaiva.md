# Pelikoodarin luovutus 15.10.2026 iltapäivä (PT:n 40 %:n raja, klo 15.03)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen natiivi-backup). Edellinen luovutus
viesti-pelikoodari-luovutus-20261015-paiva.md (kaikki sen kohdat hoidettu).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä, osoitekirja /Users/Shared/Claude/osoitekirja.md
  (TILINVAIHTO 15.10. 12.1x: PT local_5df52e10-10e4-4b72-9554-0049db300dfe ≤ 3 riviä, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044,
  Julkaisija local_5cb16c00…, NS local_674b9ec4…, KS local_eec7f158…, SK local_72d15713…).
- Omistaja 09.36 "Ei testejä junaan": kytkennät NS:lle tarkista.sh 0:lla. PT 14.5x: KEHITYSKAUPUNGIT-portin pelikuvat EIVÄT ole junatesti (simu sallittu).

## KESKEN: Prahan ja Ateenan kuva-arkki (PT:n KEHITYSKAUPUNGIT-portti)
- Ajo käynnissä luovutushetkellä (aloitettu 14.59, SIMULAATTORI NYT Julkaisijalta, oma simu pelikoodari-iPad13 39644E75-8BDA-4ED8-98B1-3FC864B73697):
  `proto-3d/tyokalut/pelikoodari-ajot/ajo-pallot-pelaajille-194.zsh` (skenaario sk-prahapallo-pelaaja-194.txt: kartan Praha-pallo pelaajan
  näkymänä, Prahan ja Ateenan avaus + 8 pysähdystä + loppu, kertojan teksti näkyvissä). Käännös 49545de21 = master + 57088358e (LUKKO VAPAA
  ilmoitettu). Tulos: `proto-3d/lokit/todistus-pallot-pelaajille-194-20261015-1459/` (TODISTUS.md, kuvat/, kuva-arkki.png); tila
  `_tyo/pelikoodari/pallot-194-app/ajo.out` (viimeinen rivi "AJO pallot-pelaajille-194 <koodi>").
- TEE: kun ajo päättyy, lähetä PT:lle polku + kolme suurinta havaintoa (PT: "ei toistoajoja"); tarkista lokista "opas: historiaosiot praha: 8" ja
  "… ateena: 8"; varmista simu alas (todistusajo sammuttaa) ja ilmoita Julkaisijalle SIMU VAPAA. Jos ajo kaatui, kerro PT:lle, älä aja uudelleen kysymättä.
- Avaus odottaa PT:n pelikuvakuittausta (Raamattu KEHITYSKAUPUNGIT): proto pelikoodari/pallot-pelaajille-194 e4f10bb7d (Praha) ja 57088358e
  (Ateena) Kehityskaupungit.Listaan; NS:lle vasta PT:n kuittauksen jälkeen, ensin Praha, sitten Ateena. Worktree wt/proto-pelikoodari-pallot-pelaajille-194.
  Lontoo on jo pelaajilla (juna 191); työlistalla Valosepän Greenwich-korjaus.

## Tässä vuorossa valmiit
- Juna 193: Bern, Bratislava ja Podgorica laudan pysäkeiksi (PT:n rajaus; San Marino ja Andorra jäivät kevyiksi pisteiksi, SK:n sisältö tallessa
  28383ed6c): web #4612 MERGED (9d4d2a5de, SK e4a9b874b + KS 629658db2; Pariisin koeajon siemen 8 → 173), natiivi kultaiset-193b 43b44d73e kuitattu.
- Juna 194: Prahan ja Ateenan kertojan äänet + historiaosiot tallennetuilla äänillä, pelikoodari/pallo-aanet-193 200cdb0e0 (⊃ 40d15a707) KUITATTU,
  NS:llä. Ämpärissä (Julkaisija vei, SHA:t tarkistettu): opas/pallokierros-praha-v6, -ateena-v7 ja -v8 (korjatut -v2-otot), historia-v1/praha,
  historia-v1/ateena (ei käytössä, korvattu) ja historia-v2/ateena. OpasHistoria lukee "aani"-URLin ja ajat_id:n, Polku() kaupunkikohtainen versio.
- Siivottu: wt/pelikoodari-pysakit-193, -paakaupungit-kytkenta ja -pysakit-193b poistettu; PR-palkki tyhjä.
- PT:n kysymys ISS-palautteesta 12.25: Pelikoodarin osa tehty junissa 190 ja 192 (vastattu).

## Avoimet / seurattavat
- Proto-worktreet auki: wt/proto-pelikoodari-kultaiset-193b (junassa 193, poistettavissa), wt/proto-pelikoodari-pallo-aanet-193 (junaan 194, poista
  kun BUILD 194 lukittu), wt/proto-pelikoodari-pallot-pelaajille-194 (odottaa kuittausta).
- Ateenan pysähdys 2:n "sataneljä" ja muut korjaukset ovat v8:ssa; kaikki tekstit verrattu ääneen (vain luvut auki).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261015-iltapaiva.md
(haara pelikoodari-luovutus-20261014-paiva). Kärki: Prahan ja Ateenan kuva-arkin ajo (todistus-pallot-pelaajille-194-20261015-1459) → polku ja kolme
havaintoa PT:lle (local_5df52e10-10e4-4b72-9554-0049db300dfe), SIMU VAPAA Julkaisijalle; avaukset e4f10bb7d/57088358e NS:lle vasta PT:n kuittauksella."
