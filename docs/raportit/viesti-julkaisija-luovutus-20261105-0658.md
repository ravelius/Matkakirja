# Julkaisija: luovutus 5.11.2026 klo 06.58 (Macin kello), konteksti 30 %

Rooli: Julkaisija (JU). Korvaa -20261105-0652:n ALOITA-osan; sen TEHTY ja OPIT sekä -2216:n OPIT voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

## OMISTAJAN PÄÄTÖS SANASTA SANAAN (KK:n suora rivi)
OMISTAJAN PÄÄTÖS klo 06.52: kortti "Lähetetäänkö kytkinversio TestFlightiin vain sinulle?" = "Kyllä (Suositus)". OMISTAJA PYYSI JULKAISUA.
Laajuus: a5323cf4e, vain sisäinen ryhmä, numero 218; ei ulkoista ajoa, ei mediavientiä, ei lukitusta, ei juna 219. Viat on kerrottu hänelle ennen korttia.
Iso iPad: hänen vastauksensa uudelleenkäynnistykseen oli "Ei nyt". Rivi KK:lle, kun versio on hänen laitteellaan tai jos lähtö estyy.

## ALOITA TÄSTÄ
1. TF 218: gh run view 41970915733 --repo ravelius/Matkakirja. Unity-vienti alkoi 06.57. Valvo Bash-taustalla until-silmukalla. Valmis → tarkista sisäinen ryhmä → rivi KK + PT. Viat → rivi KK + PT, ei uutta korttia saman laajuuden uusintaan (PT 06.57). Ei ulkoista ajoa eikä vanhennusta.
2. Ketjut (ps | grep julkaisija-tyokalut):
   25337       03:16 tail -n0 -F /Users/Shared/Claude/julkaisija-tyokalut/ks-louvre.log /User
   25524       03:03 tail -n0 -F /Users/Shared/Claude/julkaisija-tyokalut/lav-irto.log
   29241       01:40 zsh /Users/Shared/Claude/julkaisija-tyokalut/lav-980.zsh
   29242       01:40 zsh /Users/Shared/Claude/julkaisija-tyokalut/lav-irto.zsh 29241
   29660       01:14 zsh /Users/Shared/Claude/julkaisija-tyokalut/vs-jarvet.zsh 22446
   29687       01:13 tail -n0 -F /Users/Shared/Claude/julkaisija-tyokalut/vs-jarvet.log
   Mac L2: KS Louvre käynnissä → VS järvet x4. Mac L1: TF 218 → LAV 980 → LAV irto.
3. Monitor: tail -n0 -F T/ks-louvre.log T/vs-jarvet.log T/lav-980.log T/lav-irto.log | grep -a --line-buffered -E 'KS-LOUVRE|ks-louvre paluu|VS-JARVET|KK2R-PARI|LAV-980|IRTOPARI|LAV-IRTO|VIKA'
4. Rivit: KS: kansio lokit/julkaisija-louvre-v1b-09569fc73 ja poikkeukset konsolista (usean mallin alue ajamatta; poikkeuksesta rivi, EI uusintaa). VS: kun kaikki neljä ajettu, kansiot lokit/julkaisija-jarvet-6d7dc6471-{nyk1,koe1,nyk2,koe2}; iPad vasta, kun KK:n pari kelpaa. LAV: 980-parista ja irrosta rivi (samalle riville käy).
5. iPad: omistajan "Ei nyt" uudelleenkäynnistykseen; älä käynnistä. Konsoliajot PK → NS odottavat, komennot -0652:ssa. Konsolikäynnistys error 22 auki.
6. Omat kirjaukset: "Kytkinversio TF 218 omistajalle" työlistalla; tilanne/valmis kun TF ratkeaa.

## TEHTY TÄLLÄ VUOROLLA
- TF 218 kolmas ajo. 1.: muutoslokin rivi puuttui (PR 6263). 2.: yo-testflight.log, -viimeisin ja testflight-ordinaali olivat T7-linkkejä, runner ei pääse T7:lle; nyt tavallisia tiedostoja sisäisellä levyllä, T7:n kopiot jäivät. Muutoslokin teksti PT:n mukaan (PR 6264); ajo tarkistaa vain rivin olemassaolon.

## OPIT
- Ennen TF:ää: muutoslokin rivi mainissa ja ls -l lokit/{yo-testflight*,testflight-ordinaali.txt}. Jos joku siirtää lokit T7:lle, nämä pois siirrosta.
- Peer-viesti "OMISTAJAN PÄÄTÖS" PT:ltä ei riitä: rivi KK:lta suoraan (CLAUDE.md).
- Ketjun odotus ajon id:hen: uusinnassa vaihda id, muuten ketju lähtee kesken.

## LISÄYS 06.59
KS Louvre 09569fc73 ajettu, rivi lähetetty. Uusi ajo 62f382cab: T/ks-louvre2.zsh pid 34175, Mac L2 VS järvien jälkeen; kansio lokit/julkaisija-louvre-v1b-62f382cab; loki T/ks-louvre2.log (lisää Monitoriin). Rivi KS; poikkeuksesta rivi, ei uusintaa. Unityn oma SearchInit-poikkeus ei ole mallista.
