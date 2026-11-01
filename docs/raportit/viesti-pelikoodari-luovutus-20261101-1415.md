# Pelikoodari: luovutus 1.11.2026 klo 14.15 (konteksti 27 %, pehmeä raja)

Edellinen: -20261101-1258 (sen Kesken 1–2 tehty). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktreet (ei originia):
- wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki **5b77eee6a**)
- wt/proto-pelikoodari-yhd-216 (haara pelikoodari/reitti-216-yhd, kärki **f9e39c9a7** = NS mergesi junaan 216, runko aea684c3c)
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (tallenne/, tallenne/kaari/).

## Valmista tässä vuorossa
- V4-KYTKENTÄ: kytke-v4.py → 60643b0e2 (rakennukset-v91, c2-v31, muurikate-v37), tarkista.sh vihreä → yhd 30729dd84 → NS junaan 216 (runko 76bb81fd8).
- TAUSTA-V90 (PT 13.3x): TaustaKansio v89f → kielletty-tausta-v90 (5b77eee6a; ämpärissä 69/69 viitattua tiedostoa) → yhd f9e39c9a7 → NS (runko aea684c3c).
- TALLENNE v4-rakennuksilla (tausta vielä v89f): tallenne/20261101-131815-reitti.mp4 (95 s) ja -sivu.mp4 (68 s); ovet aukeavat
  (a-meridiaaniportti, Puyi 29,7 m), 0 ohitettua peliruutua, ei kaukovälkyntää (erotusmittaus kuvat 3400–4755). PT: EI vielä omistajalle.
- "KUULTAVA KAARI" portin oven yllä (PT 13.4x) SELVITETTY: ei läpinäkyvyyttä. Kuvio = auki olevan eteläsuun (6 × 5,5 m, tunneli 25 m
  ovelle) katto ja holvi oikeasti suusta nähtynä. Suu ei erotu, koska pelissä on vertailuvalo (ValoKohteet.JuoksuVertailuValo = true,
  omistaja 27.10. 10.56) → kaikki v4-piirtäjät "leivottu 0", tunnelin sisus yhtä kirkas kuin julkisivu (leivottuna 0,02–0,3 vs 0,69).
  Todisteet ja korjausvaihtoehdot: tallenne/kaari/havainnot.md (skenaariot sk-kaari*.txt, aja-kaari*.zsh). PT:lle ilmoitettu 14.1x.

## Kesken / seuraava
1. Odota PT:n valolinjausta kaaresta: (a) leivottu valo takaisin tai (b) vertailuvalossa tunneleille tumma kerroin (peli tai LAV).
   Jos (b) pelin puolelle: JuoksuValo.hlsl JuoksuValaistus (vertailuvalon haara) tai materiaalikohtainen kerroin – kysy PT:ltä pohja ensin (UI-/valopohjat).
2. UUSI TALLENNE PT:lle, kun kaarilinjaus on rungossa (myös tausta-v90 on nyt mukana): zsh tallenne/aja-tallenne.zsh (taustalla, ~11 min;
   odottaa vapaan koneen). Tarkista lokista ovi aukeaa / ohitettuja 0; videot tallenne/<aika>-reitti/-sivu.mp4.
3. RAKENNUKSET-V92 (LAV avoin: v91 + edusta-v3), kun LAV toimittaa → polku (RakennusKansio JuoksuSokkeloMaailma.Palatsi.cs).
4. Vanha Kesken 4 (botin uupuminen, elinvoima-apu kuva-ajoissa) ennallaan.
Huom. esikatselu.sh ajaa haaran KÄRJEN → commit ennen ajoa. Reaaliaikainen ajo on hitaampi kuin tallenne: diagnostiikka maalissa
hyppy-jos maali -silmukalla (sk-kaari2.txt), ei kiinteällä odota-pelillä. QA: `valo pintatieto <m>` näyttää JUOKSU_LEIVOTTU-tilan.
