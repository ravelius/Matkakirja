# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 16.1x)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## KESKEN JA SEURAAVAKSI (päivitetty 16.1x; tilinvaihto illalla)
0. OMISTAJAN LINJAUKSET 7.10.: KAIKKI ÄÄNET eleven_v4_turbo (13.1x). TESTAUS KEVYESTI (15.5x): ennen junaa vain automaattiset
   testit + käännös, ei stillejä/savuja/iPad-mittauksia kuittaukseen. EI OMIA iOS/iPad/Mac-KÄÄNNÖKSIÄ (16.0x): haaralle
   unity-tarkistus + testit; simukäännös vain vian syyn selvitykseen, ilmoitus Päätoimittajalle etukäteen.
1. Esittely: 6 kaupunkia tuotannossa (Pariisi, Praha, Wien, Rooma, Lontoo, Kööpenhamina), kaikilla avaus; kierros alkaa
   avauksen kohteesta (#4138 /opas/seuraava, #4142 /opas/liiku; ESITTELY_ALKU-taulu + esittely.kierros[0]; Praha ja Wien
   esittely_polut → opas/esittely-v1b, #4141).
2. LOPUT 31 KAUPUNKIA: tekstit VALMIIT ja Päätoimittajan päätökset viety (haara pelikoodari-esittely 55c2af69:
   esittely-tyo/korjattu|pohja|avaukset/<id>, TARKISTUS-PAATOIMITTAJA.md, tarkistin 0 virhettä). ÄÄNIÄ EI GENEROIDA ennen
   omistajan lupaa (omistaja: vasta pelitestin jälkeen). Kun lupa: avaus-kenttä JSONiin avaukset/<id>.md:stä →
   tee-esittelyaanet.mjs (turbo) + avaukset tee-aanet-kohdistuksella.mjs --r2 → koosta-kuuntelu.mjs --avaukset →
   vientipaketti (JSONiin kierros: pohja.kierros + avaus.aani opas/esittely-v1/aanet/<id>-avaus.mp3; mallina
   _valmiit/opas-esittely-vienti-20261007b/-c) → indeksi aineistot.js esittely. Määrä noin 31 × 12 000 mrk ≈ 186 000 krediittiä turbolla.
3. Apurahakortti: #4146 (kuvat kappaleiden vieressä, kappale/rivi 0-pohjaisia, palaute pois APURAHA_PALAUTE=false) ja
   #4147 (valmiitLinssit ylätasolla, 9 linssiä; TF 160 -jäsennin tarkistettu C#-ajurilla scratchpadissa) MERGETTY;
   Pages-julkaisu tarkistettava (https://matkakirja.app/assets/apuraha/esittely.json sisältää valmiitLinssit). NUI lukee samat kentät.
4. Olavinlinnan 31 repliikkiä ämpärissä seikkailu/olavinlinna/repliikit-v1 (Siirtoseppä).
5. Junassa/julki: #4132 yöportti, #4133 Kysy vuosiluvut, #4134 lippurivi.
6. Worktreet: wt/pelikoodari-esittely (tekstit), wt/pelikoodari-yoportti (yleinen erä-worktree). ÄLÄ KÄYTÄ Agent isolation remote.

## TÄNÄÄN JULKI (tärkeimmät)
#4082 pidempi kerronta, #4089 vuosiluvut, #4086 lyhin reitti, #4084/#4090/#4102 äänikartat (Pariisi, Venetsia, Kööpenhamina)
+ silmukat + tuuli/sade, #4092/#4098/#4109 sallitut (37; esto päällä #4108, OPAS_SALLITUT_ESTO=1), #4103 kuvat-v4, #4105 tiet
38 kaupunkiin, #4107 Kysy toisen kaupungin kohteeseen (kohde_nimi/_id/_lat/_lon), #4116 Giza kokeilukohteena
(x-matkakirja-kokeilu: giza) + valmiin esittelyn tarjoaminen, #4122 web: "Oppiminen on hauskaa" pois.
Siltalauseet v2 (ei-sallittu, 292 krediittiä), pilotin äänet 71 kpl + avaus/opastus/Notre-Dame (682 krediittiä).

## Työkalut (haara pelikoodari-esittely, ei PR:ää; worker-osat menivät #4116/#4126:lla)
tools/opas/: tee-esittelypohja, tarkista-esittely, koosta-esittely, tee-esittelyaanet (kohdistus), tee-aanet-kohdistuksella,
koosta-kuuntelu, tee-siltalauseet-v2. tools/kartta/tee-tiet.mjs välimuistiavain korjattu (keskipiste mukana).
Paikallinen opas-aineisto: node tools/pollo/tee-opas-aineisto.mjs ja palauta tynkä git checkoutilla ennen committia.
