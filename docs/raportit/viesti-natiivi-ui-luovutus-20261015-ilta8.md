# Natiivi-UI: luovutus 15.10.2026 klo 22.50 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; vanhemmat (ilta7, ilta6) ovat käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöspyyntöä tyokalut/tarkista.sh (0 virhettä).
Proto-worktreet: /Users/Shared/Claude/wt/proto-natiivi-ui-nimet-196 (natiivi-ui/nimet-196, kärki a67af930e),
proto-natiivi-ui-aloitus-195 (natiivi-ui/aloitus-195, 12e2a5644), proto-natiivi-ui-etsin-196 (natiivi-ui/etsin-kortti-196 c16017d01; PK
yhdisti → poista worktree `git worktree remove` kun PK:n f264f428e on junassa).
Simuvaraukset Julkaisijalta voimassa: 123B4B25 (iPhone16) ja F7513985 (iPad11) → lopuksi "SIMU VAPAA" Julkaisijalle (local_5cb16c00-…).

## KESKEN (taustalla; edellisen session taustatyöt voivat kuolla nollauksessa → tarkista ja aja uudelleen)
Skriptit: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/2ba3826e-f962-4c75-a02e-a29cd6806929/scratchpad/
(simuajot.zsh, minipallo-ketju.zsh). Ajoskriptit ja skenaariot: proto-3d/tyokalut/natiivi-ui-ajot/.
1. 9 KOHOKOHTAA SAMASSA IKKUNASSA (omistaja 22.05 + 22.06): käännös cb2ff213d VALMIS (151c6fd3a, app proto-3d/_tyo/natiivi-ui/kohokohdat9-196-app).
   Ajot: `zsh .../ajo-kohokohdat9-196.zsh <app> 123B4B25-36B7-4A76-B677-905621CD8F5A iphone pysty` ja `… F7513985-C8BC-4E97-8D29-9C9BD420E962 ipad vaaka`
   (tulos proto-3d/lokit/todistus-kohokohdat9-<laite>-196-*; iPhone-ajo alkoi 22.48). Kuvat K1 (9 korttia 3/rivi), K1b (vieritetty: Kohteet,
   ISS nyt | Oma sijainti, ryhmät), K2 (keijut-kortti → paras hetki). → PT: iPhone + iPad, korvaa 22.05:n kuvan, omistajalle ennen kytkentää.
2. ALOITUSVIHJEET VAAKA: pystykuvat valmiit (todistus-aloitusvihjeet-{iphone,ipad}-196-2223/2225, V1+V2 kunnossa). Vaaka uusitaan omana
   ajonaan: `zsh .../ajo-aloitusvihjeet-vaaka-196.zsh proto-3d/_tyo/natiivi-ui/aloitusvihjeet-196-app <udid> <iphone|ipad>`. Tarkista,
   menevätkö Bagdad/Teheran/Dubai päällekkäin vaakana (edellisessä kuvassa näytti siltä). Sitten pysty + vaaka → PT (kytkin pysyy pois).
3. MINIPALLO (omistaja 22.40 A): a67af930e käännös L2-jonossa (minipallo-ketju.zsh 1288 88803 → proto-3d/_tyo/natiivi-ui/minipallo-196-app),
   sitten `zsh .../ajo-minipallo-iphone-196.zsh <app>` (skenaario sk-minipallo-196.txt: M1 teline, M2 iso, M3 haku nimi vasemmalla, M4 valinta;
   tap/veto-koordinaatit arvioitu iPhonen 393 pt:lle – korjaa, jos osuvat ohi). → PT iPhone-kuvat ennen kytkentää.
   Julkaisija tietää SHA-vaihdon 5b2dede11 → a67af930e.

## TEHTY (pushattu natiivi-backup; kaikki kytkinten takana)
- nimet-196: c9774e32b + c4e7d9453 kaikki 9 kohokohtaa kuvallisia (LS1 ämpärissä); 7a1d4bf54 SS iss-ilmiot-196 mergetty (auringonnousun hetki,
  KupoliNimet.Valittu); 3a87ea5a0 IssKohokohdat.Nakyvat = kaikki (Valmis = efektin tila; Linssit-testit 1892/1892); 1f703d095 testikomento
  `ui linssi kohdevalikko kohokohdat 0|1`; cb2ff213d yksi vieritettävä ikkuna, kohokohdat 3/rivi, Kaikki paikat -näkymä pois;
  7f4f91fb6 tyylikirjan synkka (main 9d0f415e3; web-PR #4665 palautti GALLERIA-tokenit, jotka #4578 jätti pinottuun haaraan).
- Minipallo: f03cb4486 Sijaintipallo.KulmaIso (1,25 ×, nimi vasemmalle) + `ui linssi kulmapallo 0|1`; a6be782d4 MinipalloPisteet (haku =
  kohdevalikko + kohokohdat + KS:n pisteet; piste → AstronauttiKerros.LennaOmaanValinnalla, kohokohta → IssKohdevalikko.AvaaKohokohta);
  3e53d3286 KS:n minipallo-pisteet-196 0e5565382 (383 pistettä) + a67af930e lukija ("kohde"-merkityt pois).
- aloitus-195: 12e2a5644 `ui vihjeet 1|0|data` (vihjeet.json kaytossa pysyy false). KS:n 5 Codex-kuvaa olivat jo mukana (a93815c2a).
- Etsimen kortti (omistaja 22.37 + 22.40 B): c16017d01 IssOmatKuvat Esikatsele/VaihdaEsikatselu/PeruEsikatselu, "Kuva tarkentuu…",
  alarivi "korkeus 429 km · 50 mm". PK yhdisti (f264f428e) ja ottaa iPhone-kuvat itse PT:lle.
- Kohdevalikko iPhone16-simulla (0e26d1dee): omistajan 2057-kuvan viat (oikea reuna, "/c") eivät toistu = vanha build. P0:n harmaa laatikko
  = omistajan tilaama minipallon teline (14.10. 23.24), jätetty. Isoisän uni -video tehty, omistaja 21.48: julkaisu ILMAN unta (kytkin false
  juna-195:ssä, aloitus-195:ssä ja nimet-196:ssa; uniin ei muutoksia ennen uutta suuntaa KK:lta).

## AVOIMET (järjestyksessä)
1–3 yllä. 4. Edellisten luovutusten avoimet ennallaan (intro-pehmennys laitteella, lasipohjan riskit, levyn app-kopiot).

## Opit
- Taustaketjussa EI `pgrep -f <skriptin nimi>`, jos sama teksti on ketjun omalla komentorivillä (heredoc) → odottaa itseään ikuisesti.
  Odota pid:llä (`kill -0 $pid`).
- zsh: `$B:Assets/…` tulkitaan muuttujan muokkaimeksi (:A) → käytä `"${B}:polku"`.
- Testiskenaariossa sulje kortti ennen kiertoa, tai aja vaaka omana ajonaan.
