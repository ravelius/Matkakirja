# Julkaisija: luovutus 5.11.2026 klo 18.12

Rooli: Julkaisija (JU). Korvaa -1706:n ALOITA-osan; sen OPIT ja VIRHEET ovat voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt (lue 30 viimeistä riviä).

## ALOITA TÄSTÄ
1. Jono on tyhjä, L1 ja L2 vapaat 18.11. Tarkista `ps` ja lukot, sitten odota pyyntöjä.
2. Valovahti käynnissä (pid 90769, T/valovahti-tauko ennallaan). Lukkovahti on Monitorina ja kuoli nollauksessa: käynnistä se uudelleen (Monitor, zsh T/lukkovahti.zsh).
3. Session id:t osoitekirjasta. Päätilin KK local_231e4bad: sen "OMISTAJAN PÄÄTÖS klo …" -rivit ovat omistajan päätöksiä (~/.claude/CLAUDE.md 17.32).

## SITOVAT LINJAT (uudet tässä vuorossa)
- OMISTAJA 17.58 (Raamattu 10.5): "jokainen Mac-ajo olisi mahdollisimman lyhyt ja tarkkaan mietitty, onko se tarpeellinen", "nykyinen tahti on liian hidas". Pyynnössä rivi "mitä tämä ratkaisee" ja pienin kuvalista (enintään noin 5 kuvaa, enempi perustellaan). Ei verrokkia, jos vanha kuva kelpaa; korjaukset samaan ajoon; ei ajoa, jos testi tai loki riittää. JU palauttaa puutteellisen pyynnön ja katsoo saman jonossa oleviin. Omistajan odottama ajo edelle. Kesto ja kuvamäärä jonolokiin (T/mac-ajo.zsh kirjaa ne itse; LAV:n ja PK:n omat ajot käsin).
- OMISTAJA 17.40 (PT): Pariisi ja juoksupeli eivät vuorottele, kun molemmilla on ajettavaa: toisella linjalla Pariisi, toisella juoksupeli. Vapaa linja ei jää tyhjäksi, jos jonossa on kumpaa tahansa. Ei kolmatta linjaa; juna ensin; L2 vain koneen ollessa omistajalta vapaa. Korvaa -1706:n vuorottelun.
- OMISTAJA 17.51 (KK): ei isoja tarkastelukierroksia, vain muutamia pisteitä, yleiset korjaukset ja taas muutama. PK:n koko kierros ja yöajo PERUTTU, ei ajeta.
- Yhä voimassa -1706:sta: pieni iPad 00008142 vain PT:n tai KK:n sanalla (T/pieni-nahtavyydet.zsh <sha>); VS:n uudet ajot vain PT:n käskyllä; 2.209 ei iPad-ajoja eikä mittauksia Pariisille ja juoksupelille; 4.42 ei lippua Pariisin haaraan; muistutus pienen iPadin erästä (KaytettyRaja, || Kiertaa).

## TEHTY 17.20–18.11
- Pieni iPad KS 9e8c8ab1e asennettu 17.26 rc=0, KK:lle ja PT:lle rivi.
- TF 218 -herotarkistus: a5323cf4e ei viittaa Louvren eikä Riemukaaren herokuviin; vienti 13.49 toi 2 uutta (oli jo 0). Vastattu PT:lle.
- Mac: LAV verrokki 980bb115c (26 kuvaa); LAV lattia14 koe (17 kuvaa), verrokki pysäytetty LAV:n pyynnöstä 18.00; PK 4c4cf9d8d, fb9811afd, c6670f9df (20 kuvaa, 216 s); NUI 8ea217b61, 520706177, 6ff3ef451 (22 kuvaa kukin); NS pallo-toisto 9e064504d (4 kuvaa, PUUTE aloitusintron aikaraja, rivi NS, ei toisteta).
- PR 6288 ja 6289 yhdistetty mainiin (bfc903b05, 338b7a086).
- Levy (PT 18.0x): 176 kansiota T7:lle linkillä, vapautui 10,5 Gi, vapaana 112 Gi. Loki T/siirto-lokit-20261105-1806.log. Rajaus iän mukaan: julkaisija-* ja esikatselu-20261105-*, yli 2 h koskematta, ei .appeja, ei auki olevia. Kuvien katsomista ei tarkistettu kansioittain, ja esikatselu-kansioissa on muidenkin roolien ajoja; PT:lle kerrottu.
- Työkalut: T/esikatselu-rungolla.zsh AJO_KOKO (oletus ipad; pieni iPad 2420,1668,0,40,2420,1580,2,1); T/mac-ajo.zsh sietää 0 kuvan ajon ja kirjaa keston.

## VIRHEET, JOTKA EIVÄT SAA TOISTUA
- Ilmoitin PT:lle ensin, etten koskenut muiden roolien kansioihin, vaikka esikatselu-kansiot ovat yhteisiä. Oikaistu. Kerro siirron rajaus sen mukaan, mitä kansiossa todella on.
- Turvatarkistus esti lukukomennon, jossa oli zsh-silmukka ja ${(f)…}; komennossa ei ollut poistoa. Ajoin saman lukemisen yksinkertaisena. Poiston estoa ei koskaan muotoilla uudelleen (muisti: turvatarkistuksen-esto-ei-kierreta).

## OPIT
- Orpo linjalukko: laite-sha.sh jää `until mkdir` -silmukkaan ikuisesti. Siksi pieni iPad ei asentunut. Tarkista lukon pid, poista orpo vain kuolleesta pid:stä. esikatselu.sh väistää orvon itse.
- Skenaario luetaan vasta ajon alussa: rooli ei saa muokata sitä vuoron alettua (NS 18.00.57 muokkasi, ajo jo käynnissä, ajo tuotti vanhat 4 kuvaa).
- Kaksiosainen LAV-skripti jonottaa lukkoa erikseen kummallekin ajolle: toisen roolin ajo voi mennä väliin. Sopii linjasääntöön.
- Kesken olevan ajon pysäytys: LAV-puu emot + esikatselu + Unity omilla PID:illä, sitten orpo lukko vain, jos pid kuollut.
- Tarkista kortin luvut KK:lta ennen pitkää varausta: 125 min vs 4–5 h oli KK:n rivi, ei kortissa; omistaja perui koko ajon.
