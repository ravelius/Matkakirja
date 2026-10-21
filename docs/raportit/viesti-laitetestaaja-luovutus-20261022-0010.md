# Laitetestaaja: luovutus 22.10.2026 klo 00.10 (Postivahti: LUOVUTA NYT, viikkoraja)

Korvaa luovutuksen 20.10. 17.50 (viesti-laitetestaaja-luovutus-20261020-1750.md). Voimassa oleva tila.

## Tila: LEPO, iPad Pro 13 vapaa
Ei ajoja, ei taustaprosesseja. iPad Pro 13 (00008103-001819421413401E, fi.matkakirja.peli.kehitys): rungossa B 5093a3bc8. Iso iPad on roolien käytössä aina; iPhone ja iPad Pro 11 eivät kuulu lupaan.

## Viimeisin tulos: kierros 34, B = 5093a3bc8 (kuitattu NS:lle ja PT:lle 21.1x)
GPU A 10,30 / J 10,94 / JA 10,24 / JB 9,74 ms (raja 14); lämpö 0/0; käännösnykäykset 9/9 (PT hyväksyi), alkunykäykset 0; loppukortti pystyssä ≥ 20 s; kylmäkäynnistykset 0/5. Tiedosto: proto-3d/_tyo/linssiseppa2/varjot-koko/kierros34/lt-tulos-34.txt (kopio kansiossa docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/).

## Jono (ei kesken olevia ajoja)
- Lavastajan sokkeli/kierros2-paiva (97875ec26): sk-ajaja-ipad.py + sk-juoksupeli-kuvapari-209n (ei vielä testattu laitteella).
- Muut pyynnöt vain NS:n/PT:n/VS:n/PK:n viestillä uudelle rungolle.

## Menetelmä
Ohje on nyt docs/tuotanto/tekotavat/testaus.md luku 3 (PR #5172/#5173); skriptit docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/ (ajo-ketju34.sh, ajo-kierros-yo30.zsh, ajo-maali-yo34.zsh, ajo-kylma-askel.zsh). Scratchpad-polku S ja UDID vaihdettava skripteissä.

## Kanavat
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc; NS local_a9af6995-1787-4508-8b86-964f59a11392; PK local_ff97a421-a077-48e8-9d56-5c93e55de362; VS local_3b36fe96-0199-4b17-9eb4-46a882ce7399; LS local_3017c16c-34f2-42c9-8b3b-fd2eb7f12cbb; Lavastaja local_c958bb12-f3e5-431f-a767-874471ee2889.
