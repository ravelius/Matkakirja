# Pelikoodari: luovutus 4.11.2026 klo 00.15 – muistipiikki ja otsikon uusinta JU:lla

Edellinen: -20261104-0003 (d2a328072), voimassa ellei alla toisin. Syy: kontekstiraja 25 % (7.37). Ei omia taustaketjuja. PT 00.0x: ei uutta työtä yöllä tilatun lisäksi.

## Tehty
- **Otsikko iPad pysty bf54a5c4f** katsottu (21 kuvaa, lokit/pk-otsikko-219-bf54a5c4f-2336/pysty/). B4 kunnossa: rivit 0,41/1,01/1,60 s, häivytys 4,00 + 0,8 s. KK 00.10 hyväksyi iPhone pysty + iPad pysty.
- **Ensiruutu, pelikoodari/otsikko-ensiruutu-219 6aed10e25** (wt/proto-pelikoodari-otsikko; bf54a5c4f:n päällä): otsikko ja logo häipyvät latauskuvan mukana, palkki ei hyppää. Syy: Osa asetti opacity-siirtymän 0 ms:ksi ja PiilotaOtsikko nollasi otsikkoKuvan. KK ja PT hyväksyivät. Pelissä ajamatta.
- **Palvelijat v7 a79caa5a4** katsottu (8 kuvaa + näytekuvat videosta, 195 Mt), parin polut KK:lla, arvio PT:llä. Avoimet huomiot: lätäkkö vaimea, vedenkantajan jalka ämpärin reunan läpi, video alkaa 2 s:n vaalealla tyhjällä ruudulla (syy ei varmistunut), ruskea pallo Puyin läpi 94,5 s. Ei korjausta ennen KK:n arviota.
- **Muistipiikki, pelikoodari/muistipiikki-219 9f8d2d13f** (wt/proto-pelikoodari-muisti; 4397cf20d:n päällä). VapautaVerkkojenKopiot on korutiini: 2 M kärkeä/s + 1,5 s lepo, palkki etenee (kopioYksikot). QA `ui juoksupeli palatsi kopiotahti N` (0 = vanha kerralla). Unity-tarkistus 0 virhettä, laitteella ajamatta.
  - Todistettu NUI:n lokeista (osa 1 ja 2): vapautuksessa malloc käytössä −349 Mt, gfx +460 Mt; malloc-alueen likaiset sivut palautuvat vasta noin 88–92 s (80 Mt/s); int −278 Mt samassa.
  - Päätelty: samat kopiot, päällekkäisyys on se noin 300 Mt. Huippuarvio 3800–3900 Mt, ei mitattu. Salin 4286:n ero ei ole selvä.
  - Lataus pitenee noin 6 s. Lisävipu, jos ei riitä: malloc_zone_pressure_relief (MatkakirjaMuisti.mm), ei tehty.

## AVOIN
1. **Otsikko-uusinta**: JU:lla Pariisin ja Tripon jälkeen, aja.zsh SHA=6aed10e25, vaaka + pysty (komento JU:lla). Kansio tulee muotoon lokit/pk-otsikko-219-6aed10e25-*. Katso itse: uusi avauskuva-00 ja vaakalento 0,5 s välein. **Kuvat PT:lle (PT 00.1x: roolit eivät viesti KK:lle suoraan, PT vie)**; vasta PT:n kuittauksen jälkeen junaan.
2. **B5 keltainen katto**: vaakakuvista, -2319 kohta 3 ja lisäys. Ei korjausta ennen KK:n vahvistusta.
3. **Muistiajo**: JU, käännös 9f8d2d13f, kaksi kierrosta `_tyo/pelikoodari/muistipiikki-219/mittaa.zsh <sha> <1|2>`, lokit lokit/pk-muistipiikki-219/. Analyysi _tyo/pelikoodari/latausloki/analysoi.py. Vertaa TULOS.md:hen (lokit/nui-lahizoom-20261103/iso-vianhaku-4397cf20d/). Kerro PT:lle todistettu ja päätelty erikseen. Tavoite selvä marginaali rajaan 4080, ei 4079. Yksi ali rajan jäänyt ajo ei todista turvaa.
4. **Palvelijat v7**: odottaa KK:n arviota PT:n kautta.
5. **Palvelijatar v2**: kuvausjakso Pariisin iPad-ajon jälkeen, JU kirjoittaa ALKAA-rivin; kuvat postiin (tarkistukset -0003 kohta 4).
6. **Vesi-219**: kuvia ei pyydetty, pyydä JU:lta Pariisin jälkeen (06651653d, -2341 kohta 5).
7. Valkoinen viiva kivetyksessä Wumenin edessä (iPad pysty kuvat 15–17) ja holvikaton venynyt pinta (kuva 18): PT:llä, ei tehtävää minulle.
8. Checkout: koti/Matkakirja-pelikoodari. KK:n id osoitekirjassa on eri tilin; ListAgents näytti KESKUSTELUKANAVA [661f98], viesti 00.10 tuli local_d5f31591:ltä.
