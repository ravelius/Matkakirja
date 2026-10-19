# Olavinlinna M-osan repliikit: ajovalmistelu (Äänittäjä 19.10.2026, EI generointia)

**Löydös: kaikki 16 uutta repliikkiä on jo generoitu 9.10.2026 klo 08.31** (Pelikoodari, aja-generointi.sh omistajan luvalla; `proto-3d/_valmiit/olavinlinna-repliikit-lapi-v1/`: raaka-WAVit + vastaus.json aikaleimoineen, 32 valmista mp3/wav, manifest 16 riviä, 552 mrk / 705 mrk tageineen, skriptissä `language_code: fi`). Tekstit täsmälleen samat kuin `olavinlinna-m-osa-avaimet-20261019.json`; peli lukee ne jo (`SeikkailuRepliikit.cs` lisämanifesti repliikit-lapi-v1). Raportin kohta 2.1 "ääntä ei ole" on vanhentunut.

**Ääni per hahmo (ennallaan):** muuri-/tyrma-vartija = mies-45-jamakka-karhea (tueYPmNkZixd2PUS7Wgb), kello-vartija = mies-30-letkea-pelimies (xRHBPmRPAGCPeOQJVQ2u), tyrma-vesipoika = mies-18-reipas-nuorukainen (dxjs8crcOOSSbPPSdf15).

**Laatu (uusi havainto):** 9.10. otot tehtiin ennen ääniporttia ja alimiter-korjausta. Portti nyt: `tyrma-vesipoika-1` HYLKÄÄ (true peak +0,1 dBTP), 15 muuta VAROITA (−0,5 dBTP; osa LUFS −15…−17). Korjaus ilman uutta generointia: tasoitus uudelleen olemassa olevista WAV-masterista (alimiter 0,79). Odottaa PT:n päätöstä.

**Oikeasti uutta: 4 valinnaista (kohta 2.3 + avaimet)**: muuri-vartija-rauha-3, muuri-vartija-epaily-3, kello-vartija-halytys-2, tyrma-vartija-vienti-2 → **171 mrk tageineen (140 ilman), ≈ 11 kr**, 4 ottoa. Ajovalmis: `proto-3d/_tyo/olavinlinna-m-valinnaiset-20261019/` (kasikirjoitus.md, aja.zsh kuiva/--aja, paketoi.py → kieli.json + SHA256SUMS, ääniportti --puhe). Kuiva ajo tehty. Ajo vasta PT:n "LUPA"-viestillä.
