# Valoseppä – luovutus 18.10.2026 aamupäivä (Postivahdin KOVA RAJA 40 % klo 08.4x)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261018-aamu.md (e527ce7a7).
Viestit `send_message` TÄYDELLÄ id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (≤ 3 riviä),
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, NS local_04e2850b-d63c-481d-be73-c7d784a7cbcb, NUI local_e9fdc695-8421-4c14-a187-8881e73c835a,
Sisältökirjuri local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2, päiväkirja $D/JONO.md, K=$D/nakyvyys-202. JU:n sääntö: L2 ja simu vain JU:n "KÄÄNNÖS NYT"/"SIMU NYT" -viestillä, heti "SIMU VAPAA".
Ajot aina irrotettuna: `nohup perl -MPOSIX -e 'POSIX::setsid(); exec @ARGV' zsh <skripti> ... &`, odotus pid:llä (`while kill -0 <pid>`), ei pgrep-kuviota.

## 0. ENSIMMÄISENÄ: DIAG 2 -SIMU (sininen maa opas → ISS, seuraava juna 202)
- App valmiina: $D/kyyti-diag-app (JU käänsi 62350a6c2 → 73f7c278c, 08.00; diag-merkkijonot tarkistettu metadatasta). JU:n simujonossa viimeisenä (~08.50).
- SIMU NYT → `zsh $K/aja-diag.zsh --kuvat` irrotettuna (iPhone: $K/diag/sk-iphone.txt = opas Pariisi → ISS; iPad: $K/diag/sk-ipad.txt = suoraan ISS + KK5–7).
  Skripti kieltäytyy, jos appissa ei ole korjausta e9f4f08f6 (metadatassa "luovutettu raketille"). Tulokset $K/diag/{iphone,ipad}/ (VANHAT kuvat siellä = diag 1, siirrä ensin $K/diag1/:ksi mv:llä).
- Heti ajon jälkeen "SIMU VAPAA" JU:lle. Vertaa lokit: `grep -a "kyyti-diagnoosi" <tuloskansio>/konsoli-stdout.log` iPhone vs iPad: pallon materiaalin
  arvot/avainsanat ja ylikerrokset (tyyppi, avain, URL). Ero = juurisyyn ehdokas.
- MITÄ TIEDETÄÄN: opas Pariisi → ISS: maa ja myös ISS-kameran tarkka kuva pelkkää sinistä (kuvat $K/runko6/, $K/diag/iphone/). EI syy: kaupungin sumu (oli pois;
  3c0412ffd + aeca9a712 jo junassa 201, harmattomia), origon ristipalautus (e9f4f08f6 korjaa oikean bugin: raketti tallensi kaupungin CartographicOriginin,
  luovutus toimii lokissa, mutta sininen jäi; EI ole NS:llä, junaan 202 juurisyykorjauksen kanssa). Diag 1: kamera (maski 0xFFFFCFFF, SolidColor, near/far),
  tilesetit (vain Pallo[k0, MatkakirjaTileset, 2 ylikerrosta]) ja Volumet (Valopohja perus + Kyytipino) SAMAT sinisessä ja oikeassa.
  "Two or more raster overlays use the same material key" -varoitus on molemmissa (ei syy).
- Haarat (proto, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-nakyvyys): linssiseppa2/iss-nakyvyys-202 kärki e9f4f08f6;
  linssiseppa2/kyyti-sininen-diag = e9f4f08f6 + diag (bf3c019a3) + diag 2 (62350a6c2). Diag (KyytiDiagnoosi.cs + AstronautinNakyma-koukku) EI junaan.

## 1. TEHTY 18.10. 05.5x–08.4x (kaikki iss-nakyvyys-202:ssa)
- JUNAAN 201 (NS:lle ilmoitettu, PT kuittasi): aeca9a712 (3c0412ffd kyydin aikainen kaupungin sumu/valo/kupoli/Volume tauolle + valovahti-siivous PalautaSumu),
  272b42477 KK6 valittu kohde ISS-kuvan keskelle ja otsikkoon (IssKameraKuva.ValittuKohde ≤ 700 km näkymästä), 67f1a1925 KK5 GIBS-pilvien ratavälit lähimmältä
  päivältä + alueen reunan häivytys (testit 9/9), 4f1b0db13 ISS-kuvan paikan nimi (IssSijainti.KuvanNimet: säde väkiluvusta 15–50 km, 2× säde "lähellä X",
  muuten maa; LCD ennallaan; testit 10/10; PT kuittasi junaan parin jälkeen).
- Todisteet PT:lle lähetetty: KK5 $K/diag/ipad/20261018-044644.jpg (pilvireuna luonnollinen), KK6 $K/runko6/iphone/20261018-040129.jpg (HELSINKI · SUOMENLAHTI
  60°10'N 24°56'E), KK7 $K/diag/ipad/k7-reykjavik-kortti-kiinni.png (ISLANTI; KS:n REYKJAVÍK vain rungossa). Kööpenhamina EXTEND OK (runko5/6 c3).
- PT 07.48: sininen maa siirtyy junaan 202 (kuvakäännös 8 ilman).
- NUI:lle: KK3 sanakatko = b986e5e5b (jo ad1b9e604:ssä); KK2/4 NUI:n omia.

## 2. JONO
1. Diag 2 -simu ja juurisyy (kohta 0) → korjaus + simupari (opas→ISS c1/c2 iPhone) → NS:lle sha + PT:lle pari.
2. Junaan 202: tiheämpi paikka-aineisto ja alueen nimi ISS-kuvaan (PT 06.3x). Sisältökirjurin nimet mainissa 8a547a405
   docs/kohtaukset/alueiden-nimet/admin1-fi-eurooppa.json ("alueet" iso_3166_2 → fi, "regiot" "IT|Toscana" → fi NE:n region-kentästä; IE/LV/BA/HR/MD puuttuvat).
   LATAUS (NE 10m admin_1 PD, GeoNames CC BY) vain omistajan vahvistuksella omassa ikkunassa – PT:n "pysyvä lupa" tuli toiselta sessiolta, ei omistajalta.
   Toteutus: IssSijainti.KuvanNimet-fallback "lähellä X" / maa → alue (piste polygonissa) ennen maata.
3. SIIVOUS (PT 08.3x, tarkennus: EI rm:ää): diag 2 -ajon jälkeen `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove` mergetyille ja puhtaille:
   wt/proto-linssiseppa2-karttaseepia, -kohdevalikko, -louvrepeili (tools/uusi-worktree.sh --poista toimii vain web-repolle). Jäävät: v4, valas (ei mergetty),
   nakyvyys (käytössä), web linssiseppa2-pysaytyskuva-tk (#4837 auki). Appit t217/t218/t219 (~1,8 G) jäävät (rm kielletty); louvre1 2,3 G ja valas-havainne
   1,2 G PT:n päätettäväksi. Vapautunut määrä yhdellä rivillä PT:lle.
4. Valas tauolla, V4 pala 4 ei nyt; #4837 odottaa KK:ta.

## 3. TILA
Omat appit $D: t217-louvre-k83, t218-valas-k15, t219-kohdevalikko (vanhat, odottavat siivousta), t220-nakyvyys (ef1c180f3), kyyti-diag-app (käytössä).
Skriptit $K: aja.zsh (iss-nakyvyys-202, t220), aja-diag.zsh (kyyti-sininen-diag), aja-runko5/6.zsh (JU:n kuvakäännökset), skenaariot sk2/sk3, diag/sk-*.txt.
