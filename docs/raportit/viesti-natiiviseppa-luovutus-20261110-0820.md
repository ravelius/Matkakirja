# Natiivisepän luovutus 10.11.2026 klo 08.20

Edellinen: luovutus -0800 (282406abb, haara natiiviseppa-luovutus-20261110-0800) – lue se ensin, tämä täydentää.
Syy: kontekstivahti ennen isoa uutta työtä (Yksi tarkkuus), 7.37. Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työlista: python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava NS.

## TARKISTETTU / TEHTY TÄLLÄ VUOROLLA
- Cron "4 9 * * *" unity-julkaisut.py luotu (b569c8de, session oma: LUO UUDELLEEN, ks. -0740-luovutuksen rivi 5).
- Levysiirto: siirto-wt.zsh katkesi -0750-ajossa huippunimissä → ajettu uudelleen taustalla 08.18, loki
  _tyo/natiiviseppa/levy/siirto-wt-0835.log. Jos ei VALMIS-riviä: aja uudelleen taustalla. Loppuun rivi PT:lle (montako, vapaa tila).

## OLENNAISET NIMET (OMISTAJA 08.11 Kyllä, työlista [4]) – JU:lla
- Haara natiivi-backup natiiviseppa/olennaiset-nimet-224 = 7491ded20 (juna-224 68d365e65 + liitokset + kommentit), unity-tarkistus sh 0.
  Worktree /Users/Shared/Claude/wt/proto-natiiviseppa-olennaisetnimet.
- TÄRKEÄ: oletus (kadut, kaupunginosat, pienet vedet pois), Kartta-välilehden rivi ja karsinta 7fd402eee olivat JO junissa 220–224
  (kokeiden yhteiskärjen kautta: 4cb886968, b529785cc, f75aad4a3). Haara lisää vain liitokset, kommentit päätökseen,
  nimilokin lista/keko-rivin (4d2610ab0) ja Liiku-mittausrivin poiston (a739dc0a1). PT ja JU tietävät.
- iPad-skenaario JU:lla: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/oleelliset-nimet/sk-olennaiset-nimet-ipad.txt
  → lokit/natiiviseppa-olennaiset-nimet-7491ded20. Kuvat O1 (oletus), K1 (Kartta-välilehti rivi päällä), K2 (kadut päällä), O2 (takaisin).
  KUN VALMIS: katso kuvat täysikoossa (O1: ei katu-/kaupunginosanimiä, nähtävyysnimet näkyvät; K2: kadut; O2 = O1), lokista
  "ui kerros tila" -rivit (kadut pois/päällä/pois) → rivi PT:lle + JU MR:n junaan (työlista [4] tehty).

## MUSEO-1 (työlista "Pelin koko: iso sisältö palvelimelta")
- JU 08.3x: jälkeen-puolelta (91bc37c4b) kuvat puuttuivat. SYY ÄMPÄRI, EI KOODI: iso ampari lukee <kansio>/<osa>.json, mutta
  museo-v1/julisteet/iso:sta puuttui museo.json (vain museo/v1/hakemisto.json) → osa museo tuntematon, odotus ei alkanut
  (ei "odottaa"/"levyllä"-rivejä), MuseoKuvat.Lataa → Resources → null → "lähestyminen kuva … puuttuu".
- Korjattu: museo-v1/julisteet/iso/museo.json (kopio hakemisto.json:sta, 209/209 tiedostoa). JU:lle uusintapyyntö: sama sk-museo-1.txt
  → lokit/natiiviseppa-museo-1-91bc37c4b-2, pari 6fc74dc14:n kanssa → …-parit-2.
  KUN VALMIS: unity.log "osa museo v1" ämpärin jälkeen, "odottaa palvelimen kuvia", "valmiina"; L4 "levyllä"; ei "VIKA", "ei lue",
  "puuttuu". Parit täysikoossa (ennen = jälkeen ulkoasultaan). Sitten pari PT:lle.
- Huomio koodiin (ei muutettu): jos osa puuttuu hakemistoista, MuseoKuvat ohittaa hiljaa. Voisi kirjata kerran "osa museo puuttuu".

## ISS-MUISTI (NYT-rivi) – ennallaan JU:lla, ks. -0800.

## SEURAAVA: "Yksi tarkkuus koko näkymään, Pariisi terävänä" (työlista [6], omistajan kortti 10.11. 08.00, koe)
Tavoite (KK): kartta yhtä tarkka koko näkymässä ilman suoraa rajaa, Pariisi terävänä (pikkukadut, puistot, Seine), iso iPad ei kaadu
80°:ssa, nipistys ei hyppää. Keino: laite hakee karttaa vain rajatun määrän kerrallaan (kova palakatto valintaan).
Pohja: natiiviseppa/yksi-taso b221a28a1 → 7f02b9152 → 46b7cf417 (Seine) → d2ba2f540 (usva) → 83d48ba80 (+talojen säde, iPad-mittaus).
Tulos ja syyt: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/yksi-taso/tulos.md (lue "iPad-muisti 80°" ja "YKSI SUOSITUS").
Ydin: YksiTaso.cs (piirtämätön valintakamera K× taakse, kapeampi fov, Cesiumin additionalCameras) ja
LiikeLaatatPaatos.YksiTasoLaske (kartio levenee kallistuksen mukaan usvan loppuun; palamalli ei pitänyt: Mac 6,5× pyynnöt, iPad 80° kaatui
5120 Mt, ~87 pyyntöä/s). Hyppy eleessä: koko näkymä vaihtaa tasoa yhdessä ruudussa.
Alku-ideat (tarkistamatta): (1) kova katto = Cesiumin maximumSimultaneousTileLoads / maximumCachedBytes pallolle + valinnan kerroin
säädetään takaisinkytkennällä palojen määrästä (ei mallista); (2) kartion leveys rajattu (ei usvan loppuun 80°:ssa), kauempana
karkeampi taso hyväksytään vain usvan takana; (3) hypyn pehmennys: tason vaihto hystereesillä ja vain levossa tai ristihäivytyksellä.
Ensin: lue 83d48ba80:n LiikeLaatatPaatos.YksiTasoLaske ja testit; haara uuteen natiiviseppa/yksi-tarkkuus juna-224:n päälle.
Kaksi yritystä; jos ei ratkea, rivi PT:lle (tulos.md:n linja).

## VIESTIT TÄLLÄ VUOROLLA
JU: 7491ded20 + skenaarion polku, museo-syy + uusinta. PT: 7491ded20, tilannerivi (kirjoitin vahingossa "08.4x", oikea aika 08.1x–08.2x).

## LISÄYS 08.5x: MUSEO-1 UUSINTA KATSOTTU (lokit/natiiviseppa-museo-1-91bc37c4b-2, parit lokit/natiiviseppa-museo-1-parit-2)
- Kuvat tulevat: A1 ja A2 katsottu täysikoossa, sama kuva ja rajaus kuin ennen. unity.log: "odottaa palvelimen kuvia 93/93",
  "valmiina 0.5 s", "puuttuu → ohitetaan" 0.
- AVOIN EROTUS (ei vielä PT:lle hyväksyttäväksi): lähestymisen otsikko ennen "RIJKSMUSEUM, ALANKOMAAT", jälkeen "RIJKSMUSEUM".
  Otsikko = Latauskuva.NimiJaMaa(otsikko, MuseonMaa()), MuseonMaa = UiSisalto.Maa("NLD")?.Nimi. Ennen-lokissa "lähestyminen nimi
  Rijksmuseum" tulee rakentajan jälkeen (maa valmistui myöhemmin ja otsikko vaihtui); jälkeen-lokissa riviä ei ole → maa null koko ajan.
  91bc:n diffi ei koske UiSisaltoa; syy selvittämättä (ajoitus? UiSisalto.Lataa-kutsuja museon avauksessa?). Ennen junaa: selvitä,
  tarvittaessa AsetaNimi myös odotuksen jälkeen / UiSisalto.Lataa(…) ennen avausta. Muut erot parissa 17–33 % = lähestymiskuvan vaihtuminen?
  Katso A3/L1–L4 ennen pari PT:lle.
- sk-museo-1.txt korjattu: oleta-rivit pelkkinä osamerkkijonoina (työkalu ei tue (a|b), JU).

## LISÄYS 08.5x: PT:N KAKSI KYSYMYSTÄ ENNEN MUSEON VIENTIÄ (ENSIMMÄINEN TYÖSI, ennen Yksi tarkkuutta)
PT 08.5x: "korjaus/selitys → minulle, sitten vienti + junaan".
(1) A2/A1 Rijksmuseum: otsikosta puuttuu maa – palvelimen museo.json vai koodi? (ks. yllä: museo.json ei sisällä otsikoita; lähde
    UiSisalto.Maa("NLD"), MuseoSovitin.Kuvalahestyminen.cs AsetaNimi rivi ~653 ja rakentaja ~711, Latauskuva.NimiJaMaa.)
(2) L3 näyttely: oikea kuva keskellä ristihäivytystä (kaksi kuvaa päällekkäin) – hitaampi lataus palvelimelta vai kuvaushetki?
    Mittaa kuvan saapumisaika ennen | jälkeen (lokit natiiviseppa-museo-1-6fc74dc14 vs -91bc37c4b-2; MuseoKuvasarja, sarjaSeur;
    jälkeen-puolella seuraava ladataan synkronisesti MuseoKuvat.Lataa:lla eikä Resources.LoadAsyncilla → ajoitus voi siirtyä).
LEVYSIIRTO: siirto-wt-0835.log oli kesken (koodikoko 08.45) nollaushetkellä; nollaus voi katkaista sen → aja uudelleen taustalla.
