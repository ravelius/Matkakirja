# Karttaseppä: luovutus 5.11.2026 klo 16.23 (KS)
Syy: konteksti yli 25 % (7.37). **Lue tämä, sitten -1614 (kohdat Odotetaan, Omistajan päätökset, Auki, Opit) ja -1548.** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 55971161b.

## ENSIN
1. Remote päälle (Raamattu 7.37). Vahti Monitorilla (30 min, uusi päättyessä): `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` (argumentti ei ohita tilatiedostoa; käsitelty 1dc5fbb38 asti).
2. Odotetaan:
   - **Mac JU:lta:** 55971161b, tai 59fde3622 jos se ehti alkaa; sk-pariisi-kyltit.txt, tulos `lokit/julkaisija-pariisi-kyltit-<sha>`. Katso täysikokoisina, sitten KK:lle, kopio PT:lle ja NUI:lle.
   - **Tripo Eiffel 24c:** syöteportti läpäisty 1dc5fbb38 (sama pohjoinen.png Frontiin ja Backiin kelpasi; ei tarvita riviä KK:lle), generointi alkamassa. Toimitus `eiffel-3d-v1/`. Katso täysikoossa, peliin, kuva KK:lle.
   - **Codex seitsemän kohdetta:** aloitti c10375ce0, toimitus `_review-sarja-24/<id>/`. Omistajan arkki ennen Tripoa.

## Mitä uudesta ajosta katsotaan
- **Tuileries (59fde3622):** kyltti leikkeen vasemmalla puutarhan puolella, ei pihan päällä.
- **NUI:n ed6c66eaf:** kyltti häipyy mallin kohdalta MalliRuudut-rajauslaatikolla. Laatikko on kierretylle Louvrelle jalanjälkeä isompi, joten se voi piilottaa Tuileries'n ja Les Hallesin kyltit myös vierestä. Jos piilottaa: kerro NUI:lle, parempi on Louvren oma suuntainen laatikko (katso `Kylttikohde.Osuu`). Tuileries'n ★-kyltti puuttui keskitasolta jo b09c05441:ssä; syy todennäköisesti törmäys Louvre-kylttiin, varmistamatta.
- **Pyramidimerkki (55971161b):** pieni hiekanvärinen pyramidi poissa ison pyramidin vierestä. Testi: `ui kaupunkipallot napauta louvre-malli` avaa Ranskan salit (loki "taidemuseo, maa"). KOODI ON KÄÄNTÄMÄTTÄ PELISSÄ, vain tarkistus 0 virhettä. sk-tiedoston paikkaa en löytänyt (ei proto-3d:ssä, T7 ei löytynyt), JU:lle lähetetty lisäysrivi. Sormen napautus ei ole testattu: kokeile, ettei se avaudu kylttiä tai karttaa napautettaessa ja että kartan veto ei avaa museota.
- Ranskan tasolla pyramidimerkki jää, kun kamera on Pariisin ulkopuolella eikä malli ole ladattu (`LouvreMallinaPariisissa`).

## Ajon b09c05441 tulos (KK:lla ja NUI:lla, 16/16 katsottu)
Kunnossa: keskitasolla vain ★-kyltit, lähikuvat kuva + kyltti, Peilisalin torni poissa, Tuileries pois pyramidin päältä, keskipaviljonki näkyy lännestä, Les Hallesin napautus avaa ruudun. Vrain-Lucasin kuvat ennen/jälkeen identtiset (kohde ei ruudulla, skriptin vika). Lokin POIKKEUS 16.07.52 on Unityn editorin QuickSearch, ei peli.
NUI:lla: pyöreät kuvat ilman kylttiä, Louvre-kyltin haalistuminen usvarajalla (MalliKyltit.cs ~87, ei pohjan vika; rajaus näyttää tekstin "Louvre"). NUI:n seuraaja voi tehdä samaan haaraan: yhdistä sen kärki ennen uutta ajoa.

## Auki
- Louvre-kyltti on ylhäältä Seinen päällä (kyltit-louvre-ylhaalta), kaukana mallista. Ei vielä kerrottu KK:lle erikseen.
- Leikkeet paketissa, eivät ämpärissä; louvre-normaali 1,4 Mt; Eiffelin korkeus 792 m: kuten -1614.
- KK:lle viestit: 16.2x tulos, oikaisu pyramidimerkistä oli jonossa. Pyramidityö ei ollut KK:n pyytämä vaan 2.215:n mukainen, kerro KK:lle tulos uudesta ajosta.

## Opit
- Lue Raamatun oma kohta ennen kuin kysyt omistajalta: pyramidimerkki oli jo ratkaistu 2.215:ssä.
- NUI:n luovutus ei maininnut sen viimeistä committia: tarkista peilin kärki (`git ls-remote natiivi-backup`) ennen ajopyyntöä.
