# Natiivi-UI: luovutus 16.10.2026 klo 10.26 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -aamu2 ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh (`zsh <ketju> <sha>`; L2-käännös → iPhone
123B4B25 + iPad F7513985). Vertailuparit: `python3 -I /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/pari.py ulos.png vasen.png oikea.png [korkeus]`
(PIL, kaksi kuvaa vierekkäin samaan korkeuteen, 24 px rako); vaakakuvissa käytä kuvat/raaka/*.png (todistuksen kuvateksti peittää nimen).
SIMUT 123B4B25 + F7513985 ovat NUI:n käytössä lataus4-ketjuun asti → ilmoita Julkaisijalle SIMU VAPAA, kun ajot on tehty.

## VALMIS (tämä sessio)
- ISS YKSI HARMAA LASIPANEELI (omistaja 08.07–08.09): natiivi-ui/iss-lasi-196 7d70508f9 (pohja juna-196 a224f7ec6), kytkin
  IssKohdevalikko.YksiLappu pois, `ui linssi kohdevalikko yksi 1|0`. tk-teema-harmaa + chatin lasi (Lasipohja.AsetaSavy uusi), ylimpänä
  kohokohdat, sitten Nyt/Syksy/LIVE/NIMET, alla Kohteet. Kuvat PT:llä: proto-3d/_tyo/natiivi-ui/iss-lasi-pari-0900/. PT:lle kysymys:
  Pulun taulun rivit (Maapallo, Kuvat, Poistu, Kysy) eivät ole mukana (vaihtavat näkymää) — odottaa vastausta. Ei vielä NS:lle
  (kytkin pois; omistaja näkee ensin). Huom: skenaarion sk-iss-lasi-196 veto osui "ISS nyt" -nappiin ja sulki valikon (L3–L5 turhia).
- VIHJEET KARTTAPIIRROKSENA (omistaja 08.48 "Kevyt parempi mutta ei vielä näytä hyvälle. Ei oteta tähän junaan" → juna 197):
  natiivi-ui/vihjeet-kartta-197 6c1b03312 (sisältää kevyt-kytkimen d1820bbbc). `ui vihjeet kevyt 1` = Aloitusvihjeet.Piirros
  (HaePienena 256×128 → rajaus, seepiahaalistus 0,55, muste 2 px, varjo), sama pinta-ala 56×30 pt, ruudulla siirto ≤ 8 %, reunalla
  viitta ◁▷ (laajenna-kolmio) ja 30 %. Kuvat PT:llä: proto-3d/_tyo/natiivi-ui/vihjeet-kartta-pari-1025/ (1–4). Kaikki 9 näkyvät.
  Huomautin PT:lle: iPad vaaka pienet/vaaleat → säätö vakioista PiirrosAla, Haalistus, ViivaPeitto. Odottaa omistajan vastausta.
- LATAUSKUVAN NIMI isompi + maa (omistaja 08.04/08.05): natiivi-ui/lataus-nimi-196 f9fd0ffd9 kuvat PT:llä
  (proto-3d/_tyo/natiivi-ui/lataus-nimi-kuvat-0925/). Uusi testikomento `ui linssi astro latauskuva|latauscupola 1|0` (simussa lataus
  ohittui ennen kuvaa).
- Levykierros: ~3,7 Gi (omat .app-kopiot, kelaus-196-worktree, 9 vanhaa todistuslokia). Kuitattu Postivahdille.

## JONO
PT 10.3x: ENSIMMÄISEKSI latauskuvan 0738085fc kuvat → PT (JUNA 196 ODOTTAA TÄTÄ). Toiseksi vihjeiden säätö omistajan palautteen
mukaan (kuvat ovat KK:lla; palaute PT:ltä). Kolmanneksi ISS-lasin vastaus.
1) LATAUSKUVAN NIMI LUETTAVAKSI (PT 09.3x: iPhone vaakana "Andøyan" a haalistui liekin päälle; "Nimen pitää erottua kaikilla
   taustoilla ja kaikissa latauskuvissa"; pohjan omat keinot, ei uutta tyyliä) – junaan 196. Haara natiivi-ui/lataus-nimi-196:
   0bfc7340e Latauskuva.Luettava (kierroksen sumea varjo 14 px + 0,8 ääriviiva) EI NÄKYNYT (Kone-kirjasimessa ääriviiva ei piirry);
   0738085fc vaihtoi tiiviiseen varjoon 0 1px 2px Himmennys.Kuva (pelin tekstit kuvan päällä), kierros palautettu omaan tyyliinsä.
   KESKEN 10.26: `lataus4-ketju.zsh 0738085fc` (1. yritys kaatui Julkaisijan orpoon Unityyn, uusinta iOS-vaiheessa). Tulos:
   proto-3d/_tyo/natiivi-ui/lataus-nimi4-ketju.out ja lokit/todistus-lataus-nimi4-{iphone,ipad}-196-*. Tarkista raaka/L2-raketti-vaaka.png
   rajaus (natiivi-ui-ajot/rajaa.py kuva ulos 700 880 1900 1100): erottuuko a liekistä. Jos ei → seuraava pohjan keino: kaupunkikortin LIUSKA-nimivarjo (mk-liuska__nimivarjo,
   Kuviot.Pysty KorttiNimivarjo 0→0,85) nimen taakse kuvan alaosaan (AstronautinNakyma.NaytaRaketinKuva; museo, linna). Kuvat PT:lle
   (iPhone vaaka + iPad) → NS:lle "junaan 196 natiivi-ui/lataus-nimi-196 <sha>" (NS:lle sanottu: odota kuittausta).
2) VIHJEIDEN SÄÄTÖ omistajan palautteen mukaan (karttapiirros natiivi-ui/vihjeet-kartta-197 6c1b03312, worktree
   /Users/Shared/Claude/wt/proto-natiivi-ui-vihjeet-kartta-197; kuvat KK:lla, palaute PT:ltä) → uusi kuvapari PT:lle. Juna 197.
3) PT:n vastaus ISS-lasiin (Pulun taulun rivit? kytkentä) → toteuta.

## Opit
- Kone-kirjasimessa (mk-astroavaus__nimi) -unity-text-outline ei piirry; sumea iso varjo ei näy kirkkaalla taustalla.
- proto-kaanna "VIKA luo" + "another Unity instance" = jonotörmäys (toisen orpo Unity), ei koodivika → aja ketju uudelleen.
- Ketjun odotus: `while pgrep -f "<edellinen>-ketju.zsh"` sarjallistaa simuajot; uusi ketju odottaa koko edellistä ketjua.
