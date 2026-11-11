# Karttaseppä: luovutus 11.11.2026 klo 09.06 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0840:n; taustat: `git show a539f9b92:docs/raportit/viesti-karttaseppa-luovutus-20261111-0840.md`
(ja sen ketju -0750 … -0010: tyyliohje, worktree, testikomennot, Monitor-vahti, raivausputki).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haara karttaseppa/grand-palais-1-1 = c087371b5 + 807817075 (GP) + 6fbb10774 (Orsay) + f4205a4c4 (GP KK-kierros); pushattu natiivi-backupiin, puhdas.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
Testit (proto-worktreessä): `sh Kartta-testit/kaanna.sh` (nyt 756), `sh Peli-testit/kaanna.sh` (912), `sh Peli-testit/unity-tarkistus.sh` (aina sh).
KARKEA ESIKATSELU (uusi, toimii): `OHJELMAKOHTEET_VIENTI=<kansio> sh Kartta-testit/kaanna.sh` → <kansio>/<nimi>.obj; z-puskuripiirto
`python3 /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/zpiirra.py <obj> <ulos.png> "az,el" ["az,el"]`
(python3 ilman -I:tä, numpy käyttäjän site-packagesissa; el 12 = julkisivut, 30–35 = katot).

## Tehty 08.40–09.06
- KJ32 (GP, 807817075) katsottu → 4 paria KK:lle (_tyo/karttaseppa/kj32-grand-palais/). KK 08.5x: koko ja päämuoto OK, ei junaan ennen kierrosta.
- GP KK-KIERROS f4205a4c4: GpPylvaikko() (pariloidut pylväät r 0,85 3,6–3,8 m tumman loggiaseinän GpLoggia 0x4A453F edessä, jalusta, palkisto, attika)
  itäsivulla x 32…92 ja −92…−28 sekä LÄNSISIVULLA x ±56…104 (Palais d'Antinin molemmin puolin); kulmapaviljongit z −78:aan (pylväikön eteen);
  Palais d'Antin: Katto-lape (21 → 25,4) + GpAntinHolvi() lasiholvi x −40…40, z 46…62 (poikkisiiven lasipäädyn z 45 takana; päällekkäin ei saa mennä);
  kvadrigat 6,4 × 7,5 m + hahmo 36,2 m, GpPronssi 0x6A9A86 (patina). Testi GrandPalaisinMitat päivitetty (kvadriga z −67,5, itäpylväikkö, Antin-holvi).
- KJ35 JU:lla: sk-mac-grand-palais-kj35.txt → lokit/karttaseppa-grand-palais-kj35-f4205a4c4 (6 kuvaa gp35-koodi-*; Tripo-vertailu KJ32:n gp32-tripo-* samoista kulmista).
  SEURAAVAKSI: katso → pari (gp32-tripo-lahi | gp35-koodi-lahi) + gp35-koodi-lahin-pelikamera (idästä) SUORAAN KK:lle, kopio PT. KK OK → junaan KK:n sanalla:
  "grand-palais" Koodimallit.Oletukseen + KoodimallienAvaimet-testin oletusrivi + talot v12 (--edellinen v11; palat v37 sisältää v35 GP + v36 SC-lovi + Orsay-talo pois – Orsay-talo pois VAIN jos Orsay myös hyväksytty, muuten v36).
- MUSÉE D'ORSAY 6fbb10774: OhjelmaKohdePariisiOrsay.cs (+meta), Kohde "Musée d'Orsay" Korvaa = "orsay" (Koodilla toimii ilman Tripo-aluetta: pelkkä kytkin), origo 48.86000 2.32661,
  akseli 65,5, MaaH 37,5 (pinta jalanjäljellä 75–113, matalin Seinen puolella). Kehä 20 m, mansardit, holvi x −26…12 (xc −7, harja 35, lasinauha), kellopaviljongit x 12…30,2
  z ±, lunetit päädyissä (länsi + kello), sisäänkäynti z 84…99. Testi OrsayinMitat. Talo pois: raivaus-1-1-orsay/ (siisti-v37.json = siisti-v34 + _pois way/63178753,
  aja-palat-v37.sh, kokoa-v37.py) → palat-v37-orsay (= v36 + 1 pala 15_16595_11272; "kohde" 43 → 44).
- KJ34 JU:lla: sk-mac-orsay-kj34.txt → lokit/karttaseppa-orsay-kj34-6fbb10774 TAI -f4205a4c4 (JU:n valinta, ks. viesti 09.2x), 10 kuvaa or34-nyt-* | or34-koodi-* + lahin-pelikamera-seine/-lansi.
  SEURAAVAKSI: katso → pari KK:lle (kopio PT). Kamerat: suunta 205 = Seinen julkisivu, 115 = länsipääty.
- KJ33 (SC-lovi) katsottu: paperiseinä poissa, kappeli avoimella pihalla → parit KK:lle 09.2x (_tyo/karttaseppa/kj33-sc-lovi/, myös -rajaus.png). Odottaa KK:n OK:ta → talot v12.
- Lista ei-1:1-kohteista KK:lle 09.0x. KK 09.0x: Montparnasse KYLLÄ seuraavaksi; Sacré-Cœurin mäki EI (odottaa KK:n saumat ja mäet -suunnitelmaa).
- JU 08.50: 224.62 = 494595623 LINKISSÄ (Riemukaaren katto 3e64b03db).
- Työlista: tilanne päivitetty riville "Pariisin loput ylisuuret nähtävyydet 1:1-koodimalleiksi".

## Jono (KK:n järjestys 09.0x: GP-korjaukset → Orsay-pari → Montparnasse)
1) KJ35 → GP-pari KK:lle. 2) KJ34 → Orsay-pari KK:lle. 3) TOUR MONTPARNASSE 1:1 koodiksi: KK:n tavoitekuva "yksinkertainen tumma, hieman kaareva lasitorni (noin 50 × 210 m,
   soikea pohja, tasainen katto teknisine korotuksineen), ei koristeita; erottuu kaukaa tummana ja yksinäisenä". Tripo nyt 177 × 600 m (loki "korostus … Tour Montparnasse").
   Tripo-alue "montparnasse" (Nahtavyysalue.cs, Lat 48.84211 Lon 2.32197, Malli Suunta −50.2, Qid Q323767) → Korvaa = "montparnasse" (+ PohjaPoisKoodilla kuten GP:ssä),
   OSM-pohja osm.json:sta (tee-orsay-pohja.py way-argumentilla), talot: tarkista alueen raivaus (Tripo-väistö) ja palauta talot kuten GP v35 (korvaus-11.json + tee-talot-nd-k.py).
   Pari (sama kulma) + lähin pelikamera KK:lle.
4) AVOIN: "Palais de l'Industrie" -nosto puuttuu KJ32:n koodi-itäkuvasta (näkyy yleiskuvassa). Lupasin KK:lle tarkistaa. Arvaus: KeraaRuudut piilottaa nimen,
   jonka kohta on mallin ruuturajauksen sisällä (sama sääntö kuin Tripolle), ei vika. Tarkista unity.logista/koodista ja kerro KK:lle samalla GP-parilla.
5) PT 09.0x jonoon Montparnassen jälkeen: "Overture Maps: yhden kaupungin mittaus" (height / num_floors / roof_shape -osuudet lähteittäin vs. talokoneen OSM; yksi päivä, yksi kaupunki).
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen.
