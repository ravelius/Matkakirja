# Cloudflare-säästöpaketti: kirjanpito ja jäljellä olevat käyttämättömät karttaversiot (Julkaisija 1.11.2026 klo 03.4x)

Jatkoa raportille cloudflare-kayttamattomat-20261031.md (PR 5767). Tilaus: PT 1.11. 03.3x.
**Tässä erässä ei poisteta mitään ämpäristä**: uudet pysyvät poistot omistajalta aamulla KK:n kautta (PT 03.3x).

## Kirjanpito: tehdyt poistot 31.10.–1.11.

| Erä | Tulos | Loki (julkaisija-tyokalut/) |
|---|---|---|
| Karttaversiot (PT:n kuittaama lista, 16 kansiota) | valmis 02.21, virherivejä 0 | poistot-cloudflare-20261031.log |
| pyramidi 2026-09-26s-pohja (KS: kyllä) | valmis 02.40, virherivejä 0 | poistot-cloudflare-20261031.log |
| Olavinlinna, viittaamattomat 314 kansiota (omistajan ajo 23.17) | 314/314; 5 blender-kansiota kaatui ensimmäisellä kierroksella, uusittu 02.5x ja tarkistettu tyhjiksi; uusin.json 1a1857e06ec1386f säilyi | poista-r2-olavin-20261031.log |
| Ämpäriluettelo uudelleen | 1.11. 02.44–03.10: 9 013 062 objektia, 204,4 Gt | amparin-luettelo.tila, rakenna-luettelo-20261101.log |

Ämpäri pieneni ~1 070 Gt → 204,4 Gt (≈ 16 $/kk → ≈ 3,1 $/kk, R2 0,015 $/Gt/kk). Olavinlinna nyt 12,4 Gt.

## Jäljellä olevat käyttämättömät karttaversiot (uuden luettelon mukaan)

Tarkistettu: webin origin/main (ajonaikainen koodi ja data), TF 215 (c0b59f6b0) ja junan 216 runko (a29bb5d3f).

| Kansio | Koko | kk-kustannus | Viittaukset |
|---|---|---|---|
| julisteet/maasto/2026-09-24-maailma/ | 11,78 Gt | ≈ 0,18 $ | ajonaikaisesti ei mitään; natiivissa vain kommentit (Rakennus.cs, KarttaKerrokset.cs, MaastoLaatat.cs); webin tools/ (tee-maasto, vie-rajakorkeudet, offline.mjs, eheysvartija, offline-koot.json) → odottaa KS:n työkaluvaihto-PR:ää (→ 2026-10-29-maailma) |

Muut ämpärin karttaversiot ovat käytössä (lista: 31.10. raportin "Käytössä"-kohta; ei muutoksia).
Avoinna edelleen: pyramidi.json viittaa rantatasoon 2026-09-30-ranta, jota ämpärissä ei ole (KS selvittää).

## Levyn tila (sisälevy) yöllä

Swap-vuoto (ChatGPT:n codex app-server 83 Gt) vei levyn 25 Gi:hin; ratkesi itsestään 02.1x.
Siirrot NAS:lle (rsync -c ennen lähteen poistoa) ja palautukset kirjattu nas-arkistoi.log- ja lokit-arkistoi.log-tiedostoihin.
Oppi: arkistoskripti tarkisti viittaukset vain työkaluskripteistä → siirsi käytössä olevia vientejä (v99, tausta-v89d);
kaikki palautettu 02.25–02.41. Skripti seis, kunnes korjaus ja kuiva-ajon lista on PT:llä.
