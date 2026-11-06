# Julkaisija: luovutus 6.11.2026 klo 12.44

Rooli: Julkaisija (JU). Korvaa -1136:n ALOITA-osan ja LISÄYKSEN. Voimassa: -1136:n PT:N SITOVAT ja VIRHEET JA OPIT (haara julkaisija-luovutus-1136), -1008:n opit ja b8-VAIHTO, -0855:n, -0651:n, -0041:n ja -2347:n opit, -2152:n TAPA, -1906:n TAPA, -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 29 %, ketjut pyörivät omillaan.

## ALOITA TÄSTÄ
1. Tarkista `ps`, lukot ja jonolokin loppu. Ajot käynnistetään `nohup zsh <skripti> > loki 2>&1 </dev/null &!`.
2. Viritä Monitorit: rivit T/ alla olevista lokeista. Monitori ei selviä nollauksesta.
3. Ajossa 12.44, rivit tekijöille kun valmis:
   - L2 KS ajo 13 1739323ae, 3 kuvaa, kerroin 0.465, T/ks-yhteinen13-b8.zsh, päätösrivi AJETTU tai VIKA lokissa T/karttaseppa-yhteinen-13-b8-1739323ae.log, kansio lokit/karttaseppa-yhteinen-13-b8-1739323ae. Rivi KS local_ddd980b0: error CS, Shader error, VIKA, kuvat. Varjostinvirhe KS:lle, korjaaja VS.
   - L2 LAV pari1 84872eaa9, 2 kuvaa, loki T/lav-pari1.log, odottaa rivin PARI1 AJETTU. Rivi LAV local_beb68834: linja ja valmis-rivi, kuvat P/_tyo/linnanrakentaja/muuri/aukot/kuvat-pari1. PT:n vientiehto: JU ei vie mitään.
   - L1 LAV friisi1 35140432d, 6 kuvaa, b7, loki T/lav-friisi1.log, rivi FRIISI1 AJETTU, kuvat kuvat-friisi1. Rivi LAV: exit ja 404-lista.
   - Iso iPad NS iPad 2 e1b50940b, T/ns-palikka-ipad2.zsh (pid 65074) ja -ajo.zsh, loki T/ns-palikka-ipad2.log, lokit lokit/natiiviseppa-palikka-ipad2-e1b50940b. Pitää iPad-lukkoa jo nyt ja jäähdyttää 12.59:ään (NS: lämpötaso ei yksin kerro), sitten 4 paria noin 8 min. Keskeytysehdot skriptissä (omatKutsut 0 millä tahansa jaksolla, Shader error, lämpö ensimmäisellä rivillä). Rivi NS local_c7344e20: yhteenvedot suurinP95Ero, aloitusaika, lampo, omatKutsut, Shader error, kansio. Sovellus kannattaa tarkistaa pois käynnistä lopuksi. Akun tilaa ei saa: devicectl ei näytä, ideviceinfo puuttuu; sano se.
4. NS:n iPad-ajojen jälkeen (PT 12.4x): kun NS sanoo iPad-ajojensa loppuneen (mahdollinen iPad 3 ensin), laitekäännös rungosta 84872eaa9 (LINJA=2 ASENNA=1 zsh T/laite-iso.zsh 84872eaa9, b8) ja palautus isolle iPadille. Rivi PT: käynnistyykö peli. Ei muisti- eikä verkkomittausta (ne omalla käännöksellä ennen TF:ää). Ei odoteta junakäännöstä. Tarkista, ettei laite-iso.zsh:n suora mkdir-lukko ole ristiriidassa: PT 5.11. kielsi suoran lukon, joten asenna mieluummin ASENNA=0 ja `ipad-lukko.sh kaari julkaisija -- xcrun devicectl device install app ...` kuten T/pieni-nahtavyydet.zsh.

   LISÄYS 12.46: KS 13 ja LAV friisi1 valmiit ja kuitattu. L1 ajossa NUI 93bfd4379 (PT 12.3x), 5 varausta, 6 kuvaa, T/nui-ui-93bfd.zsh, loki T/nui-ui-93bfd.log, kansio lokit/nui-ui-93bfd4379: lokien polut NUI:lle local_a3754ed8, kääntövirheet virheriveinä. VIKA-rivit ovat odotettuja (vipu ja tappi vaakana).

## TILA
- Junarunko julkaisija/runko-219-muisti = 84872eaa9 (fcce6131f + VS räystäs, 4 commitia, 3 tiedostoa). PT kuittasi 12.4x. Natiivi-backupissa. Ei käännetty rungon nimissä, laitteella ei ajettu. Commit-viesteissä lukee "ei junaan", ajalta ennen kuittausta. a309d43de ei mene erikseen.
- Puhdas käännös fcce6131f: 526 s, 0 error CS, 0 Shader, 0 uutta metaa. Museokylttien näkyvyyttä ei todennettu.
- L2 = esikatselu-2 Library b8, L1 = esikatselu b7 ja kaannos (viimeksi b8 UI-ajoissa). Levy 72 Gi.
- P/esikatselu-2-Library-b7 (6,3 Gt) JÄTETTY: PT antoi luvan ehdolla, ehto täyttyi (L1 b7), mutta Raamattu 12.9 kieltää poistot oman checkoutin ulkopuolelta ja vaatii valmiin työkalun. PT:lle kerrottu. Ei poisteta ilman yösiivousta tai omistajan sanaa.
- SEURANTA: UI pysty exit 138 yksittäinen, 1/5 b8-ajoista (PT: ei toimia nyt, b8 pysyy).

## TULOKSET TÄSSÄ VUOROSSA (viety tekijöille)
- UI pysty fcce6131f x3: 138 0 kertaa, viat 8, 8, 11, joukko vaihteli.
- NUI aa359f8d6, 5 varausta, 19 min: pysty x3 5/5/5 VIKAA, samat rivit; vaaka-keskitys 6, vaaka-kuvat 6; kaikki rc 1, ei aikarajaa. lokit/nui-ui-aa359f8d6. bd998aa59 peruttu NUI:n pyynnöstä (varaus 1 ehti: 4 VIKAA).
- NS iPad 1 d015acab6, iPad Pro 12.9 5. sukupolvi: suurinP95Ero mediaani (pienin, suurin): A1-A0 -6,23 (-13,59, 11,15), B2-A0 8,34 (2,57, 19,14), B3-A0 5,56 (2,46, 14,19), B3-B2 0,58 (-0,61, 1,20). Normaali 24/24. Lokissa "tason 1 assetissa ei ole Forward+-renderöijää". NS kuitannut.
- NS Mac-2–5; KS 10, 11, 12; VS raystas6, 7, 8; LAV aukot14a/b, ovi1, saumat1: rivit viety.

## VIRHEET JA OPIT
- En kuitannut VS:n raystas7-pyyntöä 11.5x: VS kysyi 12.12 missä ajo on. Kuittaa jonoon pano samalla vuorolla, kun tilaaja odottaa.
- L2:n lukko ei ole jono: useampi odottaja, ja se saa vuoron, joka kokeilee ensin. PT:n odottama raystas7 jäi kahdesti ohi (KS 11, NS mac-3). Kiireellinen ensin: myöhempien eteen `until grep <merkki> <loki>` -odotus, kuten T/ks-yhteinen12-b8.zsh.
- `$SHA:tyokalut` zsh:ssa on muokkain (:t), kaatoi ketjun heti: `${SHA}:`. Tarkista `zsh -n` ei tätä näytä, siksi katso loki 3 s:n päästä.
- `print "... rc $?"` `$(date)`:n jälkeen näyttää date:n rc:n: ota `e=$?` ensin. T/ks-yhteinen10-b8.zsh:ssä on vika, korjattu uusissa.
- Käynnistin vahingossa taustaodotuksen, joka olisi ajanut lokin zsh:lla; pysäytetty ennen ehtoa, mitään ei ajettu.
- ui-asettelutesti.sh:n lokinimessä sha on "tuntematon" (rev-parse kopiossa); tulos on silti oikea. NUI tietää.
- Pyyntö palautetaan ilman riviä "mitä ratkaisee" ja kuvamäärää (10.5): NUI korjasi 21 kuvasta 3:een.
- NS:n iPad-ajot ovat poikkeus 2.209:ään (omistaja 11.22, KK:n tulkinta, Raamattu-loki 206ea9603), vain koe, ei muistia.
