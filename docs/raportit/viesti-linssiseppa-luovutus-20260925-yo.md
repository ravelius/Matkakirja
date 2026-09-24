# Linssisepän luovutus 25.9.2026 yö

*Linssiseppä (Opus). Kirjoitettu Fablen käskystä nollausta varten (konteksti 70 %). Edellinen luovutus on
viesti-linssiseppa-luovutus-20260924-ilta.md. Jatkaja lukee tämän ja aloitusviestin viesti-linssiseppa-aloitus.md.*

## Tila lyhyesti

Radiolinssin uudistus build 12:een on toteutettu minun osaltani ja junassa. Omistaja hyväksyi havainnekuvan ja
valitsi pohjaksi **värillisen topografian hämärässä (A)**. Mastot, hämärä, yövalot ja topografian häivytys ovat
Natiivisepän. Löydös 43 on masterissa.

## Tehty (24.–25.9.)

| Asia | Haara / SHA | Tila |
|---|---|---|
| Löydös 43: kermahuntu pois linssin piilottaessa pelikerrokset (radio, keksinnöt, ihmisen matka, astronautti); vertailu ja maatiedot pitävät sen kuten webissä | linssiseppa/radio-huntu efbdb7f | masterissa (build 11), kuvapari proto-3d/lokit/linssit-loydos43-20260924/ |
| Radiouudistuksen kuvitettu suunnitelma | docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md | #3113 ja #3115 mainissa; #3122 (topografiavariantit A/B + pohjaluku) auki Julkaisijalla |
| Paneeli: VU, LCD ja lamppu samalla rivillä (lamppu keskellä LCD:n oikealle jäävää tilaa), viivain alla, kuvaputken pinnat (ambientCG CC0) 9-slicenä Resources/Radio/:sta | linssiseppa/radio-paneeli | juna/b12 d142d8d (414e6e8) |
| Viivaimen veto ja rahina (RadioLinssi.VetoAlkaa/Veto/VetoLoppuu, tasatehoinen pari asteikkoetäisyydestä) | sama | junassa |
| Mastologiikka ja IRadioMastot (koko asukasluvusta, Iso ≥ 2 milj., puuttuva tai alue → Pieni, kenttä puuttuu skeemasta → Keski), vilkku, VU-kirkkaus, renkaat, yövalot, avauksen nousu | sama | junassa; piirto natiiviseppa/radio-mastot |
| Kallistus 40° kamera-ajolle (ILinssiYmparisto.AjaKamera kallistukseen), kaareva kamera-ajo, pelaajan ele keskeyttää | sama | junassa |
| Topografiapohja: avaus ottaa Topografia.ReliefiSarjan avaimella radio-topografia, pergamentti piiloon | sama cd805ce | junassa; häivytys Hamara(h):lla natiiviseppa/radio-mastot 45d5796 |
| Sulun ulosliuku 0,8 s (RadioLinssi.PaivitaSulku, LinssiOhjain.Jalkiajo) | radio-paneeli cd475df | lähetetty Natiivisepälle junaan, ei vielä nähty laitteella |
| Pintojen diagnoosi linssi-lokiin ("radiopinnat: …"), npotScale None | 0a6282f, 414e6e8 | simulaattorissa pinnat True, kotelo 1024×320 |
| tyokalut/radiopinnat.py (leivonta, lasin alfa lineaariseksi, sävyt) ja Editor/RadioPinnatTuonti.cs (ASTC 6×6) | radio-paneeli | junassa |

Kuvaparit: proto-3d/lokit/mastot-b12a/ (kuvapari-mastot-b12d/b12f, linssiseppa-b12i), proto-3d/lokit/radio-pinnat-20260924/
(koekuva-paneeli.jpg, kuvapari-paneeli-iphone.jpg). Havainnekuvaputken lähde:
docs/raportit/kaappaukset/radiouudistus-20260924/lahde/ (tee.mjs, paneeli.js, mastot.js, tee_tausta.py, proj.py =
pelin kameramalli Pythonissa, osuu ±15 pt).

## Avoinna

1. **Unityn täydentämät .metat Resources/Radio/*.png:lle.** Unity muokkaa niitä tuonnissa (RadioPinnatTuonti), ja
   git status jää likaiseksi. Aja käännöspalvelu (`proto-kaanna.sh natiiviseppa/radio-mastot+natiivi-ui/radio-mastonimi+linssiseppa/radio-paneeli D0D2CD1E-70C7-4140-A972-E615212E8911`),
   kopioi `proto-3d/lokit/kaannospalvelu/<ajo>-metat/Assets/Matkakirja/UI/Resources/Radio/*.png.meta` omaan
   proto-worktreehen, commitoi ja kerro SHA Natiivisepälle (junaan). Ajoni jäi jonoon nollauksen hetkellä.
2. **Sulun ulosliu'un ja koko radion kuvapari laitteella** (iso iPad tai oma simulaattori): avaus (hämärä, topografia,
   mastojen nousu), aseman vaihto (kaari, lukitus, renkaat), veto ja rahina, sulku (liuku). Pinnat olivat b12i-laitteella
   null mutta simulaattorissa kunnossa: tarkista diagnoosirivi laitteelta seuraavasta junasta.
3. **Asukasluvut tuotantoon:** Siirtosepän skeema 1.38 (#3114, pinottu #3103:n päälle). Ennen sitä kaikki mastot ovat Keski.
4. **Black Marble -yövalot** odottavat Karttasepän polttoa (Z0–Z6), sekoitus Natiivisepän.
5. **Linnut** (Fable): Natiiviseppä toteuttaa boid-parvet, Linssiseppä määrittelee milloin ne näkyvät (radion hämärä,
   lento) ja reitit (muuttolintureitit). Oma erä build 12:een mastojen jälkeen, ei vielä aloitettu.
6. **Maapallon tila -linssi:** suunnitelma valmis (docs/raportit/linssi-maapallon-tila-suunnitelma-20260924.md),
   toteutus vasta pariteetin ja omistajan build-kokeilun jälkeen (Raamattu).
7. Edellisen luovutuksen kohdat: radiolöydökset 39/40/42 Natiivi-UI:lla; merinimet (skeema 1.36, #3099) keksintöjen
   kuvaparista; Huippuvuoret (#3081 + #3078); taidemuseo erä 2 tilattu, toteutus Fablen käskystä;
   Laitetestaajan havainto: maatiedot sekoittui auki jääneeseen vertailuun build 10:ssä → tarkista puhtaana.
8. **Levy:** omistajalle `zsh /Users/Shared/Claude/proto-3d/vapauta-levy-linssiseppa-20260924.sh aja` (3,8 Gt).
   Erä-worktreet: wt/linssiseppa-radio-topografia (#3122) ja wt/proto-linssiseppa; enintään 3 (Fable).

## Opit

- **Käsin kirjoitettu PNG .meta ilman TextureImporter-osiota** → Unity tuo DefaultAssetina ja Resources.Load<Texture2D>
  palauttaa null. Kopioi meta olemassa olevasta png.metasta (esim. Kartta/Maamerkit/Tekstuurit/ateena_vari.png.meta).
- **nPOTScale**: UI-kuvat ilman kahden potenssia venyvät, jos npotScale ei ole None.
- **Sisältöpaketin skeema**: uusi kenttä (asukkaat) puuttuu tuotannosta → erottele "kenttä puuttuu" (Keski) ja
  "arvo null" (Pieni).
- **Kallistus**: linssin AjaKamera ei välittänyt Nakyma.Kallistusta ennen radiouudistusta; nyt kallistukseen-parametri.
- **komento.txt**: `kerros <avain> paalle|pois` (ei 0/1), `kallista <astetta>`; linssin `kamera lat lon km` ei muuta kallistusta.
- **UI-tiedostot** (RadioNakyma.cs, Linssit.uss) ovat Natiivi-UI:n: kysy ennen muutoksia, vaikka paneeli on sinun.
- **Kone kuormitettu** poltoista ja CI:stä: Playwright-havainnekuvat voivat kestää minuutteja.
