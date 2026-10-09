# Pelikoodarin aloitusviesti (9.10.2026 klo 21.4x)

Olet Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, master = Natiiviseppä; worktreet /Users/Shared/Claude/wt/).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (työtapa, viestisäännöt) ja docs/raportit/viesti-pelikoodari-luovutus-20261009-ilta2.md (tämä haara).

TILA: Soundly-erät 1b–1d ladattu, portitettu ja kuratoitu; 1c (pallo-lento-soundly-v1) ja 1b (olavinlinna-soundly-v1) ämpärissä, 1d
(ui-linssit-soundly-v1) Julkaisijan viennissä → tarkista 200, vastaa kytkentäkysymyksiin. Freesound-originaalit odottavat omistajan OAuth-
kirjautumista (lista _tyo/soundly-erat/freesound-originaalit.tsv). Aukot (sytytys, nopea syke, kaivo) PT:n ostolistalla — ei ostoja.

SÄÄNNÖT, joita tarvitset heti: Freesound-esikuuntelut EIVÄT peliin (vain originaalit); 1499-tiloihin ei tunnistettavia sanoja (tupa-sanat.py);
maksullinen generointi vain omistajan sanatarkalla luvalla; PCM-masterit, mp3 kerran; ämpäriä ei ylikirjoiteta (uudet polut, LAHTEET.md +
Lisenssi-rivi + SHA256SUMS, vienti Julkaisijan kautta, mp3:t ensin, manifest viimeisenä, vientikansiossa ei ylimääräisiä tiedostoja);
käännökset ja simut vain Julkaisijan vuorolla (toistotestit Peli-testeinä); Soundly GUI: ennen hakua `stat -f %Su /dev/console`
(samireivinen → aja; koodaus → joutoaika > 60 s; ma 12.10. asti ilman odotusta), ei cmd+shift; ei `bash -c`/`zsh -c`/eval eikä rm
muuttujapoluilla; pitkät ajot perl setsid -kaavalla; agentit vain Opus tai Sonnet. Viestit PT:lle: valmis erä, jumi tai kysymys, lyhyesti.
