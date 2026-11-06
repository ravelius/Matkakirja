# Julkaisija: luovutus 6.11.2026 klo 16.11

Rooli: Julkaisija (JU). Korvaa -1519:n ALOITA-osan ja TILAN. Voimassa: -1519:n VIRHEET JA OPIT (haara julkaisija-luovutus-1519), -1335:n ja -1244:n opit, -1136:n PT:N SITOVAT ja opit, -1008:n opit ja b8-VAIHTO, -0855:n, -0651:n, -0041:n ja -2347:n opit, -2152:n ja -1906:n TAPA, -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 26 %, pehmeä raja, luonteva tauko.

## ALOITA TÄSTÄ
1. Tarkista `ps`, lukot, jonolokin loppu. Levy 53 Gi.
2. AJOSSA: L2 PK sk-w 8dfc13aaf x2 (ipad, iphone-vaaka), PK ajaa itse (esikatselu 16.09). Kun PK ilmoittaa LUKKO VAPAA, kirjaa jonolokiin kesto, kuvat ja kansio. L1 ja iPad vapaat, jono muuten tyhjä.
3. ODOTTAA NS:N PÄÄTÖSTÄ (local_c7344e20-fba8-433d-ba8e-184a325037ef): iPad 4:n uusinta, osa 1 vai koko. Ks. VIRHEET. Skripti T/ns-tarina-ipad4-ajo.zsh on korjattu kuittausodotuksella, ei vielä ajettu. Ennen uusintaa: jos NS haluaa vain osan 1, poista osa 2; siirrä vanha kansio lokit/natiiviseppa-tarina-ipad4-2bfb126b0 NS:n sanalla tai vaihda kansion nimi; käännös on valmis, joten aja suoraan `IPAD_ODOTA=3600 zsh /Users/Shared/Claude/wt/julkaisija-pariisi-219/tyokalut/ipad-lukko.sh kaari julkaisija -- zsh T/ns-tarina-ipad4-ajo.zsh`. Jonolokiin rivi; lopuksi runko d092f48cc palaa trapilla. Monitori: T/ns-tarina-ipad4.log.
4. iPad 3b: EI AJETA ilman PT:n sanaa (NS).
5. valoseppa-vahti pid 90769 saa pyöriä taukolipulla. Monitorit eivät selviä nollauksesta.

## TILA
- Junarunko julkaisija/runko-219-muisti = d092f48cc (natiivi-backup tarkistettu 15.49); iPadilla d092f48cc 16.07 alkaen, sovellus suljettu. Laitteella talopalat/indeksi.txt on nyt TYHJÄ (1 tavu), palat ennallaan: rungon koodi ei viittaa kansioon (grep), mutta NS:n v9-kokeet tarvitsevat alkuperäisen indeksin takaisin.
- Seuraava rungon laiteajo todentaa: ditherin, ND-nimen, museokyltit käynnillä museossa (PT).
- L1 = b7 ja UI-ajot; UI-ajot käyttävät ProjectVersionin mukaan b8:aa kopiossa Matkakirja-proto-kaannos. L2 = b8. LAV 35140432d on b7, joten L1.
- UTIL: T/ks-yhteinen-ajo.zsh <nro> <sha> <kuvamäärä> ajaa KS:n yhteisen L2:lla kertoimella 0.465 ja kirjaa jonolokiin; tulos T/ks-yhteinen<nro>.tulos. Varmista kerroin rivistä `^[0-9:]+ +pistekerroin`.
- NUI: T/nui-88e2d.zsh on hyvä pohja UI-sarjoille (rinnakkaisten määrä alussa ja kesken).

## TULOKSET (viety tekijöille)
- KS 18 AJETTU 24 kuvaa; 19 AJETTU 6 (peite-rivit ja Pompidou myös VS:lle); 20 AJETTU 2 (myös VS); 21 AJETTU 1; 22 AJETTU 2.
- PK sk-v 76840f429 318 s, 4 kuvaa (PK ajoi).
- LAV jaanne1 181 s 5 kuvaa, levyt3 167 s 3 kuvaa, levyt3b 114 s 3 kuvaa; kaikissa 404 = 4.
- NUI fd07faea6 kaatokoe VIKA 2 odotetusti; 61cbc0856 pysty x3 LÄPI, 7 varauksesta 4 LÄPI, 3 iPhone-varausta VIKA.
- NUI 88e2d1eb5: pysty x3 LÄPI, linna iphone LÄPI, pallo iphone VIKA 3 (tappi/nopeusvipu, metrolinja). Aikarajoja 0.
- NS iPad 4 2bfb126b0: ks. VIRHEET. 3b:n muistivahti-vika noudettu kansioon lokit/natiiviseppa-palikka-ipad3b-190448df6/muistivahti-vika/ (6 tiedostoa).

## VIRHEET JA OPIT
- iPad 4, TÄRKEIN: komento.txt-kopiot tulivat alle sekunnin välein ja korvasivat lukemattoman edellisen: 10/45 hävisi (jälki 0/4, veto 0/2, vaihe pois ennen ajoja 1 ja 3, osan 1 vaihe ja rata pois). Mittauksen ydin jäi pois, ja se näkyi vasta lopussa. Testasin keskeytysehdot, en sitä, että komennot menevät perille. Laitteella sovellus kuittaa rivillä "MATKAKIRJA komento: <komento>"; jokainen komentosarja odottaa kuittausta. Yhteenvetorivin 0/4 olisi pitänyt olla keskeytysehto alussa.
- KS 19: palautin pyynnön ennen kuin näin saman vuoron grepin tuloksen; peruste oli skenaariossa. Riippuvat komennot eivät samaan rinnakkaiseen lähetykseen viestin kanssa: ensin tulos, sitten viesti.
- NUI 88e2d: zsh `$SHA:tyokalut` = :t-muunnin, sarja kaatui heti (ei ajoa). Kaksoispiste muuttujan perässä aina `${SHA}:`. Näkyi siitä, että odotus valmistui heti: tarkista odotuksen jälkeen myös, kauanko meni.
- grep `kuva`-rivi: pistekerroin-haku ilman ankkuria osui skenaarion polkuriviin.
- `tail -f`-monitori vanhenee 30 minuutissa: viritä uudelleen pitkissä ajoissa heti aluksi.
- Aloitusviesti tuli 45 min työn aloituksen jälkeen; luin Raamatun luvuista 9, 10 ja 12 vain Julkaisijaa ja nollausta koskevat rivit (65 kt).
