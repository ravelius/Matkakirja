# Pelikoodarin luovutus 19.10.2026 klo 11.10 (Postivahdin KOVA RAJA 47 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-0925.md (yksityiskohdat ja tilat sen LISÄYS-/TILA-osioissa). Rooli: Pelikoodari (Opus, high), id
osoitekirjassa. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikallinen, ei pushia). EI käynnissä olevia käännöksiä, lukituksia
eikä pitkiä ajoja.

## ENSIN (järjestys)
1. **Simuvuoro (JU antaa "SIMU NYT"; oli ~11.05, ei vielä tullut 11.10)**: JU:n app _tyo/julkaisija/juoksupeli-202-app = dfae35317 (897ae0f69).
   Skenaario ☰ › Pelit › Keskeneräiset › "Juoksupeli: Rata v4" / "Rata 1"; QA `ui juoksupeli botti 1`, `ui juoksupeli v4`, `ui juoksupeli rata1`,
   `ui juoksupeli kupla [n]`. Videot ~40 s → PT. LISÄKSI PT 11.1x: KUVAPARI museon ⚙+☰ yläkulmasta ja juoksupelin tekstityskaistaleesta (huuto,
   Tekstitys päälle ⚙:stä) → PT. HUOM: ⚙/tekstitys/kaistale ovat vasta haarassa juoksupeli-kamera-204 (e5016f4ce), eivät JU:n appissa → pyydä JU:lta
   käännös e5016f4ce:stä kuvaparia varten tai kysy PT:ltä, riittääkö video vanhasta.
2. **NS-pyyntö simun jälkeen**: haara pelikoodari/juoksupeli-kamera-204 (wt/proto-pelikoodari-juoksupeli-kamera-204), kärki **e5016f4ce**, junaan 204
   (PT hyväksyi; sisältää 3da1369de ja omistajan hyväksymän uniefektin 0956ff99f). Lähetä NS:lle (local_fcc10552…) sha + "runko 4dfcadcc0 + juoksupeli".
3. Kun juoksupeli valmistuu Codexin grafiikalla: SIMUN KUVAKAAPPAUS (grafiikka, mittasuhteet, näkyvä alue) PT → KK → omistaja (omistaja 10.38), ei videota.

## HAARA juoksupeli-kamera-204 (runko 4dfcadcc0 + juoksupeli 6bf405002), kaikki tarkista.sh rc 0 (kameravahti ok), Peli-testit 632/632
- 5a86ac666 kamera KameraKirjoittaja.Aseta (kamerapoikkeukset pois).
- 3da1369de esteet ankkuri + harmaa paikkamalli (EsteMallit, Codexin glb vaihtuu itsestään), Puyin hang_grab/hang_loop, yleishuuto.1–30.
- f03ffa397 + 0956ff99f unenomainen muistokupla (MuistokuplaSoikio: aalto 0,7 s tulo/lähtö, tyyni 2,1 s, leveä häivytys, musta 0,06, rae 0,045;
  MuistokuplaAjoitus) – OMISTAJA HYVÄKSYI 10.44. Versiot: juoksupeli.rikkoutuva.<id>.versio.<n>.kupla/.huuto, kuva esineet/<id>-<n>.
- bd71ba510 / 72c2805e1 SK:n 51 esinettä + 30 yleishuutoa + jadepersikka (main 26d55c8a5, 31e967343) tekstit.fi.json:ssa.
- b1587311e tason 2 kymmenen aarretta harmaina (Aarrepaikat osat 26–37, SK:n nimet), HUD n/10.
- ef127330a KÄÄRETAULU (omistaja 10.38): V4EsteLaji.Kaaretaulu osa 15 (puutarha, kulun levyinen), repeää aina, 6 liuskaa heiluu, rikkoutuvan
  kulku esine-id kaaretaulu (hinta 5); Codexin kaaretaulu/-revitty/-liuska.glb.
- a871777f0 + e5016f4ce YKSI TEKSTITYS (omistaja 10.58): Asetukset Kytkin.Tekstitys (matkakirja-tekstitys, oletus pois, vanhat museo-/IM2-valinnat
  siirtyvät, säilyy Uusi pelissä); ⚙ Aanentasot ylin rivi; MuseoSovitin/IhmisenMatkaKerros delegoivat; juoksupelin huuto kaistaleelle
  (mk-aikajana-kertomus) 2,2 s; Tekstitys pois ☰-valikoista, LinssiValikko.Ratas ☰:n vasemmalle museossa ja Ihmisen matkassa. LS/NUI tiedoksi.
- Codexin mallisopimus: proto-3d/_tyo/pelikoodari/juoksupeli/ESTEMALLIT-CODEXILLE.md (PT välitti 675e54b86; kääretaulu lisätty perään).
- Esikatselut: proto-3d/_tyo/pelikoodari/muistokupla/ (kupla-laineilu-07.mp4 + -arkki.png, kupla-video.py, maski-esikatselu.py).

## ODOTTAA / MUUTA
- Huudot ääninä: Puyin ääni 23 Horatius [shouting] [panicked], "Aa!"-alku hyväksytty, ääni vielä testissä (nuorempi lapsi); huudot ämpäriin vasta
  äänitestin jälkeen → kytke RikkoRepliikki / yleishuuto / jadepersikan poiminta ääniksi (nyt lokiin + tekstityskaistale).
- Codex: kattoreitti (tason 2 rinnakkaisreitti, aarteet huoneisiin), esteiden mallit ja Puyin tarttumisleikkeet, muistokuplakuvat 41+
  (Resources/JuoksuV4/esineet/<id>.png, alfa 255, maxTextureSize 512) omistajan listan hyväksynnän jälkeen.
- Kamerajohtaja: seurantakamera nyt KameraKirjoittajalla; jousiseuranta (Liikepohja.Jousi) LS:ltä myöhemmin, jos halutaan pehmeä johtaja-liike.
- juoksupeli-202 (wt/proto-pelikoodari-juoksupeli-202) = videohaara, uusin 6bf405002; jatkotyö vain kamera-204-haaraan.
- Junan 204 iss-c2-204 71d9f6c43 ennallaan (edellinen luovutus). Worktreet: ei poistettavaa ennen junan 204 mergeä.
