# Natiivisepän luovutus 4.11.2026 klo 06.52 (konteksti 26 %, 7.37)

Korvaa luovutuksen -20261104-0504 lisäyksineen. Siitä yhä voimassa: "LISÄYS 06.08" (omistajan linja), sävyero ja KK:n lista (`git show 62cbff578:docs/raportit/viesti-natiiviseppa-luovutus-20261104-0504.md`), ja niiden kautta -0255:n Päätökset ja HAARAT.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.

## Tila
- **Rivi 168 ja pystysaumat 2,2412 ja 2,4609: yksi syy, Cesiumin maastopala vaihtaa tasoa L12→L13 etäisyyden mukaan** (rasteri seuraa maastopalaa; päätelty z14 | z13). Kaista noin 0,11–0,14. Malli osui k24:n ja yhd3:n kuviin, paitsi ylärivin kaksi keskipalaa (6,0 km, kynnys 6,1). **iPad-todiste ajamatta.** Yksityiskohdat, 3 korjaustapaa: proto-3d/_tyo/natiiviseppa/aluekuva-koko/rivi168-havainto.md. Vanha "z11/z12" oli Macin 640×480-esikatselusta.
- **Suora häivytys 8d66b5865** (haara natiiviseppa/haivytys-aalto, natiivi-backup, ff97c7f8c + 1, 613/613): KK valitsi reunaksi VS k41:n. Jää haaraan, ei ajoa eikä yhdistelmää, ellei KK toisin sano. JU perui ja kuittasi.
- **Vieritys k33 mitattu:** proto-3d/_tyo/natiiviseppa/fps60/vieritys-k33-tulos.md, lokit/julkaisija-vieritys-ff97c7f8c. Mediaani 60 fps, yli 100 ms 0; koealue lisää pitkiä ruutuja, yksi ajo, päällä aina ensin. Skenaario alkoi kerran alusta, syy tuntematon.
- Työpuu wt/proto-natiiviseppa-maskik4 on haarassa natiiviseppa/haivytys-aalto, puhdas.
- Levy: 4 vanhaa luovutus-worktreetä poistettu (PT), haarat originissa.

## Seuraava kierros
1. **JU:n rivi 168 -todiste** (kuvat m-keski-0-13, m-siirto-0-13, m-keski-0-12, m-keski-0-14; kansio lokit/julkaisija-rivi168-ff97c7f8c; sk-rivi168-todiste.txt). Vertaa etukäteisennusteeseen aluekuva-koko/rivi168-ennuste.txt: malli.py:ssä keskus on kovakoodattu, muuta siirtokuvaa varten. Rivi PT:lle.
2. **Kun malli on todistettu: z13-koe koehaaraan (PT: kyllä).** Koealueen z13-pala 512 px neljästä z14-palasta (Laattapalvelin.ElavaPiirra, ei ElavaKoealue). Pari 0,15–0,30 samasta kamerasta + muisti PT:lle: ilme muuttuu, KK arvioi; +34 Mt on arvio. Ei yhdistelmään ilman käskyä. Ei odota z ≤ 15 -linjaa (PT: z ≤ 14 ennallaan, vain z15 arkista VS k42). Tarkista, näyttääkö Cesium 512 px:n kuvan oikein (ei tarkistettu), ja hyppy z12 | z13. Jos malli ei pidä: rivi PT:lle, koetta ei tehdä.
3. **Vieritys k34** (JU: rivi 168 → yhd5 → k34 → yhd6; runko 8dee95d57; kansio lokit/julkaisija-vieritys-k34-8dee95d57; sk-vieritys-k34.txt pois ensin, piikit ≥ 33 ms). Erittele pitkät ruudut 0,05:llä ja 0,13:lla: lataus vai piirto (fps60/vieritys-osat.py, piikit.py kopioi tarvittaessa). **Huom: runko on eri kuin k33:ssa (yhd5), ja JU:n mukaan piikit-ikkuna voi jäädä viimeisen heiton lopusta vajaaksi.** Ei korjausta ennen erittelyä (PT). Sitten puut ja k41:n lisäpalat, kun ne tulevat; pieni iPad vasta, kun iso on eritelty.
4. Sen jälkeen -0504:n järjestyksessä: sävyero (vasta TF 217 -kuvan jälkeen), puut laajoissa zoomeissa (KS), KK:n listan kohdat 2–4.
