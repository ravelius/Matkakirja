# Siirtosepän aloitusviesti (tilinvaihto 12.10.2026 ~19.3x)

Olet **Siirtoseppä (Opus, high)**: Olavinlinnan historiamoottori ja pelattava pala (natiivi proto, linnahaara, automaattibotti).
Lue ensin CLAUDE.md, Raamatun Ydinajatus kohta 2 ja **docs/raportit/viesti-siirtoseppa-luovutus-20261012-aamu.md** (alusta loppuun:
päivitykset 11.15 → 19.1x ovat aikajärjestyksessä, viimeinen on voimassa). Viestit PT:lle vain valmis erä / jumi / kysymys, ≤ 8 riviä, suomeksi.

## Tila 19.3x

- **Linnahaara** /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara `siirtoseppa/laituri-varoitus`, kärki **986f1b23e** (proto-git paikallinen,
  ei pushia; vahti kääntää jokaisen commitin). Pakettihaarat /Users/Shared/Claude/wt/proto-siirtoseppa-v47g: uusin `siirtoseppa/v48r` 78f2f37d3 (vahdissa).
- **Linna on junassa 184** (183 lähti ilman). Tunnus NS:lle vasta LT:n uusinta 5:n jälkeen.
- **Botti 986f1b23e + v48r** odottaa vahdin käännöstä: irrallinen odottaja lokit/siirtoseppa-botti-nakyma/odota-ja-aja.sh → yhteenveto.txt
  (A ja B peräkkäin yhdellä simulla, Julkaisijan SIMU NYT 1). Edellinen 15/17 (167be0bfc), molemmat viat korjattu 986f1b23e:ssä.

## Jatkojono

1. **Botin tulos** → rivi "BOTTI x/17" Julkaisijalle (SIMU VAPAA) ja PT:lle. Askel 0 -arkki: `python3 /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/askel0-arkki.py
   <A-kansio> <B-kansio> <out.jpg>` → **katso itse** (kohde ruudulla, ei seinää/hahmoa/pöytää naaman edessä) → polku PT:lle. PT kuittaa LT 5:n.
2. **LT:n uusinta 5** (PT:n kuittauksen jälkeen): Julkaisija antaa hiljaisen ikkunan (kuorma < 100); menetelmä askel 0 -kuva + napautuskävely
   reittiä seuraavaan oveen. Appi = viimeisin vahdin käännös linnahaarasta.
3. **Omistajan MH-kuvat** odottavat LR:n **v48s**:ää (kypärä, voudin hihat, kappalaisen asento). Kun LR lähettää tunnukset: `zsh .../kiinnita-paketti.sh v48s v48r
   <pala> - <nyky> - "<kuvaus>"` (worktree proto-siirtoseppa-v47g, uusi haara v48r:n päälle) → tarkistus puhtaalla kopiolla → commit → Julkaisija vaihtaa vahtiin.
   Sitten skenaario **mh-koko** molemmilla apeilla: v48o = lokit/olavinlinna-mh-v48o-1012-1848 (säilytetty), v48s = vahdin käännös. Mallina
   lokit/siirtoseppa-mh-omistaja/aja3.sh (SKEN=mh-koko, 65 s väli). Parit: `python3 .../mh-parit.py <v48o-kansio> <v48s-kansio> <out>` (raakakuvat).
   **Itsetarkista jokainen pari** ennen PT:tä (hahmo kuvassa, ei seinää, ei kaksinkertaista merkintää). Koko sarja PT:lle.
4. Äänittäjältä tulossa `lyhty-lahestyy` (lyhdyn varoitusääni); koodi käyttää sitä automaattisesti, kun se on paketissa.

## Tärkeät säännöt (opittu tänään)

- Tarkistus **puhtaalla `git archive` -kopiolla + `git init -q`** (Linssit-testit/kaanna.sh tarvitsee git-juuren). Poista vanhat kopiot (levy).
- Vahti siivoaa vanhat käännökset → pyydä Julkaisijaa säilyttämään tarvittavat. Älä committaa linnahaaraan, jos Julkaisija pyytää odottamaan.
- Simuja vain Julkaisijan SIMU NYT -luvalla; swapin ollessa korkea 1 simu.
- Omistajan kuvat täydellä tarkkuudella, ei pienennettyjä arkkeja; merkintä isona alareunaan.
- Testikomennot: `poikki kavely seis 1|0|<t>`, `poikki kavely katso <hahmo>[@x,y,z] | v:<henkilö> <d> [taka]`.
