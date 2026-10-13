# Natiivisepän luovutus 13.10.2026 klo 11.4x (PT:n nollaus, konteksti 53 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot: natiiviseppa-skriptit/juna187/jono-187.txt (koko päivän kirjaus) ja juna186/jono-186.txt.

## TILA

- **BUILD 186 julkaistu** (omistaja 06.57 "Julkaise nyt"): proto master ff94b687a (juna/b14 c58a17631), iOS TF (Julkaisija), Mac 1.1 (186) TF-ajo
  38345548965 SUCCESS. Muistiportti 186 OK (Olavinlinna v49a vapaa min 0,54 Gt, museo v6 2,38 Gt, shakin avauspiikki +89 Mt). Lukituskaava:
  juna186/lukitse186-a.sh (lukituskäännös) + lukitse186-b.sh (juna/b14 → runko, BUILD-merge masteriin, peilit; peilipush voi hylkääntyä
  kilpailuun → aja push uudelleen ja tarkista ls-remote).
- **Juna 187 -runko** natiiviseppa/juna-187 (wt/proto-natiiviseppa-ehdokas) = **16c9dfff2**, testit Linssit 1704/1704, Peli 583/583, Kartta 487/487,
  tarkista 0. Yhdistys: `zsh juna187/yhdista-erat.sh <erälista>` (rivit SHA|viesti), testit `zsh juna187/testit187.sh` (run_in_background).
  Mukana (kaikki PT:n kuittaamia): LS1 bb370c6ef + cd0fbaac5 + 2de4caf63 (elävä kaupunki 17 + 7 kaupunkia, Resources yht. ~+18 Mt),
  NUI museo-palaute 6335b749e, NUI kuvakkeet 8f574aa00, PK shakki e4d686041 (korvaa 16714a8fb:n), PK aarre-eurooppa 7dd35824c, PK koopenhamina e4603c4f5.
  **Lisää muistia: kyllä.**
- Unity-beeta 13.10. 10.24: ei uutta.

## AUKI (järjestyksessä)

1. **Juna 187 odottaa**: LS1:n museohaara (samanniminen kuin NUI:n museo-palaute, kosketuskohdat MuseoTaulussa sovittu NUI:n kanssa: NUI aloitus/esikatselu
   + nappiryhmä, LS1 otsikko/naapurit/i → yhdistä huolella), LS1 katso-kohteet-187, Olavinlinnan viisi tilaa (keittiö, porttikäytävä, pikkupiha,
   linnantupa, voudin sali; Siirtoseppä, botti 17/17 + PT:n kuittaus; sen jälkeen linna tauolla).
2. **iPadin muistiajo 187 ennen lukitusta** (Julkaisijan KÄÄNNÖS NYT + LAITE NYT): pohjaksi juna186/ketju186d.sh (Release-laite → Olavinlinna B1 →
   12 min lepo → museo → shakki). Vertailuapp 186 = lokit/natiiviseppa-app-186-laite (c58a17631). Kaupungit: Resources +18 Mt → lisää kaupunkiajo
   (esim. muistitarkka-ipad.sh Pariisi) ja LS1:n uudet kaupungit. Lämpö: B ensin viileältä, lepo välissä (LS1 13.10.: ero voi olla pelkkää lämpöä).
   Huom: automaattiajot käyttävät kaupungeissa ionin varadataa (google-lippu auto) → fps-vertailu 183:een ei kelpaa (PT: ei Google-ajoa, kiintiö).
3. **Lukitus 187 vain "OMISTAJA PYYSI JULKAISUA"**: web-lukitusmerget #4535 #4547 #4550 (#4550 = tyylikirjan tokenit, natiivin Tyylikirja generoitu siitä)
   vain omistajan pyynnöstä. Muutosloki ≤ 350 merkkiä PT:n kuittaamana (juna186/muutosloki-186.txt mallina). Mac 187 L2:lla (juna186/mac186.sh mallina,
   app_polku lokit/natiiviseppa-mac-tf-<N>, workflow proto3d-mac-testflight.yml -f build=<N> -f lataa=true).
4. **Sävytoistokokeilu** (PT 13.10. 11.0x, /Users/Shared/Claude/Matkakirja-fable/scratchpad/savytoisto-selvitys-20261013.md; EI junaan ennen omistajan
   hyväksyntää): haara natiiviseppa/savytoisto-agx (wt/proto-natiiviseppa-savy, ff94b687a:n päällä) = c94342ffe + **0ea4c34ba**.
   - Tehty: Savytoisto.cs (HDR-värimäärittely ajossa, AgX URP 17.7:n omalla _TONEMAP_AGX:llä — omaa LUT-rakentajaa ei tarvittu, huoneavaimet,
     pallon pohjavolyymi None), SavyAgx.hlsl (käänteinen AgX, tarkistettu laskemalla), LDR-atlas ja museon maalaukset käänteisellä, HDR-valon −1 EV,
     seikkailun −1,1 EV ja kontrasti +8 pois AgX-tilassa. Komento (komento.txt): savy agx 0|1 (NYKYINEN|UUSI samasta käännöksestä), savy perus/museo <EV>,
     savy avain <tila> <EV> (tila-id:t: laituri, fatabuuri, kierreportaat, muurinharja, kappeli, keskushalli, tunnelma, keittio-g102, linnantupa,
     voudin-sali, massa), vianhaku savy hdr|kaanteinen|kayra.
   - 1. simuajo 8852c91c virheellinen (URP karsi _HDR_GRADING-variantit, assetit olivat LDR) → korjattu 0ea4c34ba (assetit m_ColorGradingMode 1).
   - **Käynnissä 11.36**: `savy/savy-sim.sh 0ea4c34ba` (perl setsid, L2-käännös + SIMU NYT jo annettu, lippu tehty) → loki lokit/natiiviseppa-savy-sim2.log,
     todistukset lokit/todistus-savy-{olavinlinna,museo,kippi,pallo}-*, kuvaparit + sävymittari lokit/savy-kuvaparit-<aika>/ (savypari.py).
     Kun "SAVY-SIM LOPPU": SIMU VAPAA Julkaisijalle, tarkista kuvat itse (mediaani, ≤10/255, ≥250/255; UUSI ei saa olla tummempi kuin NYKYINEN keskisävyissä),
     sitten täysikokoiset NYKYINEN | UUSI -parit PT:lle (tupa + keittiö, museo, kippi Pariisi päivä/yö, pallo). Jos UUSI yhä väärin: vianhakukytkimet
     samaan skenaarioon (savy hdr 1 + kayra 1 = HDR-tila Neutralilla jne.).
   - Vielä tekemättä: iPad-mittaus (raja ≤ +0,3 ms, savy agx 0|1 ABAB samassa appissa viileältä laitteelta), LS2 kalibroi linnan avaimet kun
     Olavinlinnan viisi tilaa ovat junassa. Kippi: HDR-tilassa kontrasti 12 / saturaatio 10 toimivat logaritmisesti → tarkista kuvista.
5. **Unity-beetaseuranta** klo 09.04 (CronCreate on istuntokohtainen → luo uudelleen "4 9 * * *" + aja unity-julkaisut.py).

## OPITUT 13.10. (sitovia)

- **Lämpö sotkee A/B:n**: jälkimmäinen ajo lämpimällä iPadilla renderöi skaalalla 0,7 ilman MSAA:ta (Ruudunpaivitys) → muistiero ±250 Mt. B ensin
  viileältä, 12 min lepo ajojen välissä (ketju186b.sh/ketju186c.sh).
- **Museo SALI=uusi|vanha** (museo-muisti-ipad.sh): "museo sali uusi" on UusiPakko (ei pysyvä). v6 on nyt oletus (LS1 f8040bf37).
- **Linja 2 laitekäännöksille**: laite-sha.sh tukee PROTO_LINJA=2 (vain lukko eri, oma T7-projektikopio).
- **Käännöspalvelun kaannos.txt** = palvelun oma käännöscommit ("Käännöspalvelu: <sha>") → tarkista `merge-base --is-ancestor <haara> <kaannos>`, ei etuliitettä.
- zsh: `echo ===` kaatuu (equals-laajennus) → käytä `echo ---`.
- URP-variantit: HDR-värimäärittely tarvitsee HDR-assetin käännöshetkellä; ajonaikainen vaihto ei riitä.
