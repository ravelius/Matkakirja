# Natiivi-UI: luovutus 16.10.2026 klo 00.45 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; vanhemmat (ilta8 ja aiemmat) on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöspyyntöä tyokalut/tarkista.sh (0 virhettä).
Simuvaraukset Julkaisijalta voimassa: 123B4B25 (iPhone16) ja F7513985 (iPad11) → lopuksi "SIMU VAPAA" Julkaisijalle (local_5cb16c00-…).
Käännökset: Julkaisijan ohje "yksi kerrallaan" L2:lla (levy). L2-lukko on mkdir-kilpa, EI jono: odottava käännös voi hävitä vuoron
toistuvasti → olen vaihtanut odottavan SHA:n uudempaan (superset) ja kertonut Julkaisijalle.

## HAARAT (proto, pushattu natiivi-backup)
- natiivi-ui/nimet-196 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-nimet-196), kärki 122169f34. Tämän session commitit:
  7a719c587 kohokohtien nimet sanarajoille (Tulivuoret, Pimennyksen varjo, Lentojen vanat, Aamunkoitto radalla) – PT kuittasi OK;
  b694bfa7b nimien erottuvuus (liuska 75 % / 0,85 + kuvatekstin varjo, PT 23.4x); 5e41e44e1 Sijaintipallo.YlaKulmaan piti pallon
  kosketettavana (testikomento `ui linssi kulmapallo 1` teki siitä Ignore → napautus meni läpi); 426ed529a omistajan 23.56 kohdat 2–3
  (aarrepiste väistää myös nappulaa Karttapisteet.Vaista, syke 2,8 s / 0,35 Pallo.unity + koodi, AarrepisteRengas.Kaytossa = false,
  NostotKartalla.VisaVihrea = false); bb08f8c30 kohta 1 (aloitusintro esilataa kaikki kuvat + TraileriTausta.Keskisavy välimuisti, ReadPixels
  ei enää kuvanvaihdossa); 122169f34 Kosketusvieritys (heitto sormen vauhdilla, napautus liu'un aikana vain pysäyttää; loki "ui vieritys: heitto").
- natiivi-ui/aloitus-195 (wt proto-natiivi-ui-aloitus-195), kärki bb85d1808: Aloitusvihjeet.Levita (lähekkäiset kortit erilleen, kortti
  kokonaan ruudulle; iPhone vaaka 22.59 Bagdad/Teheran/Dubai päällekkäin). Kytkin pysyy pois.

## KESKEN (taustaketjut; voivat kuolla nollauksessa → tarkista ja aja uudelleen)
Ketjuskriptit kopioina: proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/ (polut sisällä osoittavat vanhaan scratchpadiin – korjaa S=).
1. bb08f8c30 kääntyy L2:lla (alkoi 00.24) → app proto-3d/_tyo/natiivi-ui/kohokohdat9-196-app. Sen jälkeen korostus-ketju ajaa:
   ajo-kohokohdat9-196.zsh iPhone pysty + iPad vaaka (K1-kuvat PT:lle → omistajalle), ajo-minipallo-iphone-196.zsh (tap-kohta/veto-kohta
   elementtiin mk-astrokuva__sijaintipallo), ajo-aarre-iphone-196.zsh (sk-aarre-196: A0 visanostot, A1 piste nappulan vieressä, A2 syke,
   aarrerengas piilossa), ajo-intro-fps-iphone-196.zsh (kehysajat lokista intron aikana: vertaa 00.38-ajoa edeltävään: simussa max 315 ms
   kuvan 2 kohdalla, kuva 5 1 s myöhässä). Lopuksi merkki korostus.valmis.
2. vihjeet2-ketju: bb85d1808 käännös (aloitusvihjeet-196-app) + ajo-aloitusvihjeet-196.zsh ja -vaaka iPhone + iPad (odottaa korostus.valmis).
   Tarkista, ettei vihjekortteja ole päällekkäin vaakana. iPadilla kartta on pysty- ja vaakana niin lähellä, että useimmat vihjeet ovat
   ruudun ulkopuolella (kartan rajaus, ei vihjeiden vika) → kerro PT:lle havaintona.
3. lehti-ketju: 122169f34 käännös (minipallo-196-app) bb08:n jälkeen, sitten ajo-lehti-vieritys-iphone-196.zsh (video vieritys.mp4).
   Mittaa siirtymät: python3 siirrot.py <kehyskansio> (ffmpeg-kehykset 295×639 harmaana + ffprobe-ajat, ks. skripti). Ennen korjausta
   (todistus-lehti-vieritys-iphone-196-20261016-0038): heitto 50 → 16 px/ruutu irrotuksessa. Odotus: ei pudotusta; lokissa "heitto N pt/s".
   → kuitti PT:lle (omistajan 00.33 junan 196 ehto).
4. PT:lle 3 riviä kustakin: K1-kuvat (iPhone+iPad), aarre/visa-kuvat, intron fps-luvut, lehden video. Sitten Julkaisijalle SIMU VAPAA.

## AVOIMET
- Intron fps Macilla: en voi mitata (Mac-käännös vain linjalla 1/Julkaisija). Simun luvut kertovat kuvanvaihtojen piikit.
- Edellisten luovutusten avoimet (lasipohjan riskit, levyn app-kopiot) ennallaan.

## Opit
- Simuajon napautus elementtiin: `tap-kohta 0.5 0.5 <nimi>` / `veto-kohta fx1 fy1 fx2 fy2 pito <nimi>` (todistusajo.sh) – ei arvattuja koordinaatteja.
- iPadilla kohdevalikko mahtuu ilman vieritystä: veto sulki valikon → ajo-kohokohdat9-196.zsh jättää vedot pois iPadilla.
- Vierityksen sujuvuus mitataan videosta (siirrot.py) eikä silmällä; simun tallenne on VFR, ajat ffprobesta.
