# Julkaisija: luovutus 5.11.2026 klo 21.52

Rooli: Julkaisija (JU). Korvaa -2032:n ALOITA-osan. Voimassa: -1906:n TAPA ja -1812:n SITOVAT LINJAT, VIRHEET ja OPIT (haarat julkaisija-luovutus-1906, julkaisija-luovutus-20261105-1812) sekä -2032:n VIRHEET JA OPIT (haara julkaisija-luovutus-2032). T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

## ALOITA TÄSTÄ
1. Jono on tyhjä, L1 ja L2 vapaat 21.52. Ei taustaajoja kesken. PT:lle lähetetty "JONO TYHJÄ".
2. Tarkista `ps` ja lukot, käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, käynnistä uudelleen päättyessä). Valovahti pid 90769 oli käynnissä 20.33.
3. Tulossa pyyntöjä: NS, KS, NUI, PK, LAV ja VS pyytävät tiheästi. PK ja NS nollautuvat välillä, ja uusi sessio voi lähettää vanhan pyynnön uudelleen. Vertaa sha ja skenaario ajettuihin (jonoloki), ennen kuin annat vuoron; sama ajo ilman uutta syytä palautetaan (PK 354452847 21.19).

## JUNA 219
- Junarunko julkaisija/runko-219-muisti = 7bbf04e09 (94f7eb0e4 + NUI 627a664c4; PR 6307 yhdistetty 8c2dde0b4). Ristiriidaton, tyylikirja --tarkista ok mainin lähteellä, natiivi-backupissa, ei käännetty.
- Ei käännöstä, ei TF:ää ennen kuin Pariisi on valmis (omistaja 19.26).
- Burst: PT kuittasi 20.34, arvo saa jäädä 0:ksi, asia suljettu.
- Eheysvartija 20.18 v996: 0 puuttuu, rivi PT:llä.

## TAPA TÄSSÄ VUOROSSA
- Rooli ajaa itse: anna "ESIKATSELU NYT L<n>" + PROTO_LINJA, sha, skenaario, kerroin. Rooli ilmoittaa LUKKO VAPAA, keston ja kuvamäärän; kirjaa jonolokiin. Jos kuvamäärä puuttuu, laske kansiosta.
- JU ajaa (NS, NUI, LAV pyytävät): `ESIKATSELU_PISTEKERROIN=0.465 zsh T/mac-ajo.zsh <linja> <sha> <skenaario> <kansio>`. Kahden ajon malli T/ns-aloitus-kartta45-08a0ec8ea.zsh.
- LAV: sen aja*.zsh on kiinteästi PROTO_LINJA=1 ja koejuurella. Linjalle 2 tee kopio T/lav-aja<nn>-l2.zsh (malli lav-aja24e-l2.zsh); L1:llä aja alkuperäinen ja kirjaa kesto käsin.
- Kuvaraja (omistaja 17.58): laske `grep -c '^kuva '` skenaariosta ENNEN käynnistystä ja vaadi yli 5 kuvasta perustelu. Rooli voi muuttaa skenaariota pyynnön jälkeen, joten pyynnön luku ei riitä.

## AJETTU 20.33–21.52 (jonolokissa kesto ja kuvat)
LAV 23, 24b, 24d, 24e, 25; NUI b7e7a1de0, 6b6d53a49, 7551a76cc, 8814fbffa, 49cdc5cc3, e4b376546; NS 08a0ec8ea (aloituslento, sama -2, kartta45), df7cc3e0c; KS 994f4001e, 7875c668d (horisontti, pystysauma, savu); PK cc5e1e9bc (3), 354452847 (2), 7293ed891; VS 41cfbb636, cffdccab9. NUI 581c8e7b8 peruttu ennen alkua.

## VIRHEET JA OPIT
- NUI 7551a76cc: 15 kuvaa huomattu vasta, kun ajo oli käynnistetty samassa vastauksessa kuin laskenta. Annoin valmistua (omistaja 21.07), NUI:lle muistutus. Laske kuvat ennen käynnistystä, ei samassa vuorossa.
- KS 994f4001e: annoin ehdollisen vuoron (karsi tai perustele); KS aloitti ennen kuin viesti ehti perille ja perusteli jälkikäteen. Hyväksytty: 10 kuvaa, kaksi asiaa yhdellä ajolla. Viestit roolille voivat jäädä jonoon, joten ehto ei aina ehdi ennen ajoa.
- Aikarajan PUUTE-rivit kerrotaan tekijälle aina valmisrivissä (NS aloituslento 4, NS Ateena 2, LAV 24b 1). NS:n uusinta korjasi neljä puutetta skenaariossa (odota 60).
- zsh: `$N:t...` tulkitaan muuntimeksi; kirjoita `"${N}:polku"`. Tyylikirjatarkistus omalla vanhalla HEADilla antaa väärän eron; aja mainin tools/tyylikirja.mjs + tyylikirja/ erillisestä `git archive` -kansiosta.
- Junapoiminta ilman työpuuta: `git merge-tree --write-tree --merge-base=<sha>^ <runko> <sha>`, sitten commit-tree ja update-ref vanhan arvon kanssa. Täysi old-sha, lyhyt ei kelpaa update-refille.
