# PT:n luovutus 5.11.2026 klo 12.56

Edellinen: viesti-fable-luovutus-20261105-1055.md (sen Mittaukset ja Opit voimassa; muu korvattu tällä).

## OMISTAJAN PÄÄTÖKSET TÄNÄÄN 11.15 JÄLKEEN (Raamattu 2.209–2.212, 4.42, 12.21; kaikki mainissa)
- 11.15–11.48 Pariisin aloituslento ja kartalta nousevat kuvat (2.210). Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-pariisin-aloituslento.md. Lontoo samalla toteutuksella Pariisin jälkeen; aloituslento vain Pariisiin. Odottavat työt jatkuvat, kun Pariisi on valmis (ei enää "juoksupeli ja Pariisi").
- 11.48 isoisä kertoo maailmasta, jota ei enää ole (2.211; tuleviin kaupunkeihin, ei työtä nyt).
- 11.53 ja 11.56 kyltit kuumailmapalloille, Olavinlinnalle ja raketille, hinta punnissa (2.212). "Kipit" = kuumailmapallot, EI kipsipäät.
- 12.17 4.42 voimassa myös striimikartalla; lippu ja palmu odottavat Pariisia; julkaisu, jossa kartta kääntyy, riippuu tästä. Omistaja moitti lipputestejä: vain juoksu ja Pariisi.
- 12.25 Asemataulu ajan tasalle: tehty 12.29–12.4x.
- 12.50 Tiny Warsaw / Tiny Prague -rakennustapa: odottaa KK:n suunnitelmaa ja korttia, ei roolien työtä ennen sitä (työlistalla).

## TILA
- Viikkokäyttö 85 % (12.29), tahti ~1,8 %/h, 99 % noin 20.20, nollaus 9.11. klo 03.00. Koodaustili: 99 % → KK:n rivi ja kortti. VALMISTELE TILINVAIHTO 96 %:SSA: ehdokkaat päätili tai vvi@vvi.fi pe 6.11. 07.00 jälkeen. Postivahti hälyttää 96 ja 99 %.
- Levy 129 Gi, T7 330 Gi.
- Pariisin pohja julkaisija/pariisi-219 99035b765 (natiivi-backup): runko 0a353e6d0 + kääntö ebc8ce01e + 694e1783a + e4180ac69, tyyli e30, Unity 0 virhettä, kuvat katsottu (Välimeri kahta väriä ja Sveitsi vaalea = VS:n korjaukset eivät mukana, oikein). PARIISIN PIIRROS EI OLE HAARASSA: tuotava erikseen ennen kokonaisuuden katselua. VS 9afad1ef6 ei mukaan (toisi Euroopan korjaukset oletuksena).
- Aloituslennon osat: A, D, D2, E koodissa natiivi-ui/pariisi-lento-219 d81627510, kääntyy, YHTÄÄN KUVAA EI KATSOTTU. B: NS, kaarta ei lukittu (proto-3d/_tyo/natiiviseppa/aloituslento/osa-b.md), NUI:n ajoitus odottaa kameraa. C: KS:n paikat tehty, Louvre ja Riemukaari odottavat Codexin kuvia. Testit vasta valmiina, ei junaan.
- Kyltit 13355a9c2 samassa haarassa; Mac-kuva todistamatta, NUI:n seuraaja ajaa samalla d81627510-ajolla. Hinnat koodista: pallo £200, raketti £500, Olavinlinna £20.
- Asemataulu: Työn alla 19 riviä, muut Odottaa-tilassa (luokittelu omani, rooleilta ei kysytty; rivi palautetaan, jos väärin). Juna 218:n sisältö siirretty Juna 219:ään, TF 218 lisätty (koeversio, sisäisillä 07.10). Eteneminen Juna 219. Varmuuskopiot eivät säily: vanhat luvut git-historiassa ei ole (scratchpad-data), joten siirtoja ei voi peruuttaa kuin rivi riviltä.
- Boost päällä 13.20 asti, A-cron Asemataululla. Pyysin 5 tuntia -laatan pois (0 % harhaanjohtava) ja vanha `eteneminen` on nyt korjattu. toimi-paatoimittaja ilman versiota.

## ROOLIT (avoin työ)
- NS: T7 → NAS 2. erä osa 1 poistettu (2493 lähdettä, 2400 linkkiä). Osa 2 Karttasepän 36 kohdetta 328,7 Gi kopioituu; NS PYYTÄÄ POISTOLUVAN PT:LTÄ täsmäyksen jälkeen: tarkista itse koko luettelo (tiedostot, koot, ._-tiedostot ohi), ja poista kohteet, joihin ajettavat skriptit viittaavat. Osasta 1 jäivät T7:lle tahallaan _valmiit/olavinlinna-blender-v26 ja proto-lokit/olavinlinna-tila.txt. Eroista seis: NS jatkoi kerran ilman rivinä. Tunnistamaton 100,8 Gi ja Soniss eivät kuulu erään.
- NS: osa B aloituslentoon, ns-osa-b-kuvat JU:lla; nollautuu Karttasepän luvan jälkeen.
- NUI: nollautunut 19e975483; seuraaja: Mac-ajo d81627510, sitten kuvat. Lippu seis (b558a2d00 tallella ilman mergeä).
- JU: pariisi-219 tehty; jonoon vain juoksu ja Pariisi, muut palautetaan.
- KS: paikat tehty, Pariisin nähtävyydet ja saari jatkuvat.
- VS: Pariisin saumat: syy löydetty (TULOS-tikkaat-a5323cf4e.md), tasojen lähentäminen haaraan 99035b765:n päälle; pari KK:lle ennen lopullista.
- LAV: koejuuri-yhd 8 palan leivonta käynnissä, sitten yksi kuva-ajo JU:lla (23 + kohteet + lattian tasokuvat). Isot kolmiot, juovat ja lattialäikkä avoimina muuri/KORJAUS.md:ssä. Ei vientiä; pari PT:lle.
- PK: taso 1, tarkastelu-219 JU:n vuoroilla.
- Postivahti: nollautui 12.5x; luovutus levyllä docs/raportit/viesti-postivahti-luovutus-20261105-1235.md (Matkakirja-posti, ei committia). mittarit.json lähde = hoitaja/kierros.py, jota kukaan ei ajanut; korjaus avoinna. Avoimet aloitusviestit sen luovutuksessa. TARKISTA, ETTÄ UUSI POSTIVAHTI KIERTÄÄ.

## AUKI
- Tarkista list_sessions: Pelikoodari oli tyhjänä 11.06–12.xx; talo seisoi yöllä samasta syystä.
- Tilinvaihto 96 %:ssa.

## OPIT
- Roolin "tarkistus ok" ei todista kääntymistä: JU luki paluukoodin putkesta, ja ef02dd214 ei kääntynyt. Vaadi Unity-käännös ennen kuin roolit rakentavat pohjan päälle.
- Tarkista viikkorajan tili ennen hälytystä: pidin 85 %:ia 12.21:n rajana, vaikka se koski päätiliä.
- Lipusta: en pysäyttänyt työtä 2.209:n jälkeen, vaan kirjoitin NUI:lle "Lipun pystyvika jatkuu ensin". Tarkista jokainen jako voimassa olevaa karsintaa vasten.
- python3 -c on 12.9:n vastainen, kirjoita skripti tiedostoon alusta asti.
