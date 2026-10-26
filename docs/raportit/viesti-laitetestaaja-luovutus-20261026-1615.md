# Laitetestaaja: luovutus 26.10.2026 klo 16.15 (PT: TILINVAIHTO NYT, omistaja 16.12)

Korvaa luovutuksen 25.10. 06.00. Voimassa oleva tila. Ei ajoja käynnissä, ei taustaskriptejä.

## Tila: LEPO
- iPad Pro 13 (00008103-001819421413401E, fi.matkakirja.peli.kehitys): rungossa junan 211 b6-runko 9460c52c6 (Unity 6000.7.0b6, NS asensi 13.26); peli auki. NS asentaa seuraavat ja kuittaa "ASENNETTU <sha>"; älä aja ennen kuittausta. Vain LT komentaa iPadia ajon aikana (PK:n esikatselu.sh/ipad.sh ei saa olla käynnissä: `ps aux | grep -E "esikatselu|ipad.sh|devicectl"`).
- Sim pariteetti-iPad13 A2A6FEF2-4779-4EA6-BC99-28C33C54F7E9 (T7-sarja): sammutettu 16.1x; NS asentaa sinne simu-appin (bundle app.matkakirja.proto3d). linssiseppa2-iPad13 (VS) on päällä, ei minun.

## Viimeiset tulokset 26.10. (raportit docs/raportit/laitetestaaja-reittiajo-*, ‑alkulentoajo-*)
- e77543fc7 (b5): VIHREÄ, J 10,38 / A 11,10, aukio 0 / sisätila 1 käännösnykäystä, piilot 0/28 (3 räystäsjaksoa), venyneitä 5.
- 9460c52c6 (b6) 13.53: epäluotettava (PK:n A/B-ajo komensi iPadia, laite kuuma) → uusinta 14.19–14.31 (odota-ja-aja.sh): VIHREÄ, J 10,35 / A 11,36 ms, thermal 0 koko ajan, aukio 0 / sisätila 0 käännösnykäystä, pysähdyksiä 0, hyppyjä 0, nykäyksiä 0 (suurin 23/33 ms), piilot 0/28 (1 jakso), VENYNYT RUUTU 80 kpl (max 31,7 ms, kasautuvat t 60/90/180 s; b5: 5). Aineisto varjot-koko/r9460b-*. EI vielä lähetetty PT:lle (PT:n ehto: tulos vain PT:lle) → LÄHETÄ ENSIMMÄISENÄ.
- Lontoo-todennus (PT): 114803c2e ja a62ef4358 simussa: tarkka kartta ✓ (0,15° / 0,04°), London Eye himmeänä 0,6°/0,15°, höyrylaivaa/karusellia ei missään → EI läpi. Kuvat proto-3d/lokit/laitetestaaja-lontoo-114803c2e/ ja -a62ef4358/. UUSINTA: 4fccd2490:lla odottaa NS:n simu-käännöstä; NS ilmoittaa. Toimintatapa: scratchpad lontoo4.sh = boot sim, launch, peli-komento "puhe pois / uusi-peli 5 lontoo / odota-tila Kartta 60", 70 s, komento.txt "kaupunki lontoo; aja 52 8 60 3; kuva …; aja 51.5033 -0.1195 <kaari 0.6|0.15|0.04> 4; kuva …" → kuvat Documents/-kansiosta (get_app_container data). simctl vain `source proto-3d/tyokalut/simusarja.sh`. Ensimmäinen launch heti bootin jälkeen epäonnistuu: odota ≥ 25 s.

## Skriptit (docs/raportit/laitetestaaja-pelaaja-tyokalut-20261025/, S=scratchpad vaihdettava; korjaus 60e92b7a7)
ja_reitit.sh <nimi> (J+A + aukio 180 + sisätila 120), yoC/yoJ/yoJK2/yoVar: `valo jaady 0` odottaa nyt "avaus: OhjausPelaajalle" (ei enää sleep 50 → ei vale-kamerahyppyä alkulennossa), alku.zsh (alkulento), odota-ja-aja.sh (scratchpad: odottaa muiden iPad-ajojen loppua + 5 min jäähdytys ennen ajoa; busy-tarkistus ps:llä).
Ajo: `cd $S; export S; (nohup bash ja_reitit.sh <nimi> > $S/<nimi>.log 2>&1 &)`; valmis kun $S/<nimi>.done; tulokset $S/<nimi>-1.out/-2.out + proto-3d/_tyo/linssiseppa2/varjot-koko/<nimi>-*/. Tarkista ensin konsolin ensimmäisen rivin aikaleima vs. kuittaus.

## Opit
- iPadin thermalState 2 (Kuuma) pudottaa 30 fps:ään ja tuottaa 800 ms:n nykäyksiä; ajon alussa thermal 0, ja vieras komento (esim. PK:n esikatselu) sotkee J/A:n → tarkista aina ui-lokin ui-komento-rivit omista komennoista.
- Piilot (PELAAJA PIILOSSA): vertailu 719cefaaa 36/56, 4b4864d28 563/402 (räystäskamera), e77543fc7 0/28, b6 0/28; PT:n ehto: porttihalleihin ei uusia piiloja.
- Tulokset PT:lle ≤ 3 riviä; Lontoo/simu-todennuksen kuvat vain PT:lle. Id:t: PT local_5df52e10-10e4-4b72-9554-0049db300dfe; NS local_8254cd90-9a85-4d61-8a06-085e7562f05f; PK local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6; Postivahti local_cbc0dff7-2598-4ade-9106-0901f2e70478.
- Työpuu: muiden roolien tools/.natiivi-ui-*.mjs, tulokset/ ja settings.local.json.ennen-kevennysta siirretty kansioon proto-3d/_tyo/laitetestaaja-siirretty-20261026/ (ei poistettu).
